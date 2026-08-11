export interface ComponentEntry {
  slug: string;
  name: string;
  category: string;
  description: string;
  source: string;
}

export const componentRegistry: ComponentEntry[] = [
  // Primitives
  {
    slug: "button",
    name: "Button",
    category: "Primitives",
    description: "Six variants (default, outline, secondary, ghost, destructive, link), five sizes, polymorphic via render. Supports leading/trailing icons and icon-only sizing.",
    source: "src/components/ui/button.tsx",
  },
  {
    slug: "badge",
    name: "Badge",
    category: "Primitives",
    description: "Solid, outline, and light variants per status color, plus a full-pill radius option.",
    source: "src/components/reui/badge.tsx",
  },
  {
    slug: "card",
    name: "Card",
    category: "Primitives",
    description: "Flat surface (no border/shadow) matching the portfolio's borderless card style.",
    source: "src/components/ui/card.tsx",
  },
  {
    slug: "avatar",
    name: "Avatar",
    category: "Primitives",
    description: "Image with fallback, plus AvatarGroup for stacked/overflow avatars.",
    source: "src/components/ui/avatar.tsx",
  },
  {
    slug: "input",
    name: "Input",
    category: "Forms",
    description: "Base text input, themed via border-input and focus-ring tokens.",
    source: "src/components/ui/input.tsx",
  },
  {
    slug: "textarea",
    name: "Textarea",
    category: "Forms",
    description: "Multi-line text input matching Input's styling.",
    source: "src/components/ui/textarea.tsx",
  },
  {
    slug: "select",
    name: "Select",
    category: "Forms",
    description: "Base UI Select wrapper — trigger, popup, items, groups.",
    source: "src/components/ui/select.tsx",
  },
  {
    slug: "combobox",
    name: "Combobox",
    category: "Forms",
    description: "Searchable select; used internally by Phone Input for country selection.",
    source: "src/components/ui/combobox.tsx",
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    category: "Forms",
    description: "Base UI Checkbox with indeterminate support.",
    source: "src/components/ui/checkbox.tsx",
  },
  {
    slug: "switch",
    name: "Switch",
    category: "Forms",
    description: "Toggle switch, same primary accent as Button/Checkbox.",
    source: "src/components/ui/switch.tsx",
  },
  {
    slug: "field",
    name: "Field",
    category: "Forms",
    description: "Field wrapper with label/description/error slots for building forms.",
    source: "src/components/ui/field.tsx",
  },
  {
    slug: "number-field",
    name: "Number Field",
    category: "Forms",
    description: "Numeric input with increment/decrement and scrub-to-adjust.",
    source: "src/components/reui/number-field.tsx",
  },
  {
    slug: "phone-input",
    name: "Phone Input",
    category: "Forms",
    description: "Country-aware phone number input built on react-phone-number-input.",
    source: "src/components/reui/phone-input.tsx",
  },
  {
    slug: "input-group",
    name: "Input Group",
    category: "Forms",
    description: "Compose an input with leading/trailing addons (icons, buttons, text).",
    source: "src/components/ui/input-group.tsx",
  },
  {
    slug: "button-group",
    name: "Button Group",
    category: "Forms",
    description: "Segmented button clusters, used by Filters' active-filter chips.",
    source: "src/components/ui/button-group.tsx",
  },

  // Feedback
  {
    slug: "alert",
    name: "Alert",
    category: "Feedback",
    description: "Inline callout with default/success/warning/destructive/info/invert variants.",
    source: "src/components/reui/alert.tsx",
  },
  {
    slug: "toast",
    name: "Toast",
    category: "Feedback",
    description: "Sonner-based toast notifications, themed to match the rest of the system.",
    source: "src/components/ui/sonner.tsx",
  },
  {
    slug: "progress",
    name: "Progress",
    category: "Feedback",
    description: "Determinate progress bar.",
    source: "src/components/ui/progress.tsx",
  },
  {
    slug: "skeleton",
    name: "Skeleton",
    category: "Feedback",
    description: "Loading placeholder, also used to guard dnd-kit components before client mount.",
    source: "src/components/ui/skeleton.tsx",
  },
  {
    slug: "empty",
    name: "Empty state",
    category: "Feedback",
    description: "Title/description/actions layout for empty-list or zero-result states.",
    source: "src/components/ui/empty.tsx",
  },
  {
    slug: "rating",
    name: "Rating",
    category: "Feedback",
    description: "Star rating, read-only or editable.",
    source: "src/components/reui/rating.tsx",
  },

  // Overlays
  {
    slug: "dialog",
    name: "Dialog",
    category: "Overlays",
    description: "Modal dialog with header/footer/close-button composition.",
    source: "src/components/ui/dialog.tsx",
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    category: "Overlays",
    description: "Menu with items, checkbox items, groups, and submenus — items must be wrapped in a group for labels.",
    source: "src/components/ui/dropdown-menu.tsx",
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    category: "Overlays",
    description: "Hover/focus tooltip; requires a single TooltipProvider mounted in the root layout.",
    source: "src/components/ui/tooltip.tsx",
  },

  // Navigation
  {
    slug: "tabs",
    name: "Tabs",
    category: "Navigation",
    description: "Tabbed content switcher.",
    source: "src/components/ui/tabs.tsx",
  },
  {
    slug: "accordion",
    name: "Accordion",
    category: "Navigation",
    description: "Collapsible content sections.",
    source: "src/components/ui/accordion.tsx",
  },
  {
    slug: "stepper",
    name: "Stepper",
    category: "Navigation",
    description: "Numbered step navigation with nav/panel/content composition.",
    source: "src/components/reui/stepper.tsx",
  },

  // Data
  {
    slug: "data-table",
    name: "Data Table",
    category: "Data",
    description: "TanStack Table v8 wrapper — sorting, pagination, global search, column filters, row selection, column visibility, and optional virtualization for large datasets.",
    source: "src/components/data-table/base/data-table.tsx",
  },
  {
    slug: "filters",
    name: "Filters",
    category: "Data",
    description: "Add/edit/remove structured filters (select, multiselect, text); pairs with Data Table.",
    source: "src/components/reui/filters.tsx",
  },
  {
    slug: "table",
    name: "Table (raw)",
    category: "Data",
    description: "Unstyled table primitives Data Table is built from.",
    source: "src/components/ui/table.tsx",
  },
  {
    slug: "tree",
    name: "Tree",
    category: "Data",
    description: "Expandable hierarchical tree, built on @headless-tree/react.",
    source: "src/components/reui/tree.tsx",
  },
  {
    slug: "kanban",
    name: "Kanban",
    category: "Data",
    description: "Drag-and-drop kanban board, built on dnd-kit. Client-only (see AI usage guide on why).",
    source: "src/components/reui/kanban.tsx",
  },
  {
    slug: "sortable",
    name: "Sortable",
    category: "Data",
    description: "Drag-to-reorder list, built on dnd-kit. Client-only for the same dnd-kit SSR reason as Kanban.",
    source: "src/components/reui/sortable.tsx",
  },

  // Layout
  {
    slug: "scroll-area",
    name: "Scroll Area",
    category: "Layout",
    description: "Styled scrollable container with custom scrollbars.",
    source: "src/components/ui/scroll-area.tsx",
  },
  {
    slug: "separator",
    name: "Separator",
    category: "Layout",
    description: "Horizontal or vertical divider line.",
    source: "src/components/ui/separator.tsx",
  },
  {
    slug: "kbd",
    name: "Kbd",
    category: "Layout",
    description: "Styled keyboard-shortcut label.",
    source: "src/components/ui/kbd.tsx",
  },
  {
    slug: "label",
    name: "Label",
    category: "Layout",
    description: "Accessible form label, pairs with Field/Input/Checkbox.",
    source: "src/components/ui/label.tsx",
  },
];

export const componentCategories = Array.from(
  new Set(componentRegistry.map((c) => c.category))
);
