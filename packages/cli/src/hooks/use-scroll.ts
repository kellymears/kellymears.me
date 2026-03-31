import { useState, useMemo } from 'react'
import { useInput } from 'ink'

interface UseScrollOptions {
  itemCount: number
  viewportHeight: number
  isActive: boolean
}

export function useScroll({ itemCount, viewportHeight, isActive }: UseScrollOptions) {
  const maxOffset = Math.max(0, itemCount - viewportHeight)
  const [scrollOffset, setScrollOffset] = useState(0)

  useInput(
    (input, key) => {
      if (key.downArrow || input === 'j') {
        setScrollOffset((o) => Math.min(o + 1, maxOffset))
      }
      if (key.upArrow || input === 'k') {
        setScrollOffset((o) => Math.max(o - 1, 0))
      }
    },
    { isActive }
  )

  const visibleRange: [number, number] = useMemo(
    () => [scrollOffset, Math.min(scrollOffset + viewportHeight, itemCount)],
    [scrollOffset, viewportHeight, itemCount]
  )

  return {
    scrollOffset,
    visibleRange,
    canScrollUp: scrollOffset > 0,
    canScrollDown: scrollOffset < maxOffset,
    aboveCount: scrollOffset,
    belowCount: Math.max(0, itemCount - scrollOffset - viewportHeight),
  }
}
