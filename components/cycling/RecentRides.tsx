import type { RecentRide } from '@/lib/strava'

interface RecentRidesProps {
  rides: RecentRide[]
}

const SPORT_TYPE_LABELS: Record<string, string> = {
  Ride: 'Road',
  GravelRide: 'Gravel',
  MountainBikeRide: 'MTB',
  VirtualRide: 'Virtual',
  EBikeRide: 'E-Bike',
}

export function RecentRides({ rides }: RecentRidesProps) {
  if (rides.length === 0) return null

  return (
    <section className="animate-on-scroll min-w-0 py-8 md:col-span-2">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Recent Rides
      </h2>

      <div className="space-y-3">
        {rides.map((ride) => (
          <div
            key={ride.id}
            className="hover:border-primary-200 dark:hover:border-primary-800 overflow-hidden rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3.5 transition-colors dark:border-gray-800 dark:bg-gray-900/50"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {ride.name}
                  </p>
                  {ride.sportType !== 'Ride' && (
                    <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      {SPORT_TYPE_LABELS[ride.sportType] ?? ride.sportType}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{ride.date}</p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                {ride.kudos > 0 && (
                  <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="text-orange-400"
                    >
                      <path d="M2 6.368a2 2 0 0 1 2.33-1.974l.496.083c.96.16 1.893-.178 2.505-.869l.271-.306A1.002 1.002 0 0 1 9.33 4.26l-.001.09v2.94l2.563-.64a2 2 0 0 1 2.381 1.3l.041.128.25 1a2 2 0 0 1-1.466 2.42l-5.093 1.272a4 4 0 0 1-2.867-.38l-.252-.14A4 4 0 0 1 2 8.14V6.368Z" />
                    </svg>
                    {ride.kudos}
                  </span>
                )}
                {ride.prs > 0 && (
                  <span className="flex items-center gap-1 text-xs font-medium text-amber-600 dark:text-amber-400">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                    </svg>
                    {ride.prs} PR{ride.prs !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
              <span className="font-medium">{ride.distance}</span>
              <span>{ride.duration}</span>
              <span>{ride.elevation}</span>
              <span>{ride.speed}</span>
              {ride.heartrate && (
                <span className="text-rose-600 dark:text-rose-400">{ride.heartrate}</span>
              )}
              {ride.watts && <span className="text-blue-600 dark:text-blue-400">{ride.watts}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
