import { Box, Text } from 'ink'
import { theme, TABS } from '../../theme.js'
import type { ReactNode } from 'react'

interface Props {
  activeTab: number
  width: number
  children: ReactNode
}

export function MobileFrame({ activeTab, width, children }: Props) {
  const time = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
  const dots = TABS.map((_, i) => (i === activeTab ? '●' : '○')).join(' ')

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={theme.border}
      width={width}
      paddingX={0}
    >
      {/* iOS status bar */}
      <Box paddingX={1} justifyContent="space-between">
        <Text dimColor>{time}</Text>
        <Text bold color={theme.text}>
          kellymears
        </Text>
      </Box>

      {/* Content area */}
      <Box flexDirection="column" paddingX={1} paddingY={1}>
        {children}
      </Box>

      {/* Section dots */}
      <Box justifyContent="center">
        <Text color={theme.primaryBright}>{dots}</Text>
      </Box>

      {/* Bottom nav */}
      <Box paddingX={1} justifyContent="space-around">
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
  )
}
