import { FlippingCardGrid } from '@/components/oss/FlippingCardGrid'
import type { Repository } from '@/lib/github'

interface RepositoryGridProps {
  repos: Repository[]
  pool: Repository[]
  className?: string
}

export function RepositoryGrid({ repos, pool, className }: RepositoryGridProps) {
  if (repos.length === 0) return null

  return (
    <section className={`animate-on-scroll py-8 ${className ?? ''}`}>
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Repositories
      </h2>
      <FlippingCardGrid initialRepos={repos} pool={pool} />
    </section>
  )
}
