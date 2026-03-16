import { LanguageDot } from '@/components/icons'
import type { TerrainCategory } from '@/lib/cycling'

interface TerrainBreakdownProps {
  categories: TerrainCategory[]
}

export function TerrainBreakdown({ categories }: TerrainBreakdownProps) {
  if (categories.length === 0) return null

  const totalMiles = categories.reduce((sum, cat) => sum + cat.miles, 0)
  const barDescription = categories
    .map((cat) => `${cat.name}: ${cat.miles.toLocaleString()} mi (${cat.percentage}%)`)
    .join(', ')

  return (
    <section className="animate-on-scroll py-8" aria-label="Terrain breakdown">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Terrain
      </h2>

      <div
        className="mb-5 overflow-hidden rounded-full bg-gray-100 shadow-inner dark:bg-gray-800"
        role="img"
        aria-label={`Terrain distribution across ${totalMiles.toLocaleString()} miles: ${barDescription}`}
      >
        <div className="animate-grow-width flex h-4">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className="transition-all first:rounded-l-full last:rounded-r-full"
              style={{
                width: `${cat.percentage}%`,
                backgroundColor: cat.color,
                minWidth: cat.percentage > 0 ? '4px' : 0,
              }}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      <div className="space-y-2.5" role="list">
        {categories.map((cat, i) => (
          <div
            key={cat.key}
            className="flex items-center gap-2.5 transition-transform duration-200 hover:translate-x-1"
            role="listitem"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <LanguageDot
              color={cat.color}
              className="inline-block h-3 w-3 shrink-0 rounded-full shadow-sm"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{cat.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {cat.miles.toLocaleString()} mi · {cat.percentage}%
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
