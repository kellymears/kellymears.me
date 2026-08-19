---
aliases:
  - Law of Parsimony
  - Principle of Parsimony
tags:
  - method
summary: Prefer the explanation with fewer assumptions, not the one that is simplest to state.
---
**Occam's Razor** holds that among competing explanations that fit the evidence equally well, the one requiring the fewest assumptions is preferable. It is a tiebreaker, not a truth detector — it says nothing about which theory is correct, only which one to reach for first while you gather more evidence.

The common misreading is "the simplest explanation is usually right," which smuggles in a claim the razor never makes. A theory with fewer moving parts is easier to test, easier to falsify, and fails in fewer ways — that's the actual argument for preferring it, and it holds even when reality later turns out to be complicated. In debugging, this cashes out as: before you suspect a compiler bug, a cosmic ray, or a race condition in a library used by ten million programs, check whether you typo'd a variable name. Not because typos are more likely in some abstract sense, but because the typo hypothesis requires no new entities and is cheap to rule out.

The razor has a natural adversary in [[Overfitting]], where a model that looks principled hides enormous flexibility — degrees of freedom fit to noise rather than signal. A curve with twelve knobs that hugs every data point isn't parsimonious; it has traded assumption-count for flexibility, which is the same currency the razor is pricing. Similarly, in code, the "simplest" fix is sometimes a special case bolted onto existing logic — fewer lines, but more assumptions about when it applies. A [[Root Cause Analysis]] that stops at the first plausible story rather than the fewest-assumption one is doing complexity accounting wrong in the same way.

The razor pairs naturally with [[Plausible Mechanism]]: prefer the account with fewer unexplained entities, but only among accounts that actually have a mechanism, not the one that merely sounds tidy.

## See also
- [[Plausible Mechanism]]
- [[Overfitting]]
- [[Root Cause Analysis]]
- [[Falsifiability]]
- [[XY Problem]]

## Related
- [[Confirmation Bias]]
