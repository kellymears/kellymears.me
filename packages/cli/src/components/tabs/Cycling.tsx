import { Box, Text } from 'ink'
import { theme } from '../../theme.js'
import type { CyclingData, RecentRide } from '../../types.js'
import { StatCard } from '../shared/StatCard.js'
import { ProgressBar } from '../shared/ProgressBar.js'
import { Divider } from '../shared/Divider.js'
import { ScrollView, type ScrollItem } from '../shared/ScrollView.js'
import { ScrollIndicator } from '../shared/ScrollIndicator.js'

interface Props {
  wide: boolean
  width: number
  height: number
  cycling: CyclingData
}

function fmt(n: number): string {
  return n.toLocaleString('en-US')
}

function RideRow({ ride }: { ride: RecentRide }) {
  return (
    <Box justifyContent="space-between">
      <Text color={theme.textDim} wrap="truncate-end">
        {ride.name}
      </Text>
      <Text color={theme.text}>
        {' '}
        {ride.distance} · {ride.duration}
      </Text>
    </Box>
  )
}

export function Cycling({ wide, width, height, cycling }: Props) {
  // Build scrollable items: categories + rides
  const items: ScrollItem[] = []

  items.push({
    node: (
      <Text key="cat-heading" bold color={theme.text}>
        Categories
      </Text>
    ),
    lines: 1,
  })
  items.push({
    node: (
      <ProgressBar
        key="cat-bar"
        width={wide ? width - 6 : width - 4}
        segments={cycling.categories.map((c) => ({
          label: c.name,
          percentage: c.percentage,
          color: c.color,
        }))}
      />
    ),
    lines: 2,
  })

  items.push({ node: <Divider key="div-rides" width={width} />, lines: 1 })

  items.push({
    node: (
      <Text key="rides-heading" bold color={theme.text}>
        Recent Rides
      </Text>
    ),
    lines: 1,
  })
  for (const ride of cycling.recentRides) {
    items.push({
      node: <RideRow key={ride.name} ride={ride} />,
      lines: 1,
    })
  }

  // stats(2) + YTD(1) + divider(1) + indicator(1) + biggest(1) + gaps(4) ≈ 10
  const scrollViewport = Math.max(4, height - 10)

  return (
    <Box flexDirection="column" gap={1} flexGrow={1}>
      {/* Stats row (fixed top) */}
      <Box justifyContent="space-around" flexWrap="wrap">
        <StatCard value={`${fmt(cycling.totalMiles)}`} label="Miles" />
        <StatCard value={`${fmt(cycling.totalRides)}`} label="Rides" />
        <StatCard value={`${fmt(cycling.totalElevation)}`} label="Elevation (ft)" />
        {wide && <StatCard value={`${fmt(cycling.totalHours)}`} label="Hours" />}
      </Box>

      {/* YTD (fixed top) */}
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

      {/* Scrollable middle */}
      <ScrollView items={items} viewportHeight={scrollViewport} isActive={true}>
        {(state) => <ScrollIndicator {...state} />}
      </ScrollView>

      <Box flexGrow={1} />

      {/* Biggest ride (footer) */}
      <Box>
        <Text color={theme.textMuted}>
          Biggest ride: <Text color={theme.primaryBright}>{cycling.biggestRide} mi</Text>
        </Text>
      </Box>
      <Box height={1} />
    </Box>
  )
}
