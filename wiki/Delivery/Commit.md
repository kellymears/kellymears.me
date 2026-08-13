---
aliases:
  - Commits
tags:
  - delivery
summary: A recorded snapshot of a project with a message explaining it.
---
A **commit** is a recorded state of a project together with metadata: authorship, timestamps, parent commits, and a message. It is the unit of history, the unit of revert, and the unit of bisection.

The message is the part with the longest life. A diff shows what changed; only the message can say why, and it is the only explanation that survives in a form nobody has to maintain. A useful message states the motivation and any constraint that shaped the approach — the information a reader a year later cannot reconstruct.

A few mechanical facts worth knowing. Commits record two dates, author and committer, and only the second is rewritten by a rebase — so author dates survive history rewriting and are what you want when reconstructing when something was actually written. Commit *messages* are never rewritten by a rebase, so a rebase past a change that removed the commit's subject leaves a message narrating work the diff no longer contains. And commit counts between branches are misleading once anything has been squashed, since the same content appears under different hashes.

Staging deserves care in shared working directories: a bulk "add everything" sweeps in other people's in-flight work under your message, producing history that lies. See [[Atomic Commit]].

## See also
- [[Atomic Commit]]
- [[Conventional Commits]]
- [[Version Control]]
- [[Provenance]]
- [[Squash Merge]]
- [[Rebase]]

## Related
- [[Three-Way Merge]]
- [[Regression]]
- [[Plausible Mechanism]]
