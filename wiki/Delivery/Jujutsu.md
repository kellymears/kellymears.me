---
aliases:
  - jj
  - Operation log
  - First-class conflicts
tags:
  - delivery
summary: A Git-compatible version control system that treats the working copy as a commit, records every operation so anything can be undone, and lets conflicts be committed and resolved later.
---
**Jujutsu**, run as the command jj, is a version control system started by Martin von Zweigbergk in 2019 as a hobby project and later developed at Google, where he works. It stores its data in an ordinary Git repository by default, so it works on any Git project without the rest of the team noticing; see [[Version Control]]. The aim is a simpler model that is also more powerful, borrowing ideas from Mercurial and other systems.

The main differences from Git:

- **The working copy is a commit.** There is no staging area. Every command first snapshots the files on disk into the current commit, so edits are never lost and there is no separate state. To start new work, you create a new empty commit on top; see [[Commit]].
- **Changes have stable identities.** Each change has an ID that survives rewriting, separate from the commit hash, which changes every time content or ancestry does. A change can be amended, reordered, or rebased and still be referred to by the same name.
- **Descendants follow automatically.** Editing a commit in the middle of a stack rebases everything on top of it, which makes a series of dependent changes easy to maintain; see [[Rebase]] and [[Stacked Pull Requests]].
- **First-class conflicts.** A rebase or merge that conflicts doesn't stop and wait. The conflict is recorded inside the commit, and work carries on; it can be resolved later, and the resolution flows to descendants; see [[Merge Conflict]].
- **The operation log.** Every command that changes the repository is recorded as an operation, with a snapshot of the repository's state. Any operation can be undone, and the repository can be viewed as it was at any earlier point. Git's [[Reflog]] covers part of this for individual branches; Jujutsu covers the whole repository; see [[Undo]].
- **No current branch.** Named pointers, called bookmarks, exist for sharing with Git remotes, but commits don't need a name to be kept, so most local work never gets one.

A query language selects sets of commits, such as everything of mine not yet on the main branch, and most commands accept such a query in place of a single commit.

The operation log resembles [[Write-Ahead Logging]] in a database, and recording every state rather than mutating one in place is the logic of [[Event Sourcing]] and a [[Persistent Data Structure]]. Jujutsu also handles concurrent changes to the same repository, from two machines syncing one folder for example, by recording them as divergent operations to reconcile rather than corrupting the repository; see [[Optimistic Locking]].

Jujutsu is still pre-1.0, and its formats and commands still change. Because it works inside Git repositories, though, trying it costs little, and a team can adopt it one person at a time; see [[Distributed Version Control]].

## See also
- [[Detached HEAD]]
- [[Staging Area]]
- [[Darcs]]
