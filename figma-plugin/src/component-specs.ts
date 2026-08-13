// Hand-authored mapping from this design system's real components to a
// Figma-buildable structure. Not derivable from Tailwind classes without a
// much bigger parsing effort, so — same spirit as design-tokens.ts mirroring
// globals.css — this is curated once by hand and kept in sync manually.
//
// v1 covers the primitives that are pure visual state (no runtime behavior
// Figma can't represent): Button, Badge, Card, Avatar, Input, Textarea,
// Checkbox, Switch, Label, Separator, Kbd, Alert, Progress, Select, Tabs.
// Compositions and heavily interactive components (Data Table, Kanban,
// Tree, Dialog, ...) are left for the designer to assemble from these once
// they exist in Figma.

export type FillRef =
  | { kind: "variable"; name: string }
  | { kind: "literal"; r: number; g: number; b: number }
  | { kind: "none" };

const v = (name: string): FillRef => ({ kind: "variable", name });
const white: FillRef = { kind: "literal", r: 1, g: 1, b: 1 };
const none: FillRef = { kind: "none" };

export interface ComponentVariant {
  props: Record<string, string>;
  fill: FillRef;
  fillOpacity?: number;
  stroke?: FillRef;
  strokeWeight?: number;
  textColor?: FillRef;
  label?: string;
  width?: number;
  height?: number;
  paddingXToken?: string;
  paddingYToken?: string;
  paddingX?: number;
  paddingY?: number;
  gapToken?: string;
  gap?: number;
  radiusToken?: string;
  radiusPx?: number;
  thumbAlign?: "MIN" | "MAX";
  /** Lucide icon name (matches icons.json) to place alongside the label, sized to iconSize. */
  icon?: string;
  iconSize?: number;
  /** "leading" (default) places the icon before the label, "trailing" after — e.g. Select's chevron. */
  iconPosition?: "leading" | "trailing";
  /** Second text line below label (muted-foreground), e.g. Alert's description under its title. */
  description?: string;
  /** progress shape only: 0-100, how much of the track the indicator fills. */
  fillPercent?: number;
  /** progress shape only: indicator color, defaults to primary. */
  indicatorFill?: FillRef;
}

export interface ComponentSpec {
  slug: string;
  name: string;
  shape: "text-frame" | "surface" | "ellipse" | "line" | "thumb-track" | "progress";
  layout: "horizontal" | "vertical" | "none";
  textStyleName?: string;
  defaultLabel?: string;
  variants: ComponentVariant[];
}

const BUTTON_VARIANTS: { name: string; fill: FillRef; fillOpacity?: number; stroke?: FillRef; textColor: FillRef }[] = [
  { name: "default", fill: v("primary"), textColor: v("primary-foreground") },
  { name: "outline", fill: none, stroke: v("border"), textColor: v("foreground") },
  { name: "secondary", fill: v("secondary"), textColor: v("secondary-foreground") },
  { name: "ghost", fill: none, textColor: v("foreground") },
  { name: "destructive", fill: v("destructive"), fillOpacity: 0.1, textColor: v("destructive-foreground") },
  { name: "link", fill: none, textColor: v("primary-text") },
];
const BUTTON_SIZES: { name: string; height: number; iconSize: number }[] = [
  { name: "sm", height: 28, iconSize: 14 },
  { name: "default", height: 32, iconSize: 16 },
  { name: "lg", height: 36, iconSize: 16 },
];
// "leading" matches the one documented example (PlusIcon data-icon="inline-start")
// on the live Button playground and the /figma, /mcp docs pages.
const BUTTON_ICON_OPTIONS: { name: string; icon?: string }[] = [
  { name: "none" },
  { name: "leading", icon: "plus" },
];

const buttonVariants: ComponentVariant[] = BUTTON_VARIANTS.flatMap((variant) =>
  BUTTON_SIZES.flatMap((size) =>
    BUTTON_ICON_OPTIONS.map((iconOpt) => ({
      props: { Variant: variant.name, Size: size.name, Icon: iconOpt.name },
      fill: variant.fill,
      fillOpacity: variant.fillOpacity,
      stroke: variant.stroke,
      strokeWeight: variant.stroke ? 1 : undefined,
      textColor: variant.textColor,
      height: size.height,
      paddingXToken: "gap-3",
      gapToken: "gap-1.5",
      radiusToken: "radius-lg",
      icon: iconOpt.icon,
      iconSize: size.iconSize,
    }))
  )
);

const BADGE_VARIANTS: { name: string; fill: FillRef; fillOpacity?: number; stroke?: FillRef; textColor: FillRef }[] = [
  { name: "default", fill: v("primary"), textColor: v("primary-foreground") },
  { name: "secondary", fill: v("secondary"), textColor: v("secondary-foreground") },
  { name: "outline", fill: none, stroke: v("border"), textColor: v("foreground") },
  { name: "destructive", fill: v("destructive"), textColor: white },
  { name: "success", fill: v("success"), textColor: white },
  { name: "warning", fill: v("warning"), textColor: white },
  { name: "info", fill: v("info"), textColor: white },
  { name: "destructive-light", fill: v("destructive"), fillOpacity: 0.1, stroke: v("destructive-foreground"), textColor: v("destructive-foreground") },
  { name: "primary-light", fill: v("primary"), fillOpacity: 0.1, stroke: v("primary-text"), textColor: v("primary-text") },
];

const badgeVariants: ComponentVariant[] = BADGE_VARIANTS.map((variant) => ({
  props: { Variant: variant.name },
  fill: variant.fill,
  fillOpacity: variant.fillOpacity,
  stroke: variant.stroke,
  strokeWeight: variant.stroke ? 1 : undefined,
  textColor: variant.textColor,
  height: 20,
  paddingXToken: "gap-2",
  radiusPx: 999,
}));

const avatarVariants: ComponentVariant[] = [
  { props: { Size: "sm" }, fill: v("secondary"), textColor: v("foreground"), width: 24, height: 24, label: "AB" },
  { props: { Size: "default" }, fill: v("secondary"), textColor: v("foreground"), width: 32, height: 32, label: "AB" },
  { props: { Size: "lg" }, fill: v("secondary"), textColor: v("foreground"), width: 40, height: 40, label: "AB" },
];

const inputVariants: ComponentVariant[] = [
  { props: { State: "default" }, fill: v("background"), stroke: v("border"), strokeWeight: 1, textColor: v("muted-foreground"), height: 32, paddingXToken: "gap-3", radiusToken: "radius-lg", label: "Placeholder" },
  { props: { State: "disabled" }, fill: v("background"), fillOpacity: 0.5, stroke: v("border"), strokeWeight: 1, textColor: v("muted-foreground"), height: 32, paddingXToken: "gap-3", radiusToken: "radius-lg", label: "Placeholder" },
];

const textareaVariants: ComponentVariant[] = [
  { props: { State: "default" }, fill: v("background"), stroke: v("border"), strokeWeight: 1, textColor: v("muted-foreground"), height: 80, width: 240, paddingXToken: "gap-3", paddingYToken: "gap-2", radiusToken: "radius-lg", label: "Placeholder" },
];

// checkbox.tsx uses a hardcoded rounded-[4px] — not tied to the --radius
// scale at all — so this is a literal radiusPx, not a bound radius token.
const checkboxVariants: ComponentVariant[] = [
  { props: { State: "unchecked" }, fill: v("background"), stroke: v("border"), strokeWeight: 1, width: 16, height: 16, radiusPx: 4 },
  { props: { State: "checked" }, fill: v("primary"), width: 16, height: 16, radiusPx: 4 },
  { props: { State: "indeterminate" }, fill: v("primary"), fillOpacity: 0.6, width: 16, height: 16, radiusPx: 4 },
];

const switchVariants: ComponentVariant[] = [
  { props: { State: "off" }, fill: v("secondary"), width: 32, height: 18, radiusPx: 999, thumbAlign: "MIN" },
  { props: { State: "on" }, fill: v("primary"), width: 32, height: 18, radiusPx: 999, thumbAlign: "MAX" },
];

const labelVariants: ComponentVariant[] = [
  { props: {}, fill: none, textColor: v("foreground"), label: "Label" },
];

const separatorVariants: ComponentVariant[] = [
  { props: { Orientation: "horizontal" }, fill: v("border"), width: 200, height: 1 },
  { props: { Orientation: "vertical" }, fill: v("border"), width: 1, height: 48 },
];

const kbdVariants: ComponentVariant[] = [
  {
    props: {},
    fill: v("secondary"),
    stroke: v("border"),
    strokeWeight: 1,
    textColor: v("muted-foreground"),
    height: 20,
    paddingXToken: "gap-1.5",
    radiusToken: "radius-sm",
    label: "⌘K",
  },
];

// alert.tsx: background/border tint is a barely-there /4 and /30 opacity in
// the real component (its main signal is the border hue + icon, which we
// skip here); title text always stays plain foreground even on tinted
// variants (only the icon and border pick up the hue) — so the dominant
// visible difference in this swatch is the border color, matching how the
// real component reads in practice. "invert" is skipped: no invert/
// invert-foreground Variable exists in this plugin's curated token set.
const ALERT_VARIANTS: { name: string; stroke: FillRef }[] = [
  { name: "default", stroke: v("border") },
  { name: "destructive", stroke: v("destructive") },
  { name: "success", stroke: v("success") },
  { name: "warning", stroke: v("warning") },
  { name: "info", stroke: v("info") },
];

const alertVariants: ComponentVariant[] = ALERT_VARIANTS.map((variant) => ({
  props: { Variant: variant.name },
  fill: v("card"),
  stroke: variant.stroke,
  strokeWeight: 1,
  textColor: v("foreground"),
  description: "This is a description of the alert.",
  paddingXToken: "gap-3",
  paddingY: 10,
  radiusToken: "radius-lg",
  label: "Alert title",
}));

// progress.tsx has no variant prop — it's value-driven, not variant-driven —
// so this is a single representative swatch, same treatment as Card/Label.
const progressVariants: ComponentVariant[] = [
  { props: {}, fill: v("secondary" /* bg-muted, same value */), width: 200, height: 4, radiusPx: 999, fillPercent: 60, indicatorFill: v("primary") },
];

// select.tsx's trigger, closed state — the only state that's meaningfully
// static. Content/items are a floating popup, out of scope for a library
// swatch the same way Dialog/DropdownMenu are.
const SELECT_SIZES: { name: string; height: number }[] = [
  { name: "sm", height: 28 },
  { name: "default", height: 32 },
];
const selectVariants: ComponentVariant[] = SELECT_SIZES.map((size) => ({
  props: { Size: size.name },
  fill: none,
  stroke: v("border"),
  strokeWeight: 1,
  textColor: v("muted-foreground"),
  height: size.height,
  paddingXToken: "gap-3",
  gapToken: "gap-1.5",
  radiusToken: "radius-lg",
  label: "Select an option",
  icon: "chevron-down",
  iconPosition: "trailing",
  iconSize: 16,
}));

// tabs.tsx's TabsTrigger, the two states that carry the real visual
// signal (active vs. inactive) — the TabsList container itself is just a
// bg-muted/rounded-lg wrapper around instances of this, left for the
// designer to assemble the same way other compositions are.
const tabsVariants: ComponentVariant[] = [
  { props: { State: "inactive" }, fill: none, textColor: v("muted-foreground"), height: 28, paddingX: 6, paddingY: 2, radiusToken: "radius-md", label: "Tab" },
  { props: { State: "active" }, fill: v("background"), textColor: v("foreground"), height: 28, paddingX: 6, paddingY: 2, radiusToken: "radius-md", label: "Tab" },
];

export const componentSpecs: ComponentSpec[] = [
  { slug: "button", name: "Button", shape: "text-frame", layout: "horizontal", textStyleName: "Body (default)", variants: buttonVariants },
  { slug: "badge", name: "Badge", shape: "text-frame", layout: "horizontal", textStyleName: "Small / caption", defaultLabel: "Badge", variants: badgeVariants },
  {
    slug: "card",
    name: "Card",
    shape: "surface",
    layout: "none",
    variants: [{ props: {}, fill: v("card"), width: 240, height: 120, radiusToken: "radius-xl" }],
  },
  { slug: "avatar", name: "Avatar", shape: "ellipse", layout: "none", textStyleName: "Small / caption", variants: avatarVariants },
  { slug: "input", name: "Input", shape: "text-frame", layout: "horizontal", textStyleName: "Body (default)", variants: inputVariants },
  { slug: "textarea", name: "Textarea", shape: "text-frame", layout: "vertical", textStyleName: "Body (default)", variants: textareaVariants },
  { slug: "checkbox", name: "Checkbox", shape: "surface", layout: "none", variants: checkboxVariants },
  { slug: "switch", name: "Switch", shape: "thumb-track", layout: "horizontal", variants: switchVariants },
  { slug: "label", name: "Label", shape: "text-frame", layout: "horizontal", textStyleName: "Body (default)", variants: labelVariants },
  { slug: "separator", name: "Separator", shape: "line", layout: "none", variants: separatorVariants },
  { slug: "kbd", name: "Kbd", shape: "text-frame", layout: "horizontal", textStyleName: "Small / caption", variants: kbdVariants },
  { slug: "alert", name: "Alert", shape: "text-frame", layout: "vertical", textStyleName: "Body (default)", variants: alertVariants },
  { slug: "progress", name: "Progress", shape: "progress", layout: "none", variants: progressVariants },
  { slug: "select", name: "Select", shape: "text-frame", layout: "horizontal", textStyleName: "Body (default)", variants: selectVariants },
  { slug: "tabs", name: "Tabs", shape: "text-frame", layout: "horizontal", textStyleName: "Body (default)", variants: tabsVariants },
];
