---
aliases:
  - Merge
  - Merge base
tags:
  - delivery
summary: Combining two lines of work by comparing both against their common ancestor.
---
A **three-way merge** combines two divergent versions by comparing each against their common ancestor — the *merge base*. Knowing the ancestor is what lets the algorithm distinguish "this side changed it" from "that side changed it", and to combine non-overlapping changes automatically.

The merge base is why comparisons must be taken against the ancestor rather than against the current tip of the other branch. Diffing a branch against the *current* main attributes every change made on main since the branch was cut to the branch itself. The three-dot form of a diff selects the merge base and is almost always what is wanted.

Two things merges cannot do.

**They cannot detect semantic incompatibility.** Non-overlapping changes are combined without complaint even when they contradict each other; see [[Semantic Conflict]]. Conflict absence is not agreement.

**They cannot resolve genuine overlap**, which is a [[Merge Conflict]] and requires a human decision.

There is also a duplication hazard: two branches that each added the same content in the same place can merge with no conflict markers and produce it twice, which a compiler catches and a reader might not.

## See also
- [[Merge Conflict]]
- [[Rebase]]
- [[Semantic Conflict]]
- [[Version Control]]
- [[Merge Train]]

## Related
- [[Stacked Pull Requests]]
- [[Trunk-Based Development]]
- [[Regression]]
- [[Continuous Integration]]
