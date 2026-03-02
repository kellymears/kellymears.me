'use client'

import { useState } from 'react'
import type { Experience } from '@/data/experience'

const borderColorByType: Record<Experience['type'], string> = {
  employment: 'border-l-primary-500',
  consulting: 'border-l-amber-500',
  nonprofit: 'border-l-emerald-500',
  'open-source': 'border-l-violet-500',
}

interface TimelineItemProps {
  item: Experience
}

export function TimelineItem({ item }: TimelineItemProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="relative pb-10 pl-8 last:pb-0">
      <div className="absolute top-1 left-0 h-full w-px bg-gray-200 dark:bg-gray-800" />
      <div className="absolute top-1.5 left-[-4px] h-2 w-2 rounded-full bg-gray-400 dark:bg-gray-500" />

      <div
        className={`rounded-lg border border-l-4 border-gray-200 p-5 transition-all dark:border-gray-800 ${borderColorByType[item.type]}`}
      >
        <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.role}</h3>
          <span className="text-xs text-gray-400 dark:text-gray-500">{item.period}</span>
        </div>

        <p className="text-primary-600 dark:text-primary-400 mb-3 text-sm font-medium">
          {item.url ? (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              {item.company}
            </a>
          ) : (
            item.company
          )}
        </p>

        <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{item.summary}</p>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="hover:text-primary-600 dark:hover:text-primary-400 mt-3 text-xs font-medium text-gray-500 transition-colors dark:text-gray-400"
        >
          {expanded ? 'Hide details' : 'Show details'}
        </button>

        {expanded && (
          <ul className="mt-3 space-y-1.5">
            {item.highlights.map((highlight) => (
              <li
                key={highlight}
                className="before:text-primary-400 text-sm leading-relaxed text-gray-600 before:mr-2 before:content-['—'] dark:text-gray-400"
              >
                {highlight}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
