import siteMetadata from '@/data/siteMetadata'
import clsx from 'clsx'
import Link from './Link'
import MobileNav from './MobileNav'
import NavLinks from './NavLinks'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  return (
    <header
      className={clsx(
        'z-50 flex w-full items-center justify-between py-4',
        siteMetadata.stickyNav ? 'sticky top-0' : 'relative'
      )}
    >
      {/* Full-bleed backdrop. The header itself is only as wide as the page
          column, and full-bleed sections (graphs, route fields) scroll under
          it — they would show through beside a column-width background.
          Opaque on purpose: a backdrop-filter here re-rasterizes whatever
          animates beneath it every frame, and made the wiki graph flicker. */}
      <div
        aria-hidden="true"
        className="bg-paper pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 dark:bg-gray-950"
      />
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="h-6 text-xl font-semibold tracking-tight whitespace-nowrap text-gray-900 sm:block dark:text-gray-100">
            {siteMetadata.headerTitle}
          </div>
        </div>
      </Link>

      <div className="flex items-center space-x-4 leading-5 xl:-mr-6 xl:space-x-6">
        <NavLinks />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
