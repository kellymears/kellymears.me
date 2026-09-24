import { Accent, SectionHeading } from '@/components/home/SectionHeading'
import { FeaturedProjectCard } from '@/components/oss/FeaturedProjectCard'
import type { FeaturedRepository } from '@/lib/github'

interface FeaturedProjectsProps {
  repos: FeaturedRepository[]
}

export function FeaturedProjects({ repos }: FeaturedProjectsProps) {
  if (repos.length === 0) return null

  return (
    <section className="animate-on-scroll py-8" aria-label="Featured open source projects">
      <SectionHeading index="01">
        Featured <Accent>projects</Accent>
      </SectionHeading>
      <div className="grid gap-6 sm:grid-cols-2">
        {repos.map((repo, i) => (
          <FeaturedProjectCard key={repo.full_name} repo={repo} index={i} />
        ))}
      </div>
    </section>
  )
}
