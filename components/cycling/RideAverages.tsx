import type { RideStats, WeeklyMileage } from '@/lib/cycling'

interface RideAveragesProps {
  stats: RideStats
  weeklyMileage: WeeklyMileage[]
}

export function RideAverages({ stats, weeklyMileage }: RideAveragesProps) {
  if (stats.totalRides === 0) return null

  const avgMiles = Math.round(stats.totalMiles / stats.totalRides)
  const avgElevation = Math.round(stats.totalElevation / stats.totalRides)
  const avgMinutes = Math.round((stats.totalHours * 60) / stats.totalRides)
  const avgHours = Math.floor(avgMinutes / 60)
  const avgMins = avgMinutes % 60

  const weeksWithRides = weeklyMileage.filter((w) => w.rides > 0)
  const avgWeeklyMiles =
    weeksWithRides.length > 0
      ? Math.round(weeksWithRides.reduce((sum, w) => sum + w.distance, 0) / weeksWithRides.length)
      : 0
  const bestWeek = weeklyMileage.reduce(
    (best, w) => (w.distance > best.distance ? w : best),
    weeklyMileage[0]!
  )

  const averages = [
    { value: `${avgMiles} mi`, label: 'Avg Distance' },
    { value: `${avgElevation.toLocaleString()} ft`, label: 'Avg Elevation' },
    {
      value: avgHours > 0 ? `${avgHours}h ${avgMins}m` : `${avgMins}m`,
      label: 'Avg Duration',
    },
  ]

  const records = [
    { value: `${stats.biggestRide} mi`, label: 'Longest Ride' },
    { value: `${stats.biggestClimb.toLocaleString()} ft`, label: 'Biggest Climb' },
  ]

  const weekly = [
    { value: `${avgWeeklyMiles} mi`, label: 'Avg Week' },
    { value: `${Math.round(bestWeek.distance)} mi`, label: 'Best Week' },
  ]

  return (
    <section className="animate-on-scroll py-8">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Averages
      </h2>

      <div className="space-y-4">
        {averages.map((item) => (
          <div key={item.label} className="flex items-baseline justify-between gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {item.value}
            </span>
          </div>
        ))}

        <div className="border-t border-gray-100 pt-4 dark:border-gray-800">
          <p className="mb-3 text-xs font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
            Records
          </p>
          {records.map((item) => (
            <div key={item.label} className="flex items-baseline justify-between gap-2 py-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
              <span className="from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 bg-gradient-to-br bg-clip-text text-sm font-bold text-transparent">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-4 dark:border-gray-800">
          <p className="mb-3 text-xs font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
            Weekly
          </p>
          {weekly.map((item) => (
            <div key={item.label} className="flex items-baseline justify-between gap-2 py-1">
              <span className="text-sm text-gray-500 dark:text-gray-400">{item.label}</span>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
