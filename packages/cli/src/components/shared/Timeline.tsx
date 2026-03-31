import { Box, Text } from 'ink'
import { theme } from '../../theme.js'
import { experience } from '../../data.js'
import { wordWrap } from '../../wrap.js'

interface Props {
  wide: boolean
  width: number
}

const typeColors: Record<string, string> = {
  employment: theme.employment,
  'open-source': theme['open-source'],
  consulting: theme.consulting,
  nonprofit: theme.nonprofit,
}

export function Timeline({ wide, width }: Props) {
  const lineWidth = (wide ? width - 6 : width - 4) - 2

  return (
    <>
      {experience.map((exp, i) => {
        const nodeColor = typeColors[exp.type] || theme.primary
        const isLast = i === experience.length - 1
        const connector = isLast ? ' ' : '┃'

        return (
          <Box key={i} flexDirection="column">
            {/* Header: node + role + period */}
            <Box>
              <Text color={nodeColor}>●━━ </Text>
              <Box justifyContent="space-between" flexGrow={1}>
                <Text bold color={theme.text}>
                  {exp.role}
                </Text>
                {wide && <Text color={theme.textMuted}>{exp.period}</Text>}
              </Box>
            </Box>

            {/* Company */}
            <Box>
              <Text color={nodeColor}>{connector} </Text>
              <Text color={theme.primaryBright}>{exp.company}</Text>
              {!wide && <Text color={theme.textMuted}> · {exp.period}</Text>}
            </Box>

            {/* Summary */}
            {wordWrap(exp.summary, lineWidth)
              .split('\n')
              .map((line, j) => (
                <Box key={`s${j}`}>
                  <Text color={nodeColor}>{connector} </Text>
                  <Text color={theme.textDim}>{line}</Text>
                </Box>
              ))}

            {/* Tags */}
            {wordWrap(exp.tags.slice(0, wide ? 7 : 4).join(' · '), lineWidth)
              .split('\n')
              .map((line, j) => (
                <Box key={`t${j}`}>
                  <Text color={nodeColor}>{connector} </Text>
                  <Text color={theme.textMuted}>{line}</Text>
                </Box>
              ))}

            {/* Spacing between entries */}
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
