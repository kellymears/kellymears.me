---
aliases:
  - Squashing
tags:
  - delivery
summary: Collapsing a branch's commits into one before merging, trading granularity for a clean main history.
---
A **squash merge** collapses every commit on a branch into a single commit on the target branch. The main line gains one commit per change, and the branch's intermediate steps disappear from it.

The trade is explicit. History on the main branch becomes clean and uniform — one entry per unit of work, easy to scan, easy to revert. The intermediate commits, including their individual messages, are gone from that history.

Two consequences follow that people meet in practice rather than in theory.

**The squashed commit's message becomes the permanent record.** Whatever the change description says is what the repository will hold, which is what makes an unverified claim in it a durable false statement. See [[Provenance]] and [[Plausible Mechanism]].

**The branch's commits are no longer ancestors of the main line.** Any work still based on them has a base that main does not contain, so a subsequent push recreates the deleted branch as an orphan and a merge does strange things. Recovering means cherry-picking the wanted commits onto a fresh branch cut from the current main.

Squash merging pairs naturally with [[Trunk-Based Development]], where branches are short and their internal steps are working notes rather than history worth keeping.

## See also
- [[Commit]]
- [[Atomic Commit]]
- [[Pull Request]]
- [[Branching Model]]

## Related
- [[Code Review]]
- [[Version Control]]
