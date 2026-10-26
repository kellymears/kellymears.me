import Link from '@/components/Link'
import clsx from 'clsx'
import { Maximize2 } from 'lucide-react'

interface Props {
  /** Opens the map framed on these topics. */
  topic?: string
  label?: string
  className?: string
}

/** Pill into the full-screen map, styled to sit beside `Wander`. */
export function MapLink({ topic, label = 'Open map', className }: Props) {
  return (
    <Link
      href={topic ? `/knowledge/map?topic=${topic}` : '/knowledge/map'}
      className={clsx(
        'group hover:border-primary-400 hover:text-primary-600 dark:hover:border-primary-500 dark:hover:text-primary-400 inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors dark:border-gray-600 dark:text-gray-300',
        className
      )}
    >
      <Maximize2
        size={15}
        aria-hidden="true"
        className="shrink-0 transition-transform duration-300 group-hover:scale-110"
      />
      {label}
    </Link>
  )
}
