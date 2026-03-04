'use client'

import { useState } from 'react'
import type { WeeklyMileage } from '@/lib/cycling'

interface WeeklyMileageChartProps {
  data: WeeklyMileage[]
}

const BAR_WIDTH = 14
const BAR_GAP = 4
const BAR_STEP = BAR_WIDTH + BAR_GAP
const CHART_HEIGHT = 140
const LABEL_HEIGHT = 20
const TOP_PADDING = 20

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

function formatWeekLabel(weekStart: string): string {
  const date = new Date(weekStart + 'T00:00:00')
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function WeeklyMileageChart({ data }: WeeklyMileageChartProps) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null)

  if (data.length === 0) return null

  const renderChart = (
    weeks: WeeklyMileage[],
    maxLabels?: number,
    avgFontSize = 9,
    monthFontSize = 10
  ) => {
    const maxDistance = Math.max(...weeks.map((w) => w.distance), 1)
    const bestWeek = Math.max(...weeks.map((w) => w.distance))
    const totalRides = weeks.reduce((sum, w) => sum + w.rides, 0)
    const weekAvg =
      weeks.length > 0
        ? Math.round((weeks.reduce((sum, w) => sum + w.distance, 0) / weeks.length) * 10) / 10
        : 0
    const weekCount = weeks.length
    const svgWidth = weekCount * BAR_STEP
    const svgHeight = TOP_PADDING + CHART_HEIGHT + LABEL_HEIGHT

    const allMonthLabels: { label: string; x: number }[] = []
    let lastMonth = -1
    for (let i = 0; i < weeks.length; i++) {
      const month = new Date(weeks[i]!.weekStart + 'T00:00:00').getMonth()
      if (month !== lastMonth) {
        allMonthLabels.push({ label: MONTHS[month]!, x: i * BAR_STEP + BAR_WIDTH / 2 })
        lastMonth = month
      }
    }

    const monthLabels =
      maxLabels && allMonthLabels.length > maxLabels
        ? Array.from(
            { length: maxLabels },
            (_, i) =>
              allMonthLabels[Math.round((i * (allMonthLabels.length - 1)) / (maxLabels - 1))]!
          )
        : allMonthLabels

    const chartDescription = `Bar chart showing weekly cycling mileage over ${weeks.length} weeks. Average ${weekAvg} miles per week, best week ${bestWeek} miles, ${totalRides} total rides.`

    return (
      <div className="relative">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          role="img"
          aria-label={chartDescription}
          className="w-full"
          style={{ overflow: 'visible' }}
        >
          <title>{chartDescription}</title>

          {/* Average line */}
          {weekAvg > 0 &&
            (() => {
              const avgY = TOP_PADDING + CHART_HEIGHT - (weekAvg / maxDistance) * CHART_HEIGHT
              return (
                <g aria-hidden="true">
                  <line
                    x1="0"
                    y1={avgY}
                    x2={svgWidth}
                    y2={avgY}
                    stroke="currentColor"
                    strokeWidth="0.75"
                    strokeDasharray="4 3"
                    className="text-gray-300 dark:text-gray-600"
                  />
                  <text
                    x={svgWidth}
                    y={avgY - 3}
                    textAnchor="end"
                    className="fill-gray-400 dark:fill-gray-500"
                    style={{ fontSize: `${avgFontSize}px` }}
                  >
                    avg · {weekAvg} mi
                  </text>
                </g>
              )
            })()}

          {monthLabels.map((m, i) => (
            <text
              key={i}
              x={m.x}
              y={svgHeight - 2}
              textAnchor="middle"
              className="fill-gray-500 dark:fill-gray-400"
              style={{ fontSize: `${monthFontSize}px` }}
              aria-hidden="true"
            >
              {m.label}
            </text>
          ))}

          {weeks.map((week, i) => {
            const barHeight = maxDistance > 0 ? (week.distance / maxDistance) * CHART_HEIGHT : 0
            const x = i * BAR_STEP
            const y = TOP_PADDING + CHART_HEIGHT - barHeight
            const label = `Week of ${formatWeekLabel(week.weekStart)}: ${week.distance} mi, ${week.rides} ride${week.rides !== 1 ? 's' : ''}, ${Math.round(week.elevation).toLocaleString()} ft`

            return (
              <rect
                key={week.weekStart}
                x={x}
                y={y}
                width={BAR_WIDTH}
                height={Math.max(barHeight, 2)}
                rx={3}
                className="fill-primary-400 dark:fill-primary-500"
                aria-label={label}
                onMouseEnter={(e) => {
                  const r = (e.target as SVGElement).getBoundingClientRect()
                  const container = (e.target as SVGElement)
                    .closest('.relative')
                    ?.getBoundingClientRect()
                  if (container) {
                    setTooltip({
                      x: r.left - container.left + r.width / 2,
                      y: r.top - container.top - 8,
                      text: label,
                    })
                  }
                }}
                onMouseLeave={() => setTooltip(null)}
              />
            )
          })}
        </svg>

        {tooltip && (
          <div
            className="pointer-events-none absolute z-50 -translate-x-1/2 -translate-y-full rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-lg dark:bg-gray-100 dark:text-gray-900"
            style={{ left: tooltip.x, top: tooltip.y }}
            role="tooltip"
          >
            {tooltip.text}
            <div
              className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    )
  }

  const buildDateRange = (weeks: WeeklyMileage[]): string => {
    if (weeks.length === 0) return ''
    const fmt = (s: string) =>
      new Date(s + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    const first = fmt(weeks[0]!.weekStart)
    const last = fmt(weeks[weeks.length - 1]!.weekStart)
    return first === last ? first : `${first} – ${last}`
  }

  const buildStats = (weeks: WeeklyMileage[]) => {
    const dist = weeks.reduce((sum, w) => sum + w.distance, 0)
    const rides = weeks.reduce((sum, w) => sum + w.rides, 0)
    const avg = weeks.length > 0 ? Math.round((dist / weeks.length) * 10) / 10 : 0
    const best = Math.max(...weeks.map((w) => w.distance))
    return [
      { value: `${Math.round(dist).toLocaleString()} mi`, label: 'Total' },
      { value: `${avg} mi`, label: 'Avg / week' },
      { value: `${best} mi`, label: 'Best week' },
      { value: rides.toString(), label: 'Rides' },
    ]
  }

  const renderStats = (weeks: WeeklyMileage[], className?: string) => (
    <div
      className={`mt-6 grid grid-cols-4 gap-4 border-t border-gray-100 pt-5 dark:border-gray-800 ${className ?? ''}`}
      role="list"
      aria-label="Weekly mileage summary"
    >
      {buildStats(weeks).map((item) => (
        <div key={item.label} className="text-center" role="listitem">
          <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
        </div>
      ))}
    </div>
  )

  return (
    <section className="animate-on-scroll py-8" aria-label="Weekly mileage chart">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-8 dark:border-gray-800 dark:bg-gray-900/50 dark:shadow-gray-950/50 dark:hover:shadow-lg dark:hover:shadow-gray-950/50">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Weekly Mileage
          </h2>

          <p className="mt-1 hidden text-sm text-gray-500 md:block dark:text-gray-400">
            {buildDateRange(data)}
          </p>
          <p className="mt-1 text-sm text-gray-500 md:hidden dark:text-gray-400">
            {buildDateRange(data.slice(-13))}
          </p>
        </div>

        <div className="hidden md:block">
          {renderChart(data)}
          {renderStats(data)}
        </div>
        <div className="md:hidden">
          {renderChart(data.slice(-13), 3, 6, 7)}
          {renderStats(data.slice(-13))}
        </div>
      </div>
    </section>
  )
}
