interface NavLink {
  href: string
  title: string
  /** Listed in the footer only — kept reachable without a top-nav slot. */
  footerOnly?: boolean
}

const headerNavLinks: NavLink[] = [
  { href: '/open-source', title: 'Open Source' },
  { href: '/movement', title: 'Movement' },
  { href: '/knowledge', title: 'Knowledge' },
  { href: '/work', title: 'Resume' },
  { href: '/about', title: 'About' },
  { href: '/blog', title: 'Writing', footerOnly: true },
]

export const topNavLinks = headerNavLinks.filter((link) => !link.footerOnly)

export default headerNavLinks
