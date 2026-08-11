# L2 Design System — Progress Log

## Stack
- Next.js 16.3.0 (App Router, Turbopack), React 19.2.8, Tailwind CSS v4
- Components: [ReUI](https://reui.io) (`@reui` registry via the `shadcn` CLI, Base UI primitives, `base-nova` style)
- Dark mode: `next-themes`, wired in `src/components/theme-provider.tsx` / `theme-toggle.tsx`
- Data table: hand-built on `@tanstack/react-table` v8 (pinned — v9 is a breaking API change)

## What's done
- App scaffolded, builds clean (`npm run build`).
- ReUI tokens (OKLCH) merged into `src/app/globals.css`; extended `info`/`success`/`warning`/`invert` semantic tokens added to match ReUI's badge/alert variants.
- 18 real ReUI primitives installed for free via the `c-*` example-block workaround (see `AGENTS.md` for why the bare names are gated): `button`, `label`, `separator`, `input`, `select`, `card`, `checkbox`, `switch`, `tooltip`, `dropdown-menu`, `table`, `accordion`, `avatar`, `dialog`, `progress`, `skeleton`, `tabs`, plus `badge` and `alert` (both installed directly to `src/components/reui/`, not `src/components/ui/`).
- `TooltipProvider` wraps the app in `src/app/layout.tsx` per ReUI's install instructions.
- Base data table (`src/components/data-table/base/data-table.tsx`) with sorting + pagination, demoed on the home page against a sample invoices dataset.
- Home page (`src/app/page.tsx`) rebuilt as a full component showcase — sticky section nav + a card per primitive category (buttons, badges, alerts, form controls, avatars, tabs, accordion, dialog, progress/skeleton, dropdown/tooltip, data table). Verified via a headless-browser pass: builds clean, no console errors, renders correctly in both light and dark theme, dialog opens/closes.
- MCP servers configured for Claude Code / VS Code pointing at `https://mcp.reui.io` — **requires the user to complete OAuth sign-in themselves** (or set a personal access token for headless use); not something an agent can complete unattended. Still outstanding as of this session — no reui MCP tools are exposed yet.

## Known gaps / next steps
- ReUI's free tier covers the primitives pulled above. Anything beyond that (combobox, calendar, popover, sheet, drawer, command, etc.) needs the same `npx shadcn search @reui --query <name>` → find a `c-<name>-N` block → `npx shadcn add @reui/c-<name>-N` workflow.
- No first-party ReUI data-grid/table primitive in the free tier — the data table here is custom-built on TanStack Table, styled with ReUI's `ui/button.tsx` and `ui/select.tsx`.
- MCP sign-in is outstanding — run `/mcp` (or the editor's MCP auth flow) and complete the OAuth approval at reui.io to unlock agent-driven component search/install. This needs to happen interactively; an agent session cannot complete the OAuth redirect.
- The showcase page is a flat demo, not real app routes/navigation/data — next real step is likely turning it into actual product pages once there's a concrete feature to build, rather than expanding the demo further.
- If ReUI's free tier ever tightens further, Prototyper UI (`@prototyperco/cli`) is a fully-free, no-account fallback with a smaller (~56) but complete primitive set — see the note in `AGENTS.md`.
