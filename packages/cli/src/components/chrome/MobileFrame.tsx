import { Box, Text } from 'ink'
import { theme, TABS } from '../../theme.js'
import type { ReactNode } from 'react'

interface Props {
  activeTab: number
  width: number
  height: number
  children: ReactNode
}

export function MobileFrame({ activeTab, width, height, children }: Props) {
  const inner = width - 2
  const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const dots = TABS.map((_, i) => (i === activeTab ? '●' : '○')).join(' ')

  return (
    <Box flexDirection="column" width={width} height={height}>
      {/* Opaque fill layer — manual border + space fill */}
      <Box position="absolute" flexDirection="column">
        <Text color={theme.border}>{'╭' + '─'.repeat(inner) + '╮'}</Text>
        {Array.from({ length: height - 2 }, (_, i) => (
          <Text key={i}>
            <Text color={theme.border}>│</Text>
            {' '.repeat(inner)}
            <Text color={theme.border}>│</Text>
          </Text>
        ))}
        <Text color={theme.border}>{'╰' + '─'.repeat(inner) + '╯'}</Text>
      </Box>

      {/* Content layer */}
      <Box
        position="absolute"
        flexDirection="column"
        width={width}
        height={height}
        paddingX={1}
        paddingY={1}
      >
        {/* iOS status bar */}
        <Box justifyContent="space-between">
          <Text dimColor>{time}</Text>
          <Text bold color={theme.text}>
            kellymears
          </Text>
        </Box>

        {/* Content area (fills available space) */}
        <Box flexDirection="column" paddingY={1} flexGrow={1}>
          {children}
        </Box>

        {/* Section dots */}
        <Box justifyContent="center">
          <Text color={theme.primaryBright}>{dots}</Text>
        </Box>

        {/* Bottom nav */}
        <Box justifyContent="space-around">
          {TABS.map((tab, i) => (
            <Text
              key={tab.key}
              bold={i === activeTab}
              color={i === activeTab ? theme.primaryBright : theme.textDim}
            >
              {tab.short}
            </Text>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
