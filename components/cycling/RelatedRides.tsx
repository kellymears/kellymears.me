import { Card } from '@/components/Card'
import type { RecentRide } from '@/lib/cycling'
import { RIDE_TYPE_ACCENT, RIDE_TYPE_SHORT_LABELS } from '@/lib/cycling-constants'
import { Gauge } from 'lucide-react'
import Link from 'next/link'
import { RideRouteSvg } from './RideDetailContent'

interface RelatedRidesProps {
  title: string
  rides: RecentRide[]
}

export function RelatedRides({ title, rides }: RelatedRidesProps) {
  if (rides.length === 0) return null

  return (
    <section aria-label={title}>
      <h2 className="mb-3 text-xs font-semibold tracking-widest text-gray-500 uppercase dark:text-gray-400">
        {title}
      </h2>
      <ul className="space-y-2" role="list">
        {rides.map((ride) => (
          <li key={ride.id}>
            <Card
              as={Link}
              href={`/cycling/${ride.slug}`}
              variant="stat"
              className="block overflow-hidden px-3 py-2.5"
            >
              <div className="flex items-center gap-3">
                {ride.routePath ? (
                  <div className="text-primary-400/50 dark:text-primary-500/40 flex h-10 w-10 shrink-0 items-center justify-center">
                    <RideRouteSvg path={ride.routePath} className="h-10 w-10" />
                  </div>
                ) : (
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800/50">
                    <Gauge
                      size={14}
                      strokeWidth={1.5}
                      className="text-gray-300 dark:text-gray-600"
                    />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {ride.name}
                    </p>
                    {ride.sportType !== 'Ride' && (
                      <span
                        className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-medium ${RIDE_TYPE_ACCENT[ride.sportType] ?? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}
                      >
                        {RIDE_TYPE_SHORT_LABELS[ride.sportType] ?? ride.sportType}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 text-[11px] text-gray-500 dark:text-gray-400">
                    {ride.date} · {ride.distance}
                  </p>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  )
}
