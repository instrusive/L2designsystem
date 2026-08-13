// Builds Figma component sets from component-specs.ts. Idempotent per
// component: if a component set already exists (tagged via plugin data),
// it's left alone — designers may have hand-tweaked it. Only new components
// get created.

import { componentSpecs, type ComponentSpec, type ComponentVariant, type FillRef } from "./component-specs";
import type { SyncedVariables } from "./variables";

const MARKER_KEY = "l2-slug";
const DEFAULT_FONT: FontName = { family: "JetBrains Mono", style: "Regular" };

function applyFill(node: MinimalFillsMixin, ref: FillRef | undefined, vars: SyncedVariables, opacity = 1): void {
  if (!ref || ref.kind === "none") {
    node.fills = [];
    return;
  }
  if (ref.kind === "literal") {
    node.fills = [{ type: "SOLID", color: { r: ref.r, g: ref.g, b: ref.b }, opacity }];
    return;
  }
  const variable = vars.colors.get(ref.name);
  if (!variable) {
    node.fills = [];
    return;
  }
  const paint = figma.variables.setBoundVariableForPaint(
    { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
    "color",
    variable
  );
  // Setting opacity in the same object literal as the variable binding,
  // before it's ever assigned to node.fills, doesn't reliably stick —
  // Figma seems to reset it once it processes the binding. Assign the
  // binding first, then mutate a fresh read-back of node.fills as a
  // separate step (the documented pattern for any fills/strokes mutation,
  // since the array itself is read-only).
  node.fills = [paint];
  if (opacity !== 1) {
    const current = clonePaints(node.fills);
    current[0] = { ...current[0], opacity };
    node.fills = current;
  }
}

function clonePaints(fills: readonly Paint[]): Paint[] {
  return JSON.parse(JSON.stringify(fills));
}

function applyStroke(node: MinimalStrokesMixin, ref: FillRef | undefined, weight: number | undefined, vars: SyncedVariables): void {
  if (!ref || ref.kind === "none") return;
  node.strokeWeight = weight ?? 1;
  recolorStroke(node, ref, vars);
}

// Same color-binding logic as applyStroke, without touching strokeWeight —
// used to recolor an icon instance's own paths to match a button/badge's
// text color, while leaving the icon's own Lucide stroke-width (2) intact.
function recolorStroke(node: MinimalStrokesMixin, ref: FillRef | undefined, vars: SyncedVariables): void {
  if (!ref || ref.kind === "none") return;
  if (ref.kind === "literal") {
    node.strokes = [{ type: "SOLID", color: { r: ref.r, g: ref.g, b: ref.b } }];
    return;
  }
  const variable = vars.colors.get(ref.name);
  if (!variable) return;
  const paint = figma.variables.setBoundVariableForPaint({ type: "SOLID", color: { r: 0, g: 0, b: 0 } }, "color", variable);
  node.strokes = [paint];
}

function hasStrokes(node: SceneNode): node is SceneNode & MinimalStrokesMixin {
  return "strokes" in node;
}

// figma.createComponent() defaults clipsContent to true. Combined with a
// stroke that isn't drawn fully inside the node's bounds, that clips off
// the outer edge of the border — every component here needs it off.
function createComponentNode(): ComponentNode {
  const node = figma.createComponent();
  node.clipsContent = false;
  return node;
}

function addIcon(parent: FrameNode | ComponentNode, variant: ComponentVariant, icons: Map<string, ComponentNode>, vars: SyncedVariables): void {
  if (!variant.icon) return;
  const master = icons.get(variant.icon);
  if (!master) return;
  const instance = master.createInstance();
  const size = variant.iconSize ?? 16;
  instance.resize(size, size);
  for (const child of instance.children) {
    if (hasStrokes(child) && child.strokes.length > 0) recolorStroke(child, variant.textColor, vars);
  }
  parent.appendChild(instance);
}

function applyRadius(
  node: CornerMixin & { setBoundVariable(field: VariableBindableNodeField, variable: Variable | null): void },
  variant: ComponentVariant,
  vars: SyncedVariables
): void {
  if (variant.radiusPx !== undefined) {
    node.cornerRadius = variant.radiusPx;
    return;
  }
  if (variant.radiusToken) {
    const variable = vars.radius.get(variant.radiusToken);
    if (variable) {
      node.cornerRadius = 4;
      node.setBoundVariable("cornerRadius", variable);
    }
  }
}

function resolveSpacing(token: string | undefined, literal: number | undefined, vars: SyncedVariables): number {
  if (token) {
    const variable = vars.spacing.get(token);
    if (variable) return variable.valuesByMode[vars.modeIds.light] as number;
  }
  return literal ?? 0;
}

async function addText(
  parent: FrameNode | ComponentNode,
  text: string,
  textStyleName: string | undefined,
  textColor: FillRef | undefined,
  textStyles: Map<string, TextStyle>,
  vars: SyncedVariables
): Promise<void> {
  const style = textStyleName ? textStyles.get(textStyleName) : undefined;
  const fontName = (style?.fontName as FontName | undefined) ?? DEFAULT_FONT;
  await figma.loadFontAsync(fontName);

  const textNode = figma.createText();
  textNode.fontName = fontName;
  textNode.characters = text;
  if (style) await textNode.setTextStyleIdAsync(style.id);
  applyFill(textNode, textColor, vars);
  parent.appendChild(textNode);
}

// Alert's title + description: two lines stacked vertically, title in the
// variant's own text color, description always muted-foreground (matches
// AlertDescription's fixed text-muted-foreground class — it doesn't vary
// per variant in the real component either).
async function addTextStack(
  parent: FrameNode | ComponentNode,
  title: string,
  description: string,
  textStyleName: string | undefined,
  titleColor: FillRef | undefined,
  textStyles: Map<string, TextStyle>,
  vars: SyncedVariables
): Promise<void> {
  const stack = figma.createFrame();
  stack.name = "text";
  stack.layoutMode = "VERTICAL";
  stack.primaryAxisSizingMode = "AUTO";
  stack.counterAxisSizingMode = "AUTO";
  stack.itemSpacing = 2;
  stack.fills = [];
  stack.clipsContent = false;
  await addText(stack, title, textStyleName, titleColor, textStyles, vars);
  await addText(stack, description, textStyleName, { kind: "variable", name: "muted-foreground" }, textStyles, vars);
  parent.appendChild(stack);
}

async function buildTextFrameVariant(
  spec: ComponentSpec,
  variant: ComponentVariant,
  vars: SyncedVariables,
  textStyles: Map<string, TextStyle>,
  icons: Map<string, ComponentNode>
): Promise<ComponentNode> {
  const node = createComponentNode();
  node.layoutMode = spec.layout === "vertical" ? "VERTICAL" : "HORIZONTAL";
  node.primaryAxisAlignItems = "CENTER";
  // A two-line title+description stack reads top-aligned, not vertically
  // centered against whatever else shares the row (e.g. an icon).
  node.counterAxisAlignItems = variant.description ? "MIN" : "CENTER";
  node.primaryAxisSizingMode = "AUTO";
  node.counterAxisSizingMode = "AUTO";

  const gap = resolveSpacing(variant.gapToken, variant.gap, vars);
  node.itemSpacing = gap;
  const padX = resolveSpacing(variant.paddingXToken, variant.paddingX, vars);
  const padY = resolveSpacing(variant.paddingYToken, variant.paddingY, vars);
  node.paddingLeft = node.paddingRight = padX;
  node.paddingTop = node.paddingBottom = padY;

  applyFill(node, variant.fill, vars, variant.fillOpacity ?? 1);
  applyStroke(node, variant.stroke, variant.strokeWeight, vars);
  applyRadius(node, variant, vars);

  const iconLeading = variant.icon && variant.iconPosition !== "trailing";
  if (iconLeading) addIcon(node, variant, icons, vars);

  const label = variant.label ?? spec.defaultLabel ?? spec.name;
  if (variant.description) {
    await addTextStack(node, label, variant.description, spec.textStyleName, variant.textColor, textStyles, vars);
  } else {
    await addText(node, label, spec.textStyleName, variant.textColor, textStyles, vars);
  }

  if (variant.icon && variant.iconPosition === "trailing") addIcon(node, variant, icons, vars);

  if (variant.gapToken) {
    const gapVar = vars.spacing.get(variant.gapToken);
    if (gapVar) node.setBoundVariable("itemSpacing", gapVar);
  }
  if (variant.paddingXToken) {
    const padVar = vars.spacing.get(variant.paddingXToken);
    if (padVar) {
      node.setBoundVariable("paddingLeft", padVar);
      node.setBoundVariable("paddingRight", padVar);
    }
  }
  if (variant.paddingYToken) {
    const padVar = vars.spacing.get(variant.paddingYToken);
    if (padVar) {
      node.setBoundVariable("paddingTop", padVar);
      node.setBoundVariable("paddingBottom", padVar);
    }
  }

  if (variant.width) {
    node.layoutSizingHorizontal = "FIXED";
  }
  if (variant.height) {
    node.layoutSizingVertical = "FIXED";
  }
  if (variant.width || variant.height) {
    node.resize(variant.width ?? node.width, variant.height ?? node.height);
  }

  return node;
}

function buildSurfaceVariant(variant: ComponentVariant, vars: SyncedVariables): ComponentNode {
  const node = createComponentNode();
  applyFill(node, variant.fill, vars, variant.fillOpacity ?? 1);
  applyStroke(node, variant.stroke, variant.strokeWeight, vars);
  applyRadius(node, variant, vars);
  node.resize(variant.width ?? 24, variant.height ?? 24);
  return node;
}

function buildEllipseVariant(variant: ComponentVariant, vars: SyncedVariables): ComponentNode {
  const ellipse = figma.createEllipse();
  applyFill(ellipse, variant.fill, vars);
  ellipse.resize(variant.width ?? 32, variant.height ?? 32);

  const node = createComponentNode();
  node.resize(variant.width ?? 32, variant.height ?? 32);
  node.appendChild(ellipse);
  ellipse.x = 0;
  ellipse.y = 0;
  return node;
}

function buildLineVariant(variant: ComponentVariant, vars: SyncedVariables): ComponentNode {
  const rect = figma.createRectangle();
  applyFill(rect, variant.fill, vars);
  rect.resize(variant.width ?? 1, variant.height ?? 1);

  const node = createComponentNode();
  node.resize(variant.width ?? 1, variant.height ?? 1);
  node.appendChild(rect);
  rect.x = 0;
  rect.y = 0;
  return node;
}

function buildThumbTrackVariant(variant: ComponentVariant, vars: SyncedVariables): ComponentNode {
  const node = createComponentNode();
  node.layoutMode = "HORIZONTAL";
  node.primaryAxisSizingMode = "AUTO";
  node.counterAxisSizingMode = "AUTO";
  node.primaryAxisAlignItems = variant.thumbAlign === "MAX" ? "MAX" : "MIN";
  node.counterAxisAlignItems = "CENTER";
  node.paddingLeft = node.paddingRight = node.paddingTop = node.paddingBottom = 2;
  applyFill(node, variant.fill, vars);
  applyRadius(node, variant, vars);

  const thumb = figma.createEllipse();
  thumb.resize(14, 14);
  thumb.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  node.appendChild(thumb);

  node.layoutSizingHorizontal = "FIXED";
  node.layoutSizingVertical = "FIXED";
  node.resize(variant.width ?? 32, variant.height ?? 18);
  return node;
}

function buildProgressVariant(variant: ComponentVariant, vars: SyncedVariables): ComponentNode {
  const width = variant.width ?? 200;
  const height = variant.height ?? 4;
  const node = createComponentNode();
  applyFill(node, variant.fill, vars);
  applyRadius(node, variant, vars);
  node.resize(width, height);

  const indicator = figma.createRectangle();
  indicator.name = "indicator";
  const pct = Math.min(100, Math.max(0, variant.fillPercent ?? 50)) / 100;
  applyFill(indicator, variant.indicatorFill ?? { kind: "variable", name: "primary" }, vars);
  indicator.cornerRadius = 999;
  indicator.resize(Math.max(1, width * pct), height);
  indicator.x = 0;
  indicator.y = 0;
  node.appendChild(indicator);

  return node;
}

async function buildVariant(
  spec: ComponentSpec,
  variant: ComponentVariant,
  vars: SyncedVariables,
  textStyles: Map<string, TextStyle>,
  icons: Map<string, ComponentNode>
): Promise<ComponentNode> {
  let node: ComponentNode;
  switch (spec.shape) {
    case "text-frame":
      node = await buildTextFrameVariant(spec, variant, vars, textStyles, icons);
      break;
    case "surface":
      node = buildSurfaceVariant(variant, vars);
      break;
    case "ellipse":
      node = buildEllipseVariant(variant, vars);
      break;
    case "line":
      node = buildLineVariant(variant, vars);
      break;
    case "thumb-track":
      node = buildThumbTrackVariant(variant, vars);
      break;
    case "progress":
      node = buildProgressVariant(variant, vars);
      break;
  }
  const propEntries = Object.entries(variant.props);
  node.name = propEntries.length > 0 ? propEntries.map(([k, val]) => `${k}=${val}`).join(", ") : spec.name;
  return node;
}

const COLUMN_GAP = 100;
const OUTLINE_PADDING = 24;
// Violet/purple, literal — purely an organizational marker for grouping each
// component type's variant set, not a design token this system defines.
const OUTLINE_COLOR = { r: 0.545, g: 0.361, b: 0.965 };

function drawOutline(name: string, x: number, y: number, width: number, height: number): void {
  const outline = figma.createRectangle();
  outline.name = `${name} — group`;
  outline.x = x;
  outline.y = y;
  outline.resize(width, height);
  outline.fills = [];
  outline.strokes = [{ type: "SOLID", color: OUTLINE_COLOR }];
  outline.strokeWeight = 1.5;
  outline.dashPattern = [6, 4];
  outline.cornerRadius = 8;
}

export async function syncComponents(
  vars: SyncedVariables,
  textStyles: Map<string, TextStyle>,
  icons: Map<string, ComponentNode>,
  topY: number,
  log: (msg: string) => void
): Promise<void> {
  let cursorX = 0;
  let created = 0;
  let skipped = 0;

  for (const spec of componentSpecs) {
    const existing = figma.currentPage.findOne(
      (n) => n.type === "COMPONENT_SET" && n.getPluginData(MARKER_KEY) === spec.slug
    );
    if (existing) {
      skipped++;
      cursorX = Math.max(cursorX, existing.x + existing.width + OUTLINE_PADDING + COLUMN_GAP);
      continue;
    }

    // combineAsVariants does NOT auto-arrange its input into a grid — it
    // preserves whatever positions the nodes already have. So lay them out
    // in a real, non-overlapping flow grid ourselves first, using each
    // node's actual measured width/height (variants aren't uniformly
    // sized — Button's sm/default/lg differ, Badge's variants differ, etc.).
    const GRID_COLUMNS = 6;
    const GRID_GAP = 24;
    const nodes: ComponentNode[] = [];
    let rowX = 0;
    let rowY = 0;
    let rowMaxHeight = 0;
    let col = 0;
    for (let i = 0; i < spec.variants.length; i++) {
      const node = await buildVariant(spec, spec.variants[i], vars, textStyles, icons);
      if (col === GRID_COLUMNS) {
        col = 0;
        rowX = 0;
        rowY += rowMaxHeight + GRID_GAP;
        rowMaxHeight = 0;
      }
      node.x = rowX;
      node.y = rowY;
      rowX += node.width + GRID_GAP;
      rowMaxHeight = Math.max(rowMaxHeight, node.height);
      col++;
      figma.currentPage.appendChild(node);
      nodes.push(node);
    }

    const set = nodes.length > 1 ? figma.combineAsVariants(nodes, figma.currentPage) : nodes[0];
    // combineAsVariants() wraps the variants in a new ComponentSetNode with
    // its own clipsContent, defaulting true independently of the children —
    // setting it on each variant (createComponentNode()) isn't enough.
    set.clipsContent = false;
    set.name = spec.name;
    set.x = cursorX + OUTLINE_PADDING;
    set.y = topY + OUTLINE_PADDING;
    set.setPluginData(MARKER_KEY, spec.slug);

    drawOutline(spec.name, cursorX, topY, set.width + OUTLINE_PADDING * 2, set.height + OUTLINE_PADDING * 2);

    created++;
    cursorX += set.width + OUTLINE_PADDING * 2 + COLUMN_GAP;
  }

  log(`Components: created ${created}, skipped ${skipped} already-existing.`);
}
