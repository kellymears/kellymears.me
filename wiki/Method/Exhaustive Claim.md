---
aliases:
  - Superlative claim
tags:
  - method
summary: A statement of the form "the last one" or "nothing else does this" — load-bearing, and only as good as the search behind it.
---
An **exhaustive claim** asserts completeness: *the last remaining caller*, *the only consumer*, *nothing else imports this*, *no other file matches*. Readers act on such claims — they delete the now-unused module, skip the extra check, close the issue — so a wrong one causes damage far from where it was written.

Nothing mechanical catches it. Type checking, linting, tests, and coverage all pass over prose without reading it. A false exhaustive claim in a pull-request description or a code comment ships clean and outlives its author's memory of writing it.

The discipline is that an exhaustive claim needs its own verification step, not a by-product of a search run for another purpose. Practically: count, do not eyeball. Scope the search to exactly the region the claim covers. If the count is not worth running, drop the superlative and describe only what you did change — "removed the caller in X" is always safe and usually just as useful.

The commonest cause of a false exhaustive claim is [[Truncation Bias]]: a search whose output was cut short, so every counterexample sat below the fold.

## See also
- [[Truncation Bias]]
- [[Falsifiability]]
- [[Plausible Mechanism]]
- [[Ground Truth]]
- [[Code Review]]
- [[Hallucination]]
- [[Vacuous Truth]]
- [[Linguistic Relativity]]

## Related
- [[Silent Failure]]
- [[Root Cause Analysis]]
