'use client'

import { CommandPalette } from '@/components/knowledge/CommandPalette'
import { HoverPreview } from '@/components/knowledge/HoverPreview'
import type { SearchEntry } from '@/components/knowledge/search'
import { useCallback, useEffect, useState } from 'react'

/**
 * Typing into a real field must never be hijacked by the bare `/` shortcut.
 */
const isTypingTarget = (node: EventTarget | null): boolean => {
  if (!(node instanceof HTMLElement)) return false
  if (node.isContentEditable) return true
  const tag = node.tagName
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT'
}

export interface KnowledgeChromeProps {
  index: SearchEntry[]
}

/**
 * The single client mount point for the knowledge section's interaction layer:
 * the ⌘K palette, its keybindings, and the delegated wikilink hover previews.
 *
 * Renders no visible chrome of its own — the section is a reading surface, and
 * the index page advertises the shortcut inline where it can't cover prose.
 */
export function KnowledgeChrome({ index }: KnowledgeChromeProps) {
  const [open, setOpen] = useState(false)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((current) => !current)
        return
      }
      if (
        event.key === '/' &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !isTypingTarget(event.target)
      ) {
        event.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <CommandPalette open={open} onClose={close} index={index} />
      <HoverPreview index={index} />
    </>
  )
}

export default KnowledgeChrome
