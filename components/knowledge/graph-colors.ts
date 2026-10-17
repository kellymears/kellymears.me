/**
 * Topic palette for the knowledge graph.
 *
 * Sixteen hues stepped 22.5° apart around the OKLCH wheel, starting at the warm
 * coral end so the ramp opens next to the site's primary family
 * (`--color-primary-500: oklch(0.75 0.16 45)`) and closes back into it. Chroma
 * is held between 0.09 and 0.13 — well under the primary's 0.16 — so 345 dots
 * read as a tinted field rather than a bag of highlighters, and lightness sits
 * in the gray-500/600 register in light mode, gray-300/400 in dark.
 *
 * Perceived lightness is trimmed by hue: blues and violets are darkened a step
 * and given a touch more chroma, greens and teals pulled down slightly, so no
 * single topic jumps forward.
 */

export interface TopicColor {
  /** Fill for light mode — sits against `--color-paper`. */
  light: string
  /** Fill for dark mode — sits against `--color-gray-950`. */
  dark: string
  /** Short legend label. Topic pages use the long names from `lib/knowledge`. */
  label: string
}

export const TOPIC_COLORS: Record<string, TopicColor> = {
  method: { light: 'oklch(0.62 0.13 45)', dark: 'oklch(0.78 0.12 45)', label: 'Method' },
  computation: {
    light: 'oklch(0.62 0.12 67.5)',
    dark: 'oklch(0.79 0.11 67.5)',
    label: 'Computation',
  },
  agents: { light: 'oklch(0.61 0.11 90)', dark: 'oklch(0.79 0.11 90)', label: 'Agents' },
  web: { light: 'oklch(0.60 0.10 112.5)', dark: 'oklch(0.78 0.10 112.5)', label: 'Web' },
  design: { light: 'oklch(0.58 0.10 135)', dark: 'oklch(0.76 0.10 135)', label: 'Design' },
  testing: { light: 'oklch(0.58 0.09 157.5)', dark: 'oklch(0.76 0.09 157.5)', label: 'Testing' },
  delivery: { light: 'oklch(0.58 0.09 180)', dark: 'oklch(0.76 0.09 180)', label: 'Delivery' },
  systems: { light: 'oklch(0.58 0.10 202.5)', dark: 'oklch(0.75 0.10 202.5)', label: 'Systems' },
  data: { light: 'oklch(0.58 0.11 225)', dark: 'oklch(0.74 0.11 225)', label: 'Data' },
  graphics: { light: 'oklch(0.57 0.12 247.5)', dark: 'oklch(0.73 0.12 247.5)', label: 'Graphics' },
  play: { light: 'oklch(0.56 0.13 270)', dark: 'oklch(0.72 0.12 270)', label: 'Play' },
  networks: { light: 'oklch(0.56 0.12 292.5)', dark: 'oklch(0.73 0.12 292.5)', label: 'Networks' },
  matter: { light: 'oklch(0.58 0.12 315)', dark: 'oklch(0.75 0.12 315)', label: 'Matter' },
  body: { light: 'oklch(0.59 0.12 337.5)', dark: 'oklch(0.75 0.12 337.5)', label: 'Body' },
  mind: { light: 'oklch(0.60 0.13 0)', dark: 'oklch(0.76 0.12 0)', label: 'Mind' },
  meaning: { light: 'oklch(0.60 0.13 22.5)', dark: 'oklch(0.76 0.12 22.5)', label: 'Meaning' },
}

/** Neutral used for a topic the palette does not know about. */
export const FALLBACK_TOPIC_COLOR: TopicColor = {
  light: 'oklch(0.552 0.016 257)',
  dark: 'oklch(0.705 0.013 256)',
  label: 'Other',
}

/** Palette order — matches `TOPIC_DEFINITIONS` in `lib/knowledge.ts`. */
export const TOPIC_ORDER: string[] = Object.keys(TOPIC_COLORS)

/** Resolve a topic's fill for the given theme. */
export function topicColor(topic: string, isDark: boolean): string {
  const entry = TOPIC_COLORS[topic] ?? FALLBACK_TOPIC_COLOR
  return isDark ? entry.dark : entry.light
}

/** Short legend label for a topic slug. */
export function topicLabel(topic: string): string {
  return (TOPIC_COLORS[topic] ?? FALLBACK_TOPIC_COLOR).label
}

/**
 * Custom property holding a topic's fill. Declared on the graph root in both
 * themes so the SVG can be colored by CSS alone — no JS theme detection, no
 * light-palette flash before hydration.
 */
export function topicCssVar(topic: string): string {
  return `--kg-topic-${topic}`
}
