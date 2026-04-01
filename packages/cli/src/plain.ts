import type { Profile } from './types.js'

function wordWrap(text: string, maxWidth: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    if (current && current.length + 1 + word.length > maxWidth) {
      lines.push(current)
      current = word
    } else {
      current = current ? `${current} ${word}` : word
    }
  }
  if (current) lines.push(current)
  return lines
}

export function plainTextCard(profile: Profile): string {
  const w = 54
  const inner = w - 6
  const line = (text: string) => `\u2502  ${text.padEnd(inner)}  \u2502`
  const blank = line('')

  const bioLines = wordWrap(profile.bio, inner)

  return [
    `\u256D${'─'.repeat(w - 2)}\u256E`,
    blank,
    line(profile.name),
    line(`${profile.occupation} at ${profile.company}`),
    line(profile.location),
    blank,
    ...bioLines.map(line),
    blank,
    line(`GitHub    github.com/${profile.login}`),
    line(`LinkedIn  linkedin.com/in/${profile.login}`),
    line(`Email     ${profile.links.email}`),
    line(`Web       kellymears.me`),
    blank,
    `\u2570${'─'.repeat(w - 2)}\u256F`,
    '',
  ].join('\n')
}

export function offlineCard(): string {
  const w = 54
  const inner = w - 6
  const line = (text: string) => `\u2502  ${text.padEnd(inner)}  \u2502`
  const blank = line('')

  return [
    `\u256D${'─'.repeat(w - 2)}\u256E`,
    blank,
    line('Kelly Mears'),
    blank,
    line('Could not reach kellymears.me'),
    line('Please check your connection and try again.'),
    blank,
    line('Web  https://kellymears.me'),
    blank,
    `\u2570${'─'.repeat(w - 2)}\u256F`,
    '',
  ].join('\n')
}
