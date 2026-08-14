# Debugging the plugin against a live Figma file

This documents how the "destructive Button/Badge renders at 100% opacity
instead of the intended 10% tint" bug was actually diagnosed and fixed,
since the technique is reusable for any future "it doesn't look right in
Figma" report — and to correct the record on what tool actually did the
work, since it isn't quite what it might sound like.

## What was actually used: the REST API + a personal access token, not MCP

Figma has a Dev Mode MCP Server you can enable locally, and that's a real,
separate thing — but it runs as a local server Figma exposes, and an AI
agent has to be *connected* to it as an MCP client to use it. Enabling it
in Figma's own settings doesn't make it available anywhere else on its own.
In this debugging session, no MCP connection to it was ever established —
what actually worked was simpler and needed no special setup on the agent
side: a **Figma personal access token**, used directly against Figma's
plain REST API via `curl`.

To generate one: Figma → account icon → **Settings → Security → Personal
access tokens**. Treat it like any credential — it grants read access to
your files. Revoke it from that same page once you're done debugging, and
generate a fresh one next time rather than reusing an old one that's been
pasted into a chat transcript somewhere.

## The technique

Given a Figma file URL like
`https://www.figma.com/design/<FILE_KEY>/<name>?node-id=1-822`, the
`node-id` in the URL uses a dash (`1-822`) where the API wants a colon
(`1:822`). Two endpoints did all the work:

**Fetch specific known nodes:**
```bash
curl -s -H "X-Figma-Token: $TOKEN" \
  "https://api.figma.com/v1/files/<FILE_KEY>/nodes?ids=1:822,1:824,1:826"
```

**Find a node by name when you don't have its current ID** (component sets
get a *new* node ID every time they're deleted and recreated, so this was
needed after every rebuild-and-retest cycle):
```bash
curl -s -H "X-Figma-Token: $TOKEN" \
  "https://api.figma.com/v1/files/<FILE_KEY>?depth=3" \
  | node -e "
      const data = JSON.parse(require('fs').readFileSync(0, 'utf8'));
      function walk(node) {
        if (node.name === 'Button' && node.type === 'COMPONENT_SET') {
          console.log(node.id, node.children.map(c => c.id + ' ' + c.name));
        }
        (node.children || []).forEach(walk);
      }
      data.document.children.forEach(walk);
    "
```

Both return a `document` (or `nodes[id].document`) tree with the exact same
shape a Figma plugin sees at runtime — `fills`, `strokes`, `boundVariables`,
`cornerRadius`, etc. — which is what actually settled this bug: comparing
what the *code* was trying to set against what Figma's file *actually*
contained, without relying on a screenshot or a description of "it looks
off."

## What the data showed

The destructive Button's fill was correctly bound to the `destructive`
color Variable (`boundVariables.color` pointed at the right Variable ID,
and the resolved RGB matched `--destructive` exactly) — so the binding
itself was never the problem. But the paint object had no `opacity` key at
all, which Figma omits when it's the default (`1.0`). The 10% tint the code
was trying to set was silently not landing, on a live, freshly-rebuilt node
— which ruled out "stale build" or "cached plugin window" as the cause and
pointed at the plugin code itself.

## Root cause and fix

`src/components.ts`'s `applyFill()` was building the paint in one shot:

```ts
// Before — doesn't stick:
const paint = figma.variables.setBoundVariableForPaint(
  { type: "SOLID", color: { r: 0, g: 0, b: 0 }, opacity },
  "color",
  variable
);
node.fills = [{ ...paint, opacity }]; // still doesn't stick
```

Setting `opacity` in the same object as the variable binding — even when
re-applied after `setBoundVariableForPaint` returns, before the object is
ever assigned to `node.fills` — doesn't reliably survive Figma processing
the binding. The fix assigns the binding first, then mutates a **fresh
read-back** of `node.fills` as a genuinely separate step:

```ts
// After — sticks:
const paint = figma.variables.setBoundVariableForPaint(
  { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
  "color",
  variable
);
node.fills = [paint];
if (opacity !== 1) {
  const current = clonePaints(node.fills); // node.fills is read-only; clone before mutating
  current[0] = { ...current[0], opacity };
  node.fills = current;
}
```

This matches Figma's general documented pattern for mutating any
array-typed property (`fills`, `strokes`, etc. are read-only arrays — you
read, clone, mutate the clone, and reassign) — the missing piece was that
the *binding* and the *opacity* needed to be two separate reassignments,
not one.

## Other Figma Plugin API defaults that bit us later

Two more assumption bugs, found the same way (comparing what the code
expected against what actually rendered), worth listing so they aren't
re-discovered from scratch:

- **`figma.combineAsVariants()` does not auto-arrange its input into a
  grid.** It preserves whatever positions the given nodes already have. An
  earlier version of `syncComponents()` fed it near-overlapping placeholder
  positions on the assumption Figma would lay them out — it doesn't, and
  every variant rendered stacked on top of the others. Fixed by computing a
  real non-overlapping grid ourselves before combining, using each
  variant's actual measured `width`/`height` (variants within one component
  aren't uniformly sized).
- **`figma.createComponent()` defaults `clipsContent` to `true`.** Combined
  with a stroke that isn't drawn fully inside the node's own bounds, the
  frame's own clipping mask cuts off the outer edge of the border — visible
  as buttons/inputs with a border that looks slightly cut off on one or two
  sides. Fixed by explicitly setting `clipsContent = false` on every
  component frame the plugin creates (`createComponentNode()` in
  `components.ts`, and the same one-line fix in `icons.ts`). **First pass
  missed one thing**: `figma.combineAsVariants()` wraps the individual
  variants in a brand-new `ComponentSetNode`, which has its *own*
  `clipsContent` — defaulting to `true` independently of whatever the child
  components were set to. Turning it off on each variant isn't enough; the
  set itself needs `set.clipsContent = false` too, right after combining.

Neither of these had an error message — both were "the code ran fine, the
result was just visually wrong," which is exactly the case this file's
REST-API technique is for.

## A workflow bug, not a Figma API bug: forgetting to rebuild after editing shared source

`code.ts` imports `../src/lib/design-tokens.ts` and
`../src/lib/component-registry.ts` directly — that's the whole point, one
source of truth instead of a copy that drifts. But that import is resolved
at **esbuild bundle time**, not at Sync-run time. Editing
`design-tokens.ts` and rebuilding/testing the *main Next.js app* does
nothing to `figma-plugin/code.js` — it's a separate bundle that only
picks up the change on its own `npm run build`.

This actually happened: a "lighten the background/card surfaces" change
edited `design-tokens.ts`, the main app was rebuilt and verified, but
`figma-plugin` wasn't — so its bundled `code.js` kept shipping the old
lightness values for hours. Anyone who ran Sync in that window got the
stale values pushed into their file's `background`/`card` Variables,
silently — no error, and the plugin's own idempotency logic (Variables
always update in place) meant it looked like a normal, successful sync.
Caught by the same REST-API diffing technique as everything else here:
pulling a node's resolved fill color and comparing it against what the
*current* token value should be.

**Takeaway**: any edit to `src/lib/design-tokens.ts` or
`src/lib/component-registry.ts` needs **two** rebuilds, not one — the
main app (`npm run build` at the repo root) and the plugin
(`cd figma-plugin && npm run build`) are separate bundles with no
automatic link between them. Get in the habit of rebuilding both
whenever either shared file changes, even if the request sounds like a
website-only change.

## Takeaway for next time

If a future report is "X looks wrong in Figma" and a screenshot isn't
enough to diagnose it:

1. Get the file key from the Figma URL and the specific `node-id` (dash →
   colon), or use the `?depth=N` + name-search technique above if the node
   was recreated since the report.
2. Ask for a personal access token (or reuse one you already have logged as
   still valid — but prefer a fresh one).
3. Pull the raw JSON and compare it directly against what the plugin code
   is trying to set — this finds real discrepancies (bindings, opacity,
   corner radii, whatever) far faster than iterating on visual guesses.
