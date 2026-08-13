---
aliases:
  - Source of truth
tags:
  - method
summary: The measurement that arbitrates, as opposed to the artifact that merely reports.
---
**Ground truth** is the observation that settles a question, as distinct from the many artifacts that describe it. Most debugging confusion comes from treating a report as a measurement.

Examples of the distinction are everywhere. A build tool's summary table is a report; the actual script tags in the served HTML are ground truth. A hosting platform's "mergeable" flag is a report; performing the merge locally is ground truth. A green exit code is a report; the count of tests that actually ran is ground truth — a filter that matched nothing exits zero. A comment claiming an invariant is a report; the type system is ground truth.

The habit worth building is to ask, for any claim you are about to act on, *what would I have to look at to be wrong about this?* — then look at that. It is usually cheaper than the reasoning it replaces.

Ground truth also has a *staleness* dimension. A measurement is only about the thing you measured, at the moment you measured it. Verifying against a server compiled before your change, or a cached artifact from a prior state, produces a real number about the wrong world. Restart, rebuild, refetch before every claim you intend to stand behind.

## See also
- [[Falsifiability]]
- [[Observability]]
- [[Reproducible Case]]
- [[Determinism]]
- [[Instrumentation]]
- [[Silent Failure]]
- [[Root Cause Analysis]]
- [[Vacuous Truth]]

## Related
- [[Exhaustive Claim]]
- [[Truncation Bias]]
