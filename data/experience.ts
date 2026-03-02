export interface Experience {
  role: string
  company: string
  url?: string
  period: string
  startYear: number
  endYear: number | null
  summary: string
  highlights: string[]
  tags: string[]
  type: 'employment' | 'consulting' | 'nonprofit' | 'open-source'
}

export const experience: Experience[] = [
  {
    role: 'Senior Engineer',
    company: 'Carrot',
    url: 'https://carrot.com',
    period: '2022–Present',
    startYear: 2022,
    endYear: null,
    summary:
      'Building scalable web applications for a SaaS platform powering lead generation, marketing, and SEO-optimized websites for real estate investors and agents.',
    highlights: [
      'Architected frontend systems supporting complex real estate marketing and lead generation workflows',
      'Implemented design system and component library used across product teams',
      'Performance optimization reducing page load times across key user flows',
    ],
    tags: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'WordPress', 'Gutenberg', 'Node.js'],
    type: 'employment',
  },
  {
    role: 'Lead Developer of bud.js',
    company: 'Roots',
    url: 'https://roots.io',
    period: '2018–2024',
    startYear: 2018,
    endYear: 2024,
    summary:
      'Primary maintainer and lead developer within the Roots WordPress ecosystem, building modern development tools for WordPress.',
    highlights: [
      'Created bud.js, the official build system for the Roots ecosystem — webpack, SWC, esbuild, PostCSS, and Tailwind out of the box',
      'Shipped 30+ npm packages with 854+ pull requests merged across the organization',
      'Integrated bud.js build tooling into Sage, the most popular WordPress starter theme',
      'Earned Arctic Code Vault Contributor badge for sustained open source contributions',
    ],
    tags: ['TypeScript', 'JavaScript', 'webpack', 'SWC', 'esbuild', 'PostCSS', 'Tailwind CSS', 'PHP', 'Node.js'],
    type: 'open-source',
  },
  {
    role: 'Principal Engineer',
    company: 'Tiny Pixel Collective',
    url: 'https://tinypixel.dev',
    period: '2017–2022',
    startYear: 2017,
    endYear: 2022,
    summary:
      'Founded and led a consulting studio building digital infrastructure for progressive nonprofits and advocacy organizations.',
    highlights: [
      'Built platforms for NDN Collective, Standing Rock campaigns, and dozens of advocacy organizations',
      'Built digital infrastructure for Twin Cities Tenants Union and other grassroots networks',
      "Developed Tiny Pixel's open source portfolio: 78+ repositories",
    ],
    tags: ['WordPress', 'Laravel', 'React', 'TypeScript', 'PHP', 'Docker', 'Node.js', 'Tailwind CSS'],
    type: 'consulting',
  },
  {
    role: 'Technology Director',
    company: 'Other98',
    period: '2014–2017',
    startYear: 2014,
    endYear: 2017,
    summary:
      'Built and maintained the digital backbone for a national grassroots advocacy network reaching millions.',
    highlights: [
      'Managed technical infrastructure for campaigns reaching 5M+ people on social media',
      'Built rapid-response publishing systems for time-sensitive advocacy moments',
      'Led technical strategy for Fight for $15, Standing Rock, and healthcare advocacy campaigns',
    ],
    tags: ['WordPress', 'PHP', 'JavaScript', 'DevOps', 'Node.js', 'MySQL'],
    type: 'nonprofit',
  },
]
