import {
  FALLBACK_TOPIC_COLOR,
  TOPIC_COLORS,
  TOPIC_ORDER,
} from '@/components/knowledge/graph-colors'
import type { PackedGraph } from '@/components/knowledge/packed-graph'

export interface MapCallbacks {
  /** A click on a node, or on empty field (`-1`). */
  onSelect: (index: number) => void
  /** A double click on a node, or Enter with one selected. */
  onOpen: (index: number) => void
  /** Whether the layout has kept any of the reader's pulling. */
  onDeformed: (deformed: boolean) => void
  /** Screen px along each edge covered by UI, read whenever the camera frames something. */
  insets?: () => Insets
}

export interface Insets {
  top: number
  right: number
  bottom: number
  left: number
}

const NO_INSETS: Insets = { top: 0, right: 0, bottom: 0, left: 0 }

/*
 * Physics, per fixed 1/60 s step. Every edge is a spring whose rest length is
 * its length in the server layout, and every node is tied to an anchor at its
 * layout position, so the untouched map is already at equilibrium and sleeps.
 * Dragging a node stretches its springs and pulls its neighbors after it; a
 * gravity well around the dragged node tugs at whatever is nearby, linked or
 * not. Strain past YIELD is partly kept: anchors and rest lengths set to
 * MEMORY of the furthest pull since the drag began, so a released node springs
 * most of the way back and the map remembers the rest. It is a ratchet against
 * the furthest pull, not a creep over time, so holding a node still does not
 * commit it.
 */
const STEP_MS = 1000 / 60
const MAX_STEPS = 4
const EDGE_K = 0.045
const ANCHOR_K = 0.02
const DAMPING = 0.89
const DAMPING_REDUCED = 0.6
const YIELD = 10
const MEMORY = 0.3
/** How quickly a remembered pull sets, per step. */
const SET_RATE = 0.08
const WELL_RADIUS = 280
const WELL_G = 900
const WELL_SOFT = 50
const COLLIDE_PAD = 4
const COLLIDE_K = 0.3
const MAX_SPEED = 50
const SLEEP_SPEED = 0.02
const SLEEP_STEPS = 45

/* Drawing. */
const MIN_R = 4
const MAX_R = 15
/** Zooming in spreads the field faster than it fattens the dots. */
const R_ZOOM_EXP = 0.55
/** Interleaved stroke batches per edge style, so overlapping edges compound. */
const EDGE_BATCHES = 16
const LABEL_PX = 12
const LABEL_LIMIT = 160
/** Hub labels shown at the whole-map zoom; grows with the square of zoom. */
const LABEL_BASE = 14
const HIDDEN_ALPHA = 0.07
const FADED_ALPHA = 0.16
const ZOOM_MIN = 0.6
const ZOOM_MAX = 14
/** Least zoom (screen px per layout unit) a focused note gets, so small screens see detail too. */
const FOCUS_K = 1.5

const TAU = Math.PI * 2

interface Ink {
  bg: string
  edge: string
  edgeO: number
  hot: string
  label: string
  ring: string
  accent: string
  topics: string[]
  fallback: string
}

type Gesture =
  | { kind: 'press'; id: number; x0: number; y0: number; node: number }
  | { kind: 'drag'; id: number; node: number; trail: { x: number; y: number; t: number }[] }
  | { kind: 'pan'; id: number; x: number; y: number; trail: { x: number; y: number; t: number }[] }
  | { kind: 'pinch'; d0: number; k0: number; wx: number; wy: number }

/** Neighbor lists as CSR: node `i`'s neighbors are `adj[start[i]..start[i+1])`. */
export function buildAdjacency(n: number, edges: number[]) {
  const start = new Uint32Array(n + 1)
  for (let e = 0; e < edges.length; e++) start[edges[e]! + 1]!++
  for (let i = 0; i < n; i++) start[i + 1]! += start[i]!
  const fill = start.slice(0, n)
  const adj = new Uint32Array(edges.length)
  for (let e = 0; e < edges.length; e += 2) {
    const a = edges[e]!
    const b = edges[e + 1]!
    adj[fill[a]!++] = b
    adj[fill[b]!++] = a
  }
  return { start, adj }
}

export class KnowledgeMapEngine {
  private readonly ctx: CanvasRenderingContext2D
  private readonly n: number
  private readonly titles: string[]
  private readonly topic: Int16Array
  private readonly rank: Uint32Array
  private readonly byDegree: Uint32Array
  private readonly radius: Float64Array
  private readonly mass: Float64Array
  private readonly hx: Float64Array
  private readonly hy: Float64Array
  private readonly px: Float64Array
  private readonly py: Float64Array
  private readonly vx: Float64Array
  private readonly vy: Float64Array
  private readonly ax: Float64Array
  private readonly ay: Float64Array
  private readonly fx: Float64Array
  private readonly fy: Float64Array
  private readonly ea: Uint32Array
  private readonly eb: Uint32Array
  private readonly rest0: Float64Array
  /** Anchors and rest lengths as they were when the current drag began. */
  private readonly bx: Float64Array
  private readonly by: Float64Array
  private readonly restBase: Float64Array
  /** Collision radius, never more than half the gap to the nearest neighbor at home. */
  private readonly space: Float64Array
  private readonly rest: Float64Array
  private readonly adjStart: Uint32Array
  private readonly adj: Uint32Array
  private readonly widths: Float64Array
  private readonly bounds: { x0: number; y0: number; x1: number; y1: number }

  private visible: Uint8Array
  private lit: Uint8Array
  private focus = -1
  private selected = -1
  private hovered = -1
  private dragging = -1

  private cam = { x: 0, y: 0, k: 1 }
  private fitK = 1
  private w = 0
  private h = 0
  private dpr = 1
  private sized = false
  private pendingView: (() => void) | null = null

  private awake = false
  private quietSteps = 0
  private acc = 0
  private lastTick = 0
  private frame = 0
  private flight: {
    from: { x: number; y: number; k: number }
    to: { x: number; y: number; k: number }
    t0: number
    ms: number
  } | null = null
  private glide: { vx: number; vy: number } | null = null
  private deformed = false

  private ink: Ink | null = null
  private font = ''
  private reducedMotion = false

  private gesture: Gesture | null = null
  private readonly pointers = new Map<number, { x: number; y: number }>()
  private lastClick = { node: -1, t: 0 }

  private cellHead = new Int32Array(0)
  private readonly cellNext: Int32Array

  private readonly cleanup: (() => void)[] = []

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly root: HTMLElement,
    graph: PackedGraph,
    private readonly cb: MapCallbacks
  ) {
    this.ctx = canvas.getContext('2d')!
    const n = (this.n = graph.nodes.length)
    this.titles = graph.nodes.map((node) => node[1])
    this.topic = Int16Array.from(graph.nodes, (node) => TOPIC_ORDER.indexOf(node[2]))
    this.hx = Float64Array.from(graph.nodes, (node) => node[3])
    this.hy = Float64Array.from(graph.nodes, (node) => node[4])
    this.px = this.hx.slice()
    this.py = this.hy.slice()
    this.ax = this.hx.slice()
    this.ay = this.hy.slice()
    this.vx = new Float64Array(n)
    this.vy = new Float64Array(n)
    this.fx = new Float64Array(n)
    this.fy = new Float64Array(n)
    this.widths = new Float64Array(n).fill(NaN)
    this.cellNext = new Int32Array(n)

    const maxDegree = Math.max(1, ...graph.nodes.map((node) => node[5]))
    this.radius = Float64Array.from(
      graph.nodes,
      (node) => MIN_R + (MAX_R - MIN_R) * Math.sqrt(node[5] / maxDegree)
    )
    this.mass = Float64Array.from(graph.nodes, (node) => 1 + Math.sqrt(node[5]) * 0.35)
    this.byDegree = Uint32Array.from(graph.nodes.map((_, i) => i)).sort(
      (a, b) => graph.nodes[b]![5] - graph.nodes[a]![5]
    )
    this.rank = new Uint32Array(n)
    this.byDegree.forEach((node, i) => (this.rank[node] = i))

    const m = graph.edges.length / 2
    this.ea = new Uint32Array(m)
    this.eb = new Uint32Array(m)
    this.rest0 = new Float64Array(m)
    for (let e = 0; e < m; e++) {
      const a = (this.ea[e] = graph.edges[e * 2]!)
      const b = (this.eb[e] = graph.edges[e * 2 + 1]!)
      this.rest0[e] = Math.hypot(this.hx[b]! - this.hx[a]!, this.hy[b]! - this.hy[a]!)
    }
    this.rest = this.rest0.slice()
    this.restBase = this.rest0.slice()
    this.bx = this.hx.slice()
    this.by = this.hy.slice()

    // The server layout packs some notes closer than their dots are wide. If
    // collisions held them to full size, the first wake would shove the whole
    // field apart, and memory would keep it there.
    this.space = Float64Array.from(this.radius, (r) => r + COLLIDE_PAD / 2)
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const half = Math.hypot(this.hx[j]! - this.hx[i]!, this.hy[j]! - this.hy[i]!) / 2
        if (half < this.space[i]!) this.space[i] = half
        if (half < this.space[j]!) this.space[j] = half
      }
    }
    const { start, adj } = buildAdjacency(n, graph.edges)
    this.adjStart = start
    this.adj = adj

    let x0 = Infinity
    let y0 = Infinity
    let x1 = -Infinity
    let y1 = -Infinity
    for (let i = 0; i < n; i++) {
      x0 = Math.min(x0, this.hx[i]! - MAX_R)
      y0 = Math.min(y0, this.hy[i]! - MAX_R)
      x1 = Math.max(x1, this.hx[i]! + MAX_R)
      y1 = Math.max(y1, this.hy[i]! + MAX_R)
    }
    this.bounds = n ? { x0, y0, x1, y1 } : { x0: 0, y0: 0, x1: 1, y1: 1 }
    this.cam = {
      x: (this.bounds.x0 + this.bounds.x1) / 2,
      y: (this.bounds.y0 + this.bounds.y1) / 2,
      k: 1,
    }

    this.visible = new Uint8Array(n).fill(1)
    this.lit = new Uint8Array(n)

    this.listen()
  }

  /* ---- public API -------------------------------------------------------- */

  setVisible(mask: Uint8Array) {
    this.visible = mask
    if (this.hovered >= 0 && !mask[this.hovered]) this.setHover(-1)
    this.invalidate()
  }

  setSelected(index: number) {
    if (index === this.selected) return
    this.selected = index
    this.refocus()
  }

  /** Centers a node in the uncovered view, zooming in if the view is still wide. */
  flyTo(index: number, animate = true) {
    this.whenSized(() => {
      const k = this.clampK(Math.max(this.cam.k, this.fitK * 2.6, FOCUS_K))
      this.moveCamera(this.centering(this.px[index]!, this.py[index]!, k), animate)
    })
  }

  /** Frames the given nodes, or the whole map. */
  fit(indices?: number[], animate = true) {
    this.whenSized(() => {
      let { x0, y0, x1, y1 } = this.bounds
      if (indices?.length) {
        x0 = y0 = Infinity
        x1 = y1 = -Infinity
        for (const i of indices) {
          x0 = Math.min(x0, this.px[i]! - MAX_R)
          y0 = Math.min(y0, this.py[i]! - MAX_R)
          x1 = Math.max(x1, this.px[i]! + MAX_R)
          y1 = Math.max(y1, this.py[i]! + MAX_R)
        }
      }
      const { top, right, bottom, left } = this.cb.insets?.() ?? NO_INSETS
      const k = this.clampK(
        this.frameK(x1 - x0, y1 - y0, this.w - left - right, this.h - top - bottom)
      )
      this.moveCamera(this.centering((x0 + x1) / 2, (y0 + y1) / 2, k), animate)
    })
  }

  zoomBy(factor: number) {
    const k = this.clampK(this.cam.k * factor)
    this.moveCamera({ x: this.cam.x, y: this.cam.y, k }, true, 260)
  }

  /** Lets go of everything the map remembers; the springs carry it home. */
  resetLayout() {
    this.ax.set(this.hx)
    this.ay.set(this.hy)
    this.rest.set(this.rest0)
    this.bx.set(this.hx)
    this.by.set(this.hy)
    this.restBase.set(this.rest0)
    this.setDeformed(false)
    this.wake()
  }

  destroy() {
    cancelAnimationFrame(this.frame)
    for (const off of this.cleanup) off()
  }

  /* ---- setup ------------------------------------------------------------- */

  private listen() {
    const { canvas } = this
    const on = <K extends keyof HTMLElementEventMap>(
      target: HTMLElement | Window,
      type: K,
      handler: (event: HTMLElementEventMap[K]) => void,
      options?: AddEventListenerOptions
    ) => {
      target.addEventListener(type, handler as EventListener, options)
      this.cleanup.push(() => target.removeEventListener(type, handler as EventListener, options))
    }

    on(canvas, 'pointerdown', (e) => this.onPointerDown(e))
    on(canvas, 'pointermove', (e) => this.onPointerMove(e))
    on(canvas, 'pointerup', (e) => this.onPointerUp(e))
    on(canvas, 'pointercancel', (e) => this.onPointerUp(e, true))
    on(canvas, 'pointerleave', (e) => {
      if (e.pointerType === 'mouse' && !this.gesture) this.setHover(-1)
    })
    on(canvas, 'wheel', (e) => this.onWheel(e), { passive: false })
    on(canvas, 'keydown', (e) => this.onKey(e))

    const resize = new ResizeObserver(([entry]) => {
      if (entry) this.resize(entry.contentRect.width, entry.contentRect.height)
    })
    resize.observe(canvas)
    this.cleanup.push(() => resize.disconnect())

    const theme = new MutationObserver(() => {
      this.ink = null
      this.invalidate()
    })
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    this.cleanup.push(() => theme.disconnect())

    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const onMotion = () => (this.reducedMotion = motion.matches)
    onMotion()
    motion.addEventListener('change', onMotion)
    this.cleanup.push(() => motion.removeEventListener('change', onMotion))

    // Labels are measured in the webfont; re-measure once it is in.
    let live = true
    this.cleanup.push(() => (live = false))
    void document.fonts?.ready.then(() => {
      if (!live) return
      this.font = ''
      this.invalidate()
    })
  }

  private resize(w: number, h: number) {
    if (w === 0 || h === 0) return
    const first = !this.sized
    const oldFit = this.fitK
    this.w = w
    this.h = h
    this.dpr = Math.min(window.devicePixelRatio || 1, 2)
    this.canvas.width = Math.round(w * this.dpr)
    this.canvas.height = Math.round(h * this.dpr)
    const { x0, y0, x1, y1 } = this.bounds
    this.fitK = this.frameK(x1 - x0, y1 - y0)
    this.sized = true
    if (first) {
      this.cam.k = this.fitK
      const pending = this.pendingView
      this.pendingView = null
      pending?.()
    } else {
      this.cam.k = this.clampK(this.cam.k * (this.fitK / oldFit))
    }
    this.draw()
  }

  private whenSized(fn: () => void) {
    if (this.sized) fn()
    else this.pendingView = fn
  }

  /** Scale that fits a world box in a `w`×`h` view (the whole canvas by default) with a margin. */
  private frameK(bw: number, bh: number, w = this.w, h = this.h) {
    const pad = Math.min(72, w * 0.06)
    return Math.min((w - pad * 2) / Math.max(bw, 1), (h - pad * 2) / Math.max(bh, 1))
  }

  /** The camera that puts world point (x, y) at the center of the uncovered view. */
  private centering(x: number, y: number, k: number) {
    const { top, right, bottom, left } = this.cb.insets?.() ?? NO_INSETS
    return { x: x - (left - right) / 2 / k, y: y - (top - bottom) / 2 / k, k }
  }

  private clampK(k: number) {
    return Math.min(this.fitK * ZOOM_MAX, Math.max(this.fitK * ZOOM_MIN, k))
  }

  private readInk(): Ink {
    const style = getComputedStyle(this.root)
    const dark = document.documentElement.classList.contains('dark')
    const v = (name: string) => style.getPropertyValue(name).trim()
    return {
      bg: v('--km-bg'),
      edge: v('--km-edge'),
      edgeO: parseFloat(v('--km-edge-o')) || 0.2,
      hot: v('--km-edge-hot'),
      label: v('--km-label'),
      ring: v('--km-ring'),
      accent: v('--km-accent'),
      topics: TOPIC_ORDER.map((topic) => TOPIC_COLORS[topic]![dark ? 'dark' : 'light']),
      fallback: dark ? FALLBACK_TOPIC_COLOR.dark : FALLBACK_TOPIC_COLOR.light,
    }
  }

  /* ---- state ------------------------------------------------------------- */

  private setHover(index: number) {
    if (index === this.hovered) return
    this.hovered = index
    this.canvas.style.cursor = index >= 0 ? 'pointer' : ''
    this.refocus()
  }

  /** The lit neighborhood follows a drag, then a hover, then the selection. */
  private refocus() {
    const focus =
      this.dragging >= 0 ? this.dragging : this.hovered >= 0 ? this.hovered : this.selected
    if (focus !== this.focus) {
      this.focus = focus
      this.lit.fill(0)
      if (focus >= 0) {
        this.lit[focus] = 1
        for (let j = this.adjStart[focus]!; j < this.adjStart[focus + 1]!; j++)
          this.lit[this.adj[j]!] = 1
      }
    }
    this.invalidate()
  }

  private setDeformed(deformed: boolean) {
    if (deformed === this.deformed) return
    this.deformed = deformed
    this.cb.onDeformed(deformed)
  }

  private moveCamera(to: { x: number; y: number; k: number }, animate: boolean, ms = 650) {
    this.glide = null
    if (!animate || this.reducedMotion) {
      this.flight = null
      this.cam = { ...to }
      this.invalidate()
      return
    }
    this.flight = { from: { ...this.cam }, to, t0: performance.now(), ms }
    this.invalidate()
  }

  private wake() {
    this.awake = true
    this.quietSteps = 0
    this.invalidate()
  }

  private invalidate() {
    if (this.frame) return
    this.frame = requestAnimationFrame((t) => this.tick(t))
  }

  /* ---- loop -------------------------------------------------------------- */

  private tick(now: number) {
    this.frame = 0
    const dt = this.lastTick ? Math.min(now - this.lastTick, 100) : STEP_MS
    this.lastTick = now
    let busy = false

    if (this.awake) {
      this.acc = Math.min(this.acc + dt, STEP_MS * MAX_STEPS)
      while (this.acc >= STEP_MS && this.awake) {
        this.step()
        this.acc -= STEP_MS
      }
      busy = this.awake
    }

    if (this.flight) {
      const { from, to, t0, ms } = this.flight
      const t = Math.min(1, (now - t0) / ms)
      const e = t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
      // Interpolate zoom geometrically so the move reads as one motion.
      this.cam = {
        x: from.x + (to.x - from.x) * e,
        y: from.y + (to.y - from.y) * e,
        k: from.k * (to.k / from.k) ** e,
      }
      if (t >= 1) this.flight = null
      else busy = true
    }

    if (this.glide) {
      const decay = Math.exp(-dt / 280)
      this.cam.x -= (this.glide.vx * dt) / this.cam.k
      this.cam.y -= (this.glide.vy * dt) / this.cam.k
      this.glide.vx *= decay
      this.glide.vy *= decay
      if (Math.hypot(this.glide.vx, this.glide.vy) < 0.01) this.glide = null
      else busy = true
    }

    this.draw()
    if (busy) this.invalidate()
    else this.lastTick = 0
  }

  private step() {
    const { n, px, py, vx, vy, fx, fy, ax, ay, bx, by, ea, eb, rest, restBase, mass } = this
    fx.fill(0)
    fy.fill(0)
    let deformedNow = false

    for (let e = 0; e < ea.length; e++) {
      const a = ea[e]!
      const b = eb[e]!
      const dx = px[b]! - px[a]!
      const dy = py[b]! - py[a]!
      const len = Math.hypot(dx, dy) || 1e-6
      const strain = len - rest[e]!
      const f = (EDGE_K * strain) / len
      fx[a]! += dx * f
      fy[a]! += dy * f
      fx[b]! -= dx * f
      fy[b]! -= dy * f
      const base = restBase[e]!
      const pulled = len - base
      if (Math.abs(pulled) > YIELD) {
        const target = base + (pulled - Math.sign(pulled) * YIELD) * MEMORY
        if (Math.abs(target - base) > Math.abs(rest[e]! - base)) {
          rest[e]! += (target - rest[e]!) * SET_RATE
          deformedNow = true
        }
      }
    }

    for (let i = 0; i < n; i++) {
      const dx = ax[i]! - px[i]!
      const dy = ay[i]! - py[i]!
      fx[i]! += dx * ANCHOR_K
      fy[i]! += dy * ANCHOR_K
      const ox = px[i]! - bx[i]!
      const oy = py[i]! - by[i]!
      const d = Math.hypot(ox, oy)
      if (d > YIELD) {
        const keep = (1 - YIELD / d) * MEMORY
        const tx = ox * keep
        const ty = oy * keep
        const sx = ax[i]! - bx[i]!
        const sy = ay[i]! - by[i]!
        if (tx * tx + ty * ty > sx * sx + sy * sy) {
          ax[i]! += (tx - sx) * SET_RATE
          ay[i]! += (ty - sy) * SET_RATE
          deformedNow = true
        }
      }
    }

    const well = this.dragging
    if (well >= 0) {
      const g = WELL_G * mass[well]!
      const wx = px[well]!
      const wy = py[well]!
      for (let i = 0; i < n; i++) {
        if (i === well) continue
        const dx = wx - px[i]!
        const dy = wy - py[i]!
        const d2 = dx * dx + dy * dy
        if (d2 > WELL_RADIUS * WELL_RADIUS) continue
        const d = Math.sqrt(d2) || 1e-6
        const falloff = 1 - d / WELL_RADIUS
        const f = ((g / (d2 + WELL_SOFT * WELL_SOFT)) * falloff * falloff) / d
        fx[i]! += dx * f
        fy[i]! += dy * f
      }
    }

    this.collide()

    const damping = this.reducedMotion ? DAMPING_REDUCED : DAMPING
    let fastest = 0
    for (let i = 0; i < n; i++) {
      if (i === well) continue
      let nvx = (vx[i]! + fx[i]! / mass[i]!) * damping
      let nvy = (vy[i]! + fy[i]! / mass[i]!) * damping
      const speed = Math.hypot(nvx, nvy)
      if (speed > MAX_SPEED) {
        nvx *= MAX_SPEED / speed
        nvy *= MAX_SPEED / speed
      }
      vx[i] = nvx
      vy[i] = nvy
      px[i]! += nvx
      py[i]! += nvy
      if (speed > fastest) fastest = speed
    }

    if (deformedNow) this.setDeformed(true)

    if (well < 0 && fastest < SLEEP_SPEED) {
      if (++this.quietSteps > SLEEP_STEPS) {
        this.awake = false
        vx.fill(0)
        vy.fill(0)
      }
    } else {
      this.quietSteps = 0
    }
  }

  /** Soft collisions on a uniform grid, so a pull never stacks dots. */
  private collide() {
    const { n, px, py, fx, fy, space, cellNext } = this
    const cell = MAX_R * 2 + COLLIDE_PAD
    let x0 = Infinity
    let y0 = Infinity
    let x1 = -Infinity
    let y1 = -Infinity
    for (let i = 0; i < n; i++) {
      x0 = Math.min(x0, px[i]!)
      y0 = Math.min(y0, py[i]!)
      x1 = Math.max(x1, px[i]!)
      y1 = Math.max(y1, py[i]!)
    }
    const cols = Math.floor((x1 - x0) / cell) + 1
    const rows = Math.floor((y1 - y0) / cell) + 1
    if (!(cols * rows < 4e5)) return
    if (this.cellHead.length < cols * rows) this.cellHead = new Int32Array(cols * rows)
    const head = this.cellHead
    head.fill(-1, 0, cols * rows)
    for (let i = 0; i < n; i++) {
      const c = Math.floor((px[i]! - x0) / cell) + Math.floor((py[i]! - y0) / cell) * cols
      cellNext[i] = head[c]!
      head[c] = i
    }
    for (let i = 0; i < n; i++) {
      const cx = Math.floor((px[i]! - x0) / cell)
      const cy = Math.floor((py[i]! - y0) / cell)
      for (let oy = -1; oy <= 1; oy++) {
        const ry = cy + oy
        if (ry < 0 || ry >= rows) continue
        for (let ox = -1; ox <= 1; ox++) {
          const rx = cx + ox
          if (rx < 0 || rx >= cols) continue
          for (let j = head[rx + ry * cols]!; j >= 0; j = cellNext[j]!) {
            if (j <= i) continue
            const dx = px[j]! - px[i]!
            const dy = py[j]! - py[i]!
            const min = space[i]! + space[j]!
            const d2 = dx * dx + dy * dy
            if (d2 >= min * min) continue
            const d = Math.sqrt(d2) || 1e-3
            const push = ((min - d) * COLLIDE_K) / d
            fx[i]! -= dx * push
            fy[i]! -= dy * push
            fx[j]! += dx * push
            fy[j]! += dy * push
          }
        }
      }
    }
  }

  /* ---- drawing ----------------------------------------------------------- */

  /** World radius a node is drawn at under the current zoom. */
  private drawScale() {
    const { k } = this.cam
    return (this.fitK * (k / this.fitK) ** R_ZOOM_EXP) / k
  }

  private draw() {
    if (!this.sized) return
    const { ctx, w, h, dpr, n, px, py, ea, eb, rest, visible, lit } = this
    const ink = (this.ink ??= this.readInk())
    const { x: cx, y: cy, k } = this.cam
    const ox = w / 2 - cx * k
    const oy = h / 2 - cy * k
    const rs = this.drawScale()
    const margin = 40 / k
    const vx0 = -ox / k - margin
    const vy0 = -oy / k - margin
    const vx1 = (w - ox) / k + margin
    const vy1 = (h - oy) / k + margin
    const focus = this.focus

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, w, h)
    ctx.setTransform(dpr * k, 0, 0, dpr * k, dpr * ox, dpr * oy)
    ctx.lineCap = 'round'

    /*
     * Edges. Overlapping strokes inside one path do not compound, and that
     * build-up is what makes hubs glow, so each style is dealt round-robin into
     * EDGE_BATCHES paths. Stretched springs draw stronger: the pull is visible.
     */
    const batches = new Map<number, number[]>()
    for (let e = 0; e < ea.length; e++) {
      const a = ea[e]!
      const b = eb[e]!
      if (!visible[a] || !visible[b]) continue
      const x1 = px[a]!
      const y1 = py[a]!
      const x2 = px[b]!
      const y2 = py[b]!
      if (
        (x1 < vx0 && x2 < vx0) ||
        (x1 > vx1 && x2 > vx1) ||
        (y1 < vy0 && y2 < vy0) ||
        (y1 > vy1 && y2 > vy1)
      )
        continue
      const hot = focus >= 0 && (a === focus || b === focus)
      let alpha = hot ? Math.min(1, ink.edgeO * 3.2) : ink.edgeO
      if (focus >= 0 && !hot) alpha *= 0.35
      const tension = Math.abs(Math.hypot(x2 - x1, y2 - y1) - rest[e]!) / (rest[e]! + 20)
      alpha = Math.min(1, alpha + Math.min(0.45, tension * 0.9))
      const key = ((hot ? 100 : 0) + Math.round(alpha * 40)) * EDGE_BATCHES + (e % EDGE_BATCHES)
      let segments = batches.get(key)
      if (!segments) batches.set(key, (segments = []))
      segments.push(x1, y1, x2, y2)
    }
    for (const key of [...batches.keys()].sort((a, b) => a - b)) {
      const style = Math.floor(key / EDGE_BATCHES)
      const hot = style >= 100
      const segments = batches.get(key)!
      ctx.strokeStyle = hot ? ink.hot : ink.edge
      ctx.globalAlpha = (style % 100) / 40
      ctx.lineWidth = (hot ? 1.5 : 1) / k
      ctx.beginPath()
      for (let i = 0; i < segments.length; i += 4) {
        ctx.moveTo(segments[i]!, segments[i + 1]!)
        ctx.lineTo(segments[i + 2]!, segments[i + 3]!)
      }
      ctx.stroke()
    }

    // Nodes: one fill per topic and emphasis.
    const groups = new Map<number, number[]>()
    for (let i = 0; i < n; i++) {
      const x = px[i]!
      const y = py[i]!
      if (x < vx0 || x > vx1 || y < vy0 || y > vy1) continue
      const tier = !visible[i] ? 2 : focus >= 0 && !lit[i] ? 1 : 0
      const key = (this.topic[i]! + 1) * 3 + tier
      let group = groups.get(key)
      if (!group) groups.set(key, (group = []))
      group.push(i)
    }
    for (const [key, group] of groups) {
      const topic = Math.floor(key / 3) - 1
      const tier = key % 3
      ctx.fillStyle = topic >= 0 ? ink.topics[topic]! : ink.fallback
      ctx.globalAlpha = tier === 2 ? HIDDEN_ALPHA : tier === 1 ? FADED_ALPHA : 1
      ctx.beginPath()
      for (const i of group) {
        const r = this.radius[i]! * rs * (i === this.selected ? 1.4 : 1)
        ctx.moveTo(px[i]! + r, py[i]!)
        ctx.arc(px[i]!, py[i]!, r, 0, TAU)
      }
      ctx.fill()
    }

    ctx.globalAlpha = 1
    if (this.selected >= 0) {
      const i = this.selected
      ctx.strokeStyle = ink.accent
      ctx.lineWidth = 2 / k
      ctx.beginPath()
      ctx.arc(px[i]!, py[i]!, this.radius[i]! * rs * 1.4 + 5 / k, 0, TAU)
      ctx.stroke()
    }
    if (focus >= 0 && focus !== this.selected) {
      ctx.strokeStyle = ink.ring
      ctx.lineWidth = 1.25 / k
      ctx.beginPath()
      ctx.arc(px[focus]!, py[focus]!, this.radius[focus]! * rs + 4 / k, 0, TAU)
      ctx.stroke()
    }

    this.drawLabels(ink, ox, oy, rs)
  }

  /**
   * Labels in screen space, placed greedily: the selection and the lit
   * neighborhood first, then hubs by degree, with more of the field labelled
   * the further in the reader zooms. Anything that would overlap a placed
   * label is skipped.
   */
  private drawLabels(ink: Ink, ox: number, oy: number, rs: number) {
    const { ctx, dpr, w, h, px, py, visible, lit, focus } = this
    const k = this.cam.k
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    if (!this.font) {
      const family = getComputedStyle(this.root).fontFamily
      this.font = `500 ${LABEL_PX}px ${family}`
      this.widths.fill(NaN)
    }
    ctx.font = this.font
    ctx.textBaseline = 'middle'
    ctx.lineJoin = 'round'
    ctx.lineWidth = 3
    ctx.strokeStyle = ink.bg
    ctx.fillStyle = ink.label

    const placed: number[] = []
    const budget = LABEL_BASE * (k / this.fitK) ** 2
    const fits = (x0: number, y0: number, x1: number, y1: number) => {
      for (let p = 0; p < placed.length; p += 4) {
        if (x0 < placed[p + 2]! && x1 > placed[p]! && y0 < placed[p + 3]! && y1 > placed[p + 1]!)
          return false
      }
      return true
    }
    const place = (i: number, priority: boolean) => {
      const sx = px[i]! * k + ox
      const sy = py[i]! * k + oy
      if (sx < -200 || sx > w + 40 || sy < -20 || sy > h + 20) return
      let width = this.widths[i]!
      if (Number.isNaN(width)) width = this.widths[i] = ctx.measureText(this.titles[i]!).width
      const r = this.radius[i]! * rs * k * (i === this.selected ? 1.4 : 1)
      let lx = sx + r + 6
      if (!fits(lx - 2, sy - 8, lx + width + 2, sy + 8)) {
        if (!priority) return
        lx = sx - r - 6 - width
        if (!fits(lx - 2, sy - 8, lx + width + 2, sy + 8)) return
      }
      placed.push(lx - 2, sy - 8, lx + width + 2, sy + 8)
      ctx.strokeText(this.titles[i]!, lx, sy)
      ctx.fillText(this.titles[i]!, lx, sy)
    }

    if (this.selected >= 0) place(this.selected, true)
    if (focus >= 0 && focus !== this.selected) place(focus, true)
    if (focus >= 0) {
      for (let j = this.adjStart[focus]!; j < this.adjStart[focus + 1]!; j++) {
        const i = this.adj[j]!
        if (visible[i] && i !== this.selected) place(i, false)
      }
    }
    // The budget counts visible notes, so a filtered view is labelled as
    // densely as the whole map.
    let ranked = 0
    for (let r = 0; r < this.n && placed.length < LABEL_LIMIT * 4; r++) {
      const i = this.byDegree[r]!
      if (!visible[i]) continue
      if (ranked++ >= budget) break
      if (i === focus || i === this.selected) continue
      if (focus >= 0 && !lit[i]) continue
      place(i, false)
    }
  }

  /* ---- input ------------------------------------------------------------- */

  private toWorld(sx: number, sy: number) {
    return {
      x: (sx - this.w / 2) / this.cam.k + this.cam.x,
      y: (sy - this.h / 2) / this.cam.k + this.cam.y,
    }
  }

  private local(e: PointerEvent | WheelEvent) {
    const rect = this.canvas.getBoundingClientRect()
    return { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }

  /** Nearest visible node under a screen point, within a forgiving radius. */
  private hit(sx: number, sy: number) {
    const { k } = this.cam
    const rs = this.drawScale() * k
    const { x, y } = this.toWorld(sx, sy)
    let best = -1
    let bestD = Infinity
    for (let i = 0; i < this.n; i++) {
      if (!this.visible[i]) continue
      const d = Math.hypot(this.px[i]! - x, this.py[i]! - y) * k
      const reach = Math.max(this.radius[i]! * rs + 4, 10)
      if (d < reach && d < bestD) {
        best = i
        bestD = d
      }
    }
    return best
  }

  private onPointerDown(e: PointerEvent) {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    this.canvas.focus({ preventScroll: true })
    this.canvas.setPointerCapture(e.pointerId)
    const p = this.local(e)
    this.pointers.set(e.pointerId, p)
    this.flight = null
    this.glide = null

    if (this.pointers.size === 2) {
      // A second finger turns whatever the first was doing into a pinch.
      this.releaseDrag(false)
      const [a, b] = [...this.pointers.values()] as [typeof p, typeof p]
      const mid = this.toWorld((a.x + b.x) / 2, (a.y + b.y) / 2)
      this.gesture = {
        kind: 'pinch',
        d0: Math.hypot(a.x - b.x, a.y - b.y) || 1,
        k0: this.cam.k,
        wx: mid.x,
        wy: mid.y,
      }
      return
    }
    if (this.pointers.size > 2) return
    this.gesture = { kind: 'press', id: e.pointerId, x0: p.x, y0: p.y, node: this.hit(p.x, p.y) }
  }

  private onPointerMove(e: PointerEvent) {
    const p = this.local(e)
    if (!this.pointers.has(e.pointerId)) {
      if (e.pointerType !== 'touch') this.setHover(this.hit(p.x, p.y))
      return
    }
    this.pointers.set(e.pointerId, p)
    const g = this.gesture
    if (!g) return
    const now = performance.now()

    if (g.kind === 'pinch') {
      const [a, b] = [...this.pointers.values()] as [typeof p, typeof p]
      const k = this.clampK((g.k0 * Math.hypot(a.x - b.x, a.y - b.y)) / g.d0)
      this.cam = {
        k,
        x: g.wx - ((a.x + b.x) / 2 - this.w / 2) / k,
        y: g.wy - ((a.y + b.y) / 2 - this.h / 2) / k,
      }
      this.invalidate()
      return
    }
    if (g.id !== e.pointerId) return

    if (g.kind === 'press') {
      if (Math.hypot(p.x - g.x0, p.y - g.y0) < (e.pointerType === 'touch' ? 8 : 4)) return
      if (g.node >= 0) {
        this.dragging = g.node
        this.gesture = { kind: 'drag', id: g.id, node: g.node, trail: [] }
        this.bx.set(this.ax)
        this.by.set(this.ay)
        this.restBase.set(this.rest)
        this.canvas.style.cursor = 'grabbing'
        this.refocus()
      } else {
        this.gesture = { kind: 'pan', id: g.id, x: g.x0, y: g.y0, trail: [] }
        this.canvas.style.cursor = 'grabbing'
      }
      this.onPointerMove(e)
      return
    }

    if (g.kind === 'drag') {
      const world = this.toWorld(p.x, p.y)
      this.px[g.node] = world.x
      this.py[g.node] = world.y
      g.trail.push({ x: world.x, y: world.y, t: now })
      while (g.trail.length > 2 && now - g.trail[0]!.t > 80) g.trail.shift()
      this.wake()
      return
    }

    // Pan.
    this.cam.x -= (p.x - g.x) / this.cam.k
    this.cam.y -= (p.y - g.y) / this.cam.k
    g.x = p.x
    g.y = p.y
    g.trail.push({ x: p.x, y: p.y, t: now })
    while (g.trail.length > 2 && now - g.trail[0]!.t > 80) g.trail.shift()
    this.invalidate()
  }

  private onPointerUp(e: PointerEvent, cancelled = false) {
    if (!this.pointers.delete(e.pointerId)) return
    const g = this.gesture
    if (g?.kind === 'pinch') {
      if (this.pointers.size === 0) this.gesture = null
      return
    }
    if (!g || g.id !== e.pointerId) return
    if (g.kind === 'drag') {
      this.releaseDrag(!cancelled)
      this.canvas.style.cursor = this.hovered >= 0 ? 'pointer' : ''
      return
    }
    this.gesture = null
    this.canvas.style.cursor = this.hovered >= 0 ? 'pointer' : ''

    if (g.kind === 'press' && !cancelled) {
      const now = performance.now()
      if (g.node >= 0 && this.lastClick.node === g.node && now - this.lastClick.t < 350) {
        this.cb.onOpen(g.node)
        this.lastClick = { node: -1, t: 0 }
        return
      }
      this.lastClick = { node: g.node, t: now }
      this.cb.onSelect(g.node)
      return
    }
    if (g.kind === 'pan' && !cancelled && !this.reducedMotion && g.trail.length > 1) {
      const a = g.trail[0]!
      const b = g.trail[g.trail.length - 1]!
      const dt = b.t - a.t
      if (dt > 0 && performance.now() - b.t < 60) {
        this.glide = { vx: (b.x - a.x) / dt, vy: (b.y - a.y) / dt }
        this.invalidate()
      }
    }
  }

  /** Lets a dragged node go, flinging it with the pointer's last velocity. */
  private releaseDrag(fling: boolean) {
    const g = this.gesture
    if (g?.kind !== 'drag') return
    const i = g.node
    if (fling && !this.reducedMotion && g.trail.length > 1) {
      const a = g.trail[0]!
      const b = g.trail[g.trail.length - 1]!
      const steps = (b.t - a.t) / STEP_MS
      if (steps > 0 && performance.now() - b.t < 60) {
        this.vx[i] = (b.x - a.x) / steps
        this.vy[i] = (b.y - a.y) / steps
      }
    }
    this.dragging = -1
    this.gesture = null
    this.refocus()
    this.wake()
  }

  private onWheel(e: WheelEvent) {
    e.preventDefault()
    this.flight = null
    this.glide = null
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? this.h : 1
    const dx = e.deltaX * unit
    const dy = e.deltaY * unit
    if (e.ctrlKey || e.metaKey) {
      // Pinch on a trackpad arrives as ctrl+wheel in small steps; a mouse
      // wheel with the modifier arrives in big ones, so clamp.
      const p = this.local(e)
      const before = this.toWorld(p.x, p.y)
      this.cam.k = this.clampK(this.cam.k * Math.exp(-Math.max(-60, Math.min(60, dy)) * 0.01))
      const after = this.toWorld(p.x, p.y)
      this.cam.x += before.x - after.x
      this.cam.y += before.y - after.y
    } else {
      // Plain scrolling moves around the field, like a page.
      this.cam.x += (e.shiftKey && !dx ? dy : dx) / this.cam.k
      this.cam.y += (e.shiftKey && !dx ? 0 : dy) / this.cam.k
    }
    this.invalidate()
  }

  private onKey(e: KeyboardEvent) {
    const pan = 90 / this.cam.k
    switch (e.key) {
      case 'ArrowLeft':
        this.cam.x -= pan
        break
      case 'ArrowRight':
        this.cam.x += pan
        break
      case 'ArrowUp':
        this.cam.y -= pan
        break
      case 'ArrowDown':
        this.cam.y += pan
        break
      case '+':
      case '=':
        this.zoomBy(1.4)
        break
      case '-':
      case '_':
        this.zoomBy(1 / 1.4)
        break
      case '0':
        this.fit()
        break
      case 'Escape':
        this.cb.onSelect(-1)
        break
      case 'Enter':
        if (this.selected >= 0) this.cb.onOpen(this.selected)
        break
      default:
        return
    }
    e.preventDefault()
    this.flight = null
    this.invalidate()
  }
}
