'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import type {
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
} from 'react'
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

import type { KnowledgeGraph as KnowledgeGraphData } from '@/lib/knowledge'

import { FALLBACK_TOPIC_COLOR, TOPIC_COLORS, TOPIC_ORDER, topicCssVar } from './graph-colors'

export interface KnowledgeGraphProps {
  graph: KnowledgeGraphData
  variant: 'constellation' | 'local'
  /** The note currently being read — drawn larger, ringed, never dimmed. */
  activeId?: string
  /**
   * Softly dims everything outside this topic, so a topic page can show its
   * cross-topic neighbours as context. Any legend selection overrides it.
   */
  focusTopic?: string
  className?: string
  /**
   * Height of the canvas in px. Defaults to 590 (constellation) / 300 (local).
   *
   * 590 is where a ~1020px-wide card matches the aspect of the 1.9:1 layout
   * `getGraph()` emits, so the drawing fills both axes at ~88%. Going taller
   * flips the binding axis and just adds dead space above and below.
   */
  height?: number
  /** Topic legend. Defaults to `true` for constellation, `false` for local. */
  showLegend?: boolean
}

/**
 * Fallback frame for a graph with no nodes. Nothing else in here assumes a
 * source box of any particular size or aspect — every view is fitted to the
 * measured content bounding box, so `getGraph()` emitting 1900×1000 and
 * `getLocalGraph()` emitting a square both work without special-casing.
 */
const EMPTY_BOUNDS: Bounds = { x: 0, y: 0, w: 1000, h: 1000 }

/** Max zoom relative to the resting fit. */
const MAX_ZOOM = 6

/** Number of highest-degree nodes that keep a label at rest. */
const LANDMARK_LABELS = 12

/** A `local` graph up to this size labels every node; past it, landmarks only. */
const DENSE_LABEL_LIMIT = 18

/** Entrance stagger budget — last node starts here, ends ~260ms later. */
const ENTRANCE_SPREAD = 340

/**
 * Announced with the graph, so the arrow-key affordance is discoverable — a
 * roving tabindex is invisible otherwise.
 */
const KEYBOARD_HELP =
  'The graph is a single tab stop: use the arrow keys to move between notes, Home and End for the most and least linked, Enter to open the focused note, and Escape to leave the graph.'

/** Mean glyph advance for Space Grotesk at 500 weight, as a fraction of em. */
const LABEL_CHAR_WIDTH = 0.62

/** Label box height as a multiple of font size. */
const LABEL_LINE_HEIGHT = 1.15

/** Fudge on the estimated label size, since the true render scale is measured. */
const LABEL_SAFETY = 1.15

const round = (value: number) => Math.round(value * 10) / 10

const clamp = (value: number, min: number, max: number) =>
  value < min ? min : value > max ? max : value

/** `useLayoutEffect` that stays quiet during SSR of this client component. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

const cssEscape = (value: string) =>
  typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
    ? CSS.escape(value)
    : value.replace(/["\\]/g, '\\$&')

/* -------------------------------------------------------------------------- */
/* Stylesheet                                                                  */
/* -------------------------------------------------------------------------- */

const topicVarBlock = (theme: 'light' | 'dark') =>
  TOPIC_ORDER.map((topic) => `${topicCssVar(topic)}:${TOPIC_COLORS[topic]![theme]};`).join('')

/** `--kg-c` cascades from the node group down to its circle. */
const topicFillRules = TOPIC_ORDER.map(
  (topic) => `.kg [data-topic='${topic}']{--kg-c:var(${topicCssVar(topic)});}`
).join('')

/** Legend filtering: dim every element whose topic is not in `data-filter`. */
const topicFilterRules = TOPIC_ORDER.map(
  (topic) =>
    `.kg[data-filter]:not([data-filter~='${topic}']) [data-topic='${topic}']{opacity:var(--kg-dim,.07);}`
).join('')

const GRAPH_CSS = `
.kg{
  --kg-zoom:1;
  --kg-bg:oklch(0.99 0.005 75);
  --kg-fallback:${FALLBACK_TOPIC_COLOR.light};
  --kg-edge:oklch(0.707 0.015 50);
  --kg-edge-o:.38;
  --kg-edge-hot:oklch(0.446 0.02 50);
  --kg-label:oklch(0.373 0.02 50);
  --kg-ring:oklch(0.446 0.02 50);
  ${topicVarBlock('light')}
}
:where(.dark) .kg{
  --kg-bg:oklch(0.14 0.01 60);
  --kg-fallback:${FALLBACK_TOPIC_COLOR.dark};
  --kg-edge:oklch(0.707 0.015 50);
  --kg-edge-o:.5;
  --kg-edge-hot:oklch(0.872 0.01 55);
  --kg-label:oklch(0.872 0.01 55);
  --kg-ring:oklch(0.707 0.015 50);
  ${topicVarBlock('dark')}
}
${topicFillRules}

.kg-svg{display:block;width:100%;height:100%;overflow:visible;touch-action:auto;}
.kg--constellation .kg-svg{cursor:grab;}
.kg--constellation .kg-svg[data-panning='1']{cursor:grabbing;}

.kg-edge{stroke:var(--kg-edge);stroke-width:1;stroke-linecap:round;fill:none;}
.kg--constellation .kg-edge{opacity:var(--kg-edge-o);}
.kg--local .kg-edge{opacity:calc(var(--kg-edge-o) + .28);}

.kg-hit{fill:transparent;stroke:none;}
.kg-dot{fill:var(--kg-c,var(--kg-fallback));}
.kg-ring{fill:none;stroke:var(--kg-ring);stroke-width:1.25;opacity:0;}
.kg-node{cursor:pointer;outline:none;transition:opacity 110ms ease;}
.kg-node .kg-dot,.kg-node .kg-ring{transition:opacity 110ms ease;}

.kg-label{
  fill:var(--kg-label);
  font-family:inherit;
  font-size:calc(var(--kg-zoom) * 12px);
  font-weight:500;
  paint-order:stroke;
  stroke:var(--kg-bg);
  stroke-width:calc(var(--kg-zoom) * 3px);
  stroke-linejoin:round;
  pointer-events:none;
  opacity:0;
  visibility:hidden;
  transition:opacity 110ms ease;
}
.kg-label--pinned{opacity:1;visibility:visible;}

/* Legend filter — beats the resting rules, loses to an explicit node focus. */
${topicFilterRules}
.kg[data-filter] .kg-edge{opacity:.06;}

/* Node focus: the hovered/focused node plus its direct neighbours stay lit. */
.kg[data-focus] .kg-node:not(.kg-on){opacity:.1;}
.kg[data-focus] .kg-label:not(.kg-on){opacity:0;}
.kg[data-focus] .kg-edge:not(.kg-on){opacity:.05;}
.kg[data-focus] .kg-edge.kg-on{opacity:.95;stroke:var(--kg-edge-hot);stroke-width:1.6;}
.kg[data-focus] .kg-node--active:not(.kg-on){opacity:1;}
.kg[data-focus] .kg-label.kg-hot,
.kg[data-focus] .kg-label--active{opacity:1;visibility:visible;}

.kg-node.kg-hot .kg-ring,
.kg-node--active .kg-ring,
.kg-node:focus-visible .kg-ring{opacity:1;}
.kg-node:focus-visible .kg-ring{stroke:var(--color-primary-500,var(--kg-ring));stroke-width:2.5;}

@keyframes kg-node-in{from{opacity:0;transform:scale(.35);}to{opacity:1;transform:scale(1);}}
@keyframes kg-fade-in{from{opacity:0;}to{opacity:1;}}
/* transform-origin is set per node inline, in user units — no reliance on
   transform-box:fill-box, which is patchy on older SVG engines. */
.kg-node{animation:kg-node-in 260ms ease-out backwards;}
.kg-edges{animation:kg-fade-in 420ms 160ms ease-out backwards;}

@media (prefers-reduced-motion:reduce){
  .kg-node,.kg-edges{animation:none !important;}
  .kg-node,.kg-label,.kg-edge{transition:none !important;}
}
`

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

interface RenderNode {
  id: string
  title: string
  topic: string
  x: number
  y: number
  r: number
  degree: number
  delay: number
  pinned: boolean
  active: boolean
  /** Label anchor point and alignment, chosen by the collision pass. */
  tx: number
  ty: number
  anchor: 'start' | 'middle' | 'end'
}

/** Axis-aligned box in user units. */
interface Box {
  x0: number
  y0: number
  x1: number
  y1: number
}

interface Bounds {
  x: number
  y: number
  w: number
  h: number
}

const intersects = (a: Box, b: Box) => a.x0 < b.x1 && b.x0 < a.x1 && a.y0 < b.y1 && b.y0 < a.y1

const inside = (b: Box, f: Bounds) =>
  b.x0 >= f.x && b.x1 <= f.x + f.w && b.y0 >= f.y && b.y1 <= f.y + f.h

const inflate = (b: Box, dx: number, dy: number): Box => ({
  x0: b.x0 - dx,
  x1: b.x1 + dx,
  y0: b.y0 - dy,
  y1: b.y1 + dy,
})

/** A label candidate: anchor point plus the box it would occupy. */
const boxed = (
  tx: number,
  ty: number,
  anchor: RenderNode['anchor'],
  w: number,
  ascent: number,
  descent: number
) => ({
  tx,
  ty,
  anchor,
  box: {
    x0: anchor === 'start' ? tx : anchor === 'end' ? tx - w : tx - w / 2,
    x1: anchor === 'start' ? tx + w : anchor === 'end' ? tx : tx + w / 2,
    y0: ty - ascent,
    y1: ty + descent,
  },
})

interface RenderEdge {
  key: string
  source: string
  target: string
  x1: number
  y1: number
  x2: number
  y2: number
}

export function KnowledgeGraph({
  graph,
  variant,
  activeId,
  focusTopic,
  className,
  height,
  showLegend,
}: KnowledgeGraphProps) {
  const router = useRouter()
  const rootRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const isConstellation = variant === 'constellation'
  const canvasHeight = height ?? (isConstellation ? 590 : 300)
  const legendVisible = showLegend ?? isConstellation

  /**
   * Measured canvas, in CSS px. Label placement needs the real aspect ratio:
   * in a narrow sidebar it is the *width* that binds the fit, which makes the
   * rendered label far larger in user units than a height-only estimate says,
   * and a too-small estimate is what lets labels overprint and clip.
   */
  const [canvas, setCanvas] = useState<{ w: number; h: number } | null>(null)

  /* ---- derived geometry, computed once per graph ------------------------- */

  const nodeById = useMemo(() => new Map(graph.nodes.map((node) => [node.id, node])), [graph.nodes])

  /** Adjacency, built once. Drives the hover focus set without any re-render. */
  const neighbours = useMemo(() => {
    const map = new Map<string, Set<string>>()
    for (const node of graph.nodes) map.set(node.id, new Set())
    for (const edge of graph.edges) {
      map.get(edge.source)?.add(edge.target)
      map.get(edge.target)?.add(edge.source)
    }
    return map
  }, [graph.nodes, graph.edges])

  /**
   * Node geometry, label placement and the content bounding box, in one pass.
   *
   * A filtered subgraph occupies only part of the 0..1000 layout box, so the
   * resting view is fitted to the *content* rather than to the box — otherwise
   * a 25-note topic graph reads as a smudge in the middle of an empty frame.
   * Accepted label boxes are folded into those bounds, which is what keeps
   * edge labels from being clipped.
   */
  const layout = useMemo<{ nodes: RenderNode[]; bounds: Bounds }>(() => {
    const total = graph.nodes.length
    if (total === 0) return { nodes: [], bounds: EMPTY_BOUNDS }

    const maxDegree = Math.max(1, ...graph.nodes.map((node) => node.degree))
    // Label everything only while it still reads — a depth-2 local graph can
    // run to 70+ nodes, which at 300px is a wall of overlapping text.
    const labelEveryNode = !isConstellation && total <= DENSE_LABEL_LIMIT
    // Local maps are tuned for a depth-1 neighbourhood (~10 nodes); a deeper
    // one packs the same box far tighter, so the dots come down with it.
    const [minR, maxR] = isConstellation ? [4, 15] : labelEveryNode ? [9, 22] : [5, 16]

    // Rank by degree: hubs resolve first in the entrance, and win the contest
    // for label space below.
    const ranked = [...graph.nodes]
      .sort((a, b) => b.degree - a.degree)
      .map((node, index) => {
        const isActive = node.id === activeId
        const scale = Math.sqrt(Math.min(node.degree, maxDegree) / maxDegree)
        return {
          node,
          index,
          isActive,
          r: (minR + (maxR - minR) * scale) * (isActive ? 1.55 : 1),
        }
      })

    let x0 = Infinity
    let y0 = Infinity
    let x1 = -Infinity
    let y1 = -Infinity
    for (const item of ranked) {
      x0 = Math.min(x0, item.node.x - item.r)
      x1 = Math.max(x1, item.node.x + item.r)
      y0 = Math.min(y0, item.node.y - item.r)
      y1 = Math.max(y1, item.node.y + item.r)
    }

    /*
     * Bounds are the node box plus a proportional margin, and are final here.
     * They deliberately do NOT grow to contain labels: label size is derived
     * from the bounds, so letting labels widen them is a feedback loop that
     * runs away (measured: an 872-unit box ballooned to 2033).
     */
    // Per axis, not one margin from the larger dimension — on a 1.9:1 source
    // box a shared pad is ~13% of the height against ~7% of the width, which
    // needlessly shrinks the drawing on its short axis.
    const padX = (x1 - x0) * 0.07
    const padY = (y1 - y0) * 0.07
    x0 -= padX
    y0 -= padY
    x1 += padX
    y1 += padY
    const bounds: Bounds = { x: x0, y: y0, w: Math.max(x1 - x0, 1), h: Math.max(y1 - y0, 1) }

    /*
     * Label size in user units. The stylesheet renders labels at a fixed 12 CSS
     * px, so this converts that back through the resting scale. Whichever axis
     * binds the fit decides that scale, so the canvas aspect has to be real —
     * a height-only guess is ~50% too small in a narrow sidebar, which is what
     * let labels overprint and clip.
     */
    const canvasW = canvas?.w ?? canvasHeight
    const canvasH = canvas?.h ?? canvasHeight
    const viewH =
      bounds.w / bounds.h > canvasW / canvasH ? (bounds.w * canvasH) / canvasW : bounds.h
    const fontUser = ((12 * viewH) / Math.max(canvasH, 1)) * LABEL_SAFETY || 12

    const wanted = new Set(
      labelEveryNode
        ? graph.nodes.map((node) => node.id)
        : ranked.slice(0, LANDMARK_LABELS).map((item) => item.node.id)
    )
    if (activeId) wanted.add(activeId)

    // Greedy placement: the note being read gets first pick, then the most
    // linked, and anything that cannot find a clear slot in four tries loses
    // its label rather than overprinting a more important one.
    const taken: Box[] = []
    const nodes: RenderNode[] = []
    const placementOrder = [...ranked].sort(
      (a, b) => Number(b.isActive) - Number(a.isActive) || a.index - b.index
    )

    for (const { node, index, isActive, r } of placementOrder) {
      const w = Math.max(node.title.length * LABEL_CHAR_WIDTH * fontUser, fontUser)
      const ascent = fontUser * 0.82
      const descent = fontUser * (LABEL_LINE_HEIGHT - 0.82)
      const gap = fontUser * 0.4

      const candidates: { tx: number; ty: number; anchor: RenderNode['anchor']; box: Box }[] = [
        // below, left, right, above — below reads best, so it goes first.
        boxed(node.x, node.y + r + gap + ascent, 'middle', w, ascent, descent),
        boxed(node.x - r - gap, node.y + fontUser * 0.34, 'end', w, ascent, descent),
        boxed(node.x + r + gap, node.y + fontUser * 0.34, 'start', w, ascent, descent),
        boxed(node.x, node.y - r - gap - descent, 'middle', w, ascent, descent),
      ]

      let chosen = candidates[0]!
      let pinned = false
      if (wanted.has(node.id)) {
        // Must clear every label already placed AND sit inside the frame, so
        // nothing clips at an edge. Four tries, then it loses its label rather
        // than overprint a better-connected note.
        const free = candidates.find(
          (c) => inside(c.box, bounds) && !taken.some((box) => intersects(box, c.box))
        )
        if (free) {
          // Store the box with breathing room so near-misses still count as a
          // clash — the width estimate is only an average glyph advance.
          taken.push(inflate(free.box, fontUser * 0.2, fontUser * 0.12))
          chosen = free
          pinned = true
        }
      }

      nodes.push({
        id: node.id,
        title: node.title,
        topic: node.topic,
        x: Math.round(node.x * 10) / 10,
        y: Math.round(node.y * 10) / 10,
        r: Math.round(r * 100) / 100,
        degree: node.degree,
        delay: Math.round((index / total) * ENTRANCE_SPREAD),
        pinned,
        active: isActive,
        tx: Math.round(chosen.tx * 10) / 10,
        ty: Math.round(chosen.ty * 10) / 10,
        anchor: chosen.anchor,
      })
    }

    return { nodes, bounds }
  }, [graph.nodes, isConstellation, activeId, canvasHeight, canvas])

  const renderNodes = layout.nodes
  const bounds = layout.bounds

  const renderEdges = useMemo<RenderEdge[]>(() => {
    const seen = new Set<string>()
    const edges: RenderEdge[] = []
    for (const edge of graph.edges) {
      const from = nodeById.get(edge.source)
      const to = nodeById.get(edge.target)
      if (!from || !to || from.id === to.id) continue
      const key = from.id < to.id ? `${from.id}~${to.id}` : `${to.id}~${from.id}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push({
        key,
        source: edge.source,
        target: edge.target,
        x1: Math.round(from.x),
        y1: Math.round(from.y),
        x2: Math.round(to.x),
        y2: Math.round(to.y),
      })
    }
    return edges
  }, [graph.edges, nodeById])

  /* ---- focus (hover / keyboard) — driven imperatively, zero re-render ----- */

  const setFocus = useCallback(
    (id: string | null) => {
      const root = rootRef.current
      if (!root) return

      for (const el of root.querySelectorAll('.kg-on, .kg-hot')) {
        el.classList.remove('kg-on', 'kg-hot')
      }

      if (!id) {
        delete root.dataset.focus
        return
      }

      const ids = new Set<string>([id])
      for (const neighbour of neighbours.get(id) ?? []) ids.add(neighbour)

      for (const nodeId of ids) {
        const selector = `[data-node="${cssEscape(nodeId)}"]`
        for (const el of root.querySelectorAll(selector)) {
          el.classList.add('kg-on')
          if (nodeId === id) el.classList.add('kg-hot')
        }
      }

      const escaped = cssEscape(id)
      const incident = `.kg-edge[data-s="${escaped}"], .kg-edge[data-t="${escaped}"]`
      for (const el of root.querySelectorAll(incident)) el.classList.add('kg-on')

      root.dataset.focus = id
    },
    [neighbours]
  )

  // Focus references live DOM nodes; drop it whenever the graph is swapped out.
  useEffect(() => setFocus(null), [setFocus])

  /* ---- navigation -------------------------------------------------------- */

  const draggedRef = useRef(false)

  const navigate = useCallback(
    (id: string) => {
      if (draggedRef.current) return
      const node = nodeById.get(id)
      if (!node) return
      router.push(`/knowledge/${node.topic}/${node.id}`)
    },
    [nodeById, router]
  )

  /* ---- keyboard: roving tabindex ----------------------------------------- */

  /** Most-linked first — Home/End land on the ends of this. */
  const navOrder = useMemo(
    () => [...renderNodes].sort((a, b) => b.degree - a.degree || a.id.localeCompare(b.id)),
    [renderNodes]
  )

  /**
   * The graph is one tab stop, not 201. This node carries `tabIndex=0` on the
   * first render; arrow keys move it, imperatively, so a keyboard user can walk
   * the vault without trapping the rest of the page behind it.
   */
  const initialRovingId = useMemo(() => {
    if (activeId && renderNodes.some((node) => node.id === activeId)) return activeId
    return navOrder[0]?.id ?? null
  }, [activeId, renderNodes, navOrder])

  /**
   * Escape parks focus on the container. The roving stop is a descendant, so
   * leaving it tabbable would send the very next Tab straight back into the
   * graph — it is suspended while parked and restored when focus leaves.
   */
  const parked = useRef<string | null>(null)

  const park = useCallback(() => {
    setFocus(null)
    // focus() dispatches the node's focusout synchronously, so suspending the
    // roving stop afterwards cannot be undone by the unpark handler below.
    svgRef.current?.focus()
    const current = rootRef.current?.querySelector('.kg-node[tabindex="0"]')
    if (!current) return
    parked.current = current.getAttribute('data-node')
    current.setAttribute('tabindex', '-1')
  }, [setFocus])

  const unpark = useCallback(() => {
    const id = parked.current
    if (!id) return
    parked.current = null
    rootRef.current
      ?.querySelector(`.kg-node[data-node="${cssEscape(id)}"]`)
      ?.setAttribute('tabindex', '0')
  }, [])

  const moveTo = useCallback((id: string) => {
    const root = rootRef.current
    if (!root) return
    root.querySelector('.kg-node[tabindex="0"]')?.setAttribute('tabindex', '-1')
    const next = root.querySelector(`.kg-node[data-node="${cssEscape(id)}"]`)
    if (!(next instanceof SVGElement)) return
    next.setAttribute('tabindex', '0')
    // Focusing fires onFocus, which lights the node and its neighbours.
    next.focus()
  }, [])

  // A re-render of the node layer restores the memoised tabIndex, so the roving
  // stop goes back to where React thinks it is.
  useEffect(() => {
    const root = rootRef.current
    if (!root || !initialRovingId) return
    for (const el of root.querySelectorAll('.kg-node[tabindex="0"]')) {
      if (el.getAttribute('data-node') !== initialRovingId) el.setAttribute('tabindex', '-1')
    }
  }, [initialRovingId])

  /**
   * Nearest node within a 75° cone of the requested direction, distance
   * weighted by how far off-axis it sits. Returns null rather than wrapping, so
   * an edge node simply stays put instead of teleporting across the map.
   */
  const step = useCallback(
    (fromId: string, dir: 'left' | 'right' | 'up' | 'down') => {
      const from = renderNodes.find((node) => node.id === fromId)
      if (!from) return null
      // SVG y grows downward, so 'down' is +90°.
      const want = dir === 'right' ? 0 : dir === 'down' ? 90 : dir === 'left' ? 180 : -90

      let best: string | null = null
      let bestScore = Infinity
      for (const node of renderNodes) {
        if (node.id === fromId) continue
        const dx = node.x - from.x
        const dy = node.y - from.y
        const distance = Math.hypot(dx, dy)
        if (distance < 0.001) continue
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI
        // Absolute angular difference, folded into 0..180.
        const offAxis = Math.abs(((((angle - want) % 360) + 540) % 360) - 180)
        if (offAxis > 75) continue
        const score = distance * (1 + offAxis / 45)
        if (score < bestScore) {
          bestScore = score
          best = node.id
        }
      }
      return best
    },
    [renderNodes]
  )

  const handleNodeKey = useCallback(
    (event: ReactKeyboardEvent<SVGGElement>, id: string) => {
      const { key } = event

      if (key === 'Enter' || key === ' ') {
        event.preventDefault()
        navigate(id)
        return
      }

      if (key === 'Escape') {
        event.preventDefault()
        park()
        return
      }

      if (key === 'Home' || key === 'End') {
        event.preventDefault()
        const target = key === 'Home' ? navOrder[0] : navOrder[navOrder.length - 1]
        if (target) moveTo(target.id)
        return
      }

      const dir =
        key === 'ArrowRight'
          ? 'right'
          : key === 'ArrowLeft'
            ? 'left'
            : key === 'ArrowUp'
              ? 'up'
              : key === 'ArrowDown'
                ? 'down'
                : null
      if (!dir) return
      // Owned by the widget while a node has focus, so the page does not scroll.
      event.preventDefault()
      const next = step(id, dir)
      if (next) moveTo(next)
    },
    [navigate, park, navOrder, moveTo, step]
  )

  /* ---- view: fit, then pan + zoom (constellation only) ------------------- */

  /**
   * The content bounding box is rarely the container's shape, and a filtered
   * subgraph is rarely the whole layout box. `meet` would letterbox whatever
   * mismatch is left, so the resting viewBox is grown along one axis to the
   * container's aspect ratio and centred on the *content* — which both fills
   * the canvas and keeps the aspect ratio undistorted.
   */
  const fit = useRef<Bounds>({ ...bounds })
  const view = useRef<Bounds>({ ...bounds })
  /** Rendered size of the SVG in CSS px, refreshed by the ResizeObserver. */
  const size = useRef({ w: 0, h: 0 })
  const [zoomed, setZoomed] = useState(false)
  const zoomedRef = useRef(false)

  const applyView = useCallback(() => {
    const v = view.current
    const f = fit.current
    // Zoom bounds: the fit is the furthest out, MAX_ZOOM the closest in.
    v.w = clamp(v.w, f.w / MAX_ZOOM, f.w)
    v.h = clamp(v.h, f.h / MAX_ZOOM, f.h)
    // Pan bounds: the view may not lose contact with the content.
    const [xa, xb] = [bounds.x, bounds.x + bounds.w - v.w]
    const [ya, yb] = [bounds.y, bounds.y + bounds.h - v.h]
    v.x = clamp(v.x, Math.min(xa, xb), Math.max(xa, xb))
    v.y = clamp(v.y, Math.min(ya, yb), Math.max(ya, yb))

    svgRef.current?.setAttribute('viewBox', `${v.x} ${v.y} ${v.w} ${v.h}`)
    // User units per CSS px — labels multiply by it to hold a constant size
    // on screen at any container size or zoom level.
    const unitsPerPx = size.current.h > 0 ? v.h / size.current.h : 1
    rootRef.current?.style.setProperty('--kg-zoom', String(unitsPerPx))

    const next = Math.abs(v.w - f.w) > 0.5 || Math.abs(v.x - f.x) > 0.5 || Math.abs(v.y - f.y) > 0.5
    if (next !== zoomedRef.current) {
      zoomedRef.current = next
      setZoomed(next)
    }
  }, [bounds])

  const resetView = useCallback(() => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (rect && rect.width > 0 && rect.height > 0) {
      size.current = { w: rect.width, h: rect.height }
      // Feed the real aspect back into label placement. Guarded so the
      // observer -> state -> layout -> observer path settles immediately.
      setCanvas((current) =>
        current && Math.abs(current.w - rect.width) < 1 && Math.abs(current.h - rect.height) < 1
          ? current
          : { w: rect.width, h: rect.height }
      )
      const aspect = rect.width / rect.height
      // Grow the short axis so the view matches the container's shape; the
      // content then fills the binding dimension edge to edge.
      const w = bounds.w / bounds.h < aspect ? bounds.h * aspect : bounds.w
      const h = bounds.w / bounds.h < aspect ? bounds.h : bounds.w / aspect
      fit.current = {
        x: bounds.x + (bounds.w - w) / 2,
        y: bounds.y + (bounds.h - h) / 2,
        w,
        h,
      }
    } else {
      fit.current = { ...bounds }
    }
    view.current = { ...fit.current }
    applyView()
  }, [applyView, bounds])

  // Fit before first paint so the SSR'd viewBox never flashes.
  useIsomorphicLayoutEffect(() => {
    resetView()
    const svg = svgRef.current
    if (!svg || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(() => resetView())
    observer.observe(svg)
    return () => observer.disconnect()
  }, [resetView])

  /** Screen px per user unit, plus the on-screen origin of the viewBox. */
  const viewMetrics = useCallback(() => {
    const rect = svgRef.current?.getBoundingClientRect()
    if (!rect || rect.width === 0 || rect.height === 0) return null
    const v = view.current
    const scale = Math.min(rect.width / v.w, rect.height / v.h)
    return {
      scale,
      left: rect.left + (rect.width - v.w * scale) / 2,
      top: rect.top + (rect.height - v.h * scale) / 2,
    }
  }, [])

  useEffect(() => {
    if (!isConstellation) return
    const svg = svgRef.current
    if (!svg) return

    const onWheel = (event: WheelEvent) => {
      // Plain wheel / two-finger scroll belongs to the page. ctrl is also what
      // a macOS trackpad pinch emits, so pinch-to-zoom works untouched.
      if (!event.ctrlKey && !event.metaKey) return
      event.preventDefault()

      const metrics = viewMetrics()
      if (!metrics) return

      const v = view.current
      const ux = v.x + (event.clientX - metrics.left) / metrics.scale
      const uy = v.y + (event.clientY - metrics.top) / metrics.scale

      const nextW = clamp(v.w * Math.exp(event.deltaY * 0.0022), fit.current.w / 6, fit.current.w)
      const factor = nextW / v.w
      v.x = ux - (ux - v.x) * factor
      v.y = uy - (uy - v.y) * factor
      v.w = nextW
      v.h *= factor
      applyView()
    }

    svg.addEventListener('wheel', onWheel, { passive: false })
    return () => svg.removeEventListener('wheel', onWheel)
  }, [isConstellation, applyView, viewMetrics])

  const pan = useRef<{ id: number; x: number; y: number; vx: number; vy: number } | null>(null)

  const onPointerDown = useCallback(
    (event: ReactPointerEvent<SVGSVGElement>) => {
      if (!isConstellation || event.pointerType === 'touch' || event.button !== 0) return
      // Leave node presses alone — pointer capture would steal their click.
      if ((event.target as Element).closest?.('.kg-node')) return

      draggedRef.current = false
      pan.current = {
        id: event.pointerId,
        x: event.clientX,
        y: event.clientY,
        vx: view.current.x,
        vy: view.current.y,
      }
      event.currentTarget.setPointerCapture(event.pointerId)
      event.currentTarget.dataset.panning = '1'
    },
    [isConstellation]
  )

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<SVGSVGElement>) => {
      const drag = pan.current
      if (!drag || drag.id !== event.pointerId) return
      const metrics = viewMetrics()
      if (!metrics) return

      const dx = (event.clientX - drag.x) / metrics.scale
      const dy = (event.clientY - drag.y) / metrics.scale
      if (Math.abs(dx) + Math.abs(dy) > 3) draggedRef.current = true
      view.current.x = drag.vx - dx
      view.current.y = drag.vy - dy
      applyView()
    },
    [applyView, viewMetrics]
  )

  const onPointerUp = useCallback((event: ReactPointerEvent<SVGSVGElement>) => {
    if (pan.current?.id !== event.pointerId) return
    pan.current = null
    // pointercancel drops the capture for us; releasing twice throws.
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    delete event.currentTarget.dataset.panning
    // Let the suppressed click (if any) pass before re-arming navigation.
    window.setTimeout(() => {
      draggedRef.current = false
    }, 0)
  }, [])

  /* ---- legend ------------------------------------------------------------ */

  const legendTopics = useMemo(() => {
    const present = new Set(graph.nodes.map((node) => node.topic))
    const known = TOPIC_ORDER.filter((topic) => present.has(topic))
    const unknown = [...present].filter((topic) => !TOPIC_COLORS[topic]).sort()
    return [...known, ...unknown]
  }, [graph.nodes])

  const [selected, setSelected] = useState<string[]>([])
  const [preview, setPreview] = useState<string | null>(null)

  const toggleTopic = useCallback((topic: string) => {
    setSelected((current) =>
      current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]
    )
  }, [])

  // Legend selection (and hover preview) outranks `focusTopic`. A `focusTopic`
  // dim is deliberately softer — those nodes are context, not noise.
  const legendFilter = preview ? preview : selected.length > 0 ? selected.join(' ') : undefined
  const activeFilter = legendFilter ?? focusTopic ?? undefined
  const dimLevel = activeFilter && !legendFilter ? '0.22' : undefined

  /* ---- render ------------------------------------------------------------ */

  // Memoised so legend state and view changes never reconcile ~2k SVG elements.
  const layers = useMemo(
    () => (
      <>
        <g className="kg-edges" aria-hidden="true">
          {renderEdges.map((edge) => (
            <line
              key={edge.key}
              className="kg-edge"
              data-s={edge.source}
              data-t={edge.target}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>

        <g className="kg-nodes">
          {renderNodes.map((node) => (
            <g
              key={node.id}
              className={clsx('kg-node', node.active && 'kg-node--active')}
              data-node={node.id}
              data-topic={node.topic}
              style={{
                animationDelay: `${node.delay}ms`,
                transformOrigin: `${node.x}px ${node.y}px`,
              }}
              role="link"
              tabIndex={node.id === initialRovingId ? 0 : -1}
              aria-label={`${node.title} — ${(TOPIC_COLORS[node.topic] ?? FALLBACK_TOPIC_COLOR).label}`}
              onPointerEnter={() => setFocus(node.id)}
              onPointerLeave={() => setFocus(null)}
              onFocus={() => setFocus(node.id)}
              onBlur={() => setFocus(null)}
              onClick={() => navigate(node.id)}
              onKeyDown={(event) => handleNodeKey(event, node.id)}
            >
              <title>{node.title}</title>
              {/* Positioned via cx/cy, not a `transform` attribute — the
                  entrance keyframes animate `transform` and would clobber it. */}
              <circle className="kg-hit" cx={node.x} cy={node.y} r={Math.max(node.r + 8, 18)} />
              <circle
                className="kg-ring"
                cx={node.x}
                cy={node.y}
                r={node.r + 4.5}
                vectorEffect="non-scaling-stroke"
              />
              <circle className="kg-dot" cx={node.x} cy={node.y} r={node.r} />
            </g>
          ))}
        </g>

        <g className="kg-labels" aria-hidden="true">
          {renderNodes.map((node) => (
            <text
              key={node.id}
              className={clsx(
                'kg-label',
                node.pinned && 'kg-label--pinned',
                node.active && 'kg-label--active'
              )}
              data-node={node.id}
              data-topic={node.topic}
              x={node.tx}
              y={node.ty}
              textAnchor={node.anchor}
            >
              {node.title}
            </text>
          ))}
        </g>
      </>
    ),
    [renderEdges, renderNodes, setFocus, navigate, handleNodeKey, initialRovingId]
  )

  if (graph.nodes.length === 0) {
    return (
      <div
        className={clsx(
          'flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800',
          className
        )}
        style={{ height: canvasHeight }}
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">No connections to map yet.</p>
      </div>
    )
  }

  const description = `Knowledge graph: ${graph.nodes.length} ${
    graph.nodes.length === 1 ? 'note' : 'notes'
  }, ${renderEdges.length} ${renderEdges.length === 1 ? 'link' : 'links'}.`

  return (
    <div
      ref={rootRef}
      data-filter={activeFilter}
      // Seeded for SSR / no-JS; the layout effect replaces it with the measured
      // units-per-px once the SVG has a size. Constant, so React never rewrites
      // it and clobbers that measurement.
      style={
        { '--kg-zoom': String(bounds.h / canvasHeight), '--kg-dim': dimLevel } as CSSProperties
      }
      className={clsx(
        'kg relative',
        isConstellation ? 'kg--constellation' : 'kg--local',
        className
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: GRAPH_CSS }} />

      <div
        className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800"
        style={{ height: canvasHeight }}
      >
        <svg
          ref={svgRef}
          className="kg-svg"
          // The content box, so SSR and no-JS already frame the graph. Stable
          // per graph, so React does not rewrite it and clobber the measured
          // viewBox the layout effect writes.
          viewBox={`${round(bounds.x)} ${round(bounds.y)} ${round(bounds.w)} ${round(bounds.h)}`}
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
          role="group"
          aria-label={`${description} ${KEYBOARD_HELP}`}
          // Focusable only programmatically — Escape parks focus here on the
          // way out of the graph. Never a tab stop of its own.
          tabIndex={-1}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onPointerLeave={() => setFocus(null)}
          onBlur={unpark}
        >
          <title>{description}</title>
          <desc>
            Each dot is a note, sized by how many links it has and coloured by topic. Focus or hover
            a dot to isolate it and its neighbours; activate it to open the note. {KEYBOARD_HELP}
          </desc>
          {layers}
        </svg>

        {isConstellation && zoomed && (
          <button
            type="button"
            onClick={resetView}
            className="hover:border-primary-400 hover:text-primary-600 dark:hover:border-primary-500 dark:hover:text-primary-400 absolute top-3 right-3 rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 transition-colors dark:border-gray-600 dark:text-gray-300"
          >
            Reset view
          </button>
        )}
      </div>

      {isConstellation && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Drag to pan · hold <kbd className="font-mono">⌘</kbd>/
          <kbd className="font-mono">ctrl</kbd> and scroll — or pinch — to zoom.
        </p>
      )}

      {legendVisible && legendTopics.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {legendTopics.map((topic) => {
            const entry = TOPIC_COLORS[topic] ?? FALLBACK_TOPIC_COLOR
            const isOn = selected.includes(topic)
            return (
              <button
                key={topic}
                type="button"
                aria-pressed={isOn}
                onClick={() => toggleTopic(topic)}
                onPointerEnter={() => setPreview(topic)}
                onPointerLeave={() => setPreview(null)}
                onFocus={() => setPreview(topic)}
                onBlur={() => setPreview(null)}
                className={clsx(
                  'inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-medium transition-all duration-150 hover:-translate-y-px hover:shadow-sm',
                  isOn
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/80 dark:text-primary-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
                )}
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: `var(${topicCssVar(topic)}, ${entry.light})` }}
                />
                {entry.label}
              </button>
            )
          })}
          {selected.length > 0 && (
            <button
              type="button"
              onClick={() => setSelected([])}
              className="hover:text-primary-600 dark:hover:text-primary-400 ml-1 text-xs font-medium text-gray-500 transition-colors dark:text-gray-400"
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default KnowledgeGraph
