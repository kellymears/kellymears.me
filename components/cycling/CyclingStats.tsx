import type { RideStats } from '@/lib/strava'

interface CyclingStatsProps {
  stats: RideStats
}

export function CyclingStats({ stats }: CyclingStatsProps) {
  const items = [
    { value: stats.totalMiles.toLocaleString(), label: 'Total Miles' },
    { value: stats.totalRides.toLocaleString(), label: 'Total Rides' },
    { value: stats.totalElevation.toLocaleString(), label: 'Elevation (ft)' },
    { value: stats.totalHours.toLocaleString(), label: 'Ride Time (hrs)' },
  ]

  return (
    <section className="animate-on-scroll pb-4">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="hover:border-primary-200 hover:bg-primary-50/30 dark:hover:border-primary-800 dark:hover:bg-primary-950/30 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-5 text-center transition-colors dark:border-gray-800 dark:bg-gray-900/50"
          >
            <p className="from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 bg-gradient-to-br bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              {item.value}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
