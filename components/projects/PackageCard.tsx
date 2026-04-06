import { StarIcon } from '@/components/icons'
import Link from '@/components/Link'
import type { Package } from '@/data/packages'

interface PackageCardProps {
  package: Package
  stars?: number
  index?: number
}

export function PackageCard({ package: pkg, stars, index = 0 }: PackageCardProps) {
  const repoUrl = `https://github.com/${pkg.repo}`

  return (
    <div
      className="animate-on-scroll overflow-hidden rounded-2xl border border-gray-200 transition-all hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:hover:border-gray-700"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Editor-style title bar */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-100 px-4 py-2.5 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <span
            className="text-primary-500 dark:text-primary-400 font-mono text-sm font-semibold"
            aria-hidden="true"
          >
            {'{ }'}
          </span>
          <span className="font-mono text-sm font-medium text-gray-700 dark:text-gray-300">
            {pkg.name}
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
            {pkg.tagline}
          </h3>
          <p className="max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {pkg.description}
          </p>
        </div>

        {/* Usage example */}
        <div className="space-y-1 rounded-lg bg-gray-950 p-4 font-mono text-sm leading-relaxed dark:bg-gray-900/80">
          {pkg.usage.map((line, i) => (
            <div key={i} className="text-gray-300">
              {line.map((token, j) => (
                <span key={j} className={token.cls ?? 'text-gray-300'}>
                  {token.text}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {pkg.features.map((feature) => (
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
            {pkg.tech.map((t) => (
              <span key={t} className="font-mono">
                {t}
              </span>
            ))}
          </div>
          <Link
            href={repoUrl}
            className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-1 text-sm font-medium transition-colors"
          >
            View
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
