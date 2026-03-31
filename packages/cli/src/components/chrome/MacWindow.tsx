import { Box, Text } from 'ink'
import { theme, TABS } from '../../theme.js'
import type { ReactNode } from 'react'

interface Props {
  activeTab: number
  width: number
  height: number
  children: ReactNode
}

export function MacWindow({ activeTab, width, height, children }: Props) {
  const inner = width - 2

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
        {/* Title bar */}
        <Box justifyContent="center">
          <Box position="absolute">
            <Text>
              {'  '}
              <Text color={theme.red}>●</Text> <Text color={theme.yellow}>●</Text>{' '}
              <Text color={theme.green}>●</Text>
            </Text>
          </Box>
          <Text bold color={theme.text}>
            kellymears.me
          </Text>
        </Box>

        {/* Tab bar */}
        <Box gap={2}>
          {TABS.map((tab, i) => (
            <Text
              key={tab.key}
              bold={i === activeTab}
              color={i === activeTab ? theme.primaryBright : theme.textDim}
            >
              {i === activeTab ? '▸ ' : '  '}
              {tab.label}
            </Text>
          ))}
        </Box>

        {/* Content area — fills remaining window space */}
        <Box flexDirection="column" paddingX={1} paddingY={1} flexGrow={1}>
          {children}
        </Box>
      </Box>
    </Box>
  )
}
