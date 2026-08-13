// OKLCH -> sRGB conversion (Björn Ottosson's OKLab math) so Figma Variables
// get the same colors globals.css defines, instead of a hand-eyeballed copy.
// Pure function, no dependencies — usable both inside the Figma plugin
// sandbox and in a plain Node script if ever needed.

export interface Oklch {
  l: number;
  c: number;
  h: number;
}

export interface Rgb {
  r: number;
  g: number;
  b: number;
}

const OKLCH_RE = /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/i;

export function parseOklch(value: string): Oklch | null {
  const match = OKLCH_RE.exec(value);
  if (!match) return null;
  return { l: parseFloat(match[1]), c: parseFloat(match[2]), h: parseFloat(match[3]) };
}

function srgbGammaEncode(linear: number): number {
  const clamped = Math.min(1, Math.max(0, linear));
  return clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
}

export function oklchToSrgb({ l, c, h }: Oklch): Rgb {
  const hRad = (h * Math.PI) / 180;
  const a = c * Math.cos(hRad);
  const bLab = c * Math.sin(hRad);

  const l_ = l + 0.3963377774 * a + 0.2158037573 * bLab;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * bLab;
  const s_ = l - 0.0894841775 * a - 1.2914855480 * bLab;

  const lCubed = l_ ** 3;
  const mCubed = m_ ** 3;
  const sCubed = s_ ** 3;

  const rLin = 4.0767416621 * lCubed - 3.3077115913 * mCubed + 0.2309699292 * sCubed;
  const gLin = -1.2684380046 * lCubed + 2.6097574011 * mCubed - 0.3413193965 * sCubed;
  const bLin = -0.0041960863 * lCubed - 0.7034186147 * mCubed + 1.7076147010 * sCubed;

  return {
    r: srgbGammaEncode(rLin),
    g: srgbGammaEncode(gLin),
    b: srgbGammaEncode(bLin),
  };
}

// Mirrors CSS `color-mix(in oklch, a, b <pct>%)` — interpolates L and C
// linearly and H along the shorter arc. Used for tokens like --surface-hover
// that are defined as a mix rather than a literal oklch(...) value.
export function mixOklch(from: Oklch, to: Oklch, toWeight: number): Oklch {
  const l = from.l + (to.l - from.l) * toWeight;
  const c = from.c + (to.c - from.c) * toWeight;

  let deltaH = to.h - from.h;
  if (deltaH > 180) deltaH -= 360;
  if (deltaH < -180) deltaH += 360;
  let h = from.h + deltaH * toWeight;
  if (h < 0) h += 360;
  if (h >= 360) h -= 360;

  return { l, c, h };
}

export function oklchStringToFigmaRgb(value: string): Rgb | null {
  const parsed = parseOklch(value);
  if (!parsed) return null;
  return oklchToSrgb(parsed);
}
