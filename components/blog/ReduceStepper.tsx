'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface Step {
  index: number
  element: string
  expression: string
  accumulator: string
}

interface Preset {
  label: string
  description: string
  elements: string[]
  seed: string
  steps: Step[]
}

const PRESETS: Preset[] = [
  {
    label: 'Sum',
    description: '[3, 7, 2, 5, 1].reduce((acc, n) => acc + n, 0)',
    elements: ['3', '7', '2', '5', '1'],
    seed: '0',
    steps: [
      { index: 0, element: '3', expression: '0 + 3 = 3', accumulator: '3' },
      { index: 1, element: '7', expression: '3 + 7 = 10', accumulator: '10' },
      { index: 2, element: '2', expression: '10 + 2 = 12', accumulator: '12' },
      { index: 3, element: '5', expression: '12 + 5 = 17', accumulator: '17' },
      { index: 4, element: '1', expression: '17 + 1 = 18', accumulator: '18' },
    ],
  },
  {
    label: 'Group by',
    description:
      'items.reduce((acc, item) => ({ ...acc, [item.type]: [...(acc[item.type] ?? []), item.name] }), {})',
    elements: [
      '{ type: "fruit", name: "apple" }',
      '{ type: "veg", name: "carrot" }',
      '{ type: "fruit", name: "banana" }',
      '{ type: "veg", name: "pea" }',
    ],
    seed: '{}',
    steps: [
      {
        index: 0,
        element: '{ fruit: "apple" }',
        expression: 'acc["fruit"] = [...[], "apple"]',
        accumulator: '{ fruit: ["apple"] }',
      },
      {
        index: 1,
        element: '{ veg: "carrot" }',
        expression: 'acc["veg"] = [...[], "carrot"]',
        accumulator: '{ fruit: ["apple"], veg: ["carrot"] }',
      },
      {
        index: 2,
        element: '{ fruit: "banana" }',
        expression: 'acc["fruit"] = [...["apple"], "banana"]',
        accumulator: '{ fruit: ["apple", "banana"], veg: ["carrot"] }',
      },
      {
        index: 3,
        element: '{ veg: "pea" }',
        expression: 'acc["veg"] = [...["carrot"], "pea"]',
        accumulator: '{ fruit: ["apple", "banana"], veg: ["carrot", "pea"] }',
      },
    ],
  },
]

const ReduceStepper = () => {
  const [presetIndex, setPresetIndex] = useState(0)
  const [currentStep, setCurrentStep] = useState(-1)
  const [playing, setPlaying] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  const preset = PRESETS[presetIndex]!
  const totalSteps = preset.steps.length
  const isDone = currentStep >= totalSteps - 1
  const activeStep = currentStep >= 0 ? preset.steps[currentStep] : null

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mq.matches)
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const stopPlaying = useCallback(() => {
    setPlaying(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const step = useCallback(() => {
    setCurrentStep((prev) => (prev >= totalSteps - 1 ? prev : prev + 1))
  }, [totalSteps])

  // Stop playing when we reach the end — keeps the updater pure
  useEffect(() => {
    if (playing && currentStep >= totalSteps - 1) {
      stopPlaying()
    }
  }, [currentStep, totalSteps, playing, stopPlaying])

  const play = useCallback(() => {
    if (isDone) return
    setPlaying(true)
    step()
    intervalRef.current = setInterval(step, reducedMotion ? 500 : 1000)
  }, [isDone, step, reducedMotion])

  const reset = useCallback(() => {
    stopPlaying()
    setCurrentStep(-1)
  }, [stopPlaying])

  const switchPreset = useCallback(
    (index: number) => {
      stopPlaying()
      setCurrentStep(-1)
      setPresetIndex(index)
    },
    [stopPlaying]
  )

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const transitionClass = reducedMotion ? '' : 'transition-colors duration-200'

  return (
    <div
      className="not-prose my-8 rounded-xl border border-gray-200 bg-white p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-950"
      role="figure"
      aria-label="Interactive reduce visualization"
    >
      {/* Preset toggle */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
          Example
        </span>
        {PRESETS.map((p, i) => (
          <button
            key={p.label}
            onClick={() => switchPreset(i)}
            className={`rounded-full px-3 py-0.5 text-sm font-medium transition-colors ${
              i === presetIndex
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-950 dark:text-primary-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
            }`}
            aria-pressed={i === presetIndex}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="mb-5 overflow-x-auto rounded-lg bg-gray-50 px-4 py-2.5 dark:bg-gray-900">
        <code className="text-xs leading-relaxed text-gray-700 sm:text-sm dark:text-gray-300">
          {preset.description}
        </code>
      </div>

      {/* Array elements */}
      <div className="mb-5">
        <div className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">Array</div>
        <div className="flex flex-wrap gap-2">
          {preset.elements.map((el, i) => {
            const isActive = i === currentStep
            const isProcessed = i < currentStep
            return (
              <div
                key={`${presetIndex}-${i}`}
                className={`${transitionClass} rounded-lg border px-3 py-1.5 font-mono text-sm ${
                  isActive
                    ? 'border-primary-500 bg-primary-50 text-primary-800 dark:bg-primary-950 dark:text-primary-200 shadow-sm'
                    : isProcessed
                      ? 'border-gray-200 bg-gray-50 text-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500'
                      : 'border-gray-200 bg-gray-100 text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300'
                }`}
                aria-label={`Element ${el}${isActive ? ' (current)' : isProcessed ? ' (processed)' : ''}`}
              >
                {presetIndex === 1 ? <span className="text-xs">{el}</span> : el}
              </div>
            )
          })}
        </div>
      </div>

      {/* Expression */}
      <div className={`${transitionClass} mb-5 min-h-[2.5rem]`}>
        {activeStep ? (
          <div className="rounded-lg bg-gray-50 px-4 py-2 dark:bg-gray-900">
            <code className="text-sm text-gray-700 dark:text-gray-300">
              {activeStep.expression}
            </code>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-gray-200 px-4 py-2 dark:border-gray-700">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {isDone ? 'Done!' : 'Step through to see each iteration'}
            </span>
          </div>
        )}
      </div>

      {/* Accumulator */}
      <div className="mb-5">
        <div className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">Accumulator</div>
        <div
          className={`${transitionClass} rounded-lg border-2 px-4 py-2.5 text-center font-mono ${
            isDone
              ? 'border-primary-400 bg-primary-50 dark:border-primary-600 dark:bg-primary-950'
              : activeStep
                ? 'border-primary-300 dark:border-primary-700 bg-white dark:bg-gray-900'
                : 'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900'
          }`}
          aria-live="polite"
        >
          <span
            className={`text-lg font-semibold ${
              isDone || activeStep
                ? 'from-primary-500 to-primary-700 bg-gradient-to-br bg-clip-text text-transparent'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {activeStep
              ? activeStep.accumulator
              : isDone
                ? preset.steps[totalSteps - 1]!.accumulator
                : preset.seed}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={playing ? stopPlaying : play}
          disabled={isDone && !playing}
          className="bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-950 dark:text-primary-300 dark:hover:bg-primary-900 rounded-full px-4 py-1.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={playing ? 'Pause' : 'Play'}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={step}
          disabled={isDone || playing}
          className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Step forward"
        >
          Step
        </button>
        <button
          onClick={reset}
          className="rounded-full bg-gray-100 px-4 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          aria-label="Reset"
        >
          Reset
        </button>
        <span className="ml-auto text-xs text-gray-500 tabular-nums dark:text-gray-400">
          {currentStep + 1} / {totalSteps}
        </span>
      </div>
    </div>
  )
}

export { ReduceStepper }
