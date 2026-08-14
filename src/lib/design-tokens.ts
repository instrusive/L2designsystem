// Structured design token data for L2 Design System, hand-maintained to
// mirror src/app/globals.css, the same pattern as component-registry.ts
// (structured data, not parsed from source, kept in sync by hand). This is
// what the MCP server (src/app/api/mcp/route.ts) reads from.

export interface ColorToken {
  name: string;
  light: string;
  dark: string;
  usage: string;
}

export const colorTokens: ColorToken[] = [
  { name: "background", light: "oklch(0.942 0.010 87.5)", dark: "oklch(0.163 0.002 106.6)", usage: "Page background: warm off-white paper in light mode." },
  { name: "foreground", light: "oklch(0.168 0 89.9)", dark: "oklch(0.931 0.014 88.7)", usage: "Default text color." },
  { name: "card", light: "oklch(0.973 0.010 87.5)", dark: "oklch(0.301 0 89.9)", usage: "Card/popover surface: deliberately flat, no border or shadow." },
  { name: "primary", light: "oklch(0.532 0.185 33.3)", dark: "oklch(0.56 0.194 35.2)", usage: "Brand accent (red-orange). Solid fills: buttons, focus rings, the default badge." },
  { name: "primary-foreground", light: "oklch(1 0 0)", dark: "oklch(1 0 0)", usage: "Text/icon color on top of a solid --primary fill (Button's default variant, the default Badge)." },
  { name: "primary-text", light: "oklch(0.497 0.185 33.3)", dark: "oklch(0.742 0.194 35.2)", usage: "Primary's hue at a lightness verified for use AS text (links, icons) directly on background/card. The solid-fill --primary value fails contrast as text, especially in dark mode." },
  { name: "secondary / muted / accent", light: "oklch(0.931 0.010 87.5)", dark: "oklch(0.273 0 89.9)", usage: "Neutral fill for secondary buttons, muted surfaces, badges. All three share one value." },
  { name: "secondary-foreground", light: "oklch(0.352 0 89.9)", dark: "oklch(0.855 0.019 89.4)", usage: "Text/icon color on top of a solid --secondary fill (Button/Badge's secondary variant)." },
  { name: "muted-foreground", light: "oklch(0.508 0.010 78.3)", dark: "oklch(0.716 0.017 86.4)", usage: "Secondary/caption text. Verified >=4.5:1 against background, card, and secondary surfaces." },
  { name: "destructive", light: "oklch(0.56 0.185 27.325)", dark: "oklch(0.565 0.194 22.216)", usage: "Error/danger. destructive-foreground is the same hue at a text-safe lightness (for outline/tinted use, not on the solid fill)." },
  { name: "destructive-foreground", light: "oklch(0.51 0.185 27.325)", dark: "oklch(0.744 0.194 22.216)", usage: "Destructive's hue at a text-safe lightness: outline/tinted Badge variants, Button's destructive variant (which is tinted, not solid)." },
  { name: "success", light: "oklch(0.51 0.185 149.5)", dark: "oklch(0.51 0.194 151.8)", usage: "Success state. success-foreground for text use." },
  { name: "success-foreground", light: "oklch(0.46 0.185 149.5)", dark: "oklch(0.67 0.194 151.8)", usage: "Success's hue at a text-safe lightness: outline/tinted Badge variants." },
  { name: "warning", light: "oklch(0.545 0.185 70.6)", dark: "oklch(0.54 0.194 92)", usage: "Warning state. warning-foreground for text use." },
  { name: "warning-foreground", light: "oklch(0.5 0.185 70.6)", dark: "oklch(0.73 0.194 92)", usage: "Warning's hue at a text-safe lightness: outline/tinted Badge variants." },
  { name: "info", light: "oklch(0.545 0.185 259.6)", dark: "oklch(0.545 0.194 259.6)", usage: "Informational state. info-foreground for text use." },
  { name: "info-foreground", light: "oklch(0.5 0.185 259.6)", dark: "oklch(0.71 0.194 259.6)", usage: "Info's hue at a text-safe lightness: outline/tinted Badge variants." },
  { name: "border / input", light: "oklch(0.607 0.013 86.8)", dark: "oklch(0.570 0.003 106.6)", usage: "Component boundaries. Deliberately as dark/light as it can be without failing WCAG 1.4.11 (3:1) against background AND card, which is why it can't be much subtler than this. See the Elevation/Accessibility docs for detail." },
  { name: "surface-hover", light: "color-mix(in oklch, var(--secondary), var(--foreground) 12%)", dark: "same formula, resolves per-theme", usage: "Sunken hover fill for nav items: a color-mix of secondary toward foreground, not a static value, so it never needs a separate dark-mode entry." },
];

export const statusColorRule =
  "Every status color (destructive/success/warning/info) has two forms: the bare token is tuned for a SOLID fill with white text (verified >=4.5:1); the -foreground suffix is that same hue at a lightness safe to use AS text directly on page/card background. Using the bare token as text color has caused real contrast failures in this codebase. Always use -foreground for text.";

export const radiusScale = {
  base: "0.25rem (4px), deliberately subtle, near-sharp corners rather than the rounder scale most shadcn projects ship with.",
  scale: [
    { name: "radius-sm", value: "calc(base * 0.6)" },
    { name: "radius-md", value: "calc(base * 0.8)" },
    { name: "radius-lg", value: "base" },
    { name: "radius-xl", value: "calc(base * 1.4)" },
    { name: "radius-2xl", value: "calc(base * 1.8)" },
    { name: "radius-3xl", value: "calc(base * 2.2)" },
    { name: "radius-4xl", value: "calc(base * 2.6)" },
  ],
  note: "True pill shapes (Badge, Switch, Avatar, Stepper) do NOT come from this scale. They use rounded-full directly, so changing the base radius won't affect them.",
};

export const spacingScale = [
  { token: "gap-1", px: "4px", usage: "icon-to-label inside a control" },
  { token: "gap-1.5", px: "6px", usage: "tight clusters (badge + icon)" },
  { token: "gap-2", px: "8px", usage: "default control internal spacing" },
  { token: "gap-3", px: "12px", usage: "related field groups" },
  { token: "gap-4", px: "16px", usage: "default grid/flex spacing" },
  { token: "gap-6", px: "24px", usage: "section-level spacing" },
  { token: "gap-8", px: "32px", usage: "page-level layout blocks" },
];

export const typography = {
  fonts: {
    sans: "JetBrains Mono (--font-sans / --font-mono), the base UI font, used for everything except italic accents. Note: 'sans' resolves to a MONOSPACE font in this system, not a conventional sans-serif.",
    serif: "Instrument Serif (--font-serif), used sparingly, italic, the way a portfolio italicizes its owner's name. Reaching for it on a button label or data value is a sign of overuse.",
  },
  scale: [
    { label: "Page title", classes: "text-3xl font-semibold" },
    { label: "Section heading", classes: "text-xl font-semibold" },
    { label: "Subsection heading", classes: "text-base font-semibold" },
    { label: "Body (default)", classes: "text-sm", note: "14px, the default body copy size everywhere" },
    { label: "Body (compact)", classes: "text-body-sm", note: "13px, opt-in for denser copy blocks (table cells, sidebars), not a replacement for the 14px default" },
    { label: "Small / caption", classes: "text-xs text-muted-foreground" },
    { label: "Accent (serif, italic)", classes: "font-serif italic" },
  ],
  weight: "Mostly two weights: regular for body copy, font-semibold for headings and emphasis. No medium-weight step in active use.",
};

export const motion = {
  interactiveFeedback:
    "Hover/focus state changes use Tailwind's default transition (transition-colors or transition-all), no explicit duration override. Resolves to Tailwind's 150ms default. Button additionally applies active:translate-y-px on press.",
  overlays:
    "Dialog, DropdownMenu, Select, Combobox, and Tooltip all animate in/out via tw-animate-css's animate-in/animate-out utilities at a consistent duration-100 (100ms), triggered off Base UI's data-open/data-closed state attributes. Every overlay fades (fade-in-0/fade-out-0); Dialog/DropdownMenu/Select additionally scale from 95% (zoom-in-95/zoom-out-95). DropdownMenu also slides in from its trigger's side.",
  knownGap: "prefers-reduced-motion is not respected anywhere yet.",
};

export const elevationRule =
  "Shadow means exactly one thing in this system: the element is floating above the page and can be dismissed. Static surfaces (Card, Table, Input, Tabs) stay completely flat: no shadow, ever. Floating/dismissible overlays (Dialog, Select, DropdownMenu, Combobox, Tooltip, Popover) keep shadow-md or shadow-lg. Before adding a shadow class, ask: can this be dismissed by clicking outside it, or does it render inline with the page? Inline = no shadow. Dismissible overlay = shadow is correct.";
