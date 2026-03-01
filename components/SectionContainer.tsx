import clsx from 'clsx'
import { PropsWithChildren } from 'react'

interface SectionContainerProps extends PropsWithChildren {
  wide?: boolean
}

export default function SectionContainer({ children, wide }: SectionContainerProps) {
  return (
    <section
      className={clsx(
        'mx-auto px-4 sm:px-6 xl:px-0',
        wide ? 'max-w-6xl' : 'max-w-3xl xl:max-w-5xl'
      )}
    >
      {children}
    </section>
  )
}
