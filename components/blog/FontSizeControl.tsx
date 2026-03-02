'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'prose-size-preference'

const sizes = [
  { key: 'prose-base', label: 'A', className: 'text-xs' },
  { key: 'prose-lg', label: 'A', className: 'text-sm' },
  { key: 'prose-xl', label: 'A', className: 'text-base' },
] as const

type SizeKey = (typeof sizes)[number]['key']

function getStoredSize(): SizeKey {
  if (typeof window === 'undefined') return 'prose-lg'
  return (localStorage.getItem(STORAGE_KEY) as SizeKey) || 'prose-lg'
}

function applySize(size: SizeKey) {
  const el = document.getElementById('article-prose')
  if (!el) return
  for (const s of sizes) {
    el.classList.remove(s.key)
  }
  el.classList.add(size)
}

export default function FontSizeControl() {
  const [active, setActive] = useState<SizeKey>('prose-lg')

  useEffect(() => {
    const stored = getStoredSize()
    setActive(stored)
    applySize(stored)
  }, [])

  const handleChange = useCallback((size: SizeKey) => {
    setActive(size)
    applySize(size)
    localStorage.setItem(STORAGE_KEY, size)
  }, [])

  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="Font size">
      {sizes.map((s) => (
        <button
          key={s.key}
          onClick={() => handleChange(s.key)}
          aria-label={`Font size ${s.key.replace('prose-', '')}`}
          aria-pressed={active === s.key}
          className={`cursor-pointer rounded px-1.5 py-0.5 font-semibold transition-colors ${s.className} ${
            active === s.key
              ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/50'
              : 'text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
