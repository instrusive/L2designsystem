# Contributing

Thanks for considering a contribution. This is a small, opinionated design system — the goal is to keep it coherent, not to accept every possible variant of every component.

## Setup

```bash
git clone https://github.com/instrusive/L2designsystem.git
cd L2designsystem
npm install
npm run dev
```

## Before you open a PR

Run all three — a passing build doesn't guarantee a passing typecheck or lint:

```bash
npx tsc --noEmit
npm run lint
npm run build
```

Then check your change in the browser, in both light and dark mode. Screenshots alone don't catch contrast or focus-state regressions — actually toggle the theme.

## Conventions

Read [`AGENTS.md`](AGENTS.md) first — it covers this repo's specific rules (how ReUI components get installed, the `globals.css` duplicate-token-block gotcha, why the data table is pinned to TanStack Table v8, etc.). It's kept up to date because an AI agent re-reads it on every session; treat it as the source of truth over anything in this file if the two disagree.

A few repo-wide habits worth calling out:

- **Reuse, don't reinvent.** If ReUI already ships a free component or example (`npx shadcn search @reui --query <name>`) for what you're building, install and adapt it rather than hand-rolling a new one.
- **Verify color contrast with math, not eyeballing.** Every solid-fill/text color pairing in this system has been checked against WCAG AA (4.5:1) using the actual OKLCH→sRGB→luminance formula, not "it looks fine." If you add or change a color token, do the same — there's precedent for this going wrong silently (see git history for `globals.css`).
- **`--{status}` vs `--{status}-foreground`.** The base token (`--warning`, `--success`, etc.) is tuned for use as a *background* with white text on top. The `-foreground` variant is that same hue at a lightness safe to use *as text* directly on the page/card background. Using the wrong one is an easy, easy-to-miss mistake — it'll look fine in whichever theme you tested and fail contrast in the other.
- **No raw colors.** Every color in a component should resolve to a token (`text-warning-foreground`, `bg-card`, etc.), never a literal hex/rgb value, so theming and dark mode keep working.

## Adding a new ReUI component

1. `npx shadcn search @reui --query <name>` to find the free `c-*` example (bare primitive names are paywalled; the numbered examples are the free path).
2. `npx shadcn@latest add @reui/c-<name>-1` — this pulls the real primitive into `src/components/ui/` or `src/components/reui/` and drops a demo file in `src/components/examples/`.
3. Read the demo file for the correct composition pattern, then delete it — once the primitive is installed, the example isn't needed.
4. **Diff `globals.css` after every install.** The CLI has, in the past, appended a second `:root`/`.dark` block instead of merging into the existing one. Run `grep -n "^:root\|^\.dark" src/app/globals.css` — there should be exactly one of each.
5. Add it to the component registry (`src/lib/component-registry.ts`) so it shows up on `/components`.

## Commit messages

Explain *why*, not just *what* — the diff already shows what changed. If your change fixes a bug an earlier commit introduced, say so; it's useful history.

## Reporting issues

Open a GitHub issue with a description of the problem, the component/token involved, and (for visual bugs) a screenshot in both light and dark mode.
