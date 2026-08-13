// Builds a single "Icon" component set from the curated Lucide icon list
// (icons.json -> generate-icons.mjs -> generated-icons.ts). Each icon's raw
// SVG is parsed into real Figma vector nodes via figma.createNodeFromSvg,
// then its stroke is rebound to the "foreground" color Variable — Lucide's
// static SVGs ship `stroke="currentColor"`, which isn't a resolvable color
// on its own, so this replaces it with the same token Figma text/icons
// elsewhere in this library already bind to.
//
// Idempotent like the rest of this plugin: if the "Icon" component set
// already exists (tagged via plugin data), re-running leaves it alone.

import { iconSvgs } from "./generated-icons";
import type { SyncedVariables } from "./variables";

const MARKER_KEY = "l2-icon-sheet";
const MARKER_VALUE = "icons";
const ICON_SIZE = 24;
const ROW_GAP = 48;

function hasStrokes(node: SceneNode): node is SceneNode & MinimalStrokesMixin {
  return "strokes" in node;
}

async function buildIconComponent(name: string, svg: string, vars: SyncedVariables): Promise<ComponentNode> {
  // currentColor isn't resolvable by Figma's SVG parser on its own —
  // substitute a literal so parsing succeeds, then rebind properly below.
  const parsed = figma.createNodeFromSvg(svg.replace(/stroke="currentColor"/g, 'stroke="#000000"'));

  const component = figma.createComponent();
  component.clipsContent = false;
  component.name = `Name=${name}`;
  component.resize(parsed.width || ICON_SIZE, parsed.height || ICON_SIZE);

  const foreground = vars.colors.get("foreground");
  for (const child of [...parsed.children]) {
    component.appendChild(child);
    if (foreground && hasStrokes(child) && child.strokes.length > 0) {
      const paint = figma.variables.setBoundVariableForPaint(
        { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
        "color",
        foreground
      );
      child.strokes = [paint];
    }
  }
  parsed.remove();
  return component;
}

export interface SyncedIcons {
  nextY: number;
  components: Map<string, ComponentNode>;
}

function iconNameFromVariantName(name: string): string {
  return name.replace(/^Name=/, "");
}

export async function syncIcons(vars: SyncedVariables, startY: number, log: (msg: string) => void): Promise<SyncedIcons> {
  const existing = figma.currentPage.findOne(
    (n) => n.type === "COMPONENT_SET" && n.getPluginData(MARKER_KEY) === MARKER_VALUE
  );
  if (existing && existing.type === "COMPONENT_SET") {
    const components = new Map<string, ComponentNode>();
    for (const child of existing.children) {
      if (child.type === "COMPONENT") components.set(iconNameFromVariantName(child.name), child);
    }
    log(`Icons: "${existing.name}" already exists, skipped (${components.size} available for reuse).`);
    return { nextY: startY + existing.height + ROW_GAP, components };
  }

  const names = Object.keys(iconSvgs);
  const nodes: ComponentNode[] = [];
  const components = new Map<string, ComponentNode>();
  for (let i = 0; i < names.length; i++) {
    const node = await buildIconComponent(names[i], iconSvgs[names[i]], vars);
    node.x = i * 48;
    node.y = startY;
    figma.currentPage.appendChild(node);
    nodes.push(node);
    components.set(names[i], node);
  }

  const set = figma.combineAsVariants(nodes, figma.currentPage);
  set.clipsContent = false;
  set.name = "Icon";
  set.x = 0;
  set.y = startY;
  set.setPluginData(MARKER_KEY, MARKER_VALUE);

  log(`Icons: created ${nodes.length} (${names.join(", ")}).`);
  return { nextY: startY + set.height + ROW_GAP, components };
}
