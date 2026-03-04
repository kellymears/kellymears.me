import { slug } from 'github-slugger'
import Link from 'next/link'
import { getTagDisplayName } from '@/lib/tags'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-950 dark:hover:text-primary-300 mr-2 mb-1 inline-block rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium text-gray-700 transition-all duration-150 hover:-translate-y-px hover:shadow-sm dark:bg-gray-800 dark:text-gray-300"
    >
      {getTagDisplayName(text)}
    </Link>
  )
}

export default Tag
