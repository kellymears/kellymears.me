export function MissionCallout() {
  return (
    <section
      className="bg-primary-50 dark:bg-primary-950/40 relative my-12 overflow-hidden rounded-xl px-6 py-8 sm:px-8"
      aria-labelledby="mission-heading"
    >
      {/* Decorative gradient accent */}
      <div
        className="from-primary-400/20 via-primary-300/10 absolute top-0 right-0 h-32 w-32 rounded-full bg-gradient-to-br to-transparent blur-2xl sm:h-48 sm:w-48"
        aria-hidden="true"
      />

      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <div
            className="from-primary-400 to-primary-600 h-8 w-1 rounded-full bg-gradient-to-b"
            aria-hidden="true"
          />
          <h2
            id="mission-heading"
            className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100"
          >
            Mission-Driven Work
          </h2>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-gray-700 dark:text-gray-300">
          A common thread across my career has been building technology for organizations working
          toward justice and equity. Before writing code professionally, I was organizing — work
          that shaped how I think about the relationship between tools and power. From the digital
          infrastructure behind Standing Rock solidarity campaigns to platforms for NDN Collective
          and the Fight for $15, I have spent years ensuring that advocacy organizations have access
          to the same caliber of tools as any well-funded startup. At Other98, that meant
          rapid-response publishing systems reaching millions. At Tiny Pixel Collective, it meant
          open source tooling and consulting for dozens of nonprofits and grassroots networks —
          including building digital infrastructure for the Twin Cities Tenants Union.
        </p>
      </div>
    </section>
  )
}
