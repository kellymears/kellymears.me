'use client'

import { useState } from 'react'

export function TerminalCta() {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText('npx kellymears').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mt-10 max-w-sm">
      <p className="mb-2.5 text-sm font-medium text-gray-500 dark:text-gray-400">
        Prefer to learn about me in the terminal?
      </p>
      <button
        onClick={handleCopy}
        className="group/cta flex w-full items-center justify-between rounded-lg border border-gray-200 bg-gray-950 px-4 py-3 font-mono text-sm transition-all hover:border-gray-600 hover:shadow-lg hover:shadow-gray-950/10 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-500 dark:hover:shadow-gray-950/30"
      >
        <span className="text-gray-300">
          <span className="text-primary-400 mr-2 select-none">$</span>
          npx kellymears
        </span>
        <span className="text-gray-500 transition-colors group-hover/cta:text-gray-300">
          {copied ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-400"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
          )}
        </span>
      </button>
      <div className="mt-3 flex justify-end pr-1" aria-hidden="true">
        <span className="animate-splash origin-bottom-right text-xs font-bold tracking-wide text-primary-500 dark:text-primary-400">
          Now 100% Axios free!
        </span>
      </div>
    </div>
  )
}
