import clsx from 'clsx'

export interface StatLineItem {
  value: number | string
  label: string
}

export interface StatLineProps {
  items: StatLineItem[]
  className?: string
}

/**
 * A row of headline numbers using the site's gradient-stat treatment. Rendered
 * as a definition list with the term below its value, so the markup stays
 * meaningful while reading value-first.
 */
export function StatLine({ items, className }: StatLineProps) {
  return (
    <dl className={clsx('flex flex-wrap items-start gap-x-10 gap-y-5', className)}>
      {items.map((item, i) => (
        <div
          key={item.label}
          className="animate-fade-slide-up flex flex-col-reverse"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <dt className="mt-1 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
            {item.label}
          </dt>
          <dd className="from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 bg-gradient-to-br bg-clip-text text-3xl font-bold tracking-tight text-transparent tabular-nums sm:text-4xl">
            {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default StatLine
