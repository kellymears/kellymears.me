import { Card } from '@/components/Card'
import { stats } from '@/data/stats'

export function StatsRow() {
  return (
    <section className="py-6 md:py-12" aria-label="Key statistics">
      <dl className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card
            key={stat.label}
            className="bg-white/50 px-6 py-5 text-center dark:bg-gray-900/50"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <dt className="order-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
              {stat.label}
            </dt>
            <dd className="from-primary-500 to-primary-700 order-1 bg-gradient-to-br bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
              {stat.value}
            </dd>
            {stat.detail && (
              <dd className="order-3 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                {stat.detail}
              </dd>
            )}
          </Card>
        ))}
      </dl>
    </section>
  )
}
