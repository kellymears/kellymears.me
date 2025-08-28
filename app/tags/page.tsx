import Link from '@/components/Link'
import Tag from '@/components/Tag'
import { genPageMetadata } from 'app/seo'
import tagData from 'app/tags.generated.json'
import { slug } from 'github-slugger'

const Page = async () => {
  return (
    <>
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0 dark:divide-gray-700">
        <div className="space-x-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14 dark:text-gray-100">
            Tags
          </h1>
        </div>

        <div className="flex max-w-lg flex-wrap">
          <TagList />
        </div>
      </div>
    </>
  )
}

const TagList = () => {
  const sortedTags = Object.keys(tagData).sort((a, b) => tagData[b] - tagData[a])

  if (sortedTags.length === 0) return 'No tags found.'

  return sortedTags.map((t) => (
    <div key={t} className="mt-2 mr-5 mb-2">
      <Tag text={t} />

      <Link
        href={`/tags/${slug(t)}`}
        className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
        aria-label={`View posts tagged ${t}`}
      >
        {` (${tagData[t]})`}
      </Link>
    </div>
  ))
}

const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default Page
export { metadata }
