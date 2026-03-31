import { Box, Text } from 'ink'
import { theme } from '../../theme.js'

interface Props {
  wide: boolean
}

export function StatusBar({ wide }: Props) {
  return (
    <Box paddingX={1} paddingTop={0}>
      <Text color={theme.textMuted}>
        {wide ? '←→ navigate   1-4 jump   q quit   ? help' : '←→ navigate   q quit   ? help'}
      </Text>
    </Box>
  )
}
