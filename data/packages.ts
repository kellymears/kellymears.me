type Token = { text: string; cls?: string }

export interface Package {
  name: string
  tagline: string
  description: string
  usage: Token[][]
  repo: string
  npm: string
  features: string[]
  tech: string[]
}

const k = 'text-purple-400'
const fn = 'text-amber-300'
const str = 'text-green-400'
const cmt = 'text-gray-500'

export const packages: Package[] = [
  {
    name: 'deghost',
    tagline: 'Strip invisible Unicode characters and normalize whitespace',
    description:
      'A chainable, type-safe API for stripping invisible Unicode characters and normalizing whitespace. Zero dependencies.',
    usage: [
      [
        { text: 'import', cls: k },
        { text: ' { deghost } ' },
        { text: 'from', cls: k },
        { text: ' ' },
        { text: "'deghost'", cls: str },
      ],
      [],
      [{ text: '// invisible characters are hiding in here', cls: cmt }],
      [
        { text: 'deghost', cls: fn },
        { text: '(' },
        { text: "'hello\\u200B\\u00a0world'", cls: str },
        { text: ')' },
      ],
      [{ text: "// → 'hello world' 👻", cls: cmt }],
    ],
    repo: 'kellymears/deghost',
    npm: 'deghost',
    features: ['Zero Dependencies', 'Chainable API', 'Type-Safe', 'Presets'],
    tech: ['TypeScript'],
  },
]
