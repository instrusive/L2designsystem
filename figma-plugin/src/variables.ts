// Builds/updates a single "L2 Design System" Variable Collection: colors
// (Light + Dark modes, mirroring globals.css's :root/.dark), radius, and
// spacing. Safe to re-run — existing variables are updated in place rather
// than duplicated.

import { colorTokens, radiusScale, spacingScale } from "../../src/lib/design-tokens";
import { mixOklch, oklchStringToFigmaRgb, oklchToSrgb, parseOklch, type Rgb } from "./color";

const COLLECTION_NAME = "L2 Design System";
const LIGHT_MODE = "Light";
const DARK_MODE = "Dark";

interface ExpandedColorToken {
  name: string;
  light: string;
  dark: string;
  usage: string;
}

function expandColorTokens(): ExpandedColorToken[] {
  const expanded: ExpandedColorToken[] = [];
  for (const token of colorTokens) {
    if (token.name === "surface-hover") continue; // computed separately below
    for (const name of token.name.split("/").map((n) => n.trim())) {
      expanded.push({ name, light: token.light, dark: token.dark, usage: token.usage });
    }
  }
  return expanded;
}

async function getOrCreateCollection(): Promise<VariableCollection> {
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const existing = collections.find((c) => c.name === COLLECTION_NAME);
  if (existing) return existing;

  const collection = figma.variables.createVariableCollection(COLLECTION_NAME);
  collection.renameMode(collection.modes[0].modeId, LIGHT_MODE);
  collection.addMode(DARK_MODE);
  return collection;
}

async function getExistingVariables(collection: VariableCollection): Promise<Map<string, Variable>> {
  const map = new Map<string, Variable>();
  for (const id of collection.variableIds) {
    const variable = await figma.variables.getVariableByIdAsync(id);
    if (variable) map.set(variable.name, variable);
  }
  return map;
}

async function getOrCreateVariable(
  name: string,
  collection: VariableCollection,
  existing: Map<string, Variable>,
  type: VariableResolvedDataType
): Promise<Variable> {
  const found = existing.get(name);
  if (found) return found;
  const created = figma.variables.createVariable(name, collection, type);
  existing.set(name, created);
  return created;
}

function toFigmaColor(rgb: Rgb): RGBA {
  return { r: rgb.r, g: rgb.g, b: rgb.b, a: 1 };
}

// Figma variable names can't contain periods (e.g. the "gap-1.5" spacing
// token) — sanitize for the Figma-facing name while callers keep using the
// original token string (e.g. component-specs.ts references "gap-1.5") as
// the lookup key into the returned maps below.
function sanitizeVariableName(name: string): string {
  return name.replace(/\./g, "_");
}

export interface SyncedVariables {
  collection: VariableCollection;
  modeIds: { light: string; dark: string };
  colors: Map<string, Variable>;
  radius: Map<string, Variable>;
  spacing: Map<string, Variable>;
}

export async function syncVariables(log: (msg: string) => void): Promise<SyncedVariables> {
  const collection = await getOrCreateCollection();
  const lightMode = collection.modes.find((m) => m.name === LIGHT_MODE)!;
  const darkMode = collection.modes.find((m) => m.name === DARK_MODE)!;
  const existing = await getExistingVariables(collection);

  const colors = new Map<string, Variable>();
  const tokens = expandColorTokens();

  // Resolve secondary + foreground first (surface-hover mixes toward them).
  const secondaryLight = parseOklch(colorTokens.find((t) => t.name.includes("secondary"))!.light)!;
  const secondaryDark = parseOklch(colorTokens.find((t) => t.name.includes("secondary"))!.dark)!;
  const foregroundLight = parseOklch(colorTokens.find((t) => t.name === "foreground")!.light)!;
  const foregroundDark = parseOklch(colorTokens.find((t) => t.name === "foreground")!.dark)!;

  for (const token of tokens) {
    const variable = await getOrCreateVariable(sanitizeVariableName(token.name), collection, existing, "COLOR");
    variable.description = token.usage;
    const light = oklchStringToFigmaRgb(token.light);
    const dark = oklchStringToFigmaRgb(token.dark);
    if (light) variable.setValueForMode(lightMode.modeId, toFigmaColor(light));
    if (dark) variable.setValueForMode(darkMode.modeId, toFigmaColor(dark));
    colors.set(token.name, variable);
  }

  // surface-hover: color-mix(in oklch, secondary, foreground 12%)
  const surfaceHover = await getOrCreateVariable("surface-hover", collection, existing, "COLOR");
  surfaceHover.description = "Sunken hover fill — secondary mixed 12% toward foreground.";
  surfaceHover.setValueForMode(
    lightMode.modeId,
    toFigmaColor(oklchToSrgb(mixOklch(secondaryLight, foregroundLight, 0.12)))
  );
  surfaceHover.setValueForMode(
    darkMode.modeId,
    toFigmaColor(oklchToSrgb(mixOklch(secondaryDark, foregroundDark, 0.12)))
  );
  colors.set("surface-hover", surfaceHover);

  // Radius: parse "calc(base * N)" multipliers against the base px value.
  const baseMatch = /\(([\d.]+)px\)/.exec(radiusScale.base);
  const basePx = baseMatch ? parseFloat(baseMatch[1]) : 4;
  const radius = new Map<string, Variable>();
  for (const step of radiusScale.scale) {
    const multiplierMatch = /\*\s*([\d.]+)/.exec(step.value);
    const px = multiplierMatch ? basePx * parseFloat(multiplierMatch[1]) : basePx;
    const variable = await getOrCreateVariable(sanitizeVariableName(step.name), collection, existing, "FLOAT");
    variable.setValueForMode(lightMode.modeId, px);
    variable.setValueForMode(darkMode.modeId, px);
    radius.set(step.name, variable);
  }

  // Spacing: gap-N tokens, "Npx" strings.
  const spacing = new Map<string, Variable>();
  for (const step of spacingScale) {
    const px = parseFloat(step.px);
    const variable = await getOrCreateVariable(sanitizeVariableName(step.token), collection, existing, "FLOAT");
    variable.description = step.usage;
    variable.setValueForMode(lightMode.modeId, px);
    variable.setValueForMode(darkMode.modeId, px);
    spacing.set(step.token, variable);
  }

  log(`Synced ${colors.size} colors, ${radius.size} radius steps, ${spacing.size} spacing steps.`);

  return {
    collection,
    modeIds: { light: lightMode.modeId, dark: darkMode.modeId },
    colors,
    radius,
    spacing,
  };
}
