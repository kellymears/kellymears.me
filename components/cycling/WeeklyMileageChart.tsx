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
  const [activeBar, setActiveBar] = useState<number | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null)

  if (data.length === 0) return null

  const maxDistance = Math.max(...data.map((w) => w.distance), 1)
  const totalDistance = data.reduce((sum, w) => sum + w.distance, 0)
  const totalRides = data.reduce((sum, w) => sum + w.rides, 0)
  const avgPerWeek = data.length > 0 ? Math.round((totalDistance / data.length) * 10) / 10 : 0
  const bestWeek = Math.max(...data.map((w) => w.distance))

  const renderChart = (weeks: WeeklyMileage[]) => {
    const weekCount = weeks.length
    const svgWidth = weekCount * BAR_STEP
    const svgHeight = TOP_PADDING + CHART_HEIGHT + LABEL_HEIGHT

    const monthLabels: { label: string; x: number }[] = []
    let lastMonth = -1
    for (let i = 0; i < weeks.length; i++) {
      const month = new Date(weeks[i]!.weekStart + 'T00:00:00').getMonth()
      if (month !== lastMonth) {
        monthLabels.push({ label: MONTHS[month]!, x: i * BAR_STEP + BAR_WIDTH / 2 })
        lastMonth = month
      }
    }

    const chartDescription = `Bar chart showing weekly cycling mileage over ${weeks.length} weeks. Average ${avgPerWeek} miles per week, best week ${bestWeek} miles, ${totalRides} total rides.`

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
          {avgPerWeek > 0 && (
            <line
              x1="0"
              y1={TOP_PADDING + CHART_HEIGHT - (avgPerWeek / maxDistance) * CHART_HEIGHT}
              x2={svgWidth}
              y2={TOP_PADDING + CHART_HEIGHT - (avgPerWeek / maxDistance) * CHART_HEIGHT}
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="4 3"
              className="text-gray-300 dark:text-gray-700"
              aria-hidden="true"
            />
          )}

          {monthLabels.map((m, i) => (
            <text
              key={i}
              x={m.x}
              y={svgHeight - 2}
              textAnchor="middle"
              className="fill-gray-500 dark:fill-gray-400"
              style={{ fontSize: '10px' }}
              aria-hidden="true"
            >
              {m.label}
            </text>
          ))}

          {weeks.map((week, i) => {
            const barHeight = maxDistance > 0 ? (week.distance / maxDistance) * CHART_HEIGHT : 0
            const x = i * BAR_STEP
            const y = TOP_PADDING + CHART_HEIGHT - barHeight
            const isActive = activeBar === i
            const isBestWeek = week.distance === bestWeek && bestWeek > 0
            const label = `Week of ${formatWeekLabel(week.weekStart)}: ${week.distance} mi, ${week.rides} ride${week.rides !== 1 ? 's' : ''}, ${Math.round(week.elevation).toLocaleString()} ft`

            return (
              <g key={week.weekStart}>
                {/* Hover background highlight */}
                {isActive && (
                  <rect
                    x={x - 2}
                    y={TOP_PADDING}
                    width={BAR_WIDTH + 4}
                    height={CHART_HEIGHT}
                    rx={4}
                    className="fill-primary-50/50 dark:fill-primary-950/30"
                    aria-hidden="true"
                  />
                )}
                <rect
                  x={x}
                  y={y}
                  width={BAR_WIDTH}
                  height={Math.max(barHeight, 2)}
                  rx={3}
                  className={
                    isBestWeek
                      ? 'fill-primary-600 dark:fill-primary-400 cursor-pointer'
                      : isActive
                        ? 'fill-primary-500 dark:fill-primary-400 cursor-pointer'
                        : 'fill-primary-400 dark:fill-primary-500 cursor-pointer transition-colors duration-150'
                  }
                  aria-label={label}
                  tabIndex={0}
                  role="graphics-symbol"
                  onMouseEnter={(e) => {
                    setActiveBar(i)
                    const rect = (e.target as SVGElement).getBoundingClientRect()
                    const container = (e.target as SVGElement)
                      .closest('.relative')
                      ?.getBoundingClientRect()
                    if (container) {
                      setTooltip({
                        x: rect.left - container.left + rect.width / 2,
                        y: rect.top - container.top - 8,
                        text: label,
                      })
                    }
                  }}
                  onMouseLeave={() => {
                    setActiveBar(null)
                    setTooltip(null)
                  }}
                  onFocus={(e) => {
                    setActiveBar(i)
                    const rect = (e.target as SVGElement).getBoundingClientRect()
                    const container = (e.target as SVGElement)
                      .closest('.relative')
                      ?.getBoundingClientRect()
                    if (container) {
                      setTooltip({
                        x: rect.left - container.left + rect.width / 2,
                        y: rect.top - container.top - 8,
                        text: label,
                      })
                    }
                  }}
                  onBlur={() => {
                    setActiveBar(null)
                    setTooltip(null)
                  }}
                />
                {/* Best week accent dot */}
                {isBestWeek && (
                  <circle
                    cx={x + BAR_WIDTH / 2}
                    cy={y - 6}
                    r="2"
                    className="fill-primary-600 dark:fill-primary-400"
                    aria-hidden="true"
                  />
                )}
              </g>
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

  const statItems = [
    { value: `${Math.round(totalDistance).toLocaleString()} mi`, label: 'Total' },
    { value: `${avgPerWeek} mi`, label: 'Avg / week' },
    { value: `${bestWeek} mi`, label: 'Best week' },
    { value: totalRides.toString(), label: 'Rides' },
  ]

  return (
    <section className="animate-on-scroll py-8" aria-label="Weekly mileage chart">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-8 dark:border-gray-800 dark:bg-gray-900/50 dark:shadow-gray-950/50 dark:hover:shadow-lg dark:hover:shadow-gray-950/50">
        <div className="mb-6">
          <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Weekly Mileage
          </h2>
          <p className="sr-only">
            Chart showing cycling distance per week over the last {data.length} weeks
          </p>
        </div>

        <div className="hidden md:block">{renderChart(data)}</div>
        <div className="md:hidden">{renderChart(data.slice(-13))}</div>

        <div
          className="mt-6 grid grid-cols-4 gap-4 border-t border-gray-100 pt-5 dark:border-gray-800"
          role="list"
          aria-label="Weekly mileage summary"
        >
          {statItems.map((item) => (
            <div key={item.label} className="text-center" role="listitem">
              <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
