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
  type: 'employment' | 'consulting' | 'nonprofit'
}

export const experience: Experience[] = [
  {
    role: 'Engineering Specialist',
    company: 'Carrot',
    url: 'https://carrot.com',
    period: '2022–Present',
    startYear: 2022,
    endYear: null,
    summary:
      'Building scalable web applications for a benefits platform serving over 8,000 customers.',
    highlights: [
      'Architected frontend systems supporting complex benefits administration workflows',
      'Implemented design system and component library used across product teams',
      'Performance optimization reducing page load times across key user flows',
    ],
    tags: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
    type: 'employment',
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
      'Created bud.js, the official build system for the Roots WordPress ecosystem',
      "Developed Tiny Pixel's open source portfolio: 78+ repositories",
    ],
    tags: ['WordPress', 'Laravel', 'React', 'TypeScript', 'PHP', 'Docker'],
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
    tags: ['WordPress', 'PHP', 'JavaScript', 'DevOps'],
    type: 'nonprofit',
  },
]
