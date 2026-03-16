import { Card } from '@/components/Card'
import type { RecentRide, RideTerrain } from '@/lib/cycling'
import {
  RIDE_TYPE_ACCENT,
  RIDE_TYPE_SHORT_LABELS,
  TERRAIN_COLORS,
  TERRAIN_LABELS,
} from '@/lib/cycling'

interface TerrainBarProps {
  terrain: RideTerrain
}

function TerrainBar({ terrain }: TerrainBarProps) {
  const total = terrain.road + terrain.pavedPath + terrain.unpaved
  if (total === 0) return null

  const segments = (['road', 'pavedPath', 'unpaved'] as const)
    .map((key) => ({
      key,
      value: terrain[key],
      pct: (terrain[key] / total) * 100,
      color: TERRAIN_COLORS[key]!,
      label: TERRAIN_LABELS[key]!,
    }))
    .filter((s) => s.pct > 0)

  const description = segments
    .map((s) => `${s.label}: ${s.value.toFixed(1)} mi (${Math.round(s.pct)}%)`)
    .join(', ')

  return (
    <div className="mt-2.5">
      <div
        className="flex h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800"
        role="img"
        aria-label={`Terrain: ${description}`}
      >
        {segments.map((seg) => (
          <div
            key={seg.key}
            className="first:rounded-l-full last:rounded-r-full"
            style={{ width: `${seg.pct}%`, backgroundColor: seg.color, minWidth: '2px' }}
          />
        ))}
      </div>
      <div className="mt-1 flex gap-3 text-[10px] text-gray-400 dark:text-gray-500">
        {segments.map((seg) => (
          <span key={seg.key} className="flex items-center gap-1">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: seg.color }}
              aria-hidden="true"
            />
            {seg.value.toFixed(1)} mi {seg.label.toLowerCase()}
          </span>
        ))}
      </div>
    </div>
  )
}

interface RecentRidesProps {
  rides: RecentRide[]
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
          <Card
            variant="stat"
            key={ride.id}
            role="listitem"
            className="overflow-hidden px-4 py-3.5 duration-200 hover:shadow-sm dark:hover:shadow-gray-950/50"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {ride.name}
                </p>
                {ride.sportType !== 'Ride' && (
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${RIDE_TYPE_ACCENT[ride.sportType] ?? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}
                  >
                    {RIDE_TYPE_SHORT_LABELS[ride.sportType] ?? ride.sportType}
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

            {ride.terrain && <TerrainBar terrain={ride.terrain} />}
          </Card>
        ))}
      </div>
    </section>
  )
}
