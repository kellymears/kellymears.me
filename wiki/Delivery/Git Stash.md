---
aliases:
  - Stash
  - Stashing
  - Git stash pop
tags:
  - delivery
summary: Git's shelf for uncommitted work, which clears the working tree so you can switch tasks, and the reasons a throwaway commit or a second worktree is often the better shelf.
---
**Git stash** saves uncommitted changes to a private shelf and resets the working tree to the last [[Commit]], so you can switch to something else and come back later. The classic situation: you're halfway through a change when an urgent bug report arrives. Your work isn't ready to commit, but you need a clean tree to check out another branch. `git stash` puts the changes aside; `git stash pop` brings them back.

Under the hood, a stash is an ordinary commit, or rather two or three of them: one recording the working tree, one recording the staging area, and optionally one for untracked files. They aren't on any branch. Git keeps them on a special reference, `refs/stash`, and its [[Reflog]] holds the list of stashes, newest first. That's why `stash@{0}` uses the same syntax as reflog entries.

Common operations:

- **`git stash push -m "message"`** saves with a description. Without one, stashes are labeled only with the branch and commit they were made on, and a pile of them quickly becomes unreadable.
- **`git stash list`** shows the shelf. **`git stash show -p`** shows a stash as a [[Diff]].
- **`git stash apply`** restores changes but keeps the stash; **`pop`** restores and drops it.
- **`git stash -u`** includes untracked files, which are otherwise left behind.
- **`git stash branch name`** creates a branch from the commit where the stash was made and applies it there, avoiding conflicts if the original branch has moved on.

Applying a stash is a merge, so it can produce a [[Merge Conflict]] when the branch has changed since. If `pop` hits a conflict, it doesn't drop the stash, so nothing is lost.

Stashes are easy to forget. They don't show in `git status` or in branch lists, they aren't pushed to the remote, and old ones accumulate silently. A dropped stash can usually still be recovered for a while, because its commit lingers as an unreachable object until garbage collection, but finding it means hunting through dangling commits.

For anything longer than a quick interruption, alternatives often work better:

- **A work-in-progress commit** on the feature branch, later amended or squashed away before the [[Pull Request]]. It's visible, pushable, and shows up in history; see [[Squash Merge]].
- **A [[Git Worktree]]**, a second working directory on another branch. The urgent fix happens there, and the half-finished work is never disturbed at all.
- **A feature flag** that lets unfinished code merge safely behind a switch, the approach of [[Trunk-Based Development]].

Stash still earns daily use for small moves: pulling with a dirty tree, carrying a change to a different branch, or briefly testing whether a bug exists without your edits. Treat it as a short-term shelf rather than storage, and the forgotten-stash problem largely goes away.

## See also
- [[Staging Area]]
