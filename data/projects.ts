export interface FeaturedSite {
  title: string
  description: string
  url: string
  image: string
  tags: string[]
  context: string
}

export const featuredSites: FeaturedSite[] = [
  {
    title: 'Twin Cities Tenants Union',
    description: 'Digital infrastructure for tenant organizing in Minneapolis–Saint Paul.',
    url: 'https://twincitiestenants.org',
    image: '/static/images/projects/tctunion.png',
    tags: ['WordPress', 'Organizing'],
    context: 'Tiny Pixel Collective',
  },
  {
    title: 'Other98',
    description:
      'Rapid-response publishing platform for a national grassroots advocacy network reaching millions.',
    url: 'https://other98.com',
    image: '/static/images/projects/other98.png',
    tags: ['WordPress', 'PHP'],
    context: 'Technology Director',
  },
]
