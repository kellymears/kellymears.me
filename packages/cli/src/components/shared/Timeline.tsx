import { Box, Text } from 'ink'
import { theme } from '../../theme.js'
import type { ExperienceEntry } from '../../types.js'
import { wordWrap } from '../../wrap.js'
import type { ScrollItem } from './ScrollView.js'

const typeColors: Record<string, string> = {
  employment: theme.employment,
  'open-source': theme['open-source'],
  consulting: theme.consulting,
  nonprofit: theme.nonprofit,
}

function TimelineEntry({
  entry,
  isLast,
  wide,
  lineWidth,
}: {
  entry: ExperienceEntry
  isLast: boolean
  wide: boolean
  lineWidth: number
}) {
  const nodeColor = typeColors[entry.type] || theme.primary
  const connector = isLast ? ' ' : '┃'

  return (
    <Box flexDirection="column">
      <Box>
        <Text color={nodeColor}>●━━ </Text>
        <Box justifyContent="space-between" flexGrow={1}>
          <Text bold color={theme.text}>
            {entry.role}
          </Text>
          {wide && <Text color={theme.textMuted}>{entry.period}</Text>}
        </Box>
      </Box>
      <Box>
        <Text color={nodeColor}>{connector} </Text>
        <Text color={theme.primaryBright}>{entry.company}</Text>
        {!wide && <Text color={theme.textMuted}> · {entry.period}</Text>}
      </Box>
      {wordWrap(entry.summary, lineWidth)
        .split('\n')
        .map((line, j) => (
          <Box key={`s${j}`}>
            <Text color={nodeColor}>{connector} </Text>
            <Text color={theme.textDim}>{line}</Text>
          </Box>
        ))}
      {wordWrap(entry.tags.slice(0, wide ? 7 : 4).join(' · '), lineWidth)
        .split('\n')
        .map((line, j) => (
          <Box key={`t${j}`}>
            <Text color={nodeColor}>{connector} </Text>
            <Text color={theme.textMuted}>{line}</Text>
          </Box>
        ))}
      {!isLast && (
        <Box>
          <Text color={nodeColor}>{connector}</Text>
        </Box>
      )}
    </Box>
  )
}

export function buildTimelineItems(
  wide: boolean,
  width: number,
  experience: ExperienceEntry[]
): ScrollItem[] {
  const lineWidth = (wide ? width - 6 : width - 4) - 2
  return experience.map((entry, i) => {
    const isLast = i === experience.length - 1
    const summaryLines = wordWrap(entry.summary, lineWidth).split('\n').length
    const tagLines = wordWrap(entry.tags.slice(0, wide ? 7 : 4).join(' · '), lineWidth).split(
      '\n'
    ).length
    const lines = 2 + summaryLines + tagLines + (isLast ? 0 : 1)
    return {
      node: (
        <TimelineEntry key={i} entry={entry} isLast={isLast} wide={wide} lineWidth={lineWidth} />
      ),
      lines,
    }
  })
}

/** @deprecated Use buildTimelineItems() with ScrollView instead */
export function Timeline({
  wide,
  width,
  experience,
}: {
  wide: boolean
  width: number
  experience: ExperienceEntry[]
}) {
  const lineWidth = (wide ? width - 6 : width - 4) - 2

  return (
    <>
      {experience.map((exp, i) => {
        const nodeColor = typeColors[exp.type] || theme.primary
        const isLast = i === experience.length - 1
        const connector = isLast ? ' ' : '┃'

        return (
          <Box key={i} flexDirection="column">
            <Box>
              <Text color={nodeColor}>●━━ </Text>
              <Box justifyContent="space-between" flexGrow={1}>
                <Text bold color={theme.text}>
                  {exp.role}
                </Text>
                {wide && <Text color={theme.textMuted}>{exp.period}</Text>}
              </Box>
            </Box>
            <Box>
              <Text color={nodeColor}>{connector} </Text>
              <Text color={theme.primaryBright}>{exp.company}</Text>
              {!wide && <Text color={theme.textMuted}> · {exp.period}</Text>}
            </Box>
            {wordWrap(exp.summary, lineWidth)
              .split('\n')
              .map((line, j) => (
                <Box key={`s${j}`}>
                  <Text color={nodeColor}>{connector} </Text>
                  <Text color={theme.textDim}>{line}</Text>
                </Box>
              ))}
            {wordWrap(exp.tags.slice(0, wide ? 7 : 4).join(' · '), lineWidth)
              .split('\n')
              .map((line, j) => (
                <Box key={`t${j}`}>
                  <Text color={nodeColor}>{connector} </Text>
                  <Text color={theme.textMuted}>{line}</Text>
                </Box>
              ))}
            {!isLast && (
              <Box>
                <Text color={nodeColor}>{connector}</Text>
              </Box>
            )}
          </Box>
        )
      })}
    </>
  )
}
