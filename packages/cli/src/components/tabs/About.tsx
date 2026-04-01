import { Box } from 'ink'
import { theme } from '../../theme.js'
import type { Profile, ExperienceEntry } from '../../types.js'
import { Text } from '../shared/Text.js'
import { Divider } from '../shared/Divider.js'
import { Link } from '../shared/Link.js'
import { ScrollView } from '../shared/ScrollView.js'
import { ScrollIndicator } from '../shared/ScrollIndicator.js'
import { buildTimelineItems } from '../shared/Timeline.js'

interface Props {
  wide: boolean
  width: number
  height: number
  profile: Profile
  experience: ExperienceEntry[]
}

export function About({ wide, width, height, profile, experience }: Props) {
  const textWidth = wide ? width - 6 : width - 4
  const name = wide ? profile.name.toUpperCase().split('').join(' ') : profile.name

  const timelineItems = buildTimelineItems(wide, width, experience)

  // Approximate fixed rows: name(2) + bio(~2) + divider(1) + indicator(1) + divider(1) + links(3) + gaps(5) ≈ 15
  const bioLines = Math.max(1, Math.ceil(profile.bio.length / Math.max(1, textWidth)))
  const timelineViewport = Math.max(2, Math.floor((height - bioLines - 13) / 5))

  return (
    <Box flexDirection="column" gap={1} flexGrow={1}>
      {/* Name + title */}
      <Box flexDirection="column">
        <Text bold color={theme.text}>
          {name}
        </Text>
        <Text color={theme.primaryBright}>
          {profile.occupation} at {profile.company} · {profile.location}
        </Text>
      </Box>

      {/* Hero copy */}
      <Text color={theme.text} textWidth={textWidth}>
        {profile.bio}
      </Text>

      <Divider width={width} />

      {/* Scrollable timeline */}
      <ScrollView items={timelineItems} viewportHeight={timelineViewport} isActive={true} gap={0}>
        {(state) => <ScrollIndicator {...state} />}
      </ScrollView>

      <Box flexGrow={1} />

      <Divider width={width} />

      {/* Social links (footer) */}
      {wide ? (
        <Box flexDirection="column" gap={0}>
          <Box gap={4}>
            <Box width={Math.floor(width / 2 - 6)}>
              <Text color={theme.textDim}>◆ </Text>
              <Link url={profile.links.github} />
            </Box>
            <Box>
              <Text color={theme.textDim}>◆ </Text>
              <Link url={`mailto:${profile.links.email}`} label={profile.links.email} />
            </Box>
          </Box>
          <Box gap={4}>
            <Box width={Math.floor(width / 2 - 6)}>
              <Text color={theme.textDim}>◆ </Text>
              <Link url={profile.links.linkedin} />
            </Box>
            <Box>
              <Text color={theme.textDim}>◆ </Text>
              <Link url={profile.links.x} />
            </Box>
          </Box>
          <Box>
            <Text color={theme.textDim}>◆ </Text>
            <Link url={profile.links.site} />
          </Box>
        </Box>
      ) : (
        <Box flexDirection="column" gap={0}>
          <Box>
            <Text color={theme.textDim}>◆ </Text>
            <Link url={profile.links.github} />
          </Box>
          <Box>
            <Text color={theme.textDim}>◆ </Text>
            <Link url={`mailto:${profile.links.email}`} label={profile.links.email} />
          </Box>
          <Box>
            <Text color={theme.textDim}>◆ </Text>
            <Link url={profile.links.linkedin} />
          </Box>
        </Box>
      )}
    </Box>
  )
}
