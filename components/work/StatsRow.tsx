import { stats } from '@/data/stats'

export function StatsRow() {
  return (
    <section className="py-6 md:py-12">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.label}
            </p>
            {stat.detail && (
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{stat.detail}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
