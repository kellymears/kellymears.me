import { Box, Text } from 'ink'
import { useScroll } from '../../hooks/use-scroll.js'
import type { ReactNode } from 'react'

export interface ScrollItem {
  node: ReactNode
  lines: number
}

export interface ScrollState {
  canScrollUp: boolean
  canScrollDown: boolean
  aboveCount: number
  belowCount: number
}

interface ScrollViewProps {
  items: ScrollItem[]
  viewportHeight: number
  isActive: boolean
  gap?: number
  children?: (state: ScrollState) => ReactNode
}

function computeWindowLines(
  items: ScrollItem[],
  start: number,
  count: number,
  gap: number
): number {
  let h = 0
  for (let j = 0; j < count && start + j < items.length; j++) {
    h += items[start + j].lines
    if (j > 0) h += gap
  }
  return h
}

export function ScrollView({
  items,
  viewportHeight,
  isActive,
  gap = 1,
  children,
}: ScrollViewProps) {
  // Find the tallest possible viewport window
  let maxLines = 0
  const end = Math.max(0, items.length - viewportHeight)
  for (let i = 0; i <= end; i++) {
    maxLines = Math.max(maxLines, computeWindowLines(items, i, viewportHeight, gap))
  }

  const { visibleRange, canScrollUp, canScrollDown, aboveCount, belowCount } = useScroll({
    itemCount: items.length,
    viewportHeight,
    isActive,
  })

  const visible = items.slice(visibleRange[0], visibleRange[1])
  const currentLines = computeWindowLines(items, visibleRange[0], visible.length, gap)
  const paddingLines = maxLines - currentLines

  const scrollState: ScrollState = { canScrollUp, canScrollDown, aboveCount, belowCount }

  return (
    <Box flexDirection="column">
      <Box flexDirection="column" gap={gap}>
        {visible.map((item) => item.node)}
      </Box>
      {paddingLines > 0 && <Text>{Array(paddingLines).fill(' ').join('\n')}</Text>}
      {children?.(scrollState)}
    </Box>
  )
}
