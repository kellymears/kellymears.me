import { Box } from 'ink'
import { theme } from '../../theme.js'
import { stats } from '../../data.js'
import { Text } from '../shared/Text.js'
import { StatCard } from '../shared/StatCard.js'
import { Divider } from '../shared/Divider.js'
import { Timeline } from '../shared/Timeline.js'

interface Props {
  wide: boolean
  width: number
}

export function Resume({ wide, width }: Props) {
  return (
    <Box flexDirection="column" gap={1}>
      {/* Stats row */}
      <Box justifyContent="space-around">
        {stats.map((s) => (
          <StatCard key={s.label} value={s.value} label={s.label} />
        ))}
      </Box>

      <Divider width={width} />

      <Text bold color={theme.text}>
        Experience
      </Text>

      <Timeline wide={wide} width={width} />
    </Box>
  )
}
