'use client'

import { useEffect, useRef } from 'react'

// ——— Spring physics ———

interface Spring {
  x: number
  y: number
  vx: number
  vy: number
}

const SPRING_K = 0.02
const SPRING_D = 0.9

function stepSpring(s: Spring, tx: number, ty: number) {
  s.vx = (s.vx + (tx - s.x) * SPRING_K) * SPRING_D
  s.vy = (s.vy + (ty - s.y) * SPRING_K) * SPRING_D
  s.x += s.vx
  s.y += s.vy
}

// ——— Holographic palette (HSL) ———

interface HSL {
  h: number
  s: number
  l: number
}

const HOLO_LIGHT: HSL[] = [
  { h: 15, s: 80, l: 72 },
  { h: 40, s: 85, l: 70 },
  { h: 170, s: 55, l: 60 },
  { h: 280, s: 45, l: 68 },
  { h: 210, s: 55, l: 68 },
  { h: 350, s: 70, l: 72 },
  { h: 15, s: 80, l: 72 },
]

const HOLO_DARK: HSL[] = [
  { h: 15, s: 65, l: 52 },
  { h: 40, s: 70, l: 50 },
  { h: 170, s: 45, l: 45 },
  { h: 280, s: 38, l: 52 },
  { h: 210, s: 48, l: 50 },
  { h: 350, s: 55, l: 52 },
  { h: 15, s: 65, l: 52 },
]

function holoColor(palette: HSL[], t: number, alpha: number): string {
  const tt = ((t % 1) + 1) % 1
  const scaled = tt * (palette.length - 1)
  const i = Math.floor(scaled)
  const f = scaled - i
  const a = palette[i]!
  const b = palette[Math.min(i + 1, palette.length - 1)]!

  let dh = b.h - a.h
  if (dh > 180) dh -= 360
  if (dh < -180) dh += 360

  return `hsla(${a.h + dh * f}, ${a.s + (b.s - a.s) * f}%, ${a.l + (b.l - a.l) * f}%, ${alpha})`
}

// ——— Wave configuration ———

interface LineConfig {
  baseY: number
  strokeWidth: number
  lightAlpha: number
  darkAlpha: number
  speed: number
}

const LINES: LineConfig[] = [
  { baseY: 0.1, strokeWidth: 2.5, lightAlpha: 0.35, darkAlpha: 0.22, speed: 0.08 },
  { baseY: 0.22, strokeWidth: 2.0, lightAlpha: 0.38, darkAlpha: 0.26, speed: 0.065 },
  { baseY: 0.35, strokeWidth: 1.8, lightAlpha: 0.4, darkAlpha: 0.28, speed: 0.09 },
  { baseY: 0.45, strokeWidth: 1.5, lightAlpha: 0.42, darkAlpha: 0.3, speed: 0.055 },
  { baseY: 0.55, strokeWidth: 1.2, lightAlpha: 0.45, darkAlpha: 0.32, speed: 0.07 },
  { baseY: 0.65, strokeWidth: 1.0, lightAlpha: 0.48, darkAlpha: 0.35, speed: 0.085 },
  { baseY: 0.78, strokeWidth: 0.8, lightAlpha: 0.52, darkAlpha: 0.38, speed: 0.06 },
  { baseY: 0.9, strokeWidth: 0.5, lightAlpha: 0.55, darkAlpha: 0.4, speed: 0.075 },
]

// ——— Wave math ———

interface WaveP {
  freq: number
  amp: number
  phase: number
}

function makeWaves(seeds: number[], li: number): WaveP[] {
  const base: WaveP[] = [
    { freq: 0.6 + seeds[0]! * 0.5, amp: 0.04 + seeds[1]! * 0.03, phase: seeds[2]! * Math.PI * 2 },
    {
      freq: 1.2 + seeds[3]! * 0.8,
      amp: 0.015 + seeds[4]! * 0.015,
      phase: seeds[5]! * Math.PI * 2,
    },
    {
      freq: 2.0 + seeds[6]! * 1.5,
      amp: 0.005 + seeds[7]! * 0.008,
      phase: seeds[8]! * Math.PI * 2,
    },
  ]
  return base.map((bw, wi) => ({
    freq: bw.freq * (0.9 + seeds[10 + li * 3 + wi]! * 0.2),
    amp: bw.amp * (0.7 + seeds[20 + li * 3 + wi]! * 0.6),
    phase: bw.phase + li * 0.4 + wi * 0.2,
  }))
}

const SEGMENTS = 64
const MOUSE_RADIUS = 0.25
const MOUSE_PULL = 0.1
const RIPPLE_AMP = 12

// ——— Internal state (stable across renders, mutated in rAF) ———

interface AnimState {
  seeds: number[]
  waves: WaveP[][]
  mouse: { x: number; y: number }
  spring: Spring
  isDark: boolean
  time: number
  raf: number
  reducedMotion: boolean
}

export function WaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef<AnimState | null>(null)

  if (!stateRef.current) {
    const seeds = Array.from({ length: 50 }, () => Math.random())
    stateRef.current = {
      seeds,
      waves: LINES.map((_, i) => makeWaves(seeds, i)),
      mouse: { x: 0.5, y: 0.5 },
      spring: { x: 0.5, y: 0.5, vx: 0, vy: 0 },
      isDark: false,
      time: 0,
      raf: 0,
      reducedMotion: false,
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d', { alpha: true })!
    const state = stateRef.current!
    state.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ——— Sizing ———

    let dpr = window.devicePixelRatio || 1

    const resize = () => {
      const rect = container.getBoundingClientRect()
      dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }
    resize()

    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }
    window.addEventListener('resize', onResize)

    // ——— Dark mode ———

    state.isDark = document.documentElement.classList.contains('dark')
    const obs = new MutationObserver(() => {
      state.isDark = document.documentElement.classList.contains('dark')
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // ——— Mouse tracking ———

    const onMouse = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      state.mouse.x = (e.clientX - rect.left) / rect.width
      state.mouse.y = (e.clientY - rect.top) / rect.height
    }
    window.addEventListener('mousemove', onMouse, { passive: true })

    // ——— Device orientation (mobile fallback) ———

    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma != null && e.beta != null) {
        state.mouse.x = 0.5 + (e.gamma / 90) * 0.4
        state.mouse.y = 0.5 + ((e.beta - 45) / 90) * 0.3
      }
    }
    window.addEventListener('deviceorientation', onOrient, { passive: true })

    // ——— Reduced motion listener ———

    const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotionPref = (e: MediaQueryListEvent) => {
      state.reducedMotion = e.matches
    }
    mqReduced.addEventListener('change', onMotionPref)

    // ——— Draw loop ———

    let last = performance.now()

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      if (!state.reducedMotion) {
        state.time += dt
        stepSpring(state.spring, state.mouse.x, state.mouse.y)
      }

      const w = canvas.width / dpr
      const h = canvas.height / dpr
      const mx = state.spring.x
      const my = state.spring.y
      const palette = state.isDark ? HOLO_DARK : HOLO_LIGHT

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      for (let li = 0; li < LINES.length; li++) {
        const cfg = LINES[li]!
        const waves = state.waves[li]!
        const phaseT = state.time * cfg.speed
        const alpha = state.isDark ? cfg.darkAlpha : cfg.lightAlpha

        // ——— Compute wave points ———

        const step = w / SEGMENTS
        const pts: [number, number][] = []

        for (let pi = 0; pi <= SEGMENTS; pi++) {
          const x = pi * step
          const t = x / w

          let y = cfg.baseY * h
          for (const wv of waves) {
            y += wv.amp * h * Math.sin(wv.freq * t * Math.PI * 2 + wv.phase + phaseT)
          }

          if (!state.reducedMotion) {
            const dx = t - mx
            const dy = cfg.baseY - my
            const dist = Math.sqrt(dx * dx + dy * dy)
            const pull = Math.exp(-(dist * dist) / (2 * MOUSE_RADIUS * MOUSE_RADIUS))

            // Gravitational pull toward cursor
            y += (my * h - y) * pull * MOUSE_PULL
            // Ripple emanating from cursor position
            y += Math.sin((t - mx) * Math.PI * 6 + state.time * 1.5) * pull * RIPPLE_AMP
          }

          pts.push([x, y])
        }

        // ——— Stroke wave with holographic gradient ———

        const strokeWave = (lineW: number, a: number) => {
          ctx.beginPath()
          ctx.moveTo(pts[0]![0], pts[0]![1])

          for (let i = 0; i < pts.length - 1; i++) {
            const p0 = pts[Math.max(i - 1, 0)]!
            const p1 = pts[i]!
            const p2 = pts[i + 1]!
            const p3 = pts[Math.min(i + 2, pts.length - 1)]!

            ctx.bezierCurveTo(
              p1[0] + (p2[0] - p0[0]) / 6,
              p1[1] + (p2[1] - p0[1]) / 6,
              p2[0] - (p3[0] - p1[0]) / 6,
              p2[1] - (p3[1] - p1[1]) / 6,
              p2[0],
              p2[1]
            )
          }

          // Gradient shifts diagonally based on cursor position
          const gx = (mx - 0.5) * w * 0.5
          const gy = (my - 0.5) * h * 0.15
          const grad = ctx.createLinearGradient(-w * 0.15 + gx, gy, w * 1.15 + gx, -gy)

          const stops = 8
          const shift = mx * 0.5 + state.time * 0.02 + li * 0.13
          for (let si = 0; si < stops; si++) {
            const pos = si / (stops - 1)
            grad.addColorStop(pos, holoColor(palette, pos + shift, a))
          }

          ctx.strokeStyle = grad
          ctx.lineWidth = lineW
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          ctx.stroke()
        }

        // Glow pass — wider, faint stroke for holographic sheen
        if (li % 2 === 0) {
          strokeWave(cfg.strokeWidth * 4, alpha * 0.15)
        }

        // Main stroke
        strokeWave(cfg.strokeWidth, alpha)
      }

      state.raf = requestAnimationFrame(frame)
    }

    state.raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(state.raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('deviceorientation', onOrient)
      mqReduced.removeEventListener('change', onMotionPref)
      obs.disconnect()
      clearTimeout(resizeTimer)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          maskImage:
            'linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
          maskComposite: 'intersect',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)',
          WebkitMaskComposite: 'source-in',
        }}
      />
    </div>
  )
}
