'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

interface WaveParams {
  freq: number
  amp: number
  phase: number
}

interface LineConfig {
  baseY: number
  strokeWidth: number
  lightShade: number
  darkShade: number
  lightOpacity: number
  darkOpacity: number
  waves: WaveParams[]
  duration: number
}

const BASE_LINES: Omit<LineConfig, 'waves'>[] = [
  {
    baseY: 0.1,
    strokeWidth: 2.5,
    lightShade: 400,
    darkShade: 700,
    lightOpacity: 0.3,
    darkOpacity: 0.2,
    duration: 30,
  },
  {
    baseY: 0.22,
    strokeWidth: 2.0,
    lightShade: 300,
    darkShade: 800,
    lightOpacity: 0.35,
    darkOpacity: 0.25,
    duration: 25,
  },
  {
    baseY: 0.35,
    strokeWidth: 1.8,
    lightShade: 500,
    darkShade: 600,
    lightOpacity: 0.38,
    darkOpacity: 0.28,
    duration: 35,
  },
  {
    baseY: 0.45,
    strokeWidth: 1.5,
    lightShade: 400,
    darkShade: 700,
    lightOpacity: 0.4,
    darkOpacity: 0.3,
    duration: 22,
  },
  {
    baseY: 0.55,
    strokeWidth: 1.2,
    lightShade: 300,
    darkShade: 800,
    lightOpacity: 0.45,
    darkOpacity: 0.35,
    duration: 28,
  },
  {
    baseY: 0.65,
    strokeWidth: 1.0,
    lightShade: 500,
    darkShade: 600,
    lightOpacity: 0.5,
    darkOpacity: 0.38,
    duration: 32,
  },
  {
    baseY: 0.78,
    strokeWidth: 0.8,
    lightShade: 400,
    darkShade: 700,
    lightOpacity: 0.55,
    darkOpacity: 0.4,
    duration: 20,
  },
  {
    baseY: 0.9,
    strokeWidth: 0.5,
    lightShade: 300,
    darkShade: 800,
    lightOpacity: 0.6,
    darkOpacity: 0.45,
    duration: 26,
  },
]

function catmullRomToBezier(points: [number, number][]): string {
  if (points.length < 2) return ''
  let d = `M${points[0]![0]},${points[0]![1]}`

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)]!
    const p1 = points[i]!
    const p2 = points[i + 1]!
    const p3 = points[Math.min(i + 2, points.length - 1)]!

    d += ` C${p1[0] + (p2[0] - p0[0]) / 6},${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6},${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]},${p2[1]}`
  }

  return d
}

function buildPath(w: number, h: number, baseY: number, waves: WaveParams[]): string {
  const step = 20
  const points: [number, number][] = []

  for (let x = -step; x <= w + step; x += step) {
    const t = x / w
    let y = baseY * h
    for (const wave of waves) {
      y += wave.amp * h * Math.sin(wave.freq * t * Math.PI * 2 + wave.phase)
    }
    points.push([x, y])
  }

  return catmullRomToBezier(points)
}

export function WaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState<{ w: number; h: number } | null>(null)
  const [isDark, setIsDark] = useState(false)

  const seedsRef = useRef<number[] | null>(null)
  if (seedsRef.current === null) {
    seedsRef.current = Array.from({ length: 50 }, () => Math.random())
  }
  const seeds = seedsRef.current

  const lines = useMemo((): LineConfig[] => {
    const base: WaveParams[] = [
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

    return BASE_LINES.map((cfg, i) => ({
      ...cfg,
      waves: base.map((bw, wi) => ({
        freq: bw.freq * (0.9 + seeds[10 + i * 3 + wi]! * 0.2),
        amp: bw.amp * (0.7 + seeds[20 + i * 3 + wi]! * 0.6),
        phase: bw.phase + i * 0.4 + wi * 0.2,
      })),
    }))
  }, [seeds])

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setSize({ w: rect.width, h: rect.height })
    }
    measure()
    setIsDark(document.documentElement.classList.contains('dark'))

    let tid: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(tid)
      tid = setTimeout(measure, 150)
    }
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      clearTimeout(tid)
    }
  }, [])

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  const paths = useMemo(() => {
    if (!size) return []
    return lines.map((l) => buildPath(size.w, size.h, l.baseY, l.waves))
  }, [size, lines])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {size && paths.length > 0 && (
        <svg
          width={size.w}
          height={size.h}
          viewBox={`0 0 ${size.w} ${size.h}`}
          fill="none"
          style={{
            maskImage: `linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)`,
            maskComposite: 'intersect',
            WebkitMaskImage: `linear-gradient(to bottom, black 50%, transparent 100%), linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)`,
            WebkitMaskComposite: 'source-in',
          }}
        >
          {paths.map((d, i) => {
            const line = lines[i]!
            const shade = isDark ? line.darkShade : line.lightShade
            return (
              <path
                key={i}
                d={d}
                strokeWidth={line.strokeWidth}
                opacity={isDark ? line.darkOpacity : line.lightOpacity}
                fill="none"
                className="wave-line"
                style={
                  {
                    stroke: `var(--color-primary-${shade})`,
                    '--wave-duration': `${line.duration}s`,
                    '--wave-delay': `-${i * 8}s`,
                  } as React.CSSProperties
                }
              />
            )
          })}
        </svg>
      )}
    </div>
  )
}
