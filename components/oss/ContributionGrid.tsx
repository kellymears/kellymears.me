'use client'

import { useState, useEffect, useRef } from 'react'
import type { ContributionData, ContributionStats } from '@/lib/github'

interface ContributionGridProps {
  data: ContributionData
  stats: ContributionStats
}

const CELL_SIZE = 13
const CELL_GAP = 3
const CELL_STEP = CELL_SIZE + CELL_GAP
const DAY_LABEL_WIDTH = 32
const MONTH_LABEL_HEIGHT = 18

const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', ''] as const
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

const LEVEL_FILL = [
  'fill-primary-100 dark:fill-primary-950',
  'fill-primary-200 dark:fill-primary-800',
  'fill-primary-400 dark:fill-primary-600',
  'fill-primary-600 dark:fill-primary-400',
  'fill-primary-700 dark:fill-primary-300',
] as const

const LEVEL_BG = [
  'bg-primary-100 dark:bg-primary-950',
  'bg-primary-200 dark:bg-primary-800',
  'bg-primary-400 dark:bg-primary-600',
  'bg-primary-600 dark:bg-primary-400',
  'bg-primary-700 dark:bg-primary-300',
] as const

function getLevel(count: number, quartiles: [number, number, number]): number {
  if (count === 0) return 0
  if (count <= quartiles[0]) return 1
  if (count <= quartiles[1]) return 2
  if (count <= quartiles[2]) return 3
  return 4
}

function computeQuartiles(weeks: ContributionData['weeks']): [number, number, number] {
  const counts = weeks
    .flatMap((w) => w.contributionDays)
    .map((d) => d.contributionCount)
    .filter((c) => c > 0)
    .sort((a, b) => a - b)

  if (counts.length === 0) return [1, 2, 3]

  const q1 = counts[Math.floor(counts.length * 0.25)] ?? 1
  const q2 = counts[Math.floor(counts.length * 0.5)] ?? 2
  const q3 = counts[Math.floor(counts.length * 0.75)] ?? 3

  return [q1, q2, q3]
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

export function ContributionGrid({ data, stats }: ContributionGridProps) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const sheenRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const sheen = sheenRef.current
    if (!card) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return
      const ry = (e.gamma / 90) * 4
      const rx = ((e.beta - 45) / 90) * 3

      card.style.transform = `perspective(800px) rotateX(${-rx}deg) rotateY(${ry}deg)`

      if (sheen) {
        const x = 50 + (e.gamma / 90) * 40
        const y = 50 + ((e.beta - 45) / 90) * 30
        sheen.style.background = `radial-gradient(ellipse at ${x}% ${y}%, hsla(40, 80%, 70%, 0.12) 0%, transparent 60%)`
      }
    }

    window.addEventListener('deviceorientation', onOrient, { passive: true })
    return () => {
      window.removeEventListener('deviceorientation', onOrient)
      card.style.transform = ''
    }
  }, [])

  if (data.weeks.length === 0) return null

  const quartiles = computeQuartiles(data.weeks)

  const renderGrid = (weeks: ContributionData['weeks'], label?: string) => {
    const weekCount = weeks.length
    const svgWidth = DAY_LABEL_WIDTH + weekCount * CELL_STEP
    const svgHeight = MONTH_LABEL_HEIGHT + 7 * CELL_STEP

    const monthLabels: { label: string; x: number }[] = []
    let lastMonth = -1
    for (let wi = 0; wi < weeks.length; wi++) {
      const firstDay = weeks[wi]!.contributionDays[0]
      if (!firstDay) continue
      const month = new Date(firstDay.date + 'T00:00:00').getMonth()
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTHS[month]!, x: DAY_LABEL_WIDTH + wi * CELL_STEP })
        lastMonth = month
      }
    }

    return (
      <div className="relative">
        {label && <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">{label}</p>}
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          role="img"
          aria-label={`GitHub contribution grid showing ${stats.totalContributions} contributions over the past year`}
          className="w-full"
          style={{ overflow: 'visible' }}
        >
          {monthLabels.map((m, i) => (
            <text
              key={i}
              x={m.x}
              y={12}
              className="fill-gray-500 dark:fill-gray-400"
              style={{ fontSize: '11px' }}
            >
              {m.label}
            </text>
          ))}

          {DAY_LABELS.map((lbl, i) =>
            lbl ? (
              <text
                key={i}
                x={0}
                y={MONTH_LABEL_HEIGHT + i * CELL_STEP + CELL_SIZE - 1}
                className="fill-gray-500 dark:fill-gray-400"
                style={{ fontSize: '11px' }}
              >
                {lbl}
              </text>
            ) : null
          )}

          {weeks.map((week, wi) => {
            const existingDays = new Set(week.contributionDays.map((d) => d.weekday))
            return (
              <g key={wi}>
                {Array.from({ length: 7 }, (_, dayIdx) =>
                  existingDays.has(dayIdx) ? null : (
                    <rect
                      key={`placeholder-${dayIdx}`}
                      x={DAY_LABEL_WIDTH + wi * CELL_STEP}
                      y={MONTH_LABEL_HEIGHT + dayIdx * CELL_STEP}
                      width={CELL_SIZE}
                      height={CELL_SIZE}
                      rx={3}
                      className="fill-gray-200/40 dark:fill-gray-700/20"
                    />
                  )
                )}
                {week.contributionDays.map((day) => {
                  const level = getLevel(day.contributionCount, quartiles)
                  const x = DAY_LABEL_WIDTH + wi * CELL_STEP
                  const y = MONTH_LABEL_HEIGHT + day.weekday * CELL_STEP
                  const dateLabel = `${day.contributionCount} contribution${day.contributionCount !== 1 ? 's' : ''} on ${formatDate(day.date)}`

                  return (
                    <rect
                      key={day.date}
                      x={x}
                      y={y}
                      width={CELL_SIZE}
                      height={CELL_SIZE}
                      rx={3}
                      className={`${LEVEL_FILL[level]} cursor-pointer transition-opacity outline-none hover:opacity-75`}
                      aria-label={dateLabel}
                      tabIndex={0}
                      onMouseEnter={(e) => {
                        const rect = (e.target as SVGElement).getBoundingClientRect()
                        const container = (e.target as SVGElement)
                          .closest('.relative')
                          ?.getBoundingClientRect()
                        if (container) {
                          setTooltip({
                            x: rect.left - container.left + rect.width / 2,
                            y: rect.top - container.top - 8,
                            text: dateLabel,
                          })
                        }
                      }}
                      onMouseLeave={() => setTooltip(null)}
                      onFocus={(e) => {
                        const rect = (e.target as SVGElement).getBoundingClientRect()
                        const container = (e.target as SVGElement)
                          .closest('.relative')
                          ?.getBoundingClientRect()
                        if (container) {
                          setTooltip({
                            x: rect.left - container.left + rect.width / 2,
                            y: rect.top - container.top - 8,
                            text: dateLabel,
                          })
                        }
                      }}
                      onBlur={() => setTooltip(null)}
                    />
                  )
                })}
              </g>
            )
          })}
        </svg>

        {tooltip && (
          <div
            className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-lg dark:bg-gray-100 dark:text-gray-900"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            {tooltip.text}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100" />
          </div>
        )}
      </div>
    )
  }

  const statItems = [
    { value: stats.totalContributions.toLocaleString(), label: 'Total' },
    { value: `${stats.activeDays}/${stats.totalDays}`, label: 'Active days' },
    { value: `${stats.longestStreak}d`, label: 'Longest streak' },
    { value: stats.maxDay.toString(), label: 'Max / day' },
  ]

  return (
    <section className="animate-on-scroll py-8" aria-label="GitHub contribution activity">
      <div
        ref={cardRef}
        className="border-t-primary-400/60 dark:border-t-primary-600/40 relative rounded-2xl border border-t-2 border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-8 dark:border-gray-800 dark:bg-gray-900/50 dark:shadow-gray-950/50 dark:hover:shadow-lg dark:hover:shadow-gray-950/50"
        style={{ transition: 'transform 0.15s ease-out', willChange: 'transform' }}
      >
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Contributions
          </h2>
        </div>

        <div className="hidden md:block">{renderGrid(data.weeks)}</div>
        <div className="md:hidden">
          {renderGrid(data.weeks.slice(-26), 'Showing last 6 months')}
        </div>

        <div
          className="mt-3 flex items-center justify-end gap-1.5 text-xs text-gray-500 dark:text-gray-400"
          role="group"
          aria-label="Contribution intensity scale from less to more"
        >
          <span>Less</span>
          {LEVEL_BG.map((cls, i) => (
            <span
              key={i}
              className={`inline-block h-[11px] w-[11px] rounded-sm ${cls}`}
              aria-hidden="true"
            />
          ))}
          <span>More</span>
        </div>

        <dl className="mt-6 grid grid-cols-4 gap-4 border-t border-gray-100 pt-5 dark:border-gray-800">
          {statItems.map((item) => (
            <div key={item.label} className="text-center">
              <dd className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.value}</dd>
              <dt className="text-xs text-gray-500 dark:text-gray-400">{item.label}</dt>
            </div>
          ))}
        </dl>
        <div
          ref={sheenRef}
          className="pointer-events-none absolute inset-0 rounded-2xl"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
