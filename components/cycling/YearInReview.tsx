import type { YTDStats, RecentStats } from '@/lib/strava'

interface YearInReviewProps {
  ytd: YTDStats
  recent: RecentStats
}

export function YearInReview({ ytd, recent }: YearInReviewProps) {
  const year = new Date().getFullYear()

  const ytdItems = [
    { value: ytd.miles.toLocaleString(), label: 'Miles' },
    { value: ytd.rides.toLocaleString(), label: 'Rides' },
    { value: ytd.elevation.toLocaleString(), label: 'Elevation (ft)' },
    { value: `${ytd.hours}h`, label: 'Time' },
  ]

  const recentItems = [
    { value: `${recent.miles}`, label: 'Miles' },
    { value: `${recent.rides}`, label: 'Rides' },
    { value: recent.elevation.toLocaleString(), label: 'Elev (ft)' },
    { value: `${recent.hours}h`, label: 'Time' },
  ]

  return (
    <section className="animate-on-scroll py-8">
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-8 dark:border-gray-800 dark:bg-gray-900/50 dark:shadow-gray-950/50 dark:hover:shadow-lg dark:hover:shadow-gray-950/50">
        <h2 className="mb-6 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {year} Year to Date
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {ytdItems.map((item) => (
            <div key={item.label} className="text-center">
              <p className="from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 bg-gradient-to-br bg-clip-text text-2xl font-bold tracking-tight text-transparent sm:text-3xl">
                {item.value}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-gray-100 pt-5 dark:border-gray-800">
          <p className="mb-3 text-xs font-medium tracking-wider text-gray-400 uppercase dark:text-gray-500">
            Last 4 Weeks
          </p>
          <div className="grid grid-cols-4 gap-4">
            {recentItems.map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{item.value}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
