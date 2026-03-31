import { Text } from 'ink'
import { theme } from '../../theme.js'

interface Props {
  url: string
  label?: string
}

export function Link({ url, label }: Props) {
  const display = label || url.replace(/^https?:\/\//, '')
  // OSC 8 terminal hyperlink
  const link = `\x1b]8;;${url}\x07${display}\x1b]8;;\x07`
  return <Text color={theme.primaryBright}>{link}</Text>
}
