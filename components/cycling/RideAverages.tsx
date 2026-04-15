import type { RideStats } from '@/lib/cycling'

interface RideAveragesProps {
  stats: RideStats
}

export function RideAverages({ stats }: RideAveragesProps) {
  if (stats.totalRides === 0) return null

  const avgMiles = Math.round(stats.totalMiles / stats.totalRides)
  const avgElevation = Math.round(stats.totalElevation / stats.totalRides)
  const avgMinutes = Math.round((stats.totalHours * 60) / stats.totalRides)
  const avgHours = Math.floor(avgMinutes / 60)
  const avgMins = avgMinutes % 60

  const averages = [
    { value: `${avgMiles} mi`, label: 'Avg Distance' },
    { value: `${avgElevation.toLocaleString()} ft`, label: 'Avg Elevation' },
    {
      value: avgHours > 0 ? `${avgHours}h ${avgMins}m` : `${avgMins}m`,
      label: 'Avg Duration',
    },
    ...(stats.avgCadence ? [{ value: `${stats.avgCadence} rpm`, label: 'Avg Cadence' }] : []),
  ]

  const records = [
    { value: `${stats.biggestRide} mi`, label: 'Longest Ride' },
    { value: `${stats.biggestClimb.toLocaleString()} ft`, label: 'Biggest Climb' },
  ]

  const weekly = [
    { value: `${stats.avgWeeklyMiles} mi`, label: 'Avg Week' },
    { value: `${stats.bestWeekMiles} mi`, label: 'Best Week' },
  ]

  return (
    <section className="animate-on-scroll py-8" aria-label="Ride averages and records">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Averages
      </h2>

      <div className="space-y-4">
        <dl>
          {averages.map((item) => (
            <div
              key={item.label}
              className="flex items-baseline justify-between gap-2 py-1 transition-colors duration-150 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <dt className="text-sm text-gray-500 dark:text-gray-400">{item.label}</dt>
              <dd className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="border-t border-gray-100 pt-4 dark:border-gray-800">
          <p className="mb-3 text-xs font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
            Records
          </p>
          <dl>
            {records.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-2 py-1 transition-colors duration-150"
              >
                <dt className="text-sm text-gray-500 dark:text-gray-400">{item.label}</dt>
                <dd className="from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 bg-gradient-to-br bg-clip-text text-sm font-bold text-transparent">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="border-t border-gray-100 pt-4 dark:border-gray-800">
          <p className="mb-3 text-xs font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
            Weekly
          </p>
          <dl>
            {weekly.map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-2 py-1 transition-colors duration-150"
              >
                <dt className="text-sm text-gray-500 dark:text-gray-400">{item.label}</dt>
                <dd className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
