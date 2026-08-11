<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Design system: ReUI

Components come from the **ReUI** registry (`@reui`), installed through the standard `shadcn` CLI — not a separate ReUI-specific CLI.

- Registry config lives in `components.json` (`"style": "base-nova"` = Base UI primitives; ReUI also ships a Radix variant under different style names).
- **Bare primitive names in the registry are gated** (`npx shadcn add @reui/button` returns 401 without a paid `REUI_LICENSE_KEY`), despite ReUI's site advertising "1,052+ free components." The actual free path is the numbered example blocks: `npx shadcn add @reui/c-button-1`, `@reui/c-dialog-1`, etc. — these pull the real primitive (`button.tsx`, `dialog.tsx`, ...) into `src/components/ui/` as a public registry dependency, then drop a small usage-example file in `src/components/examples/` (deleted here after install — not needed once a primitive is in `src/components/ui/`).
- Discover free block names with `npx shadcn search @reui --query <name>` and grep for the `c-<name>-N` entries.
- `@reui/badge` was the one primitive that resolved directly without the `c-*` workaround, and it lands in `src/components/reui/badge.tsx`, not `src/components/ui/`.
- **`npm run build` after any `shadcn add`** — the CLI merges new CSS custom properties into `globals.css` by appending a *second* `:root`/`.dark` block rather than merging into the existing one. If an old token block is still present (e.g. from a prior design-system attempt), some variables end up defined twice with incompatible formats (raw OKLCH triplets like `44% 0.017 286` fed through `oklch(var(--x))`, vs. this project's convention of storing full `oklch(...)` values directly) — the second one silently wins by cascade order, and any *old-format-only* variable still in scope can double-wrap into invalid CSS. Always diff `globals.css` after an `add` and collapse it back to one clean `:root`/`.dark`/`@theme inline` set.
- MCP: `https://mcp.reui.io`, configured in `.claude/settings.local.json` and `.vscode/settings.json`. It's a **remote HTTP server requiring OAuth account sign-in** (or a personal access token for headless use) — there is no local/anonymous mode. The account is free to create, but the free tier does not expose a `REUI_LICENSE_KEY`, so MCP access and free-tier `c-*` component installs are two independently free but separately-gated things.
- Data table (`src/components/data-table/base/data-table.tsx`) is hand-built on `@tanstack/react-table` **v8** (pinned — v9 has a breaking, incompatible API) plus the `ui/button.tsx` and `ui/select.tsx` primitives. ReUI has no first-party table/data-grid primitive in the free tier as of this writing.
- This project previously used **Prototyper UI** (`@prototyperco/cli`) instead of ReUI — fully free, no account required, local MCP server, ~56 primitives. That was ripped out when switching to ReUI for its much larger component catalog. If ReUI's licensing terms change unfavorably, Prototyper UI is the fallback: `bunx @prototyperco/cli@latest init --force --css src/app/globals.css` then `add <component names> --force` (requires `bun`, install via `npm install -g bun` if missing).
