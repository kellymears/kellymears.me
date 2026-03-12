import { Card } from '@/components/Card'
import Link from '@/components/Link'

interface WorkItem {
  title: string
  role: string
  description: string
  period: string
  href: string
}

const work: WorkItem[] = [
  {
    title: 'Carrot',
    role: 'Senior Engineer',
    description:
      'SaaS platform serving real estate investors and agents with lead generation and marketing tools.',
    period: '2022–Present',
    href: '/work',
  },
  {
    title: 'Roots',
    role: 'Core Maintainer',
    description:
      'Open source tooling for the WordPress ecosystem — build systems, starter themes, and developer infrastructure.',
    period: '2018–2024',
    href: '/open-source',
  },
  {
    title: 'Tiny Pixel Collective',
    role: 'Principal Engineer',
    description:
      'Consulting studio for progressive nonprofits, tenant organizing, and advocacy organizations.',
    period: '2017–2022',
    href: '/work',
  },
  {
    title: 'Other98',
    role: 'Technology Director',
    description: 'Digital infrastructure for a national grassroots advocacy network.',
    period: '2014–2017',
    href: '/work',
  },
]

export default function SelectedWork() {
  return (
    <section
      aria-label="Selected work experience"
      className="border-t border-gray-200 py-16 dark:border-gray-800"
    >
      <div className="mb-10 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Selected Work
        </h2>
        <Link
          href="/work"
          className="hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium text-gray-500 transition-colors dark:text-gray-400"
        >
          View all <span aria-hidden="true">&rarr;</span>
          <span className="sr-only">work experience</span>
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {work.map((item, i) => (
          <Card
            as={Link}
            key={item.title}
            href={item.href}
            className="p-6"
            style={{ animationDelay: `${i * 75}ms` }}
          >
            <div className="mb-3 flex items-baseline justify-between">
              <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-lg font-semibold text-gray-900 transition-colors dark:text-gray-100">
                {item.title}
              </h3>
              <span className="text-xs text-gray-500 dark:text-gray-400">{item.period}</span>
            </div>
            <p className="text-primary-600 dark:text-primary-400 mb-2 text-sm font-medium">
              {item.role}
            </p>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  )
}
