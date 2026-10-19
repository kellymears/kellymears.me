---
aliases:
  - Patch theory
  - Pijul
tags:
  - delivery
summary: A distributed version control system built on a theory of patches instead of snapshots, in which changes can be reordered and selected independently, influential for its ideas even though it never became widely used.
---
**Darcs** is a distributed version control system first released in 2003, created by David Roundy, then a physicist, and written in the programming language Haskell. It never approached the popularity of Git or Mercurial, but it's important for taking a fundamentally different view of what version control should track; see [[Distributed Version Control]].

Most version control systems, including Git, record a project's history as a series of **snapshots**: complete states of the files at each commit. Differences between snapshots are calculated when needed; see [[Git Object Model]]. Darcs instead treats a repository as a set of **patches**, individual changes, and builds the current state by applying them; see [[Diff]].

The central idea is **patch theory**, a set of rules for when and how patches can be reordered. Two patches **commute** if applying them in either order gives the same result, possibly after adjusting each to account for the other. If one patch adds a line at the top of a file and another edits a line further down, they're independent, and the second patch can be moved before the first by adjusting its line number. Roundy drew on the mathematics of operators in quantum mechanics in developing the theory.

This makes some operations natural that are awkward in snapshot-based systems. Choosing which changes to take from another repository is the basic operation in Darcs: a user can pull a single fix without its predecessors, provided it doesn't depend on them. In Git, the closest equivalent copies a commit to make a new one with a different identity; see [[Cherry-Pick]]. Darcs also lets users interactively choose which changes to record or share, a style later echoed in other tools; see [[Interactive Rebase]].

The theory had a serious practical problem. Certain patterns of conflicting changes could cause early versions of Darcs to take exponential time to merge, effectively freezing. Later versions mitigated the problem, but it hurt Darcs's reputation at a moment when Git was gaining momentum; see [[Merge Conflict]] and [[Computational complexity]].

Darcs's ideas continued elsewhere. **Pijul**, a later system, rebuilt patch theory on a more rigorous mathematical foundation designed to make conflicts first-class objects and avoid the exponential cases. Other newer tools also treat changes, not snapshots, as primary, and handle conflicts as states that can be committed and resolved later; see [[Jujutsu]].

The contrast between snapshots and patches clarifies what merging actually does. Snapshot systems reconstruct what changed by comparing versions against a common ancestor; see [[Three-Way Merge]]. Patch systems store the changes directly. Neither approach can detect changes that combine cleanly in text yet break the program's logic; see [[Semantic Conflict]].

Older workflows built around emailing patches share some of Darcs's spirit; see [[Email Patch Workflow]].

## See also
- [[Version Control]]
- [[Rebase]]
