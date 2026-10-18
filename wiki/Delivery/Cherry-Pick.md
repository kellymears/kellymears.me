---
aliases:
  - Cherry pick
  - Cherry-picking
  - Backport
  - Backporting
tags:
  - delivery
summary: Copying the change from one commit onto another branch as a new commit, the standard way to backport a fix without merging everything else that came with it.
---
A **cherry-pick** takes the change introduced by one [[Commit]] and applies it to a different branch as a brand-new commit. In Git, `git cherry-pick <hash>` computes the difference between that commit and its parent, replays it on top of the current branch, and records the result with the original message and author but a new hash. Only that one change moves. Everything else on the source branch stays behind.

The most common use is **backporting**: copying a fix from the main line of development to an older release branch that is still supported. A security patch lands on `main`, and maintainers cherry-pick it onto the 2.x and 3.x branches so users who can't upgrade still get the fix. Hotfixes run the other way, applied to a release branch under pressure and then picked back to `main` so the next release doesn't reintroduce the bug.

Mechanically, a cherry-pick is a [[Three-Way Merge]] using the picked commit's parent as the base. It can hit a [[Merge Conflict]] when the surrounding code has drifted, and it can apply cleanly but still break things, a [[Semantic Conflict]], because the fix assumed code that doesn't exist on the target branch. [[Rebase]] is essentially a sequence of cherry-picks, which is why it rewrites hashes the same way.

Cherry-picking has known hazards:

- **Duplicate history.** The same change now exists as two commits with different hashes. Git usually recognizes identical patches when branches later merge, but if the code has been edited since, the merge may conflict or apply the change twice.
- **Lost provenance.** Without a note, nobody can tell where the copy came from. `git cherry-pick -x` appends "(cherry picked from commit …)" to the message, which most backport policies require.
- **Fixes forgotten upstream.** If a fix is made directly on a release branch and never picked back, it quietly regresses in the next release.

Projects with long-lived release branches usually adopt an *upstream first* rule: a fix must land on the main line before it can be backported. The Linux stable kernels work this way, and each backported commit cites its mainline hash. The rule keeps `main` as the single place where every fix exists, and it suits [[Trunk-Based Development]] and a [[Release Train]], where release branches are cut from trunk and only receive picks.

Small, focused commits pick cleanly, which is one practical argument for an [[Atomic Commit]] style. A commit that mixes a fix with a refactor can't be backported without dragging the refactor along. The opposite operation, `git revert`, applies a commit's inverse as a new commit, a common form of [[Rollback]].

## See also
- [[Branching Model]]
- [[Reflog]]
- [[Hotfix]]
- [[Semantic Versioning]]
- [[Interactive Rebase]]
- [[Long-Term Support]]
