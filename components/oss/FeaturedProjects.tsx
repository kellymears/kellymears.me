import { FeaturedProjectCard } from '@/components/oss/FeaturedProjectCard'
import type { FeaturedRepository } from '@/lib/github'

interface FeaturedProjectsProps {
  repos: FeaturedRepository[]
}

export function FeaturedProjects({ repos }: FeaturedProjectsProps) {
  if (repos.length === 0) return null

  return (
    <section className="animate-on-scroll py-8" aria-label="Featured open source projects">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Featured Projects
      </h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {repos.map((repo, i) => (
          <FeaturedProjectCard key={repo.full_name} repo={repo} index={i} />
        ))}
      </div>
    </section>
  )
}
