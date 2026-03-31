import { Box, Text } from 'ink'
import { theme } from '../../theme.js'
import { cycling } from '../../data.js'
import { StatCard } from '../shared/StatCard.js'
import { ProgressBar } from '../shared/ProgressBar.js'
import { Divider } from '../shared/Divider.js'

interface Props {
  wide: boolean
  width: number
}

function fmt(n: number): string {
  return n.toLocaleString('en-US')
}

export function Cycling({ wide, width }: Props) {
  return (
    <Box flexDirection="column" gap={1}>
      {/* Stats row */}
      <Box justifyContent="space-around" flexWrap="wrap">
        <StatCard value={`${fmt(cycling.totalMiles)}`} label="Miles" />
        <StatCard value={`${fmt(cycling.totalRides)}`} label="Rides" />
        <StatCard value={`${fmt(cycling.totalElevation)}`} label="Elevation (ft)" />
        {wide && <StatCard value={`${fmt(cycling.totalHours)}`} label="Hours" />}
      </Box>

      {/* YTD */}
      <Box>
        <Text color={theme.text}>
          <Text bold>{new Date().getFullYear()} YTD</Text>
          {'  '}
          <Text color={theme.textDim}>
            {cycling.ytd.miles} mi · {cycling.ytd.rides} rides · {fmt(cycling.ytd.elevation)} ft ·{' '}
            {cycling.ytd.hours}h
          </Text>
        </Text>
      </Box>

      <Divider width={width} />

      {/* Ride categories */}
      <Text bold color={theme.text}>
        Categories
      </Text>
      <ProgressBar
        width={wide ? width - 10 : width - 6}
        segments={cycling.categories.map((c) => ({
          label: c.name,
          percentage: c.percentage,
          color: c.color,
        }))}
      />

      <Divider width={width} />

      {/* Recent rides */}
      <Text bold color={theme.text}>
        Recent Rides
      </Text>
      {cycling.recentRides.map((ride, i) => (
        <Box key={i} justifyContent="space-between">
          <Text color={theme.textDim} wrap="truncate-end">
            {ride.name}
          </Text>
          <Text color={theme.text}>
            {' '}
            {ride.distance} · {ride.duration}
          </Text>
        </Box>
      ))}

      {/* Biggest ride */}
      <Box paddingTop={1}>
        <Text color={theme.textMuted}>
          Biggest ride: <Text color={theme.primaryBright}>{cycling.biggestRide} mi</Text>
        </Text>
      </Box>
    </Box>
  )
}
