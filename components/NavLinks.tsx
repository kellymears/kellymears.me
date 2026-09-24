'use client'

import headerNavLinks, { topNavLinks } from '@/data/headerNavLinks'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function resolveActiveHref(pathname: string, links: typeof headerNavLinks): string | null {
  for (const link of links) {
    if (pathname === link.href || pathname.startsWith(link.href + '/')) return link.href
  }
  return null
}

interface NavLinksProps {
  alwaysVisible?: boolean
  /** The footer lists every link; the header omits `footerOnly` ones. */
  placement?: 'header' | 'footer'
}

export default function NavLinks({ alwaysVisible = false, placement = 'header' }: NavLinksProps) {
  const pathname = usePathname()
  const links = placement === 'footer' ? headerNavLinks : topNavLinks
  const activeHref = resolveActiveHref(pathname, links)

  return (
    <div
      className={clsx(
        'no-scrollbar relative max-w-[calc(100vw-2rem)] items-center gap-x-3 overflow-x-auto sm:max-w-full',
        alwaysVisible ? 'flex' : 'hidden xl:flex'
      )}
    >
      {links.map((link) => {
        const isActive = link.href === activeHref
        return (
          <Link
            key={link.title}
            href={link.href}
            aria-current={isActive ? 'page' : undefined}
            className={clsx(
              'relative shrink-0 rounded-full px-2.5 py-1 font-medium whitespace-nowrap transition-all duration-500',
              isActive
                ? 'bg-primary-200/60 dark:bg-primary-800/40 text-gray-900 dark:text-gray-100'
                : 'hover:text-primary-600 dark:hover:text-primary-400 text-gray-600 dark:text-gray-300'
            )}
          >
            {link.title}
          </Link>
        )
      })}
    </div>
  )
}
