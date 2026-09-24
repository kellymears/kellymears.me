import type { KnowledgeGraph } from '@/lib/knowledge'

export const SILHOUETTE_W = 240
export const SILHOUETTE_H = 120

export interface TopicSilhouette {
  dots: { x: number; y: number; r: number; hub: boolean }[]
  /** Flattened `M x y L x y` segments between this topic's own notes. */
  edges: string
}

/** Intra-topic edges kept per silhouette — enough for structure, not a hairball. */
const MAX_EDGES = 48

/**
 * One topic's notes as they sit in the whole-vault layout, cropped and fitted
 * to a small fixed box. Aspect is preserved, so each domain keeps its real
 * shape. Deterministic: derived only from `getGraph()` positions.
 */
export function topicSilhouette(graph: KnowledgeGraph, topic: string): TopicSilhouette {
  const nodes = graph.nodes.filter((n) => n.topic === topic)
  if (!nodes.length) return { dots: [], edges: '' }

  const xs = nodes.map((n) => n.x)
  const ys = nodes.map((n) => n.y)
  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  const w = Math.max(Math.max(...xs) - minX, 1)
  const h = Math.max(Math.max(...ys) - minY, 1)
  const pad = 14
  const s = Math.min((SILHOUETTE_W - pad * 2) / w, (SILHOUETTE_H - pad * 2) / h)
  const ox = (SILHOUETTE_W - w * s) / 2
  const oy = (SILHOUETTE_H - h * s) / 2
  const at = (n: { x: number; y: number }) => ({
    x: Math.round((ox + (n.x - minX) * s) * 10) / 10,
    y: Math.round((oy + (n.y - minY) * s) * 10) / 10,
  })

  const hubDegree = Math.max(...nodes.map((n) => n.degree))
  const byId = new Map(nodes.map((n) => [n.id, n]))
  const dots = nodes.map((n) => ({
    ...at(n),
    r: Math.round((1.3 + Math.sqrt(n.degree) * 0.42) * 10) / 10,
    hub: n.degree === hubDegree,
  }))

  const edges = graph.edges
    .filter((e) => byId.has(e.source) && byId.has(e.target))
    .map((e) => ({ a: byId.get(e.source)!, b: byId.get(e.target)! }))
    .sort((p, q) => q.a.degree + q.b.degree - (p.a.degree + p.b.degree))
    .slice(0, MAX_EDGES)
    .map(({ a, b }) => {
      const pa = at(a)
      const pb = at(b)
      return `M${pa.x} ${pa.y}L${pb.x} ${pb.y}`
    })
    .join('')

  return { dots, edges }
}
