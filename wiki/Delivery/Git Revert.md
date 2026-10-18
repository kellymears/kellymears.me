---
aliases:
  - Revert
  - Revert commit
  - Revert the revert
tags:
  - delivery
summary: Undoing a commit by adding a new commit that applies its inverse, the safe way to back out a change on a shared branch, and the trap when reverting a merge.
---
**Git revert** undoes a commit by creating a new commit that applies the opposite change. If a commit added three lines, its revert removes them. History is not rewritten: the original commit stays, and the revert sits on top of it with a message recording what it undid. That makes it the safe way to back out a change on a shared branch.

The alternative, `git reset`, moves a branch back to an earlier commit and drops the later ones. That's fine on a private branch, but on a shared one it forces everyone else to reconcile their history and needs a [[Force Push]], which [[Branch Protection]] usually forbids. Revert works with ordinary pushes and leaves an honest record: the change happened, and then it was undone. That also keeps [[Git Blame]] and [[Git Bisect]] meaningful.

Mechanically, revert computes the [[Diff]] a commit introduced and applies its inverse to the current state. If later commits touched the same lines, the inverse may not apply cleanly, and you get a [[Merge Conflict]] to resolve, the same machinery as a [[Cherry-Pick]] run backward.

Revert is a common first response in [[Incident Response]]. If a recent change broke production, reverting it through the normal pipeline is often faster and safer than writing a fix under pressure, and it buys time for a proper fix; see [[Hotfix]] and [[Rollback]]. Revert undoes code, not effects: data written, messages sent, and schema changes already applied stay as they are. A [[Feature Flag]] gives an even faster off switch for changes built behind one.

Reverting a merge commit has a notorious trap. A merge has two parents, so you must tell Git which side to keep, usually the main line with `-m 1`. The revert removes the branch's changes, but Git still records the branch as merged. If the branch is fixed and merged again later, Git sees its old commits as already included and brings in only the new ones, so most of the feature silently goes missing. The fix is to **revert the revert** first, restoring the original changes, and then merge the new work. Linus Torvalds wrote a well-known explanation of this behavior for the Git documentation.

Revert commits should be handled like any other change:

- **Explain why.** Git's default message says what was reverted but not the reason. Add it.
- **Keep reverts atomic.** Revert one logical change per commit, which is easiest when the original was an [[Atomic Commit]].
- **Review lightly but not never.** A revert is usually low risk, but it can conflict with changes made since.

Teams practicing [[Trunk-Based Development]] revert freely: a broken main branch is reverted first and investigated after, keeping the trunk releasable.

## See also
- [[Commit]]
- [[Reflog]]
