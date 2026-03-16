import type { TerrainCategory } from '@/lib/cycling'
import { Milestone, Route, TreePine } from 'lucide-react'

interface TerrainBreakdownProps {
  categories: TerrainCategory[]
}

const TERRAIN_ICONS: Record<string, typeof Milestone> = {
  road: Milestone,
  pavedPath: Route,
  unpaved: TreePine,
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
        <div className="animate-grow-width flex h-3">
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

      <div className="space-y-3" role="list">
        {categories.map((cat, i) => {
          const Icon = TERRAIN_ICONS[cat.key]
          return (
            <div
              key={cat.key}
              className="flex items-center gap-3 transition-transform duration-200 hover:translate-x-1"
              role="listitem"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${cat.color}18`, color: cat.color }}
              >
                {Icon && <Icon size={14} strokeWidth={2.5} />}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {cat.name}
                  </span>
                  <span className="text-xs font-semibold text-gray-900 tabular-nums dark:text-gray-100">
                    {cat.miles.toLocaleString()} mi
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                    <div
                      className="animate-grow-width h-full rounded-full"
                      style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                    />
                  </div>
                  <span className="w-9 text-right text-[11px] text-gray-400 tabular-nums dark:text-gray-500">
                    {cat.percentage}%
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
