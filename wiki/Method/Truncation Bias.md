---
aliases:
  - Head bias
  - Sampling the top
tags:
  - method
summary: Reading a truncated result as if it were the whole result, so every counterexample is invisible.
---
**Truncation bias** is the error of drawing a conclusion about a whole set from a deliberately shortened view of it. It is endemic in command-line work, where piping a search through a "first twenty lines" filter is the reflex that makes long output readable.

The mechanism is brutal in its simplicity. If the first twenty matches all come from one directory, the shortened output *looks like* evidence that only that directory matches. The matches that would refute the conclusion are exactly the ones the truncation removed. The search returns a real result about a fake set.

The fix is mechanical: pipe to a count instead of a head, or scope the search to the exact region the conclusion is about, and do it as a separate deliberate step. Counting per directory is a two-second command and turns a guess into a fact.

The same shape appears wherever a view is partial by default: a paginated list, a log tail, a dashboard filtered to the last hour, a status page that shows only the checks registered so far. Any of them will support a confident, wrong summary. See [[Vacuous Truth]] for the closely related case where the set is empty rather than merely clipped.

## See also
- [[Exhaustive Claim]]
- [[Glob]]
- [[Ground Truth]]
- [[Observability]]
- [[Silent Failure]]

## Related
- [[Falsifiability]]
- [[Root Cause Analysis]]
- [[Shell]]
