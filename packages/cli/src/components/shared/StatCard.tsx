import { Box, Text } from 'ink'
import { theme } from '../../theme.js'

interface Props {
  value: string
  label: string
  width?: number
}

export function StatCard({ value, label, width }: Props) {
  return (
    <Box flexDirection="column" alignItems="center" width={width} paddingX={1}>
      <Text bold color={theme.primaryBright}>
        {value}
      </Text>
      <Text color={theme.textDim}>{label}</Text>
    </Box>
  )
}
