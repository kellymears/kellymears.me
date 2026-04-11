import { Card } from '@/components/Card'

export default function Loading() {
  return (
    <div className="space-y-2">
      {/* Header skeleton */}
      <div className="pt-12 pb-6">
        <div className="mb-4">
          <div className="h-4 w-28 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="h-10 w-80 animate-pulse rounded bg-gray-200 sm:h-12 sm:w-96 dark:bg-gray-800" />
        <div className="mt-4 h-5 w-full max-w-lg animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="mt-5 h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* ProfileStats skeleton */}
      <section className="pb-4">
        <dl className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} variant="stat" hover={false} className="px-4 py-5 text-center">
              <dd className="mx-auto h-9 w-16 animate-pulse rounded bg-gray-200 sm:h-10 dark:bg-gray-800" />
              <dt className="mx-auto mt-1 h-4 w-24 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            </Card>
          ))}
        </dl>
      </section>

      {/* FeaturedProjects skeleton */}
      <section className="py-8">
        <div className="mb-6 h-7 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="grid gap-6 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} variant="featured" hover={false} className="relative p-6 sm:p-8">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-6 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-5 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
              </div>
              <div className="mb-5 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              <div className="flex gap-5">
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
