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
   * cross-topic neighbors as context. Any legend selection overrides it.
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

/** Max zoom relative to the whole-graph fit. */
const MAX_ZOOM = 6

/**
 * Roughly how many notes should share the canvas at rest. The vault long ago
 * outgrew a single screenful: 345 nodes fitted to a 590px card is a hairball
 * where no dot is separable from its neighbors. So the constellation now opens
 * on a *region* — zoomed to about this many notes — and the whole map is what
 * you get by zooming out, rather than the other way round.
 */
const HOME_DENSITY = 55

/** Ceiling on that resting zoom, so a big vault never opens claustrophobically. */
const MAX_HOME_ZOOM = 3.2

/**
 * How far out of the resting view you can zoom before resting labels are hidden.
 * They are placed for the home region; much beyond it they collide on screen.
 */
const LABEL_FADE_RATIO = 1.35

/**
 * Resting zoom for a graph of `count` nodes. Scales with the square root of the
 * count because the canvas is two-dimensional, and bottoms out at 1.
 *
 * `regional` is false for anything already scoped to a subject — a domain map or
 * a note's local graph. Those are bounded things the reader came to see whole,
 * and opening them on a slice both hides most of the answer and lets the frame
 * cut through labels at its edge. Only the whole-vault constellation, which no
 * screen can hold, opens on a region.
 */
const homeZoomFor = (count: number, regional: boolean) =>
  regional ? clamp(Math.sqrt(count / HOME_DENSITY), 1, MAX_HOME_ZOOM) : 1

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

/**
 * Fallback mean glyph advance for Space Grotesk at 500 weight, in em. Used only
 * for the server render and the first client pass, before the real font can be
 * measured — it runs ~45% wide against measured text, which is exactly why the
 * measurement below exists.
 */
const LABEL_CHAR_WIDTH = 0.62

/**
 * Real text width in em, via a 2D canvas.
 *
 * A per-character average cannot know that "Illicit" and "Warmth" are nowhere
 * near the same width, so it has to be sized for the worst case and is then far
 * too fat for everything else — measured, the constant over-estimated by ~32%
 * at the median and never under-estimated at all. Every one of those wasted
 * units is space a neighboring label could have used, so the label budget paid
 * for the guess. Measuring at 100px and dividing keeps one cached context for
 * every font size, and results are memoized per string.
 */
const emWidths = new Map<string, number>()
let measureCtx: CanvasRenderingContext2D | null | undefined

const textEm = (text: string): number => {
  const cached = emWidths.get(text)
  if (cached !== undefined) return cached

  if (measureCtx === undefined) {
    const ctx = document.createElement('canvas').getContext('2d')
    if (ctx) ctx.font = `500 100px "Space Grotesk", ui-sans-serif, system-ui, sans-serif`
    measureCtx = ctx
  }

  const em = measureCtx ? measureCtx.measureText(text).width / 100 : text.length * LABEL_CHAR_WIDTH
  emWidths.set(text, em)
  return em
}

/** Label box height as a multiple of font size. */
const LABEL_LINE_HEIGHT = 1.15

/** Fudge on the estimated label size, since the true render scale is measured. */
const LABEL_SAFETY = 1.15

/** Titles longer than this are split across two lines, if they have a space. */
const LABEL_WRAP_OVER = 15

/**
 * Split a long title at the word break nearest its middle.
 *
 * Length, not crowding, is what loses a label: measured across the densest
 * topics, the notes left unlabeled sat mid-map, not at the rim, and ran 17–28
 * characters. One long box cannot find a gap that two short ones fit easily.
 */
const wrapTitle = (title: string): string[] => {
  if (title.length <= LABEL_WRAP_OVER) return [title]
  const words = title.split(' ')
  if (words.length < 2) return [title]

  const middle = title.length / 2
  let best = 1
  let bestDelta = Infinity
  let run = -1
  for (let i = 0; i < words.length - 1; i++) {
    run += words[i]!.length + 1
    const delta = Math.abs(run - middle)
    if (delta < bestDelta) {
      bestDelta = delta
      best = i + 1
    }
  }
  return [words.slice(0, best).join(' '), words.slice(best).join(' ')]
}

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

const GRAPH_CSS = `
.kg{
  --kg-zoom:1;
  --kg-bg:oklch(0.99 0.005 75);
  --kg-fallback:${FALLBACK_TOPIC_COLOR.light};
  --kg-edge:oklch(0.707 0.015 50);
  /* Lower than it once was: the constellation now rests zoomed in, where the
     edges crossing a screenful include long ones bound for nodes far outside
     it. At the old weight that traffic read as hatching over the whole card. */
  --kg-edge-o:.2;
  --kg-edge-hot:oklch(0.446 0.02 50);
  --kg-label:oklch(0.373 0.02 50);
  --kg-ring:oklch(0.446 0.02 50);
  ${topicVarBlock('light')}
}
:where(.dark) .kg{
  --kg-bg:oklch(0.14 0.01 60);
  --kg-fallback:${FALLBACK_TOPIC_COLOR.dark};
  --kg-edge:oklch(0.707 0.015 50);
  --kg-edge-o:.26;
  --kg-edge-hot:oklch(0.872 0.01 55);
  --kg-label:oklch(0.872 0.01 55);
  --kg-ring:oklch(0.707 0.015 50);
  ${topicVarBlock('dark')}
}
${topicFillRules}

.kg-svg{display:block;width:100%;height:100%;overflow:visible;touch-action:auto;}
/*
 * pan-y, not none: the browser keeps vertical scrolling, so the page still
 * scrolls through the card, while horizontal drags come to us as pointer events
 * and pan the map. Without this the constellation would open on a region that a
 * touch user had no way to leave.
 */
.kg--constellation .kg-svg{cursor:grab;touch-action:pan-y;}
.kg--constellation .kg-svg[data-panning='1']{cursor:grabbing;}

/*
 * Edge width is derived from --kg-zoom rather than vector-effect:non-scaling-stroke.
 * Both hold a 1px on-screen stroke at any zoom, but non-scaling-stroke makes the
 * engine re-derive stroke geometry in screen space per element per frame, and at
 * 2.3k edges that alone cost 35ms/frame unthrottled and 122ms at 4x CPU throttle
 * (measured). Reading a single inherited custom property is ~5x cheaper and, more
 * importantly, has flat variance — the pathological frames disappear entirely.
 * Any stroke-width on an edge must therefore be expressed in --kg-zoom units.
 */
.kg-edge{stroke:var(--kg-edge);stroke-width:calc(var(--kg-zoom) * 1px);stroke-linecap:round;fill:none;}
.kg--constellation .kg-edge{opacity:var(--kg-edge-o);}
/* The local map is a dozen nodes in a small rail — it never had the crowding
   that pushed the constellation's weight down, so it keeps the old value. */
.kg--local .kg-edge{opacity:calc(var(--kg-edge-o) + .46);}

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

/* Resting labels are placed for the home region. Zoomed well out of it they
   would collide on screen, so they stand down and leave the shape of the map. */
.kg[data-far] .kg-label--pinned:not(.kg-label--active){opacity:0;visibility:hidden;}

/* Node focus: the hovered/focused node plus its direct neighbors stay lit. */
.kg[data-focus] .kg-node:not(.kg-on){opacity:.1;}
.kg[data-focus] .kg-label:not(.kg-on){opacity:0;}
.kg[data-focus] .kg-edge:not(.kg-on){opacity:.05;}
.kg[data-focus] .kg-edge.kg-on{opacity:.95;stroke:var(--kg-edge-hot);stroke-width:calc(var(--kg-zoom) * 1.6px);}
.kg[data-focus] .kg-node--active:not(.kg-on){opacity:1;}
.kg[data-focus] .kg-label.kg-hot,
.kg[data-focus] .kg-label--active{opacity:1;visibility:visible;}

.kg-node.kg-hot .kg-ring,
.kg-node--active .kg-ring,
.kg-node:focus-visible .kg-ring{opacity:1;}
.kg-node:focus-visible .kg-ring{stroke:var(--color-primary-500,var(--kg-ring));stroke-width:2.5;}

/*
 * Filtering. Both modes classify every element the same way — inside the
 * selection, reaching out of it (one endpoint in), or outside — and differ only
 * in how hard they mute. Edges have to be judged by *both* endpoints, which is
 * why this is applied per element rather than by an attribute selector on the
 * root.
 *
 * Forced, because these have to beat the focus layer: an excluded node is still
 * the neighbor of an included one, and would otherwise light up with it.
 *
 * hard — a legend selection. At 345 nodes a dim does not read as "excluded";
 * a few hundred elements at 7% still sum to a gray haze. So these leave
 * essentially nothing behind, and go inert so they cannot be hovered or
 * clicked through the emptiness.
 */
.kg[data-mode='hard'] .kg-node.kg-out{opacity:.05 !important;pointer-events:none !important;}
.kg[data-mode='hard'] .kg-edge.kg-out{opacity:.03 !important;}
.kg[data-mode='hard'] .kg-label.kg-out{opacity:0 !important;visibility:hidden !important;}
.kg[data-mode='hard'] .kg-edge.kg-reach{opacity:.16 !important;}

/*
 * soft — a topic page showing what its domain touches. Those neighbors are
 * context worth reading and worth clicking, so they stay legible and live.
 */
.kg[data-mode='soft'] .kg-node.kg-out{opacity:.3 !important;}
.kg[data-mode='soft'] .kg-label.kg-out{opacity:.55 !important;}
.kg[data-mode='soft'] .kg-edge.kg-out{opacity:.06 !important;}
.kg[data-mode='soft'] .kg-edge.kg-reach{opacity:.3 !important;}

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
  active: boolean
}

/**
 * Split from `RenderNode` because label placement is the only part of the
 * drawing that depends on the legend selection. Keeping them apart is what lets
 * a chip toggle re-render ~345 `<text>` elements instead of reconciling the
 * ~3.7k nodes and edges as well.
 */
interface RenderLabel {
  id: string
  title: string
  /** The title as rendered — one line, or two when it was too long to place. */
  lines: string[]
  topic: string
  active: boolean
  pinned: boolean
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
  anchor: RenderLabel['anchor'],
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

/**
 * Where the map opens. Biased to the better-connected half of the vault, so the
 * opening region has structure in it — a uniform pick lands in the sparse rim
 * about half the time. Deliberately random per load: the vault is far larger
 * than one screenful now, and a fixed origin would mean most of it is never the
 * first thing anyone sees. Client-side only — the *layout* stays deterministic,
 * it is only the camera that moves.
 */
const pickOrigin = (nodes: RenderNode[]): { x: number; y: number } | null => {
  if (nodes.length === 0) return null
  // `nodes` arrives in descending-degree order.
  const pool = nodes.slice(0, Math.max(1, Math.ceil(nodes.length / 2)))
  const choice = pool[Math.floor(Math.random() * pool.length)] ?? pool[0]!
  return { x: choice.x, y: choice.y }
}

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
  /** Only the unfocused, whole-vault constellation opens on a region. */
  const opensOnRegion = isConstellation && !focusTopic
  const canvasHeight = height ?? (isConstellation ? 590 : 300)
  const legendVisible = showLegend ?? isConstellation

  /**
   * Measured canvas, in CSS px. Label placement needs the real aspect ratio:
   * in a narrow sidebar it is the *width* that binds the fit, which makes the
   * rendered label far larger in user units than a height-only estimate says,
   * and a too-small estimate is what lets labels overprint and clip.
   */
  const [canvas, setCanvas] = useState<{ w: number; h: number } | null>(null)

  /**
   * Text measurement is trusted only once the webfont has actually loaded —
   * measuring against the fallback face would size every label wrongly. Gated
   * together with `canvas`, both of which are null until after the first
   * client render, so the server render and hydration still agree.
   */
  const [fontsReady, setFontsReady] = useState(false)
  useEffect(() => {
    if (typeof document === 'undefined' || !('fonts' in document)) return
    let live = true
    void document.fonts.ready.then(() => {
      if (live) setFontsReady(true)
    })
    return () => {
      live = false
    }
  }, [])

  const measured = canvas !== null && fontsReady

  /* ---- legend selection -------------------------------------------------- */

  /*
   * Declared above the layout because label placement depends on it: when a
   * selection is active the labels have to describe *that* selection, or the
   * map annotates hubs the reader just filtered away.
   */
  const [selected, setSelected] = useState<string[]>([])
  const [preview, setPreview] = useState<string | null>(null)

  /**
   * A legend click is a *hard* filter — everything outside it is muted to the
   * point of disappearing and made inert. `focusTopic` is a *soft* one: on a
   * topic page the neighboring topics are context worth seeing and worth
   * clicking, so they only dim. Hover preview counts as hard, so pointing at a
   * legend chip shows exactly what selecting it would give you.
   */
  const selectionTopics = useMemo(() => {
    if (preview) return new Set([preview])
    return selected.length > 0 ? new Set(selected) : null
  }, [preview, selected])

  /* ---- derived geometry, computed once per graph ------------------------- */

  const nodeById = useMemo(() => new Map(graph.nodes.map((node) => [node.id, node])), [graph.nodes])

  /** Adjacency, built once. Drives the hover focus set without any re-render. */
  const neighbors = useMemo(() => {
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
  const geometry = useMemo<{ nodes: RenderNode[]; bounds: Bounds; fontUser: number }>(() => {
    const total = graph.nodes.length
    if (total === 0) return { nodes: [], bounds: EMPTY_BOUNDS, fontUser: 12 }

    const maxDegree = Math.max(1, ...graph.nodes.map((node) => node.degree))
    // Label everything only while it still reads — a depth-2 local graph can
    // run to 70+ nodes, which at 300px is a wall of overlapping text.
    const labelEveryNode = !isConstellation && total <= DENSE_LABEL_LIMIT
    // Local maps are tuned for a depth-1 neighborhood (~10 nodes); a deeper
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
    // Divided by the resting zoom: labels are placed for the region the graph
    // actually opens on, not for the fully zoomed-out fit. At home zoom a label
    // covers less of the layout, so far more of them find a clear slot.
    const homeZoom = homeZoomFor(total, opensOnRegion)
    const fontUser = (((12 * viewH) / Math.max(canvasH, 1)) * LABEL_SAFETY) / homeZoom || 12

    const nodes: RenderNode[] = ranked.map(({ node, index, isActive, r }) => ({
      id: node.id,
      title: node.title,
      topic: node.topic,
      x: Math.round(node.x * 10) / 10,
      y: Math.round(node.y * 10) / 10,
      r: Math.round(r * 100) / 100,
      degree: node.degree,
      delay: Math.round((index / total) * ENTRANCE_SPREAD),
      active: isActive,
    }))

    return { nodes, bounds, fontUser }
  }, [graph.nodes, isConstellation, opensOnRegion, activeId, canvasHeight, canvas])

  const renderNodes = geometry.nodes
  const bounds = geometry.bounds

  /**
   * Label placement — the one part of the drawing that must follow the legend
   * selection. Every candidate is offered a label and the greedy collision pass
   * is the budget; that only works because labels are sized for the home region,
   * where a title covers a small fraction of the layout. At the old
   * whole-graph sizing this would have produced a solid block of text.
   */
  const renderLabels = useMemo<RenderLabel[]>(() => {
    const { nodes, bounds, fontUser } = geometry
    if (nodes.length === 0) return []

    const labelEveryNode = !isConstellation && nodes.length <= DENSE_LABEL_LIMIT
    /*
     * Rank the labels within the *visible* set. Ranking globally and filtering
     * afterwards spent the whole budget on hubs the selection had just hidden,
     * which is what left a filtered view with no legible titles at all.
     */
    const eligible = selectionTopics
      ? nodes.filter((node) => selectionTopics.has(node.topic))
      : nodes
    const wanted = new Set(eligible.map((node) => node.id))
    if (activeId) wanted.add(activeId)

    /*
     * Seeded with the dots themselves, not just with labels already placed:
     * collision against labels alone was enough when only a dozen were drawn,
     * but in a densely labeled region a title that clears its neighboring
     * titles will still happily land on top of an unrelated node.
     *
     * Only the *visible* dots block, though. Seeding this with all of them left
     * an isolated topic sparsely labeled for no visible reason — its titles
     * were being turned away by nodes the selection had already hidden.
     */
    const taken: Box[] = eligible.map((node) => ({
      x0: node.x - node.r,
      x1: node.x + node.r,
      y0: node.y - node.r,
      y1: node.y + node.r,
    }))
    /*
     * The note being read gets first pick, then this page's own domain, then
     * the best connected (`nodes` already arrives in descending-degree order).
     * `focusTopic` only *reorders* — it must not exclude, because a topic map
     * exists to show what the domain touches, and naming only its own notes
     * would leave every neighbor anonymous.
     */
    const priority = (node: RenderNode) =>
      Number(node.active) * 2 + (focusTopic && node.topic === focusTopic ? 1 : 0)
    const placementOrder = [...nodes].sort((a, b) => priority(b) - priority(a))
    const out: RenderLabel[] = []

    for (const node of placementOrder) {
      const lines = wrapTitle(node.title)
      const longest = Math.max(
        ...lines.map((line) => (measured ? textEm(line) : line.length * LABEL_CHAR_WIDTH))
      )
      const w = Math.max(longest * fontUser, fontUser)
      const ascent = fontUser * 0.82
      const lineH = fontUser * LABEL_LINE_HEIGHT
      // `ty` is the first line's baseline, so the extra lines hang below it and
      // simply deepen the box. Every candidate below stays a one-liner's math.
      const descent = fontUser * (LABEL_LINE_HEIGHT - 0.82) + (lines.length - 1) * lineH
      const gap = fontUser * 0.4
      // Side slots center the whole block on the node, not just its first line.
      const midShift = ((lines.length - 1) * lineH) / 2

      // Diagonal reach, on both axes at once.
      const d = (node.r + gap) * 0.7071

      const candidates: { tx: number; ty: number; anchor: RenderLabel['anchor']; box: Box }[] = [
        // The four orthogonal slots first, in order of how well they read.
        boxed(node.x, node.y + node.r + gap + ascent, 'middle', w, ascent, descent),
        boxed(
          node.x - node.r - gap,
          node.y + fontUser * 0.34 - midShift,
          'end',
          w,
          ascent,
          descent
        ),
        boxed(
          node.x + node.r + gap,
          node.y + fontUser * 0.34 - midShift,
          'start',
          w,
          ascent,
          descent
        ),
        boxed(node.x, node.y - node.r - gap - descent, 'middle', w, ascent, descent),
        /*
         * Then the diagonals. Four slots left the densest topics (Method, Play,
         * Meaning) ~20% unlabeled once isolated — the orthogonal slots of
         * close-packed neighbors contend for exactly the same space, while the
         * gaps between them go unused. Eight is the standard point-label model
         * and costs nothing: the search stops at the first slot that fits.
         */
        boxed(node.x + d, node.y + d + ascent * 0.6, 'start', w, ascent, descent),
        boxed(node.x - d, node.y + d + ascent * 0.6, 'end', w, ascent, descent),
        boxed(node.x + d, node.y - d, 'start', w, ascent, descent),
        boxed(node.x - d, node.y - d, 'end', w, ascent, descent),
      ]

      let chosen = candidates[0]!
      let pinned = false
      if (labelEveryNode || wanted.has(node.id)) {
        // Must clear every label already placed AND sit inside the frame, so
        // nothing clips at an edge. If no slot fits it loses its label rather
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

      out.push({
        id: node.id,
        title: node.title,
        lines,
        topic: node.topic,
        active: node.active,
        pinned,
        tx: Math.round(chosen.tx * 10) / 10,
        ty: Math.round(chosen.ty * 10) / 10,
        anchor: chosen.anchor,
      })
    }

    return out
  }, [geometry, isConstellation, activeId, focusTopic, selectionTopics, measured])

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

  /* ---- hard filter — applied imperatively, zero re-render ----------------- */

  /**
   * The active filter, whichever kind it is. A legend selection is hard and
   * takes precedence; a topic page's `focusTopic` is the soft fallback.
   */
  const filterMode = selectionTopics ? 'hard' : focusTopic ? 'soft' : undefined

  const filterTopics = selectionTopics ?? (focusTopic ? new Set([focusTopic]) : null)

  /** Node ids inside that filter; null when there is no filter at all. */
  const filterIds = useMemo(() => {
    if (!filterTopics) return null
    const ids = new Set<string>()
    for (const node of renderNodes) if (filterTopics.has(node.topic)) ids.add(node.id)
    return ids
    // `filterTopics` is rebuilt each render; its contents are what matter.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionTopics, focusTopic, renderNodes])

  /** Only a hard filter makes nodes inert; soft context stays clickable. */
  const selectedIds = selectionTopics ? filterIds : null

  /*
   * Written straight to the DOM rather than through props, for the same reason
   * hover focus is: the node and edge layers must not reconcile on a chip
   * toggle. Safe because neither layer's `className` prop ever changes after
   * mount, so React will not overwrite what we set here. Labels are the
   * exception — their class genuinely changes with the selection, so they carry
   * it declaratively instead.
   */
  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current
    if (!root) return

    for (const el of root.querySelectorAll('.kg-node, .kg-label')) {
      el.classList.toggle('kg-out', !!filterIds && !filterIds.has(el.getAttribute('data-node')!))
    }

    for (const el of root.querySelectorAll('.kg-edge')) {
      if (!filterIds) {
        el.classList.remove('kg-out', 'kg-reach')
        continue
      }
      const a = filterIds.has(el.getAttribute('data-s')!)
      const b = filterIds.has(el.getAttribute('data-t')!)
      // Both ends inside: the selection's own structure, drawn normally. One end
      // inside: where the selection reaches, kept faint. Neither: muted.
      el.classList.toggle('kg-out', !a && !b)
      el.classList.toggle('kg-reach', a !== b)
    }
  }, [filterIds])

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
      for (const neighbor of neighbors.get(id) ?? []) ids.add(neighbor)

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
    [neighbors]
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
    () =>
      renderNodes
        // A filtered-out node is inert to the pointer; it has to be inert to the
        // keyboard too, or Tab and the arrows walk into invisible dots.
        .filter((node) => !selectedIds || selectedIds.has(node.id))
        .sort((a, b) => b.degree - a.degree || a.id.localeCompare(b.id)),
    [renderNodes, selectedIds]
  )

  /**
   * The graph is one tab stop, not 345. This node carries `tabIndex=0` on the
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
    // Focusing fires onFocus, which lights the node and its neighbors.
    next.focus()
  }, [])

  /*
   * Exactly one node is tabbable at a time, and which one is managed entirely
   * here rather than through a prop — a `tabIndex` prop would re-render all ~345
   * nodes whenever the roving stop moved. Re-asserted when the filter changes,
   * because the stop may have just been filtered out from under us.
   */
  useEffect(() => {
    const root = rootRef.current
    if (!root || parked.current) return

    const current = root.querySelector('.kg-node[tabindex="0"]')
    const currentId = current?.getAttribute('data-node')
    if (currentId && (!selectedIds || selectedIds.has(currentId))) return

    current?.setAttribute('tabindex', '-1')
    if (!initialRovingId) return
    root
      .querySelector(`.kg-node[data-node="${cssEscape(initialRovingId)}"]`)
      ?.setAttribute('tabindex', '0')
  }, [initialRovingId, selectedIds])

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
        if (selectedIds && !selectedIds.has(node.id)) continue
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
    [renderNodes, selectedIds]
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
   * container's aspect ratio and centered on the *content* — which both fills
   * the canvas and keeps the aspect ratio undistorted.
   */
  const fit = useRef<Bounds>({ ...bounds })
  /** The resting region: where the graph opens, and where Reset returns to. */
  const home = useRef<Bounds>({ ...bounds })
  const view = useRef<Bounds>({ ...bounds })
  /**
   * Which note the opening region centers on, picked once per mount and kept
   * across resizes so a window drag does not re-roll the view out from under
   * the reader. Chosen on the client only — `lib/knowledge.ts` positions must
   * stay byte-identical across processes, so the randomness lives here, in the
   * camera, never in the layout.
   */
  const origin = useRef<{ x: number; y: number } | null>(null)
  /** Rendered size of the SVG in CSS px, refreshed by the ResizeObserver. */
  const size = useRef({ w: 0, h: 0 })
  /** Last `--kg-zoom` written, so a pan does not rewrite an unchanged value. */
  const zoomUnits = useRef<number | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const zoomedRef = useRef(false)

  /** Pending coalesced commit, if any. */
  const frame = useRef(0)

  /**
   * The only place that touches the DOM for a view change. Wheel and pointermove
   * both fire faster than frames render — on a throttled CPU, several times
   * faster — so committing per event does redundant work that is never painted.
   */
  const commitView = useCallback(() => {
    frame.current = 0
    const v = view.current
    const root = rootRef.current

    svgRef.current?.setAttribute('viewBox', `${v.x} ${v.y} ${v.w} ${v.h}`)
    // User units per CSS px — labels and edges multiply by it to hold a constant
    // size on screen at any container size or zoom level. Written only when it
    // actually moves: a pan leaves it untouched, and rewriting it would dirty
    // the stroke-width of every edge and the font-size of every label for a
    // value that did not change.
    const unitsPerPx = size.current.h > 0 ? v.h / size.current.h : 1
    if (unitsPerPx !== zoomUnits.current) {
      zoomUnits.current = unitsPerPx
      root?.style.setProperty('--kg-zoom', String(unitsPerPx))
    }

    // Resting labels are placed for the home region; once the view is much
    // wider than that they would collide on screen, so they step aside and
    // leave the shape of the map.
    const h = home.current
    root?.toggleAttribute('data-far', v.w > h.w * LABEL_FADE_RATIO)

    // "Moved away from home", not "moved away from the whole-graph fit" —
    // the graph no longer rests at the fit.
    const next = Math.abs(v.w - h.w) > 0.5 || Math.abs(v.x - h.x) > 0.5 || Math.abs(v.y - h.y) > 0.5
    if (next !== zoomedRef.current) {
      zoomedRef.current = next
      setZoomed(next)
    }
  }, [])

  /**
   * Clamps synchronously, then commits on the next frame. The clamp cannot be
   * deferred with the write: handlers compound on `view.current` between frames,
   * so leaving it unclamped lets a fast wheel overshoot the zoom limit and snap
   * back once the frame lands. `immediate` is for the pre-paint fit, where a
   * deferred write would flash the SSR'd viewBox.
   */
  const applyView = useCallback(
    (immediate = false) => {
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

      if (immediate || typeof requestAnimationFrame === 'undefined') {
        if (frame.current) cancelAnimationFrame(frame.current)
        commitView()
        return
      }
      if (!frame.current) frame.current = requestAnimationFrame(commitView)
    },
    [bounds, commitView]
  )

  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current)
    },
    []
  )

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

    /*
     * The home region: the fit, divided down by the resting zoom and centered on
     * the origin note. `applyView` clamps it back inside the content, so an
     * origin near an edge simply yields the corner region rather than a view
     * hanging off the side of the map.
     */
    const f = fit.current
    const zoom = homeZoomFor(renderNodes.length, opensOnRegion)
    // A graph that already fits stays centered on its content; only a map bigger
    // than its canvas gets an origin. Offsetting a full-size view would just be
    // clamped straight back, leaving home somewhere the view can never sit —
    // which is what made "Reset view" appear on a graph that had not moved.
    if (zoom > 1 && !origin.current) origin.current = pickOrigin(renderNodes)
    const spot = origin.current ?? { x: f.x + f.w / 2, y: f.y + f.h / 2 }
    const w = f.w / zoom
    const h = f.h / zoom
    // Clamped exactly as `applyView` will clamp it, so home is always a view the
    // graph can actually rest at.
    const [xa, xb] = [bounds.x, bounds.x + bounds.w - w]
    const [ya, yb] = [bounds.y, bounds.y + bounds.h - h]
    home.current = {
      w,
      h,
      x: clamp(spot.x - w / 2, Math.min(xa, xb), Math.max(xa, xb)),
      y: clamp(spot.y - h / 2, Math.min(ya, yb), Math.max(ya, yb)),
    }

    view.current = { ...home.current }
    applyView(true)
  }, [applyView, bounds, renderNodes, opensOnRegion])

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
      // Touch is allowed now — `touch-action: pan-y` leaves vertical scrolling
      // to the browser, so accepting these does not trap the page.
      if (!isConstellation || event.button !== 0) return
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

  const toggleTopic = useCallback((topic: string) => {
    setSelected((current) =>
      current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]
    )
  }, [])

  /* ---- render ------------------------------------------------------------ */

  /*
   * Three separately memoized layers. Edges and nodes depend only on the graph,
   * so a legend toggle, a pan, or a zoom never reconciles those ~2.7k elements —
   * the selection reaches them through `kg-out` instead. Labels are the one
   * layer that genuinely has to re-place when the selection moves.
   */
  const edgeLayer = useMemo(
    () => (
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
          />
        ))}
      </g>
    ),
    [renderEdges]
  )

  const nodeLayer = useMemo(
    () => (
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
            // The roving stop is assigned imperatively; a prop here would
            // re-render every node each time it moved.
            tabIndex={-1}
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
    ),
    [renderNodes, setFocus, navigate, handleNodeKey]
  )

  const labelLayer = useMemo(
    () => (
      <g className="kg-labels" aria-hidden="true">
        {renderLabels.map((label) => (
          <text
            key={label.id}
            className={clsx(
              'kg-label',
              label.pinned && 'kg-label--pinned',
              label.active && 'kg-label--active'
              // `kg-out` is added by the filter layout effect, which owns it for
              // nodes, edges and labels alike.
            )}
            data-node={label.id}
            data-topic={label.topic}
            x={label.tx}
            y={label.ty}
            textAnchor={label.anchor}
          >
            {label.lines.length === 1
              ? label.title
              : // `x` is repeated per line: without it a tspan continues from
                // where the previous one ended rather than returning to the anchor.
                label.lines.map((line, index) => (
                  <tspan key={line} x={label.tx} dy={index === 0 ? 0 : `${LABEL_LINE_HEIGHT}em`}>
                    {line}
                  </tspan>
                ))}
          </text>
        ))}
      </g>
    ),
    [renderLabels]
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
      data-mode={filterMode}
      // Seeded for SSR / no-JS; the layout effect replaces it with the measured
      // units-per-px once the SVG has a size. Constant, so React never rewrites
      // it and clobbers that measurement.
      style={{ '--kg-zoom': String(bounds.h / canvasHeight) } as CSSProperties}
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
            Each dot is a note, sized by how many links it has and colored by topic. Focus or hover
            a dot to isolate it and its neighbors; activate it to open the note. {KEYBOARD_HELP}
          </desc>
          {edgeLayer}
          {nodeLayer}
          {labelLayer}
        </svg>

        {isConstellation && zoomed && (
          <button
            type="button"
            onClick={resetView}
            className="hover:border-primary-400 hover:text-primary-600 dark:hover:border-primary-500 dark:hover:text-primary-400 absolute top-3 right-3 cursor-pointer rounded-full border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 transition-colors dark:border-gray-600 dark:text-gray-300"
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
                  'inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-medium transition-all duration-150 hover:-translate-y-px hover:shadow-sm',
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
              className="hover:text-primary-600 dark:hover:text-primary-400 ml-1 cursor-pointer text-xs font-medium text-gray-500 transition-colors dark:text-gray-400"
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
