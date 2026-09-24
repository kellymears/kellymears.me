import Link from '@/components/Link'
import type { ReactNode } from 'react'

interface Props {
  index: string
  children: ReactNode
  href?: string
  linkLabel?: string
  srLabel?: string
}

/**
 * Editorial section header: a mono folio, the title, a hairline that runs to
 * the edge, then the "view all" link. Wrap one word of the title in
 * `<Accent>` for the italic serif treatment.
 */
export function SectionHeading({ index, children, href, linkLabel = 'View all', srLabel }: Props) {
  return (
    <div className="mb-10 flex items-end gap-4 sm:mb-12">
      <span className="text-primary-600 dark:text-primary-400 mb-1.5 font-mono text-xs tabular-nums">
        {index}
      </span>
      <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
        {children}
      </h2>
      <span
        aria-hidden="true"
        className="mb-2.5 hidden h-px flex-1 bg-gradient-to-r from-gray-300 to-transparent sm:block dark:from-gray-700"
      />
      {href && (
        <Link
          href={href}
          className="group/more hover:text-primary-600 dark:hover:text-primary-400 mb-1 ml-auto shrink-0 font-mono text-xs tracking-wide text-gray-500 uppercase transition-colors sm:ml-0 dark:text-gray-400"
        >
          {linkLabel}{' '}
          <span
            aria-hidden="true"
            className="inline-block transition-transform group-hover/more:translate-x-1"
          >
            &rarr;
          </span>
          {srLabel && <span className="sr-only">{srLabel}</span>}
        </Link>
      )}
    </div>
  )
}

export function Accent({ children }: { children: ReactNode }) {
  return (
    <em className="from-primary-500 to-primary-700 dark:from-primary-300 dark:to-primary-500 bg-gradient-to-br bg-clip-text pr-[0.08em] font-serif font-normal tracking-normal text-transparent italic">
      {children}
    </em>
  )
}
