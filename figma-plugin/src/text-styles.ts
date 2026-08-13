// Builds/updates Figma Text Styles from `typography.scale`. Re-runnable:
// looks up existing styles by name and updates them in place.

import { typography } from "../../src/lib/design-tokens";

const SANS_FAMILY = "JetBrains Mono";
const SERIF_FAMILY = "Instrument Serif";

// Tailwind v4's default type scale — the classes in typography.scale
// reference these by name, so the mapping lives here once.
const SIZE_PX: Record<string, { size: number; lineHeight: number }> = {
  "text-3xl": { size: 30, lineHeight: 36 },
  "text-xl": { size: 20, lineHeight: 28 },
  "text-base": { size: 16, lineHeight: 24 },
  "text-sm": { size: 14, lineHeight: 20 },
  "text-body-sm": { size: 13, lineHeight: 18 },
  "text-xs": { size: 12, lineHeight: 16 },
};

interface ResolvedStyle {
  family: string;
  // Candidate style names in priority order — Figma/font foundries don't
  // agree on exact naming (SemiBold vs Semi Bold vs 600), so try a few
  // before falling back to Regular rather than silently dropping the style.
  styleCandidates: string[];
  size: number;
  lineHeight: number;
}

function resolveStyle(classes: string): ResolvedStyle {
  const tokens = classes.split(/\s+/);
  const isSerif = tokens.includes("font-serif");
  const isItalic = tokens.includes("italic");
  const isSemibold = tokens.includes("font-semibold");
  const sizeToken = tokens.find((t) => t in SIZE_PX) ?? "text-sm";
  const { size, lineHeight } = SIZE_PX[sizeToken];

  const family = isSerif ? SERIF_FAMILY : SANS_FAMILY;
  // Instrument Serif only ships Regular/Italic; JetBrains Mono ships weights.
  const styleCandidates = isSerif
    ? [isItalic ? "Italic" : "Regular", "Regular"]
    : isSemibold
      ? ["SemiBold", "Semi Bold", "600", "Bold", "Medium", "Regular"]
      : ["Regular"];

  return { family, styleCandidates, size, lineHeight };
}

async function getOrCreateTextStyle(name: string, existing: Map<string, TextStyle>): Promise<TextStyle> {
  const found = existing.get(name);
  if (found) return found;
  const created = figma.createTextStyle();
  created.name = name;
  existing.set(name, created);
  return created;
}

export async function syncTextStyles(log: (msg: string) => void): Promise<Map<string, TextStyle>> {
  const existingStyles = await figma.getLocalTextStylesAsync();
  const existing = new Map(existingStyles.map((s) => [s.name, s] as const));

  const built = new Map<string, TextStyle>();
  for (const entry of typography.scale) {
    const resolved = resolveStyle(entry.classes);

    let loaded: FontName | undefined;
    for (const styleName of resolved.styleCandidates) {
      const candidate = { family: resolved.family, style: styleName };
      try {
        await figma.loadFontAsync(candidate);
        loaded = candidate;
        break;
      } catch {
        // try the next candidate
      }
    }
    if (!loaded) {
      log(`Font not available: ${resolved.family} (tried ${resolved.styleCandidates.join(", ")}) — skipped "${entry.label}".`);
      continue;
    }
    if (loaded.style !== resolved.styleCandidates[0]) {
      log(`"${entry.label}": using "${loaded.style}" — "${resolved.styleCandidates[0]}" wasn't available.`);
    }

    const style = await getOrCreateTextStyle(entry.label, existing);
    style.fontName = loaded;
    style.fontSize = resolved.size;
    style.lineHeight = { value: resolved.lineHeight, unit: "PIXELS" };
    built.set(entry.label, style);
  }

  log(`Synced ${built.size} text styles.`);
  return built;
}
