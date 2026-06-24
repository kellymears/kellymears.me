import type { SVGProps } from 'react'

// The nine glyphs Symbioku is played with — symbols, not numbers.
// Stroke inherits currentColor so cells can tint individually.
function Glyph({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  const paths: Record<string, React.ReactNode> = {
    dot: <circle cx="12" cy="12" r="3.5" fill="currentColor" stroke="none" />,
    diamond: <path d="M12 3 21 12 12 21 3 12Z" />,
    square: <rect x="4.5" y="4.5" width="15" height="15" />,
    cross: <path d="M5 5 19 19M19 5 5 19" />,
    corner: <path d="M6 18 6 6 18 6" />,
    ring: <circle cx="12" cy="12" r="7.5" />,
    triangle: <path d="M12 4 20.5 19 3.5 19Z" />,
    caret: <path d="M5 16.5 12 7 19 16.5" />,
    hash: <path d="M9.5 4 7.5 20M16.5 4 14.5 20M4 9.5 20 9.5M4 14.5 20 14.5" />,
  }
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  )
}

// Order mirrors the in-game board; the selected cell echoes the live "current cell" state.
const BOARD = ['dot', 'diamond', 'square', 'cross', 'corner', 'ring', 'triangle', 'caret', 'hash']
const SELECTED = 4

export default function SymbiokuBanner() {
  return (
    <section aria-label="Symbioku" className="py-8">
      <a
        href="https://symbioku.kellymears.me"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Symbioku — a daily 9×9 logic puzzle played with symbols (opens in new tab)"
        className="group relative block overflow-hidden rounded-2xl border border-[#1c3240] bg-[#0a1820] font-mono shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c8ff2e]/60 hover:shadow-[0_12px_40px_-12px_rgba(200,255,46,0.25)] focus-visible:ring-2 focus-visible:ring-[#c8ff2e] focus-visible:ring-offset-2 focus-visible:ring-offset-white focus-visible:outline-none dark:focus-visible:ring-offset-gray-950"
      >
        {/* dotted-grid texture, like graph paper under the board */}
        <div
          aria-hidden="true"
          className="absolute inset-0 [background-image:radial-gradient(circle,#c8ff2e_1px,transparent_1px)] [background-size:22px_22px] opacity-[0.18]"
        />
        {/* acid glow that blooms from the board on hover */}
        <div
          aria-hidden="true"
          className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-[#c8ff2e]/10 blur-3xl transition-opacity duration-500 group-hover:bg-[#c8ff2e]/20"
        />

        <div className="relative flex flex-col gap-8 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          {/* copy */}
          <div className="min-w-0">
            <p className="text-xs tracking-[0.2em] text-[#c8ff2e] uppercase">
              <span className="text-[#3d5060]">// </span>SYMBIOKU
              <span className="ml-1 inline-block w-[0.55em] motion-safe:animate-pulse">▌</span>
            </p>
            <h2 className="mt-3 text-2xl font-medium tracking-tight text-[#e8eadf] sm:text-3xl">
              Symbols, not numbers.
            </h2>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-[#8a9aa3]">
              A daily 9×9 logic puzzle played with nine glyphs. Three difficulties, fresh every day.
              No language required.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#c8ff2e]">
              <span className="text-[#3d5060]">[</span>
              play today
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                →
              </span>
              <span className="text-[#3d5060]">]</span>
            </span>
          </div>

          {/* mini board — all nine symbols, one cell "selected" */}
          <div className="shrink-0 self-center">
            <div className="grid grid-cols-3 gap-px rounded-lg border border-[#1c3240] bg-[#1c3240] p-px">
              {BOARD.map((name, i) => (
                <div
                  key={name}
                  className={
                    i === SELECTED
                      ? 'flex h-12 w-12 items-center justify-center bg-[#0a1820] text-[#0a1820] ring-2 ring-[#c8ff2e] ring-inset [&>svg]:rounded-sm [&>svg]:bg-[#c8ff2e]'
                      : 'flex h-12 w-12 items-center justify-center bg-[#0a1820] text-[#c8ff2e]/85 transition-colors group-hover:text-[#c8ff2e]'
                  }
                >
                  <Glyph name={name} />
                </div>
              ))}
            </div>
            <p className="mt-2 text-center text-[0.65rem] tracking-widest text-[#3d5060] uppercase">
              easy · normal · hard
            </p>
          </div>
        </div>
      </a>
    </section>
  )
}
