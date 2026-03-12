import clsx from 'clsx'
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

type CardVariant = 'default' | 'stat' | 'featured'

const variantStyles: Record<CardVariant, string> = {
  default: [
    'rounded-xl border border-gray-200 dark:border-gray-800',
    'hover:border-primary-300 dark:hover:border-primary-700 dark:hover:shadow-primary-950/20',
  ].join(' '),
  stat: [
    'rounded-xl border border-gray-100 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50',
    'hover:border-primary-200 dark:hover:border-primary-800',
  ].join(' '),
  featured: [
    'rounded-2xl border border-primary-200 bg-primary-50/60 shadow-sm dark:border-primary-800/60 dark:bg-primary-950/40',
    'hover:border-primary-300 dark:hover:border-primary-700',
  ].join(' '),
}

const hoverLift = 'hover:-translate-y-0.5 hover:shadow-md'

type CardProps<T extends ElementType = 'div'> = {
  as?: T
  variant?: CardVariant
  hover?: boolean
  children: ReactNode
  className?: string
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>

export function Card<T extends ElementType = 'div'>({
  as,
  variant = 'default',
  hover = true,
  className,
  children,
  ...rest
}: CardProps<T>) {
  const Component = as ?? 'div'

  return (
    <Component
      className={clsx(
        'group transition-all',
        variantStyles[variant],
        hover && hoverLift,
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  )
}
