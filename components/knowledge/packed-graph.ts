import type { KnowledgeGraph } from '@/lib/knowledge'

/** `[id, title, topic, x, y, degree]` — one node, without the repeated keys. */
type PackedNode = [string, string, string, number, number, number]

/**
 * The graph as it crosses to the client. As plain objects the whole vault is
 * ~410KB of RSC payload, most of it every edge spelling out both slugs; edges
 * as index pairs into `nodes` bring that to under a quarter. Edges with an
 * endpoint missing from `nodes` are dropped here, as the renderer drops them.
 */
export interface PackedGraph {
  nodes: PackedNode[]
  /** Flat `[source, target, source, target, …]` indices into `nodes`. */
  edges: number[]
}

export function packGraph(graph: KnowledgeGraph): PackedGraph {
  const index = new Map(graph.nodes.map((node, i) => [node.id, i]))
  const edges: number[] = []
  for (const edge of graph.edges) {
    const source = index.get(edge.source)
    const target = index.get(edge.target)
    if (source !== undefined && target !== undefined) edges.push(source, target)
  }
  return {
    nodes: graph.nodes.map((n) => [n.id, n.title, n.topic, n.x, n.y, n.degree]),
    edges,
  }
}

export function unpackGraph(packed: PackedGraph): KnowledgeGraph {
  const nodes = packed.nodes.map(([id, title, topic, x, y, degree]) => ({
    id,
    title,
    topic,
    x,
    y,
    degree,
  }))
  const edges: KnowledgeGraph['edges'] = []
  for (let i = 0; i < packed.edges.length; i += 2) {
    edges.push({ source: nodes[packed.edges[i]!]!.id, target: nodes[packed.edges[i + 1]!]!.id })
  }
  return { nodes, edges }
}
