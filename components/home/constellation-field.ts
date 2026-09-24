import { FALLBACK_TOPIC_COLOR, TOPIC_COLORS } from '@/components/knowledge/graph-colors'
import type { KnowledgeGraph } from '@/lib/knowledge'

export const FIELD_W = 1900
export const FIELD_H = 1000

export type FieldTheme = 'light' | 'dark'

export const nodeRadius = (degree: number) => 2.2 + Math.sqrt(degree) * 0.9

/**
 * The static half of the home page constellation: every edge and every node,
 * as a standalone SVG document. It ships as a cacheable image (one per theme)
 * rather than inline markup, because inline it lands in the page twice —
 * once as HTML, once in the RSC payload — and quadruples the home page's
 * weight. Whole-unit coordinates are sub-pixel at display size.
 */
export function renderConstellationField(graph: KnowledgeGraph, theme: FieldTheme): string {
  const color = (topic: string) => (TOPIC_COLORS[topic] ?? FALLBACK_TOPIC_COLOR)[theme]
  const byId = new Map(graph.nodes.map((n) => [n.id, n]))
  const r = Math.round

  const edges = new Map<string, string>()
  for (const e of graph.edges) {
    const a = byId.get(e.source)
    const b = byId.get(e.target)
    if (!a || !b) continue
    edges.set(a.topic, `${edges.get(a.topic) ?? ''}M${r(a.x)} ${r(a.y)}L${r(b.x)} ${r(b.y)}`)
  }

  const nodes = new Map<string, string>()
  for (const n of graph.nodes) {
    const radius = Math.round(nodeRadius(n.degree) * 2) / 2
    nodes.set(
      n.topic,
      `${nodes.get(n.topic) ?? ''}<circle cx="${r(n.x)}" cy="${r(n.y)}" r="${radius}"/>`
    )
  }

  const edgeOpacity = theme === 'dark' ? 0.16 : 0.2
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${FIELD_W} ${FIELD_H}" width="${FIELD_W}" height="${FIELD_H}">`,
    `<g fill="none" stroke-width="0.8" stroke-opacity="${edgeOpacity}">`,
    ...[...edges].map(([topic, d]) => `<path stroke="${color(topic)}" d="${d}"/>`),
    '</g>',
    ...[...nodes].map(([topic, circles]) => `<g fill="${color(topic)}">${circles}</g>`),
    '</svg>',
  ].join('')
}
