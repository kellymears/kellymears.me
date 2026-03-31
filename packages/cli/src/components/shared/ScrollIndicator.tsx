import { Box, Text } from 'ink'
import { theme } from '../../theme.js'
import type { ScrollState } from './ScrollView.js'

export function ScrollIndicator({
  canScrollUp,
  canScrollDown,
  aboveCount,
  belowCount,
}: ScrollState) {
  if (!canScrollUp && !canScrollDown) return null
  return (
    <Box justifyContent="center" gap={4}>
      {canScrollUp ? <Text color={theme.textMuted}>▲ {aboveCount} above</Text> : <Text> </Text>}
      {canScrollDown ? <Text color={theme.textMuted}>▼ {belowCount} below</Text> : <Text> </Text>}
    </Box>
  )
}
