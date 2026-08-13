---
aliases:
  - Coverage threshold
  - Coverage ratchet
tags:
  - testing
summary: A build check that fails when coverage falls below a threshold, and what that pressure produces.
---
A **coverage gate** fails a build when [[Code Coverage]] drops below a configured threshold. It is the standard mechanism for stopping coverage from eroding, and it is a direct instance of [[Goodhart's Law]] — a proxy turned into a target.

Its effects depend almost entirely on the accompanying convention. A gate paired with liberal exclusion annotations produces a number that means nothing, since the hard parts are simply excluded. A gate set at one hundred percent with *no* exclusions permitted produces something more interesting: because a branch cannot be annotated away, it has to be either covered or eliminated. That converts the gate into pressure on design, and much of the resulting work is genuinely good — removing guards that no input can reach, making an always-supplied optional required, modelling two fields that always travel together as one unit rather than two independent options.

The costs are also real. A strict gate makes any measurement artifact a hard block, so instrumentation quirks and flaky tests stop being annoyances and start blocking delivery. And a gate is only as good as its scope: one configured to run for changes targeting particular branches silently *skips* for changes targeting others, reporting neither pass nor fail. A skipped gate reads as a green build.

## See also
- [[Branch Coverage]]
- [[Continuous Integration]]
- [[Goodhart's Law]]
- [[Vacuous Truth]]
- [[Falsifiability]]
- [[Silent Failure]]
- [[Unreachable Code]]

## Related
- [[Truncation Bias]]
- [[Instrumentation]]
