'use client'

import { useCallback, useEffect, useState } from 'react'

interface FunFactsProps {
  energy: number
  miles: number
  elevation: number
}

// --- Formatting ---

function fmtNum(n: number): string {
  if (n >= 1000) return Math.round(n).toLocaleString()
  if (n >= 10) return String(Math.round(n))
  return n.toFixed(1)
}

function fmtPct(ratio: number): string {
  const p = ratio * 100
  return p >= 10 ? `${Math.round(p)}%` : `${p.toFixed(1)}%`
}

// --- Comparison definitions ---

interface FactCalc {
  formula: string
  reference: string
  url?: string
  source?: string
}

interface Fact {
  value: string
  label: string
  calc: FactCalc
}

type FactGenerator = (metric: number) => Fact

const ENERGY_FACTS: FactGenerator[] = [
  (kj) => {
    const n = kj / 54
    return {
      value: fmtNum(n),
      label: 'smartphones charged from dead',
      calc: {
        formula: `${fmtNum(kj)} kJ ÷ 54 kJ/charge = ${fmtNum(n)}`,
        reference: 'Avg smartphone battery: ~15 Wh (54 kJ)',
        url: 'https://en.wikipedia.org/wiki/Smartphone',
        source: 'Wikipedia',
      },
    }
  },
  (kj) => {
    const n = kj / 36 / 8766
    return {
      value: fmtNum(n),
      label: 'years keeping an LED bulb lit 24/7',
      calc: {
        formula: `${fmtNum(kj)} kJ ÷ 36 kJ/hr ÷ 8,766 hr/yr = ${fmtNum(n)}`,
        reference: '10W LED bulb, continuous: 36 kJ/hr',
        url: 'https://en.wikipedia.org/wiki/LED_lamp',
        source: 'Wikipedia',
      },
    }
  },
  (kj) => {
    const perMonth = 180 * 24 * 30.44
    const n = kj / perMonth
    return {
      value: fmtNum(n),
      label: 'months powering a laptop nonstop',
      calc: {
        formula: `${fmtNum(kj)} kJ ÷ ${fmtNum(perMonth)} kJ/month = ${fmtNum(n)}`,
        reference: 'Avg laptop draw: ~50W (180 kJ/hr)',
        url: 'https://en.wikipedia.org/wiki/Laptop',
        source: 'Wikipedia',
      },
    }
  },
  (kj) => {
    const n = kj / 10_000
    return {
      value: fmtNum(n),
      label: 'hot showers heated',
      calc: {
        formula: `${fmtNum(kj)} kJ ÷ 10,000 kJ/shower = ${fmtNum(n)}`,
        reference: '2.5 GPM × 8 min, 30°C rise ≈ 10,000 kJ',
        url: 'https://en.wikipedia.org/wiki/Water_heating',
        source: 'Wikipedia',
      },
    }
  },
  (kj) => {
    const n = kj / 100
    return {
      value: fmtNum(n),
      label: 'slices of toast',
      calc: {
        formula: `${fmtNum(kj)} kJ ÷ 100 kJ/slice = ${fmtNum(n)}`,
        reference: '1,200W toaster × ~80s per slot ≈ 100 kJ/slice',
        url: 'https://en.wikipedia.org/wiki/Toaster',
        source: 'Wikipedia',
      },
    }
  },
  (kj) => {
    const n = kj / 15_779
    return {
      value: fmtNum(n),
      label: 'hamsters outrun, each sprinting nonstop for a year',
      calc: {
        formula: `${fmtNum(kj)} kJ ÷ 15,779 kJ/hamster·yr = ${fmtNum(n)}`,
        reference: 'Hamster wheel output: ~0.5W × 8,766 hr/yr',
        url: 'https://en.wikipedia.org/wiki/Hamster_wheel',
        source: 'Wikipedia',
      },
    }
  },
  (kj) => {
    const n = kj / 1_800
    return {
      value: fmtNum(n),
      label: 'loads of laundry washed',
      calc: {
        formula: `${fmtNum(kj)} kJ ÷ 1,800 kJ/load = ${fmtNum(n)}`,
        reference: 'Washing machine: ~500 Wh per cycle (Energy Star)',
        url: 'https://en.wikipedia.org/wiki/Washing_machine',
        source: 'Wikipedia',
      },
    }
  },
  (kj) => {
    const n = kj / 108_000
    return {
      value: fmtNum(n),
      label: 'days powering an average US home',
      calc: {
        formula: `${fmtNum(kj)} kJ ÷ 108,000 kJ/day = ${fmtNum(n)}`,
        reference: 'Avg US household: ~30 kWh/day (EIA)',
        url: 'https://en.wikipedia.org/wiki/Energy_in_the_United_States',
        source: 'Wikipedia',
      },
    }
  },
]

const DISTANCE_FACTS: FactGenerator[] = [
  (mi) => {
    const ratio = mi / 24_901
    return {
      value: ratio >= 1 ? fmtNum(ratio) : fmtPct(ratio),
      label: ratio >= 1 ? 'trips around the entire Earth' : 'of the way around the Earth',
      calc: {
        formula: `${fmtNum(mi)} mi ÷ 24,901 mi = ${ratio >= 1 ? fmtNum(ratio) : fmtPct(ratio)}`,
        reference: "Earth's equatorial circumference: 24,901 mi",
        url: 'https://en.wikipedia.org/wiki/Earth',
        source: 'Wikipedia',
      },
    }
  },
  (mi) => {
    const ratio = mi / 238_900
    return {
      value: fmtPct(ratio),
      label: 'of the way to the Moon',
      calc: {
        formula: `${fmtNum(mi)} mi ÷ 238,900 mi = ${fmtPct(ratio)}`,
        reference: 'Mean Earth–Moon distance: 238,900 mi',
        url: 'https://en.wikipedia.org/wiki/Lunar_distance',
        source: 'Wikipedia',
      },
    }
  },
  (mi) => {
    const n = mi / 2_775
    return {
      value: fmtNum(n),
      label: 'coast-to-coast road trips',
      calc: {
        formula: `${fmtNum(mi)} mi ÷ 2,775 mi = ${fmtNum(n)}`,
        reference: 'NYC to LA driving distance: ~2,775 mi',
        url: 'https://en.wikipedia.org/wiki/Interstate_Highway_System',
        source: 'Wikipedia',
      },
    }
  },
  (mi) => {
    const n = mi / 2_190
    return {
      value: fmtNum(n),
      label: 'Appalachian Trail thru-hikes',
      calc: {
        formula: `${fmtNum(mi)} mi ÷ 2,190 mi = ${fmtNum(n)}`,
        reference: 'Appalachian Trail: 2,190 mi (Maine to Georgia)',
        url: 'https://en.wikipedia.org/wiki/Appalachian_Trail',
        source: 'Wikipedia',
      },
    }
  },
  (mi) => {
    const n = mi / 2_162
    return {
      value: fmtNum(n),
      label: 'Tours de France',
      calc: {
        formula: `${fmtNum(mi)} mi ÷ 2,162 mi = ${fmtNum(n)}`,
        reference: 'Tour de France avg route: ~2,162 mi (3,480 km)',
        url: 'https://en.wikipedia.org/wiki/Tour_de_France',
        source: 'Wikipedia',
      },
    }
  },
  (mi) => {
    const n = mi / 4_132
    return {
      value: fmtNum(n),
      label: 'trips down the Nile',
      calc: {
        formula: `${fmtNum(mi)} mi ÷ 4,132 mi = ${fmtNum(n)}`,
        reference: 'Nile River length: 4,132 mi',
        url: 'https://en.wikipedia.org/wiki/Nile',
        source: 'Wikipedia',
      },
    }
  },
  (mi) => {
    const n = mi / 2_448
    return {
      value: fmtNum(n),
      label: 'Route 66 road trips',
      calc: {
        formula: `${fmtNum(mi)} mi ÷ 2,448 mi = ${fmtNum(n)}`,
        reference: 'US Route 66: 2,448 mi (Chicago to Santa Monica)',
        url: 'https://en.wikipedia.org/wiki/U.S._Route_66',
        source: 'Wikipedia',
      },
    }
  },
  (mi) => {
    const ratio = mi / 13_171
    return {
      value: ratio >= 1 ? fmtNum(ratio) : fmtPct(ratio),
      label:
        ratio >= 1
          ? 'trips along the Great Wall of China'
          : 'the length of the Great Wall of China',
      calc: {
        formula: `${fmtNum(mi)} mi ÷ 13,171 mi = ${ratio >= 1 ? fmtNum(ratio) : fmtPct(ratio)}`,
        reference: 'Great Wall total length: 13,171 mi (21,196 km)',
        url: 'https://en.wikipedia.org/wiki/Great_Wall_of_China',
        source: 'Wikipedia',
      },
    }
  },
]

const ELEVATION_FACTS: FactGenerator[] = [
  (ft) => {
    const n = ft / 29_032
    return {
      value: `${fmtNum(n)}×`,
      label: 'the height of Everest',
      calc: {
        formula: `${fmtNum(ft)} ft ÷ 29,032 ft = ${fmtNum(n)}×`,
        reference: 'Mount Everest summit: 29,032 ft (8,849 m)',
        url: 'https://en.wikipedia.org/wiki/Mount_Everest',
        source: 'Wikipedia',
      },
    }
  },
  (ft) => {
    const ratio = ft / 328_084
    return {
      value: ratio >= 1 ? `${fmtNum(ratio)}×` : fmtPct(ratio),
      label: ratio >= 1 ? 'past the edge of space' : 'of the way to space',
      calc: {
        formula: `${fmtNum(ft)} ft ÷ 328,084 ft = ${ratio >= 1 ? `${fmtNum(ratio)}×` : fmtPct(ratio)}`,
        reference: 'Kármán line: 328,084 ft (100 km)',
        url: 'https://en.wikipedia.org/wiki/K%C3%A1rm%C3%A1n_line',
        source: 'Wikipedia',
      },
    }
  },
  (ft) => {
    const n = ft / 35_000
    return {
      value: fmtNum(n),
      label: 'flights to cruising altitude',
      calc: {
        formula: `${fmtNum(ft)} ft ÷ 35,000 ft = ${fmtNum(n)}`,
        reference: 'Typical commercial cruising altitude: ~35,000 ft',
      },
    }
  },
  (ft) => {
    const n = ft / 2_717
    return {
      value: fmtNum(n),
      label: 'Burj Khalifas stacked',
      calc: {
        formula: `${fmtNum(ft)} ft ÷ 2,717 ft = ${fmtNum(n)}`,
        reference: 'Burj Khalifa height (to tip): 2,717 ft (828 m)',
        url: 'https://en.wikipedia.org/wiki/Burj_Khalifa',
        source: 'Wikipedia',
      },
    }
  },
  (ft) => {
    const n = ft / 1_250
    return {
      value: fmtNum(n),
      label: 'Empire State Building stair climbs',
      calc: {
        formula: `${fmtNum(ft)} ft ÷ 1,250 ft = ${fmtNum(n)}`,
        reference: 'Empire State Building (to roof): 1,250 ft',
        url: 'https://en.wikipedia.org/wiki/Empire_State_Building',
        source: 'Wikipedia',
      },
    }
  },
  (ft) => {
    const n = ft / 6_093
    return {
      value: fmtNum(n),
      label: 'Grand Canyon escapes',
      calc: {
        formula: `${fmtNum(ft)} ft ÷ 6,093 ft = ${fmtNum(n)}`,
        reference: 'Grand Canyon depth (rim to river): 6,093 ft',
        url: 'https://en.wikipedia.org/wiki/Grand_Canyon',
        source: 'Wikipedia',
      },
    }
  },
  (ft) => {
    const n = ft / 19_341
    return {
      value: fmtNum(n),
      label: 'Kilimanjaro summits',
      calc: {
        formula: `${fmtNum(ft)} ft ÷ 19,341 ft = ${fmtNum(n)}`,
        reference: 'Mount Kilimanjaro summit: 19,341 ft (5,895 m)',
        url: 'https://en.wikipedia.org/wiki/Mount_Kilimanjaro',
        source: 'Wikipedia',
      },
    }
  },
  (ft) => {
    const n = ft / 305
    return {
      value: fmtNum(n),
      label: 'Statue of Liberty ascents',
      calc: {
        formula: `${fmtNum(ft)} ft ÷ 305 ft = ${fmtNum(n)}`,
        reference: 'Statue of Liberty (base to torch): 305 ft',
        url: 'https://en.wikipedia.org/wiki/Statue_of_Liberty',
        source: 'Wikipedia',
      },
    }
  },
]

// --- Icons ---

function InfoIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  )
}

function ExternalLinkIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

// --- Component ---

function randomIndex(length: number): number {
  return Math.floor(Math.random() * length)
}

export function FunFacts({ energy, miles, elevation }: FunFactsProps) {
  const [indices, setIndices] = useState([0, 0, 0])
  const [visible, setVisible] = useState(false)
  const [openTooltip, setOpenTooltip] = useState<string | null>(null)

  const randomize = useCallback(() => {
    setIndices([
      randomIndex(ENERGY_FACTS.length),
      randomIndex(DISTANCE_FACTS.length),
      randomIndex(ELEVATION_FACTS.length),
    ])
  }, [])

  useEffect(() => {
    randomize()
    requestAnimationFrame(() => setVisible(true))
  }, [randomize])

  const shuffle = useCallback(() => {
    setOpenTooltip(null)
    setVisible(false)
    setTimeout(() => {
      randomize()
      requestAnimationFrame(() => setVisible(true))
    }, 200)
  }, [randomize])

  // Close tooltip on outside click
  useEffect(() => {
    if (!openTooltip) return
    const close = () => setOpenTooltip(null)
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [openTooltip])

  // Close tooltip on Escape
  useEffect(() => {
    if (!openTooltip) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenTooltip(null)
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [openTooltip])

  if (energy === 0 && miles === 0 && elevation === 0) return null

  const energyFact = ENERGY_FACTS[indices[0]!]!(energy)
  const distanceFact = DISTANCE_FACTS[indices[1]!]!(miles)
  const elevationFact = ELEVATION_FACTS[indices[2]!]!(elevation)

  const facts = [
    { ...energyFact, category: 'Energy', context: `${fmtNum(energy / 3600)} kWh` },
    { ...distanceFact, category: 'Distance', context: `${miles.toLocaleString()} mi` },
    { ...elevationFact, category: 'Elevation', context: `${elevation.toLocaleString()} ft` },
  ]

  const toggleTooltip = (category: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setOpenTooltip(openTooltip === category ? null : category)
  }

  return (
    <section className="animate-on-scroll relative z-10 py-8" aria-label="Fun cycling comparisons">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          For Perspective
        </h2>
        <button
          onClick={shuffle}
          className="hover:border-primary-300 hover:text-primary-600 dark:hover:border-primary-700 dark:hover:text-primary-400 flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500 transition-all active:scale-95 dark:border-gray-700 dark:text-gray-400"
          aria-label="Show different comparisons"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          Shuffle
        </button>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 dark:shadow-gray-950/50 dark:hover:shadow-lg dark:hover:shadow-gray-950/50">
        <div
          className={`grid grid-cols-1 divide-y divide-gray-100 transition-opacity duration-200 md:grid-cols-3 md:divide-x md:divide-y-0 dark:divide-gray-800 ${
            visible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {facts.map((fact) => (
            <div key={fact.category} className="relative px-6 py-6 text-center md:px-8 md:py-8">
              <p className="mb-3 text-xs font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
                {fact.category}
              </p>
              <p className="from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 bg-gradient-to-br bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                {fact.value}
              </p>
              <p className="mt-1.5 text-sm font-medium text-gray-600 dark:text-gray-400">
                {fact.label}
              </p>
              <div className="mt-3 inline-flex items-center gap-1.5">
                <span className="text-xs text-gray-400 dark:text-gray-500">
                  {fact.context} total
                </span>
                <button
                  onClick={(e) => toggleTooltip(fact.category, e)}
                  className="text-gray-300 transition-colors hover:text-gray-500 dark:text-gray-600 dark:hover:text-gray-400"
                  aria-label={`Show calculation for ${fact.category.toLowerCase()}`}
                  aria-expanded={openTooltip === fact.category}
                >
                  <InfoIcon />
                </button>
              </div>

              {openTooltip === fact.category && (
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                <aside
                  onClick={(e) => e.stopPropagation()}
                  className="absolute inset-x-3 z-50 mt-2 rounded-lg border border-gray-200 bg-white p-3 text-left shadow-lg dark:border-gray-700 dark:bg-gray-800"
                >
                  <p className="font-mono text-[11px] leading-relaxed text-gray-700 dark:text-gray-300">
                    {fact.calc.formula}
                  </p>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500 dark:text-gray-400">
                    {fact.calc.reference}
                  </p>
                  {fact.calc.url && fact.calc.source && (
                    <a
                      href={fact.calc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 mt-2 inline-flex items-center gap-1 text-[11px] font-medium"
                    >
                      {fact.calc.source}
                      <ExternalLinkIcon />
                    </a>
                  )}
                </aside>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
