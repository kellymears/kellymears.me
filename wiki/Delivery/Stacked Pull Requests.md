---
aliases:
  - PR stack
  - Stacking
tags:
  - delivery
summary: A chain of dependent changes, each reviewed separately and merged in order.
---
**Stacked pull requests** are a sequence of changes where each is based on the previous one rather than on the main branch, so a large piece of work can be reviewed in comprehensible pieces without waiting for each to merge before the next can start.

The benefit is real: reviewers get small diffs, and the author is not blocked. The costs are all coordination.

**Every merge invalidates the rest.** When the bottom of the stack lands, everything above it needs restacking, and the same is true whenever a sibling change lands on the main branch.

**Rebasing must target the actual parent.** Rebasing a stacked branch onto the main line gives the shared commits new hashes, so the branch diverges from its own base and every shared file reads as a conflict. Checking what a change is actually based on, before resolving anything, saves the whole exercise.

**Automation may treat a stacked base differently.** Checks conditioned on the target branch can silently skip for a change targeting a sibling branch rather than the main line — reporting neither pass nor fail. A skipped check reads as green, so anything load-bearing has to be run locally regardless. See [[Coverage Gate]].

Git's *rerere* helps disproportionately here, since stacked branches share early commits and their conflicts repeat.

## See also
- [[Pull Request]]
- [[Rebase]]
- [[Merge Conflict]]
- [[Merge Train]]

## Related
- [[Three-Way Merge]]
- [[Semantic Conflict]]
- [[Continuous Integration]]
- [[Branching Model]]
