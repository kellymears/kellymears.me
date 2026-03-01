import { RepositoryCard } from '@/components/oss/RepositoryCard'
import type { Repository } from '@/lib/github'

interface RepositoryGridProps {
  repos: Repository[]
}

export function RepositoryGrid({ repos }: RepositoryGridProps) {
  if (repos.length === 0) return null

  return (
    <section className="animate-on-scroll py-8">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Repositories
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <RepositoryCard key={repo.full_name} repo={repo} />
        ))}
      </div>
    </section>
  )
}
