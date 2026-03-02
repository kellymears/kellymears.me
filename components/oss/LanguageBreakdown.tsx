import type { LanguageBreakdown as LanguageBreakdownType } from '@/lib/github'

interface LanguageBreakdownProps {
  languages: LanguageBreakdownType[]
}

export function LanguageBreakdown({ languages }: LanguageBreakdownProps) {
  if (languages.length === 0) return null

  return (
    <section className="animate-on-scroll py-8">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Languages
      </h2>

      <div className="mb-5 overflow-hidden rounded-full bg-gray-100 shadow-inner dark:bg-gray-800">
        <div className="animate-grow-width flex h-4">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="transition-all first:rounded-l-full last:rounded-r-full"
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: lang.color,
                minWidth: lang.percentage > 0 ? '4px' : 0,
              }}
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-3 md:grid-cols-4">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-2.5">
            <span
              className="inline-block h-3 w-3 shrink-0 rounded-full shadow-sm"
              style={{ backgroundColor: lang.color }}
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {lang.name}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{lang.percentage}%</span>
          </div>
        ))}
      </div>
    </section>
  )
}
