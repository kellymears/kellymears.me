---
aliases:
  - NIH Syndrome
tags:
  - method
summary: The bias against adopting an outside solution simply because it wasn't built by your own team.
---
**Not Invented Here** (NIH) names the tendency to avoid, undervalue, or rebuild an existing solution simply because it originated outside the team, company, or codebase currently facing the problem — as distinct from rejecting it after an honest evaluation finds it genuinely unfit. The tell is that the rejection happens on the basis of provenance rather than merits: "we should build our own" arrives before anyone has seriously totaled the cost of the alternative.

The bias has real causes worth taking seriously rather than dismissing as pure ego. An outside dependency carries risk you don't control — its maintainers can abandon it, its license can constrain you, its abstractions may not fit your problem as cleanly as something purpose-built would. A team that has been burned by an unmaintained library adopting NIH-flavored caution isn't being irrational; the failure mode is when that caution calcifies into a blanket policy applied without re-litigating the actual tradeoff each time, and when "we'll build it ourselves" quietly skips estimating what building and *maintaining* it themselves actually costs, which is almost always larger than the initial build.

The mirror-image failure is worth naming too: uncritically adopting an outside library or pattern because it's popular, without checking that it fits — a second bias sometimes called RIH ("Reinvented Here," or simply cargo-culting a tool because everyone else uses it) that fails in the opposite direction for the opposite bad reason. Neither pole is the healthy position; the healthy position is comparing the actual cost of building against the actual cost of adopting, including maintenance, and being willing to have that answer go either way depending on the specific case rather than a standing policy.

NIH is a close cousin of [[Cargo Cult]] thinking but inverted — cargo cult is imitating a form without understanding the substance behind it, where NIH is rejecting a substance solely because of who's offering the form. Both skip the actual evaluation in favor of a shortcut based on where an idea came from.

## See also
- [[Cargo Cult]]
- [[Technical Debt]]
- [[Design System]]
- [[Bus Factor]]

## Related
- [[Second-System Effect]]
