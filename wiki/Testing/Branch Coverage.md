---
aliases:
  - Branches
tags:
  - testing
summary: The proportion of conditional outcomes exercised — the strictest ordinary coverage metric, and the most informative.
---
**Branch coverage** measures whether *both* outcomes of every conditional have been exercised. It is stricter than line coverage, because a line containing a conditional can be fully "covered" while only one side of it has ever been taken.

That strictness is what makes it useful as a design signal. An uncoverable branch is usually telling you something: the guard is unreachable given the surrounding invariants, the two optional fields always travel together so the mixed case cannot occur, or a defensive default exists for a value that is never absent. The right response is nearly always to *remove the branch*, not to write a contrived test for it. See [[Unreachable Code]] and [[Defensive Default]].

Several code shapes generate branches that are easy to miss: a null-coalescing operator, a conditional spread, a default parameter value, an optional chain, and a type-narrowing guard each add one. A refactor that converts strict optional handling into conditional spreads can double a file's branch count in a single pass.

There is also a measurement artifact worth recognising. When two runners instrument the same file, some record types merge cleanly across them and some do not — so a branch exercised in only one runner can appear uncovered in the merged report. The signature is a file reporting complete statements alongside an uncovered function, which is arithmetically impossible for a single record set.

## See also
- [[Code Coverage]]
- [[Unreachable Code]]
- [[Instrumentation]]
- [[Coverage Gate]]

## Related
- [[Silent Failure]]
- [[Goodhart's Law]]
- [[Chesterton's Fence]]
- [[Vacuous Truth]]
- [[Fail Fast]]
