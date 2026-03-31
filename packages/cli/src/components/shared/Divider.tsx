import { Text } from 'ink'
import { theme } from '../../theme.js'

interface Props {
  width?: number
}

export function Divider({ width = 50 }: Props) {
  return <Text color={theme.border}>{'╌'.repeat(Math.max(10, width - 6))}</Text>
}
