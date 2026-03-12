import { Card } from '@/components/Card'
import { ForkIcon, LanguageDot, StarIcon } from '@/components/icons'
import Link from '@/components/Link'
import type { FeaturedRepository } from '@/lib/github'
import { LANGUAGE_COLORS } from '@/lib/github'

interface FeaturedProjectCardProps {
  repo: FeaturedRepository
  index?: number
}

export function FeaturedProjectCard({ repo, index = 0 }: FeaturedProjectCardProps) {
  return (
    <Card
      as={Link}
      variant="featured"
      href={repo.html_url}
      className="relative flex flex-col overflow-hidden p-6 sm:p-8"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="from-primary-100/40 dark:from-primary-900/20 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent" />

      <div className="relative">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h3 className="group-hover:text-primary-700 dark:group-hover:text-primary-300 text-xl font-bold tracking-tight text-gray-900 transition-colors dark:text-gray-100">
            {repo.full_name}
          </h3>
          <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/80 dark:text-primary-300 rounded-full px-3 py-0.5 text-xs font-semibold">
            {repo.role}
          </span>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {repo.highlight}
        </p>

        <div className="flex flex-wrap items-center gap-5 text-sm">
          <span className="flex items-center gap-1.5 font-medium text-gray-800 dark:text-gray-200">
            <StarIcon width={16} height={16} />
            {repo.stargazers_count.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <ForkIcon width={16} height={16} />
            {repo.forks_count.toLocaleString()} forks
          </span>
          {repo.language && (
            <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <LanguageDot
                color={LANGUAGE_COLORS[repo.language] ?? '#8b8b8b'}
                className="inline-block h-3 w-3 shrink-0 rounded-full shadow-sm"
              />
              {repo.language}
            </span>
          )}
          <span className="text-primary-600 group-hover:text-primary-700 dark:text-primary-400 dark:group-hover:text-primary-300 ml-auto inline-flex items-center gap-1 text-sm font-medium transition-colors">
            View
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </Card>
  )
}
