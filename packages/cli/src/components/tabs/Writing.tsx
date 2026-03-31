import { useState, useMemo } from 'react'
import { Box, Text as InkText, useInput } from 'ink'
import { theme } from '../../theme.js'
import { writing } from '../../data.js'
import { Text } from '../shared/Text.js'
import { Divider } from '../shared/Divider.js'
import { ScrollView, type ScrollItem } from '../shared/ScrollView.js'
import { renderMarkdown } from '../../markdown.js'

interface Props {
  wide: boolean
  width: number
  height: number
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export function Writing({ wide, width, height }: Props) {
  const textWidth = wide ? width - 6 : width - 4
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [readingIndex, setReadingIndex] = useState<number | null>(null)

  const isReading = readingIndex !== null

  // List navigation
  useInput(
    (input, key) => {
      if (key.downArrow || input === 'j') {
        setSelectedIndex((i) => Math.min(i + 1, writing.length - 1))
      }
      if (key.upArrow || input === 'k') {
        setSelectedIndex((i) => Math.max(i - 1, 0))
      }
      if (key.return) {
        setReadingIndex(selectedIndex)
      }
    },
    { isActive: !isReading }
  )

  // Reader: exit on Escape or backspace
  useInput(
    (_input, key) => {
      if (key.escape || key.delete) {
        setReadingIndex(null)
      }
    },
    { isActive: isReading }
  )

  // Render markdown into line items for ScrollView
  const lineItems: ScrollItem[] = useMemo(() => {
    if (readingIndex === null) return []
    const post = writing[readingIndex]
    const rendered = renderMarkdown(post.body, textWidth)
    return rendered.split('\n').map((line, i) => ({
      node: <InkText key={i}>{line}</InkText>,
      lines: 1,
    }))
  }, [readingIndex, textWidth])

  // header(2) + gap(1) + divider(1) + gap(1) + footer(1) = 6 rows of chrome
  const readerViewport = Math.max(5, height - 6)

  // --- Reader mode ---
  if (isReading) {
    const post = writing[readingIndex]

    return (
      <Box flexDirection="column" gap={1} flexGrow={1}>
        {/* Header */}
        <Box flexDirection="column">
          <Text bold color={theme.text} textWidth={textWidth}>
            {post.title}
          </Text>
          <Box gap={1}>
            <Text color={theme.textMuted}>{formatDate(post.date)}</Text>
            <Text color={theme.primaryBright}>{post.tags.join(' · ')}</Text>
          </Box>
        </Box>

        <Divider width={width} />

        {/* Scrollable content — viewport fills available space */}
        <ScrollView items={lineItems} viewportHeight={readerViewport} isActive={isReading} gap={0}>
          {({ canScrollUp, canScrollDown, aboveCount, belowCount }) => (
            <Box justifyContent="space-between">
              <InkText color={theme.textMuted}>Esc to go back</InkText>
              {(canScrollUp || canScrollDown) && (
                <InkText color={theme.textMuted}>
                  {canScrollUp ? `▲ ${aboveCount}` : ''}
                  {canScrollUp && canScrollDown ? '  ' : ''}
                  {canScrollDown ? `▼ ${belowCount}` : ''}
                </InkText>
              )}
            </Box>
          )}
        </ScrollView>
      </Box>
    )
  }

  // --- List mode ---
  return (
    <Box flexDirection="column" gap={1} flexGrow={1}>
      {writing.map((post, i) => {
        const isSelected = i === selectedIndex
        return (
          <Box key={i} flexDirection="column">
            {i > 0 && <Divider width={width} />}
            <Box>
              <InkText color={isSelected ? theme.primaryBright : theme.border}>
                {isSelected ? '▸ ' : '  '}
              </InkText>
              <Text bold color={isSelected ? theme.text : theme.textDim} textWidth={textWidth - 2}>
                {post.title}
              </Text>
            </Box>
            <Box paddingLeft={2} gap={1}>
              <InkText color={theme.textMuted}>{formatDate(post.date)}</InkText>
              <InkText color={theme.primaryBright}>{post.tags.join(' · ')}</InkText>
            </Box>
            {post.summary ? (
              <Box paddingLeft={2}>
                <Text color={theme.textDim} textWidth={textWidth - 2}>
                  {post.summary}
                </Text>
              </Box>
            ) : null}
          </Box>
        )
      })}

      <Box flexGrow={1} />

      <Divider width={width} />

      <Box justifyContent="center">
        <InkText color={theme.textMuted}>Enter to read · ↑↓ navigate</InkText>
      </Box>
    </Box>
  )
}
