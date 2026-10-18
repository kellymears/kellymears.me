---
aliases:
  - Git reflog
  - Reference log
  - ORIG_HEAD
tags:
  - delivery
summary: Git's private record of everywhere HEAD and each branch has pointed, the safety net that makes a botched reset, rebase, or deleted branch recoverable for weeks.
---
The **reflog** (reference log) is Git's local record of every position that HEAD and each branch has pointed to. Each time a commit, checkout, reset, rebase, merge, or amend moves a reference, Git appends the old and new positions to a log. Running `git reflog` lists them, newest first, with entries like `HEAD@{3}` that can be used anywhere a commit is expected. It is the main reason that very little in Git is truly lost.

It works because commits are almost never destroyed when they disappear from view. Git stores commits as immutable objects addressed by their hash, a [[Merkle Tree]] of content. A reset, a [[Rebase]], or an amend does not alter old commits; it creates new ones and moves the branch pointer. The old commits stay in the object store, just no longer reachable from any branch. The reflog remembers where they were.

Common rescues:

- **A bad reset.** `git reset --hard` to the wrong place discards work from the branch. Find the previous position in the reflog and reset back to it.
- **A rebase gone wrong.** After a messy rebase, the reflog shows the branch tip before it began. Git also saves that position as `ORIG_HEAD` after rebases, merges, and resets.
- **A deleted branch.** Deleting a branch removes its name, not its commits. The reflog for HEAD still lists the last commit checked out on it, and a new branch can be created there.
- **A lost amend or squash.** The pre-amend commit, or the individual commits before a [[Squash Merge]] done locally, can be retrieved by hash.

The safety net has limits:

- **Local only.** The reflog lives in your repository and is never pushed. A teammate cannot use yours, and a fresh clone has an empty one.
- **Temporary.** By default, entries expire after 90 days, or 30 days for commits no longer reachable from any branch. After that, [[Garbage Collection]] in Git prunes the orphaned objects.
- **Committed work only.** Changes that were never committed, or staged, are not recorded. Uncommitted edits destroyed by a hard reset or a forced checkout are usually gone. Committing often, in small [[Atomic Commit]] steps, keeps more of your work inside the net.

The reflog changes how people use Git. Knowing that history rewriting is recoverable makes interactive rebases, [[Cherry-Pick]] experiments, and aggressive cleanups much less frightening. It is to Git what [[Undo]] is to an editor.

Remote repositories have their own protections. Force-pushing over a shared branch can destroy history for everyone who has not fetched it, which is why [[Branch Protection]] rules often forbid it. For finding which commit introduced a bug rather than recovering a lost one, the tool is [[Git Bisect]].

## See also
- [[Commit]]
- [[Git Stash]]
- [[Version Control]]
- [[Persistent Data Structure]]
- [[Force Push]]
- [[Git Blame]]
