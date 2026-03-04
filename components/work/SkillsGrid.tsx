interface SkillCategory {
  name: string
  skills: string[]
}

const categories: SkillCategory[] = [
  {
    name: 'Languages',
    skills: ['TypeScript', 'PHP', 'Ruby', 'HTML', 'CSS', 'SQL', 'Bash'],
  },
  {
    name: 'Frameworks & Libraries',
    skills: [
      'React',
      'Next.js',
      'Laravel',
      'WordPress',
      'Gutenberg',
      'Tailwind CSS',
      'Sass',
      'PostCSS',
      'MDX',
      'Storybook',
    ],
  },
  {
    name: 'Architecture',
    skills: [
      'Monorepos',
      'Plugin Systems',
      'Design Systems',
      'REST APIs',
      'GraphQL',
      'CI/CD',
      'Static Analysis',
    ],
  },
  {
    name: 'Tools & Infrastructure',
    skills: [
      'webpack',
      'Vite',
      'SWC',
      'esbuild',
      'Babel',
      'ESLint',
      'Prettier',
      'Docker',
      'Git',
      'Node.js',
      'GitHub Actions',
      'AWS',
      'MySQL',
      'Redis',
      'Nginx',
      'Netlify',
      'Vercel',
    ],
  },
]

export function SkillsGrid() {
  return (
    <section className="border-t border-gray-200 py-12 dark:border-gray-800" aria-label="Skills">
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Skills
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category, categoryIndex) => (
          <div
            key={category.name}
            className="animate-on-scroll"
            style={{ animationDelay: `${categoryIndex * 100}ms` }}
          >
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
              {category.name}
            </h3>
            <ul className="flex flex-wrap gap-1.5" aria-label={category.name}>
              {category.skills.map((skill) => (
                <li
                  key={skill}
                  className="hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-950/60 dark:hover:text-primary-300 cursor-default rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-700 transition-colors dark:bg-gray-800 dark:text-gray-300"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
