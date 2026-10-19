---
aliases:
  - Fast-forward
  - Merge commit
  - Merge strategy
  - Octopus merge
tags:
  - delivery
summary: The two basic ways Git joins branches, by sliding a branch pointer forward or by recording a new commit with two parents, and how the choice shapes a project's history.
---
A **fast-forward merge** is the simplest way to join two branches in Git: no new commit is created at all. If the branch being merged into has not moved since the other branch split off, its history is already a prefix of the other's, so Git just moves the branch pointer forward to the newer commit. The name describes exactly that. Nothing is combined; one line of history is simply extended.

This works because a Git branch is only a named pointer to a [[Commit]], and commits form a graph, each pointing to its parents. When `main` sits at commit C and a feature branch has built D and E on top of C, merging the feature into `main` can slide `main` from C to E. The result is a straight line.

When both branches have new commits, a fast-forward is impossible, and Git creates a **merge commit**: a commit with two parents, one from each branch, whose contents come from a [[Three-Way Merge]] against their common ancestor. If both sides changed the same lines, the merge stops with a [[Merge Conflict]] for a person to resolve. A merge commit can also be forced when a fast-forward was possible, using `--no-ff`, to keep a record that a group of commits arrived together.

That choice is the heart of a long-running argument about what history is for:

- **Merge commits** preserve what actually happened, including when work happened in parallel. Each feature appears as a bubble off the main line, and the feature can be undone in one step by reverting the merge. The cost is a tangled graph that is harder to read.
- **Linear history** treats the log as an edited account. Teams [[Rebase]] feature branches onto the latest `main`, then fast-forward, or use a [[Squash Merge]] to fold the branch into a single commit. `git log` reads like a list, and [[Git Bisect]] steps through a clean sequence of [[Atomic Commit|atomic commits]]. The cost is that rewriting commits discards the original timeline.

Hosting platforms expose the choice as a setting on the [[Pull Request]] merge button, and [[Branch Protection]] rules can require linear history. [[Trunk-Based Development]], with its short-lived branches, makes fast-forwards common, since branches rarely fall far behind.

Git also supports an **octopus merge**, a single commit with more than two parents, used to combine several topic branches at once when they don't conflict. The Linux kernel history has merges with dozens of parents.

A fast-forward has one practical hazard: because no merge commit is made, there is no single point to revert, so undoing a fast-forwarded feature means reverting each of its commits.

## See also
- [[Branching Model]]
- [[Merge Train]]
- [[Reflog]]
- [[Feature Branch]]
