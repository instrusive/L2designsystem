# L2 Design System — Figma plugin

Turns this repo's real tokens and a curated set of components into a Figma
library, run from inside Figma. This is the "Code → Figma" direction: the
source of truth is the code, and this plugin is how it reaches Figma — not
the other way around.

## Why a plugin, not the Figma API

Figma's REST API can read files and can create/update *Variables*, but it
cannot create frames, auto-layout, or components — there's no "create a
node" REST endpoint, and no way to create a brand-new file from nothing.
Only the Figma **Plugin API** (code that runs inside Figma itself) can build
real component structures. That also means no Figma API token or OAuth is
needed — just Figma Desktop and this plugin.

## Build

```
cd figma-plugin
npm install
npm run build
```

This bundles `src/code.ts` into `code.js` via esbuild. `code.ts` imports
directly from `../src/lib/design-tokens.ts` and `../src/lib/component-registry.ts`
in the main app — there's no separate token export step, so there's exactly
one source of truth. Re-run `npm run build` any time those files change.

## Install & run

1. Open Figma Desktop, create (or open) a file.
2. **Plugins → Development → Import plugin from manifest…**, select
   `figma-plugin/manifest.json`.
3. Run it from the Plugins menu, click **Sync design system**.

Re-run it any time after `npm run build` picks up token changes — it's
designed to be re-run, not used once.

## What it does, and what it doesn't overwrite

- **Colors, radius, spacing, typography**: always kept in sync. Re-running
  updates existing Figma Variables/Text Styles in place rather than
  duplicating them, so this is safe (and meant) to run repeatedly.
- **Icons and components**: only created once. If an icon set or component
  set already exists in the file (tracked via Figma plugin data, not by
  name), the plugin leaves it alone on re-run — you may have adjusted it by
  hand in Figma, and this won't clobber that. To force a rebuild, delete it
  from the Figma file and re-run — deleting is required; re-running alone
  will just report "already exists, skipped" and leave the old one in place,
  even if the plugin's build changed since.

## Icons

Icons use [Lucide](https://lucide.dev) — the same library `lucide-react`
already provides to the real Button/Combobox/DropdownMenu/etc. components
in this codebase, so Figma and code render the same icon shapes. A curated
list (`icons.json`) — the `/iconography` docs page's showcase plus every
icon actually imported by a real component in `src/`, deduplicated — is
resolved against the `lucide-static` package (raw SVG files, no React
dependency) by `generate-icons.mjs`, which runs before every build and
writes `src/generated-icons.ts`. `src/icons.ts` parses each SVG into real
Figma vector nodes via `figma.createNodeFromSvg` and rebinds their stroke to
the `foreground` color Variable — Lucide's SVGs ship `stroke="currentColor"`,
which Figma can't resolve on its own. All icons land in one "Icon" component
set with a `Name` variant property. Add more icons by adding their
kebab-case name to `icons.json` (must match a filename under
`node_modules/lucide-static/icons/`) — the generator fails loudly if a name
doesn't resolve, rather than silently skipping it.

## Canvas layout

The Icon set sits in its own row at the top. Below that, each component
*type* (Button, Badge, Card, ...) gets its own column, left to right, each
wrapped in a dashed purple rectangle so the boundary between one component's
variants and the next is obvious at a glance on the canvas — purely a
plugin-drawn organizational marker (`components.ts`'s `drawOutline()`), not
a design token.

`figma.combineAsVariants()` does **not** auto-arrange its input into a grid
— it preserves whatever positions the given nodes already have. So before
combining, `syncComponents()` lays each spec's variants out itself in a
real non-overlapping grid (wrapping every 6 columns), sized from each
variant's actual measured width/height rather than a fixed guess, since
variants within one component aren't uniformly sized (Button's `sm` isn't
the same width as its `lg`). Column width for the outline/next-column
math is then read back via `set.width` after combining, so nothing is
hardcoded.

## Scope

v1 covers colors/radius/spacing/typography in full, the curated Lucide icon
set above, and a curated set of purely-visual primitive components: Button,
Badge, Card, Avatar, Input, Textarea, Checkbox, Switch, Label, Separator,
Kbd, Alert, Progress, Select, Tabs. Compositions and heavily interactive
components (Data Table, Kanban, Tree, Dialog, ...) aren't included —
assemble those in Figma from the primitives once they exist, or extend
`src/component-specs.ts` to add more.

A few of these are deliberately partial, representing only the state that's
actually static:

- **Alert** skips the icon slot and approximates the real component's
  barely-there `/4`-opacity background tint as a plain card fill — the
  border color carries most of the visible distinction between variants,
  same as it does in the real component.
- **Select** is only the trigger's closed state — the dropdown popup is a
  floating overlay, out of scope the same way Dialog/DropdownMenu are.
- **Tabs** is only `TabsTrigger`'s active/inactive states, not the
  `TabsList` container — assemble a real tab bar from instances of it.
- **Progress** has no variant prop in the real component (it's value-driven,
  not variant-driven), so it's one representative swatch at ~60% fill.

Button has a working `Icon` variant (`none` / `leading`) that places a real
*instance* of the Icon component set inside the button, matching the one
documented example on the live playground (`<PlusIcon data-icon="inline-start" />`).
The instance is resized to the button's icon size for that `Size` variant
(14/16px) and its stroke is rebound to the same color as the button's own
text, so it follows each `Variant` the same way the real component's
`currentColor` inheritance does. Other components don't have icon slots
wired up yet — add one the same way: give the variant an `icon` (Lucide
name from `icons.json`) and `iconSize` in `component-specs.ts`, and
`components.ts`'s `addIcon()` handles the rest.

`src/component-specs.ts` is the one genuinely hand-curated file here —
Tailwind classes don't auto-translate into Figma auto-layout, so each
component's variant axes and Figma structure (padding, gap, fill/stroke
token, radius token, text style) are authored once by hand, the same way
`src/lib/design-tokens.ts` mirrors `globals.css` instead of parsing it.
