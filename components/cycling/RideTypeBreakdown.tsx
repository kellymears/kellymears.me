import type { RideCategory } from '@/lib/strava'

interface RideTypeBreakdownProps {
  categories: RideCategory[]
}

export function RideTypeBreakdown({ categories }: RideTypeBreakdownProps) {
  if (categories.length === 0) return null

  return (
    <section className="animate-on-scroll py-8">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Ride Types
      </h2>

      <div className="mb-5 overflow-hidden rounded-full bg-gray-100 shadow-inner dark:bg-gray-800">
        <div className="animate-grow-width flex h-4">
          {categories.map((cat) => (
            <div
              key={cat.sportType}
              className="transition-all first:rounded-l-full last:rounded-r-full"
              style={{
                width: `${cat.percentage}%`,
                backgroundColor: cat.color,
                minWidth: cat.percentage > 0 ? '4px' : 0,
              }}
              title={`${cat.name}: ${cat.percentage}%`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        {categories.map((cat) => (
          <div key={cat.sportType} className="flex items-center gap-2.5">
            <span
              className="inline-block h-3 w-3 shrink-0 rounded-full shadow-sm"
              style={{ backgroundColor: cat.color }}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cat.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {cat.count} ride{cat.count !== 1 ? 's' : ''} · {cat.percentage}%
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
