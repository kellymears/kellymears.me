import tagDisplayNames from '@/data/tagDisplayNames'
import { slug } from 'github-slugger'

const toTitleCase = (str: string): string =>
  str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

export const getTagDisplayName = (tag: string): string => {
  const slugged = slug(tag)
  return tagDisplayNames[slugged] ?? toTitleCase(slugged)
}
