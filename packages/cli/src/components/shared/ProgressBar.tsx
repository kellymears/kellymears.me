import { Box, Text } from 'ink'
import { theme as defaultTheme } from '../../theme.js'

interface Segment {
  label: string
  percentage: number
  color: string
}

interface Props {
  segments: Segment[]
  width: number
}

export function ProgressBar({ segments, width }: Props) {
  const barWidth = Math.max(20, width)

  const bar = segments
    .map((seg) => {
      const chars = Math.max(1, Math.round((seg.percentage / 100) * barWidth))
      return { ...seg, chars }
    })
    .map((seg) => (
      <Text key={seg.label} color={seg.color}>
        {'█'.repeat(seg.chars)}
      </Text>
    ))

  const legend = segments.map((seg, i) => (
    <Text key={seg.label} color={defaultTheme.textDim}>
      {i > 0 ? '  ' : ''}
      <Text color={seg.color}>●</Text> {seg.label} {seg.percentage}%
    </Text>
  ))

  return (
    <Box flexDirection="column" gap={1}>
      <Box>
        <Text>{bar}</Text>
      </Box>
      <Box flexWrap="wrap">{legend}</Box>
    </Box>
  )
}
