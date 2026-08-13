---
aliases:
  - Rebasing
  - rerere
tags:
  - delivery
summary: Replaying a branch's commits onto a new base, producing new commits with the same changes.
---
**Rebasing** replays a branch's commits onto a different base commit, one at a time. The result is a linear history, as if the work had been done starting from the new base. The commits are new objects with new hashes — the originals still exist but are no longer referenced by the branch.

The practical argument for rebasing over merging is readable history: a linear sequence with no merge commits is easier to read, bisect, and revert. The argument against is that it rewrites history, so rebasing a branch other people have based work on causes them real pain.

Several things about rebasing are worth knowing concretely.

**Conflicts are resolved per commit**, not once, which is why a long branch across a busy base can mean resolving the same conflict repeatedly. Git's *rerere* feature records resolutions and replays them automatically, which saves enormous time — and will faithfully replay a *wrong* resolution after you change strategy, so it needs clearing when you do.

**Textual success is not semantic success.** A clean rebase can leave a branch that no longer type-checks, because the new base added readers of something the branch changed. The type checker, not the conflict list, is the real detector.

**A stacked branch rebases onto its parent**, not onto the main line; rebasing it onto main instead diverges the shared commits and manufactures conflicts. See [[Stacked Pull Requests]].

## See also
- [[Three-Way Merge]]
- [[Merge Conflict]]
- [[Semantic Conflict]]
- [[Commit]]

## Related
- [[Merge Train]]
- [[Version Control]]
- [[Regression]]
- [[Continuous Integration]]
- [[Trunk-Based Development]]
