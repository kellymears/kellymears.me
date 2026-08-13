---
aliases:
  - Logical commit
tags:
  - delivery
summary: A commit containing exactly one logical change, complete and independently sound.
---
An **atomic commit** contains one logical change: complete enough to build and pass its checks on its own, small enough that its message describes all of it. It is the unit that makes history usable rather than merely present.

Three capabilities depend on it. **Revert** — backing out one change without unpicking unrelated work. **Bisection** — finding the first bad revision requires every revision to be independently sound, so a commit that is red on its own breaks the search. **Review** — a reviewer reading a sequence of scoped commits can follow the reasoning; a reviewer reading one large commit reads a diff.

The practical habit is to commit as each logical unit completes rather than accumulating everything into one change at the end. A change that fixes a bug, adds a test, updates documentation, and reformats an adjacent file is four commits, and each is independently reviewable.

Two notes for shared working copies. Stage by explicit path — a bulk add captures other people's uncommitted work. And when a fix belongs to an earlier commit in a sequence, folding it in rather than appending it keeps the earlier commit sound, which is the property bisection needs.

## See also
- [[Commit]]
- [[Conventional Commits]]
- [[Code Review]]
- [[Regression]]
- [[Squash Merge]]

## Related
- [[Provenance]]
- [[Version Control]]
- [[Pull Request]]
- [[Plausible Mechanism]]
