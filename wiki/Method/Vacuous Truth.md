---
aliases:
  - Vacuously true
  - Vacuous pass
tags:
  - method
summary: A statement that holds only because its subject set is empty — a green result that measured nothing.
---
A statement is **vacuously true** when it holds because there is nothing for it to be false about. "Every test in this run passed" is vacuously true if zero tests ran. In logic this is unremarkable; in verification it is a trap, because the vacuous pass is indistinguishable from a real one at a glance.

The pattern recurs at every scale:

- A test filter that matches no test names reports success and skips everything.
- A layout assertion inside a container with no height constraint always passes, because nothing can overflow a box that grows to fit.
- A width assertion against an image already narrower than its column passes with the fix reverted.
- A continuous-integration watcher polling immediately after a push sees one fast check and zero pending, and declares everything green before the real jobs have registered — see [[Continuous Integration]].
- A diff-based gate reports "no changes" when it is diffing the wrong two references.

The remedy is always the same: assert the *precondition* first. Confirm the container actually scrolls, the search actually matched, the expected number of checks actually exist. Read the count, not the exit code. See [[Assertion]] and [[Falsifiability]].

## See also
- [[Silent Failure]]
- [[Ground Truth]]
- [[Flaky Test]]
- [[Coverage Gate]]
- [[Exhaustive Claim]]

## Related
- [[Glob]]
- [[Truncation Bias]]
