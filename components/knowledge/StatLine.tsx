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
 * A row of headline numbers, tinted by the surrounding `--topic` (falling back
 * to the site primary). Rendered as a definition list with the term below its
 * value, so the markup stays meaningful while reading value-first.
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
          <dt className="mt-1 font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase dark:text-gray-400">
            {item.label}
          </dt>
          <dd className="text-3xl font-semibold tracking-tight text-[var(--topic,var(--color-primary-600))] tabular-nums sm:text-4xl dark:text-[var(--topic-dark,var(--color-primary-400))]">
            {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}

export default StatLine
