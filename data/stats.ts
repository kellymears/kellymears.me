export interface Stat {
  label: string
  value: string
  detail?: string
}

export const stats: Stat[] = [
  { label: 'Years of Experience', value: '10+', detail: 'Professional software development' },
  { label: 'Open Source Repos', value: '130+', detail: 'Across personal and org accounts' },
  { label: 'Weekly Downloads', value: '~13k', detail: 'npm packages in the bud.js ecosystem' },
  { label: 'npm Packages', value: '30+', detail: 'Published and actively maintained' },
]
