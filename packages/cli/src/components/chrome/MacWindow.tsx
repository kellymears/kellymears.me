import { Box, Text } from 'ink'
import { theme, TABS } from '../../theme.js'
import type { ReactNode } from 'react'

interface Props {
  activeTab: number
  width: number
  children: ReactNode
}

export function MacWindow({ activeTab, width, children }: Props) {
  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={theme.border}
      width={width}
      paddingX={0}
    >
      {/* Title bar */}
      <Box paddingX={1} justifyContent="center">
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
      <Box
        paddingX={1}
        gap={2}
        borderTop={false}
        borderBottom={false}
        borderLeft={false}
        borderRight={false}
      >
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

      {/* Content area */}
      <Box flexDirection="column" paddingX={2} paddingY={1}>
        {children}
      </Box>
    </Box>
  )
}
