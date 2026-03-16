import { Card } from '@/components/Card'
import { SiteIcon } from '@/components/SiteIcon'
import type { SubdomainSite } from '@/data/sites'

const accentStyles = {
  violet: {
    iconBg: 'bg-violet-100 dark:bg-violet-900/30',
    iconText: 'text-violet-600 dark:text-violet-400',
  },
  sky: {
    iconBg: 'bg-sky-100 dark:bg-sky-900/30',
    iconText: 'text-sky-600 dark:text-sky-400',
  },
} satisfies Record<SubdomainSite['accent'], { iconBg: string; iconText: string }>

interface SiteCardProps {
  site: SubdomainSite
  className?: string
  style?: React.CSSProperties
}

export function SiteCard({ site, className, style }: SiteCardProps) {
  const accent = accentStyles[site.accent]

  return (
    <Card
      as="a"
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      style={style}
    >
      <div className="flex items-start gap-4 p-5">
        <div className={`flex shrink-0 items-center justify-center rounded-xl p-2.5 ${accent.iconBg}`}>
          <SiteIcon icon={site.icon} className={accent.iconText} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-lg font-semibold text-gray-900 transition-colors dark:text-gray-100">
              {site.title}
              <span className="sr-only"> (opens in new tab)</span>
            </h3>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-gray-400 transition-transform group-hover:translate-x-0.5 dark:text-gray-500"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>

          <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {site.description}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {site.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
