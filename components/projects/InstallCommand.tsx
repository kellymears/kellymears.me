'use client'

import { useState } from 'react'

interface InstallCommandProps {
  commands: { label: string; command: string }[]
}

export function InstallCommand({ commands }: InstallCommandProps) {
  const [copied, setCopied] = useState(false)

  const fullText = commands.map((c) => c.command).join('\n')

  function handleCopy() {
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="group/install relative rounded-lg bg-gray-950 p-4 font-mono text-sm dark:bg-gray-900/80">
      <div className="space-y-1 pr-8">
        {commands.map((c) => (
          <div key={c.command} className="text-gray-300">
            <span className="text-primary-400 mr-2 select-none">$</span>
            {c.command}
          </div>
        ))}
      </div>
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 rounded-md p-1.5 text-gray-500 opacity-0 transition-all hover:bg-gray-800 hover:text-gray-300 group-hover/install:opacity-100"
        aria-label="Copy install command"
      >
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
      </button>
    </div>
  )
}
