import { StarIcon } from '@/components/icons'
import Link from '@/components/Link'
import { InstallCommand } from '@/components/projects/InstallCommand'
import type { CliProject } from '@/data/cliProjects'

interface CliProjectCardProps {
  project: CliProject
  stars?: number
  index?: number
}

export function CliProjectCard({ project, stars, index = 0 }: CliProjectCardProps) {
  const repoUrl = `https://github.com/${project.repo}`

  return (
    <div
      className="animate-on-scroll overflow-hidden rounded-2xl border border-gray-200 transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:hover:border-gray-700"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Terminal title bar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2.5 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: '#ff5f56' }} />
            <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: '#ffbd2e' }} />
            <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: '#27c93f' }} />
          </div>
          <span className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300">
            {project.command}
          </span>
        </div>
        {stars != null && stars > 0 && (
          <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <StarIcon width={14} height={14} />
            {stars.toLocaleString()}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="space-y-5 p-6 sm:p-8">
        <div>
          <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {project.tagline}
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {project.description}
          </p>
        </div>

        <InstallCommand commands={project.install} />

        <div className="flex flex-wrap gap-2">
          {project.features.map((feature) => (
            <span
              key={feature}
              className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            {project.tech.map((t) => (
              <span key={t} className="font-mono">{t}</span>
            ))}
          </div>
          <Link
            href={repoUrl}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-1 text-sm font-medium transition-colors"
          >
            View
            <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
