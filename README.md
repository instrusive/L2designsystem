# L2 Design System

A component design system built on [Next.js](https://nextjs.org), [Tailwind CSS v4](https://tailwindcss.com), and the [ReUI](https://reui.io) registry (Base UI primitives), themed to match [madebylianna](https://github.com/instrusive/madebylianna)'s portfolio aesthetic — warm neutral palette, JetBrains Mono + Instrument Serif, subtle paper-grain texture, and a punchy red-orange accent.

It's meant to be a real, working foundation you can drop into a portfolio site or prototype — not just a token file. That means: verified WCAG-AA contrast on every color pairing, a fully-featured data table (search, filter, row selection, column visibility, virtualization), and 25+ components with working demos, not just static screenshots.

## Quick start

```bash
git clone https://github.com/instrusive/L2designsystem.git
cd L2designsystem
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the full component showcase. `/docs` has installation and usage docs; `/explorer` has isolated per-component pages.

## What's inside

- **Design tokens** — colors (OKLCH), radius, fonts, and a fixed paper-grain texture, all theme-aware (light/dark via `next-themes`). See [`src/app/globals.css`](src/app/globals.css).
- **Components** — Button, Badge, Card, Alert, Dialog, Select, Dropdown Menu, Tabs, Accordion, Filters, Stepper, Empty state, Toast (Sonner), Tree, Kanban, Rating, Number Field, Phone Input, Sortable, and a hand-built TanStack Table v8 data table with search/filter/selection/virtualization.
- **Docs** (`/docs`) — installation, theming, component reference, and a guide on working with this repo using an AI coding agent.
- **Explorer** (`/explorer`) — every component in isolation, several with live prop controls.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- [Tailwind CSS v4](https://tailwindcss.com) — CSS-variable-driven theming, no `tailwind.config.js`
- [ReUI](https://reui.io) registry components on [Base UI](https://base-ui.com) primitives (installed via the standard `shadcn` CLI)
- [TanStack Table v8](https://tanstack.com/table) + [TanStack Virtual](https://tanstack.com/virtual) for the data table
- [dnd-kit](https://dndkit.com) (Kanban, Sortable) and [headless-tree](https://headless-tree.lukasbach.com) (Tree)

## Using this in your own project

The fastest path is forking or cloning this repo directly — it's a working Next.js app, not a packaged library. Copy the pieces you need from `src/components/ui` and `src/components/reui`, along with the token setup in `src/app/globals.css`. See [`/docs/installation`](http://localhost:3000/docs/installation) for the full breakdown of what depends on what.

## Using this with an AI coding agent

This repo is written with AI-assisted development in mind — see [`AGENTS.md`](AGENTS.md) for the conventions an agent (or you) should know before making changes, and [`/docs/ai-usage`](http://localhost:3000/docs/ai-usage) for a fuller guide on prompting an agent to extend this system correctly (installing new ReUI components, keeping tokens in sync, avoiding common pitfalls this repo has already hit).

## Contributing

Contributions are welcome — see [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

[MIT](LICENSE) © 2026 Lianna Lamorena
