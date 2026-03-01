'use client'

import { ReactNode, useRef, useState } from 'react'

interface PreProps {
  children: ReactNode
}

const Pre = ({ children, ...props }: PreProps) => {
  const preRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = preRef.current?.textContent
    if (text) {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="group relative">
      <button
        aria-label="Copy code"
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 rounded border border-gray-300 bg-gray-200 px-2 py-1 text-xs opacity-0 transition-opacity group-hover:opacity-100 dark:border-gray-600 dark:bg-gray-700"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <pre ref={preRef} {...props}>
        {children}
      </pre>
    </div>
  )
}

export default Pre
