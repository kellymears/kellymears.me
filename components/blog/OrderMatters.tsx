'use client'

import * as React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { themes } from 'prism-react-renderer'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'

interface MockUser {
  name: string
  repos: number
  followers: number
}

interface Flags {
  isError: boolean
  isLoading: boolean
  data: MockUser | null
}

const MOCK_USER: MockUser = { name: 'Ada Lovelace', repos: 42, followers: 1300 }

const Err = ({ message }: { message?: string }) => (
  <div
    className="rounded-lg border border-red-300 bg-red-50 p-4 dark:border-red-700 dark:bg-red-950"
    role="alert"
  >
    <div className="mb-1 font-mono text-[0.7rem] font-semibold tracking-wide text-red-700 uppercase dark:text-red-300">
      Error
    </div>
    <div className="font-mono text-xs leading-relaxed break-all text-red-800 dark:text-red-200">
      {message ?? 'ECONNREFUSED 127.0.0.1:5432'}
    </div>
  </div>
)

const Loader = () => (
  <div
    className="space-y-3 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900"
    role="status"
    aria-label="Loading"
  >
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200 dark:bg-gray-800" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        <div className="h-2.5 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  </div>
)

const Empty = () => (
  <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-4 text-center dark:border-gray-700 dark:bg-gray-900/40">
    <div className="text-sm font-medium text-gray-600 dark:text-gray-300">No results</div>
    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
      The fetch returned, but the payload was empty.
    </div>
  </div>
)

const View = ({ user }: { user: MockUser | null }) => {
  if (!user) {
    return (
      <div className="rounded-lg border border-dashed border-amber-400 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950">
        <div className="font-mono text-xs text-amber-800 dark:text-amber-300">
          View rendered with no data. Fields would be undefined here.
        </div>
      </div>
    )
  }
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <div className="from-primary-500 to-primary-700 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-base font-semibold text-white">
          {user.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
            {user.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {user.repos} repos · {user.followers.toLocaleString()} followers
          </div>
        </div>
      </div>
    </div>
  )
}

interface WhenProps {
  id: string
  if: unknown
  children: React.ReactNode
}

const When = ({ children }: WhenProps) => <>{children}</>

interface EarlyReturnsProps {
  flags: Flags
  children: React.ReactNode
  onResolve?: (id: string) => void
}

const EarlyReturns = ({ children, onResolve }: EarlyReturnsProps) => {
  let winner: React.ReactElement<WhenProps> | null = null
  let fallback: React.ReactNode = null

  for (const child of React.Children.toArray(children)) {
    if (!React.isValidElement(child)) continue
    if (child.type === When) {
      const props = child.props as WhenProps
      if (winner == null && props.if) winner = child as React.ReactElement<WhenProps>
    } else {
      fallback = child
    }
  }

  const resolvedId = winner ? winner.props.id : 'view'

  useEffect(() => {
    onResolve?.(resolvedId)
  }, [resolvedId, onResolve])

  return <>{winner ? winner.props.children : fallback}</>
}

const SEED_CODE = `<EarlyReturns flags={flags}>
  <When id="error" if={flags.isError}>
    <Err />
  </When>
  <When id="loading" if={flags.isLoading}>
    <Loader />
  </When>
  <When id="no-data" if={!flags.data}>
    <Empty />
  </When>
  <View user={flags.data} />
</EarlyReturns>`

const OrderMatters = () => {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [noData, setNoData] = useState(false)
  const [code, setCode] = useState(SEED_CODE)
  const [winner, setWinner] = useState('view')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const update = () => setIsDark(root.classList.contains('dark'))
    update()
    const obs = new MutationObserver(update)
    obs.observe(root, { attributes: true, attributeFilter: ['class'] })
    return () => obs.disconnect()
  }, [])

  const flags = useMemo<Flags>(
    () => ({ isError, isLoading, data: noData ? null : MOCK_USER }),
    [isError, isLoading, noData]
  )

  const onResolve = useCallback((id: string) => setWinner(id), [])

  const scope = useMemo(
    () => ({ EarlyReturns, When, Err, Loader, Empty, View, flags, onResolve }),
    [flags, onResolve]
  )

  const stuckSpinner = isError && isLoading && winner === 'loading'
  const stuckEmpty = (isError || isLoading) && winner === 'no-data'

  const reset = () => {
    setIsError(false)
    setIsLoading(false)
    setNoData(false)
    setCode(SEED_CODE)
  }

  const transition = reducedMotion ? '' : 'transition-colors duration-200'
  const editorTheme = isDark ? themes.nightOwl : themes.vsLight

  return (
    <div
      className="not-prose my-8 rounded-xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-950"
      role="figure"
      aria-label="Editable demonstration of render-order"
    >
      <div className="mb-5">
        <div className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
          State
        </div>
        <div className="flex flex-wrap gap-2">
          <ToggleChip active={isError} label="isError" onToggle={() => setIsError((v) => !v)} />
          <ToggleChip
            active={isLoading}
            label="isLoading"
            onToggle={() => setIsLoading((v) => !v)}
          />
          <ToggleChip active={noData} label="!data" onToggle={() => setNoData((v) => !v)} />
        </div>
      </div>

      <LiveProvider code={code} scope={scope} theme={editorTheme} language="jsx">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <div className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
              Edit the order
            </div>
            <div
              className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
              aria-label="Editable code: early-return order"
            >
              <LiveEditor
                onChange={setCode}
                style={{
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
                  fontSize: '0.8125rem',
                  lineHeight: '1.5',
                  minHeight: '14rem',
                }}
              />
            </div>
            <LiveError className="mt-2 overflow-x-auto rounded-lg bg-red-50 p-2 font-mono text-xs whitespace-pre-wrap text-red-800 dark:bg-red-950 dark:text-red-200" />
          </div>
          <div>
            <div className="mb-2 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
              Renders
            </div>
            <div
              className={`${transition} rounded-lg border-2 ${
                winner === 'view'
                  ? 'border-primary-300 dark:border-primary-700'
                  : 'border-gray-200 dark:border-gray-700'
              } bg-gray-50 p-3 dark:bg-gray-900/40`}
              aria-live="polite"
            >
              <LivePreview />
            </div>
          </div>
        </div>
      </LiveProvider>

      {stuckSpinner ? (
        <div
          className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200"
          role="status"
        >
          <strong className="font-semibold">isError</strong> and{' '}
          <strong className="font-semibold">isLoading</strong> are both true. Loading is checked
          first, so the spinner renders and the error never surfaces. This is the bug the rule
          prevents.
        </div>
      ) : stuckEmpty ? (
        <div
          className="mt-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm text-amber-900 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-200"
          role="status"
        >
          The no-data check is firing before {isError ? 'isError' : 'isLoading'}, so the empty state
          masks a real problem.
        </div>
      ) : null}

      <div className="mt-4 flex items-center gap-2">
        <button
          onClick={reset}
          className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Reset state and code"
        >
          Reset
        </button>
        <span className="ml-auto text-xs text-gray-500 dark:text-gray-400">
          Renders: <code className="font-mono">{`<${displayName(winner)} />`}</code>
        </span>
      </div>
    </div>
  )
}

const displayName = (winner: string) => {
  if (winner === 'error') return 'Err'
  if (winner === 'loading') return 'Loader'
  if (winner === 'no-data') return 'Empty'
  return 'View'
}

interface ToggleChipProps {
  active: boolean
  label: string
  onToggle: () => void
}

const ToggleChip = ({ active, label, onToggle }: ToggleChipProps) => (
  <button
    onClick={onToggle}
    aria-pressed={active}
    className={`rounded-full px-3 py-0.5 font-mono text-sm font-medium transition-colors ${
      active
        ? 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
    }`}
  >
    {label} = {active ? 'true' : 'false'}
  </button>
)

export { OrderMatters }
