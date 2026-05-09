export const STADIA_LIGHT_STYLE = 'https://tiles.stadiamaps.com/styles/stamen_toner_lite.json'
export const STADIA_DARK_STYLE = 'https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json'

export interface GradientStops {
  start: string
  mid: string
  end: string
}

export function isDarkNow(): boolean {
  return document.documentElement.classList.contains('dark')
}

// OKLCH → sRGB. MapLibre's color parser doesn't accept oklch(), and
// getComputedStyle preserves the OKLCH color space verbatim in modern
// browsers, so we convert directly.
export function oklchToRgb(L: number, C: number, h: number): string {
  const hRad = (h * Math.PI) / 180
  const a = C * Math.cos(hRad)
  const b = C * Math.sin(hRad)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  const gamma = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055)
  const ch = (c: number) => Math.round(Math.max(0, Math.min(1, gamma(c))) * 255)
  return `rgb(${ch(r)}, ${ch(g)}, ${ch(bl)})`
}

const OKLCH_RE = /^oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+)?\s*\)$/i

export function resolveColor(cssValue: string, fallback: string): string {
  if (!cssValue) return fallback
  const v = cssValue.trim()
  const m = OKLCH_RE.exec(v)
  if (m) {
    const L = parseFloat(m[1]!) > 1 ? parseFloat(m[1]!) / 100 : parseFloat(m[1]!)
    return oklchToRgb(L, parseFloat(m[2]!), parseFloat(m[3]!))
  }
  return v
}

export function readGradientStops(): GradientStops {
  const styles = getComputedStyle(document.documentElement)
  const read = (token: string, fallback: string) =>
    resolveColor(styles.getPropertyValue(token).trim(), fallback)
  return {
    start: read('--color-primary-200', '#fed7aa'),
    mid: read('--color-primary-600', '#ea580c'),
    end: read('--color-primary-950', '#431407'),
  }
}

// MapLibre `line-gradient` expression type. Returned as a plain array (not
// `as const`) so it satisfies the mutable `ExpressionSpecification` tuple
// expected by `setPaintProperty` / layer paint specs.
export function gradientExpression(
  stops: GradientStops
): ['interpolate', ['linear'], ['line-progress'], 0, string, 0.5, string, 1, string] {
  return [
    'interpolate',
    ['linear'],
    ['line-progress'],
    0,
    stops.start,
    0.5,
    stops.mid,
    1,
    stops.end,
  ]
}

export function readPrimaryColor(token = '--color-primary-500', fallback = '#ea580c'): string {
  const styles = getComputedStyle(document.documentElement)
  return resolveColor(styles.getPropertyValue(token).trim(), fallback)
}

/**
 * Holographic foil palettes — peach → gold → teal → lavender → sky → pink → peach.
 * Looping at the ends so a smooth `interpolate` across a date range produces a
 * continuous shimmer. Lightened in dark mode for legibility against dark tiles.
 */
export const HOLO_LIGHT: string[] = [
  'hsl(15 80% 64%)', // peach
  'hsl(40 85% 60%)', // gold
  'hsl(170 55% 45%)', // teal
  'hsl(280 50% 60%)', // lavender
  'hsl(210 65% 58%)', // sky
  'hsl(340 75% 62%)', // pink
  'hsl(15 80% 64%)', // peach (loop)
]

export const HOLO_DARK: string[] = [
  'hsl(15 85% 70%)',
  'hsl(40 90% 68%)',
  'hsl(170 60% 60%)',
  'hsl(280 60% 75%)',
  'hsl(210 70% 70%)',
  'hsl(340 80% 72%)',
  'hsl(15 85% 70%)',
]

/**
 * Build a MapLibre `line-color` interpolation that maps a feature's `dateMs`
 * property across the holographic palette over the [minDateMs, maxDateMs] span.
 */
export function holographicLineColor(
  minDateMs: number,
  maxDateMs: number,
  dark: boolean
): unknown[] {
  const palette = dark ? HOLO_DARK : HOLO_LIGHT
  const span = Math.max(1, maxDateMs - minDateMs)
  const stops: (number | string)[] = []
  for (let i = 0; i < palette.length; i++) {
    const t = i / (palette.length - 1)
    stops.push(minDateMs + t * span, palette[i]!)
  }
  return ['interpolate', ['linear'], ['get', 'dateMs'], ...stops]
}
