export const theme = {
  // Primary coral/amber (from site's OKLCH palette)
  primary: '#d87830',
  primaryBright: '#e08850',
  primaryDim: '#a04e28',

  // Warm grays (dark terminal background)
  text: '#e8e0d8',
  textDim: '#a8a098',
  textMuted: '#6a6158',
  border: '#484038',

  // Traffic light dots
  red: '#ff5f56',
  yellow: '#ffbd2e',
  green: '#27c93f',

  // Language colors
  typescript: '#3178c6',
  javascript: '#f1e05a',
  php: '#4F5D95',
  shell: '#89e051',

  // Timeline node colors by experience type
  employment: '#d87830',
  'open-source': '#8B5CF6',
  consulting: '#F59E0B',
  nonprofit: '#10B981',
} as const

export type Theme = typeof theme

export const TABS = [
  { label: 'About', short: 'About', key: '1' },
  { label: 'Cycling', short: 'Ride', key: '2' },
  { label: 'Writing', short: 'Blog', key: '3' },
] as const
