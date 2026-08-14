---
aliases:
  - Merge queue
tags:
  - delivery
summary: Validating changes against the state they will actually merge into, in order, rather than in isolation.
---
A **merge train** — or merge queue — serializes pending changes and validates each against the result of merging every change ahead of it. It exists because a change validated in isolation is validated against a state that will not exist by the time it lands.

The problem it solves is the [[Semantic Conflict]]: two changes that are each entirely green and combine into something broken, with no textual conflict anywhere. Nothing about either change can reveal this. Only the combination can.

The manual equivalent, when landing a batch of ready changes at once, is to merge every one into a scratch working copy first, resolve there, and run the full validation *once* on the union. It is dramatically cheaper than discovering the same information from a broken main branch, and it also catches the mundane version — two changes each editing a shared string, one adding an assertion naming the old value.

Two operational notes. Branch protection settings that appear to enforce up-to-dateness are frequently inert in practice, so non-conflicting changes land back to back with no validation between them; test the assumption rather than relying on it. And rapid successive merges supersede each other's queued validation runs, so only the last one reports.

## See also
- [[Semantic Conflict]]
- [[Continuous Integration]]
- [[Stacked Pull Requests]]
- [[Three-Way Merge]]
- [[Trunk-Based Development]]
- [[Branching Model]]

## Related
- [[Rebase]]
- [[Pull Request]]
- [[Merge Conflict]]
