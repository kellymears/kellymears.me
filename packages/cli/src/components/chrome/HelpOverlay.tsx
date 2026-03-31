import { Box, Text } from 'ink'
import { theme } from '../../theme.js'

interface Props {
  width: number
}

export function HelpOverlay({ width: _width }: Props) {
  const w = 40
  const inner = w - 2
  const line = (label: string, desc: string) => {
    const pad = inner - 4 - label.length - desc.length
    return `  ${label}${' '.repeat(Math.max(1, pad))}${desc}`
  }

  return (
    <Box flexDirection="column">
      <Text color={theme.border}>{`╭${'─'.repeat(inner)}╮`}</Text>
      <Text color={theme.text}>{'│' + '  Keyboard Shortcuts'.padEnd(inner) + '│'}</Text>
      <Text color={theme.border}>{`├${'─'.repeat(inner)}┤`}</Text>
      <Text color={theme.border}>{'│' + ' '.repeat(inner) + '│'}</Text>
      <Text color={theme.textDim}>{'│' + line('← →  h l', 'Switch tabs') + '  │'}</Text>
      <Text color={theme.textDim}>{'│' + line('1-4', 'Jump to tab') + '  │'}</Text>
      <Text color={theme.textDim}>{'│' + line('Tab / S-Tab', 'Cycle tabs') + '  │'}</Text>
      <Text color={theme.textDim}>{'│' + line('↑ ↓  j k', 'Scroll') + '  │'}</Text>
      <Text color={theme.textDim}>{'│' + line('Enter', 'Open post') + '  │'}</Text>
      <Text color={theme.textDim}>{'│' + line('Esc', 'Back to list') + '  │'}</Text>
      <Text color={theme.border}>{'│' + ' '.repeat(inner) + '│'}</Text>
      <Text color={theme.textDim}>{'│' + line('q', 'Quit') + '  │'}</Text>
      <Text color={theme.textDim}>{'│' + line('?', 'Toggle help') + '  │'}</Text>
      <Text color={theme.border}>{'│' + ' '.repeat(inner) + '│'}</Text>
      <Text color={theme.border}>{`╰${'─'.repeat(inner)}╯`}</Text>
    </Box>
  )
}
