// Curated, agent-facing summaries of this project's written guidance pages
// (Principles, Accessibility, Elevation, Motion, Iconography, Spacing).
// This is NOT a scrape of the docs pages — it's a purpose-built, terse
// rephrasing meant to be consumed by another AI agent via the MCP server
// (src/app/api/mcp/route.ts), where prose framing ("this exists because...")
// is less useful than a flat list of actionable rules. Keep in sync by hand
// with the corresponding /principles, /accessibility, /elevation, /motion,
// /iconography, and /spacing pages when those change.

export interface GuidanceTopic {
  topic: string;
  summary: string;
  rules: string[];
}

export const guidance: GuidanceTopic[] = [
  {
    topic: "principles",
    summary: "The five rules every decision in this design system traces back to.",
    rules: [
      "Built for one person, not a neutral template — this reskins to match a specific portfolio, not generic/safe defaults. Don't propose a neutral-gray fallback.",
      "Verify contrast, don't eyeball it — compute a real WCAG ratio for any new or changed color pairing before shipping it.",
      "Flat by default, shadow only for floating things — see the 'elevation' topic.",
      "Real components, not mockups — every documented component links to real, installed source. Don't document an API that doesn't exist.",
      "Restraint over decoration — near-sharp corners, two font weights, the serif accent used sparingly. When in doubt, choose the plainer option.",
    ],
  },
  {
    topic: "accessibility",
    summary: "What's solid, what's deliberate practice, and what's an honest gap.",
    rules: [
      "Every color pairing must be checked against a real computed WCAG ratio: >=4.5:1 for text, >=3:1 for non-text UI boundaries (borders, focus indicators). This is manual, not CI-enforced — nothing currently blocks a bad color from shipping.",
      "The standard focus-visible recipe is: focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50. Applied to Button, Input, Checkbox, Switch, Accordion, Textarea. Known exception: Badge still uses an older ring+offset recipe.",
      "Dialog, Select, Combobox, DropdownMenu, Accordion, and Tabs are built on @base-ui/react primitives for their keyboard/ARIA behavior (focus trapping, Escape-to-close, roving tabindex) — don't hand-roll that behavior when composing with these.",
      "Icon-only buttons (Button size=\"icon\") need an explicit aria-label — the component does not provide one automatically.",
      "Known gaps, be aware of but don't claim are solved: prefers-reduced-motion is not respected anywhere; no automated accessibility audit (axe/Lighthouse/screen-reader pass) has been run against the live site.",
    ],
  },
  {
    topic: "elevation",
    summary: "Shadow means exactly one thing: floating above the page, dismissible.",
    rules: [
      "Static surfaces (Card, Table, Input, Tabs) are always flat — no shadow, ever.",
      "Floating/dismissible overlays (Dialog, Select, DropdownMenu, Combobox, Tooltip, Popover) use shadow-md or shadow-lg.",
      "Test before adding a shadow class: can this be dismissed by clicking outside it? If yes, shadow is correct. If it renders inline with the page, no shadow.",
    ],
  },
  {
    topic: "motion",
    summary: "Two motion contexts in active use; nothing else.",
    rules: [
      "Interactive feedback (hover/focus color changes): use Tailwind's default transition, no explicit duration override (resolves to 150ms). Button also does active:translate-y-px on press.",
      "Overlay enter/exit (Dialog, DropdownMenu, Select, Combobox, Tooltip): duration-100 (100ms) consistently, via tw-animate-css's animate-in/animate-out utilities keyed off Base UI's data-open/data-closed attributes. Match this exact pattern for any new overlay component rather than inventing a new timing.",
      "prefers-reduced-motion is not handled — don't claim it is.",
    ],
  },
  {
    topic: "iconography",
    summary: "lucide-react only. Three sizes, inherited color, default stroke.",
    rules: [
      "Icons come from lucide-react exclusively, imported by name (e.g. SearchIcon), never a generic Icon wrapper.",
      "Three sizes cover nearly all use: size-3.5 (14px, dense UI/chips), size-4 (16px, default for buttons/inputs/menu items), size-5 (20px, larger standalone targets). There is no size-6+ in active use.",
      "Never override strokeWidth per instance — breaks consistency with every other icon on the page.",
      "Icons inherit color via currentColor from their text class: text-muted-foreground (default, paired with secondary text), text-foreground (same weight as primary text), text-primary-text (accent use only, sparingly, e.g. a selected indicator).",
    ],
  },
  {
    topic: "spacing-and-radius",
    summary: "Standard Tailwind spacing scale, no customization. Radius is a single base token.",
    rules: [
      "Spacing uses Tailwind's default scale unmodified. In practice: gap-1 (4px, icon-to-label), gap-1.5 (6px, tight clusters), gap-2 (8px, default control spacing), gap-3 (12px, related field groups), gap-4 (16px, default grid/flex), gap-6 (24px, section-level), gap-8 (32px, page-level blocks). Padding follows the same steps: p-3 for compact surfaces, p-4-p-6 for cards/dialogs.",
      "Radius base is 0.25rem (4px), deliberately subtle/near-sharp. Everything from rounded-sm through rounded-4xl derives from this one --radius token — never hardcode an arbitrary radius value.",
      "True pill shapes (Badge, Switch, Avatar, Stepper) use rounded-full directly, NOT the radius scale — changing --radius will not affect them.",
    ],
  },
];
