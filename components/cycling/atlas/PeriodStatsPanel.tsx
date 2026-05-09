'use client'

import { computePeriodStats, formatDurationShort, type JoinedRide } from '@/lib/cycling-atlas'
import { useMemo } from 'react'

interface PeriodStatsPanelProps {
  rides: JoinedRide[]
}

interface StatProps {
  label: string
  value: string
  unit?: string
}

function Stat({ label, value, unit }: StatProps) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] font-medium tracking-widest text-gray-500 uppercase dark:text-gray-400">
        {label}
      </span>
      <span className="font-mono text-base text-gray-900 tabular-nums dark:text-gray-100">
        {value}
        {unit ? (
          <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">{unit}</span>
        ) : null}
      </span>
    </div>
  )
}

export function PeriodStatsPanel({ rides }: PeriodStatsPanelProps) {
  const stats = useMemo(() => computePeriodStats(rides), [rides])

  return (
    <div className="pointer-events-auto absolute top-4 left-1/2 z-10 -translate-x-1/2 rounded-xl bg-white/90 px-4 py-3 shadow-lg ring-1 ring-gray-200 backdrop-blur dark:bg-gray-900/90 dark:ring-gray-800">
      <div className="grid grid-cols-5 items-center gap-x-6 gap-y-1">
        <Stat label="Rides" value={stats.rides.toLocaleString()} />
        <Stat label="Distance" value={stats.miles.toLocaleString()} unit="mi" />
        <Stat label="Climbed" value={stats.elevationFt.toLocaleString()} unit="ft" />
        <Stat label="Time" value={formatDurationShort(stats.durationSec)} />
        <Stat label="Avg" value={String(stats.avgSpeedMph.toFixed(1))} unit="mph" />
      </div>
    </div>
  )
}
