---
aliases:
  - Burn-in
  - Infant mortality
  - Wear-out
  - Accelerated life testing
tags:
  - testing
summary: The classic shape of failure rate over a product's life, high at first as defective units fail, low and flat through useful life, and rising again as parts wear out, which shapes burn-in testing, warranties, and how to read MTBF.
---
The **bathtub curve** describes how the failure rate of a population of products changes over time. Plotted against age, it falls steeply at first, stays low and roughly flat for a long stretch, then rises again, like the profile of a bathtub. Reliability engineers use it to decide how to test, when to replace, and how to read reliability figures.

Its three regions have different causes:

- **Infant mortality.** Early failures come from manufacturing defects, such as a bad solder joint or a contaminated chip. Defective units fail quickly, so the failure rate drops as they're weeded out.
- **Useful life.** Failures are rare and roughly random, caused by external shocks like power surges rather than age.
- **Wear-out.** Materials degrade with use: bearings wear, capacitors dry out, metal fatigues, and flash memory runs out of write cycles; see [[Material Fatigue]] and [[Solid-State Drive]].

**Burn-in** testing targets the first region. Manufacturers run new units, often at high temperature and voltage, for hours or days before shipping, so weak ones fail in the factory instead of at a customer's. Heat speeds up most chemical failure mechanisms, which also enables **accelerated life testing**: running products under harsh conditions to estimate in weeks how they'd fail over years; see [[Load Testing]].

The curve explains a frequently misread number. A hard drive rated at a mean time between failures of a million hours won't last 114 years. The figure describes the flat middle region: in a large fleet of young drives, about one fails per million drive-hours. It says nothing about wear-out, which arrives far sooner; see [[Mean Time to Recovery]].

The real shape varies. Large fleets of hard drives tracked by data centers show a recognizable bathtub, but many electronics show little wear-out within their service life, and some mechanical parts show no infant mortality. Engineers often model failure with a Weibull distribution, whose shape parameter captures falling, flat, or rising failure rates.

Software has a related pattern. A new release fails often at first, as real users meet bugs testing missed, then settles as fixes ship. Each new release starts a fresh, smaller spike, giving a sawtooth instead of a bathtub; see [[Canary Release]] and [[Release Candidate]]. Software doesn't wear out in the physical sense, but long-running processes can degrade as resources leak; see [[Memory Leak]].

Human mortality follows a similar curve, with high risk in infancy, a low trough in youth, and steadily rising risk with age; see [[Sarcopenia]].

The middle region's constant rate means that, for a working part in useful life, age tells little about remaining life. Things that never wear out, like ideas and books, show the opposite pattern; see [[Lindy Effect]]. Products designed to reach wear-out sooner are a different matter; see [[Planned Obsolescence]].

## See also
- [[Cellular Senescence]]
- [[Non-Destructive Testing]]
- [[OLED]]
- [[Hard Disk Drive]]
- [[Osteoarthritis]]
