/**
 * Topic palette for the knowledge graph.
 *
 * Fifteen hues stepped ~23° apart around the OKLCH wheel, starting at the warm
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
  /** Fill for light mode — sits against `oklch(0.99 0.005 75)`. */
  light: string
  /** Fill for dark mode — sits against `--color-gray-950`. */
  dark: string
  /** Short legend label. Topic pages use the long names from `lib/knowledge`. */
  label: string
}

export const TOPIC_COLORS: Record<string, TopicColor> = {
  method: { light: 'oklch(0.62 0.13 45)', dark: 'oklch(0.78 0.12 45)', label: 'Method' },
  computation: {
    light: 'oklch(0.62 0.12 68.4)',
    dark: 'oklch(0.79 0.11 68.4)',
    label: 'Computation',
  },
  agents: { light: 'oklch(0.61 0.11 91.7)', dark: 'oklch(0.79 0.11 91.7)', label: 'Agents' },
  web: { light: 'oklch(0.60 0.10 115.1)', dark: 'oklch(0.78 0.10 115.1)', label: 'Web' },
  design: { light: 'oklch(0.58 0.10 138.4)', dark: 'oklch(0.76 0.10 138.4)', label: 'Design' },
  testing: { light: 'oklch(0.58 0.09 161.8)', dark: 'oklch(0.76 0.09 161.8)', label: 'Testing' },
  delivery: { light: 'oklch(0.58 0.09 185.1)', dark: 'oklch(0.76 0.09 185.1)', label: 'Delivery' },
  systems: { light: 'oklch(0.58 0.10 208.5)', dark: 'oklch(0.75 0.10 208.5)', label: 'Systems' },
  data: { light: 'oklch(0.58 0.11 231.9)', dark: 'oklch(0.74 0.11 231.9)', label: 'Data' },
  graphics: { light: 'oklch(0.57 0.12 255.2)', dark: 'oklch(0.73 0.12 255.2)', label: 'Graphics' },
  play: { light: 'oklch(0.56 0.13 278.6)', dark: 'oklch(0.72 0.12 278.6)', label: 'Play' },
  networks: { light: 'oklch(0.56 0.12 301.9)', dark: 'oklch(0.73 0.12 301.9)', label: 'Networks' },
  matter: { light: 'oklch(0.58 0.12 325.3)', dark: 'oklch(0.75 0.12 325.3)', label: 'Matter' },
  body: { light: 'oklch(0.59 0.12 348.6)', dark: 'oklch(0.75 0.12 348.6)', label: 'Body' },
  meaning: { light: 'oklch(0.60 0.13 12)', dark: 'oklch(0.76 0.12 12)', label: 'Meaning' },
}

/** Neutral used for a topic the palette does not know about. */
export const FALLBACK_TOPIC_COLOR: TopicColor = {
  light: 'oklch(0.551 0.02 50)',
  dark: 'oklch(0.707 0.015 50)',
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
