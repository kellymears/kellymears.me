import { Box } from 'ink'
import { theme } from '../../theme.js'
import { profile } from '../../data.js'
import { Text } from '../shared/Text.js'
import { Divider } from '../shared/Divider.js'
import { Link } from '../shared/Link.js'
import { Timeline } from '../shared/Timeline.js'

interface Props {
  wide: boolean
  width: number
}

export function About({ wide, width }: Props) {
  const textWidth = wide ? width - 6 : width - 4
  const name = wide ? profile.name.toUpperCase().split('').join(' ') : profile.name

  return (
    <Box flexDirection="column" gap={1}>
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

      <Timeline wide={wide} width={width} />

      <Divider width={width} />

      {/* Social links */}
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
