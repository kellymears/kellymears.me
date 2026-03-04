import type { RideStats } from '@/lib/cycling'

interface CyclingStatsProps {
  stats: RideStats
}

export function CyclingStats({ stats }: CyclingStatsProps) {
  const items = [
    { value: stats.totalMiles.toLocaleString(), label: 'Total Miles' },
    { value: stats.totalRides.toLocaleString(), label: 'Total Rides' },
    { value: stats.totalElevation.toLocaleString(), label: 'Elevation (ft)' },
    { value: stats.totalHours.toLocaleString(), label: 'Ride Time (hrs)' },
  ] as const

  return (
    <section className="animate-on-scroll pb-4" aria-label="All-time cycling statistics">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6" role="list">
        {items.map((item, i) => (
          <div
            key={item.label}
            role="listitem"
            className="group hover:border-primary-200 dark:hover:border-primary-800 relative overflow-hidden rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 dark:hover:shadow-gray-950/50"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Warm gradient background on hover */}
            <div
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              aria-hidden="true"
            >
              <div className="from-primary-50/80 to-primary-100/40 dark:from-primary-950/40 dark:to-primary-900/20 absolute inset-0 bg-gradient-to-br via-transparent dark:via-transparent" />
            </div>

            <div className="relative">
              <p className="from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 bg-gradient-to-br bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
