import type { RecentRide } from '@/lib/cycling'

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

const SPORT_TYPE_ACCENT: Record<string, string> = {
  GravelRide: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  MountainBikeRide: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  VirtualRide: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  EBikeRide: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400',
}

export function RecentRides({ rides }: RecentRidesProps) {
  if (rides.length === 0) return null

  return (
    <section className="animate-on-scroll min-w-0 py-8 md:col-span-2" aria-label="Recent rides">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Recent Rides
      </h2>

      <div className="space-y-3" role="list">
        {rides.map((ride, i) => (
          <div
            key={ride.id}
            role="listitem"
            className="group hover:border-primary-200 dark:hover:border-primary-800 overflow-hidden rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900/50 dark:hover:shadow-gray-950/50"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {ride.name}
                </p>
                {ride.sportType !== 'Ride' && (
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${SPORT_TYPE_ACCENT[ride.sportType] ?? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}
                  >
                    {SPORT_TYPE_LABELS[ride.sportType] ?? ride.sportType}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{ride.date}</p>
            </div>

            <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-600 dark:text-gray-400">
              <span className="font-medium text-gray-900 dark:text-gray-200">{ride.distance}</span>
              <span>{ride.duration}</span>
              <span>{ride.elevation}</span>
              <span>{ride.speed}</span>
              {ride.heartrate && (
                <span className="text-rose-600 dark:text-rose-400">
                  <span className="sr-only">Heart rate: </span>
                  {ride.heartrate}
                </span>
              )}
              {ride.watts && (
                <span className="text-blue-600 dark:text-blue-400">
                  <span className="sr-only">Power: </span>
                  {ride.watts}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
