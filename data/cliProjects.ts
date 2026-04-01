export interface CliProject {
  name: string
  command: string
  tagline: string
  description: string
  install: { label: string; command: string }[]
  repo: string
  npm?: string
  features: string[]
  tech: string[]
}

export const cliProjects: CliProject[] = [
  {
    name: 'tarot',
    command: 'arcana',
    tagline: 'Tarot readings in your terminal',
    description:
      'A full-featured tarot CLI with authored interpretations for every card, six spread types, elemental dignities, and an MCP server for LLM integration.',
    install: [
      { label: 'Homebrew', command: 'brew install kellymears/tap/tarot' },
      { label: 'npm', command: 'npx arcana-cli' },
    ],
    repo: 'kellymears/arcana-cli',
    npm: 'arcana-cli',
    features: ['78 Cards', '6 Spreads', 'MCP Server', 'Interactive Mode', 'Reading History'],
    tech: ['TypeScript', 'Ink', 'React'],
  },
]
