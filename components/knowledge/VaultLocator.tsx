import Link from '@/components/Link'
import { FIELD_H, FIELD_W } from '@/components/home/constellation-field'

interface Props {
  /** The note's position in `getGraph()` space. */
  x: number
  y: number
  title: string
}

/**
 * Where a note sits in the whole vault. The field is the same prerendered
 * constellation image the home page uses (`/constellation/{light,dark}.svg`),
 * so 559 note pages share one cached file; only the marker is inline. Image
 * and marker share the 1900×1000 box with `contain`/`meet` fitting, so they
 * stay registered at any width.
 */
export function VaultLocator({ x, y, title }: Props) {
  return (
    <Link
      href="/knowledge"
      aria-label={`${title} in the whole knowledge map`}
      className="group block rounded-xl border border-gray-200 px-3 py-4 transition-colors hover:border-[var(--topic)] dark:border-gray-800 dark:hover:border-[var(--topic-dark)]"
    >
      <p className="flex items-center justify-between font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase dark:text-gray-400">
        In the vault
        <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 normal-case transition-colors">
          Open map <span aria-hidden="true">&rarr;</span>
        </span>
      </p>
      <div className="relative mt-3" style={{ aspectRatio: `${FIELD_W} / ${FIELD_H}` }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG, nothing to optimize */}
        <img
          src="/constellation/light.svg"
          alt=""
          width={FIELD_W}
          height={FIELD_H}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-contain opacity-60 dark:hidden"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/constellation/dark.svg"
          alt=""
          width={FIELD_W}
          height={FIELD_H}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 hidden h-full w-full object-contain opacity-60 dark:block"
        />
        <svg
          viewBox={`0 0 ${FIELD_W} ${FIELD_H}`}
          preserveAspectRatio="xMidYMid meet"
          className="vault-marker absolute inset-0 h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <line x1={x} y1={0} x2={x} y2={FIELD_H} />
          <line x1={0} y1={y} x2={FIELD_W} y2={y} />
          <circle cx={x} cy={y} r={60} className="vault-marker-ring" />
          <circle cx={x} cy={y} r={22} className="vault-marker-dot" />
        </svg>
      </div>
    </Link>
  )
}
