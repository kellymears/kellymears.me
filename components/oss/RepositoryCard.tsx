import { Card } from '@/components/Card'
import { ForkIcon, LanguageDot, StarIcon } from '@/components/icons'
import Link from '@/components/Link'
import type { Repository } from '@/lib/github'
import { LANGUAGE_COLORS } from '@/lib/github'

interface RepositoryCardProps {
  repo: Repository
}

function formatUpdated(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays < 1) return 'Updated today'
  if (diffDays === 1) return 'Updated yesterday'
  if (diffDays < 30) return `Updated ${diffDays}d ago`
  if (diffDays < 365) return `Updated ${Math.floor(diffDays / 30)}mo ago`
  return `Updated ${Math.floor(diffDays / 365)}y ago`
}

export function RepoCardContent({ repo }: { repo: Repository }) {
  return (
    <>
      <div className="mb-2 flex items-center justify-between gap-2">
        <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 min-w-0 truncate text-base leading-tight font-semibold text-gray-900 transition-colors dark:text-gray-100">
          {repo.name}
        </h3>
        {repo.stargazers_count > 0 && (
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            <StarIcon />
            <span aria-label={`${repo.stargazers_count} stars`}>
              {repo.stargazers_count.toLocaleString()}
            </span>
          </span>
        )}
      </div>

      {repo.description && (
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {repo.description}
        </p>
      )}

      <div className="mt-auto flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <LanguageDot color={LANGUAGE_COLORS[repo.language] ?? '#8b8b8b'} />
            {repo.language}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <ForkIcon />
            {repo.forks_count.toLocaleString()}
          </span>
        )}
      </div>
    </>
  )
}

export function RepositoryCard({ repo }: RepositoryCardProps) {
  return (
    <Card
      as={Link}
      href={repo.html_url}
      className="flex h-36 flex-col bg-white px-5 pt-5 pb-3 dark:bg-gray-900/50"
      aria-label={`${repo.name}${repo.description ? ` — ${repo.description}` : ''}`}
    >
      <RepoCardContent repo={repo} />
      {repo.pushed_at && (
        <span className="ml-auto mt-1 text-xs text-gray-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:text-gray-400">
          {formatUpdated(repo.pushed_at)}
        </span>
      )}
    </Card>
  )
}
