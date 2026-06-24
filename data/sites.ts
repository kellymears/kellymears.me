export interface SubdomainSite {
  title: string
  description: string
  url: string
  slug: string
  tags: string[]
  icon: 'sparkles' | 'code-bracket' | 'diamond'
  accent: 'violet' | 'sky' | 'lime'
}

export const subdomainSites: SubdomainSite[] = [
  {
    title: 'Symbioku',
    description:
      'A daily 9×9 logic puzzle played with symbols instead of numbers. Three difficulties, fresh every day.',
    url: 'https://symbioku.kellymears.me',
    slug: 'symbioku',
    tags: ['Game', 'React', 'Daily Puzzle'],
    icon: 'diamond',
    accent: 'lime',
  },
  {
    title: 'Agents',
    description: 'Commands, skills, rules, and agent configurations for Claude Code.',
    url: 'https://agents.kellymears.me',
    slug: 'agents',
    tags: ['Claude Code', 'AI', 'Tooling'],
    icon: 'sparkles',
    accent: 'violet',
  },
  {
    title: 'VS Code Mago',
    description: 'VS Code extension for the mago PHP linter, formatter, and static analyzer.',
    url: 'https://vscode-mago.kellymears.me',
    slug: 'vscode-mago',
    tags: ['VS Code', 'PHP', 'Mago'],
    icon: 'code-bracket',
    accent: 'sky',
  },
]
