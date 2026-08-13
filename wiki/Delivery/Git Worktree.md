---
aliases:
  - Worktree
tags:
  - delivery
summary: An additional working directory attached to one repository, each on its own branch.
---
A **git worktree** is a second (or tenth) working directory backed by the same repository, each checked out to a different branch. It removes the need to stash and switch: several branches can be open, built, and running at once.

It is the standard answer to parallel work, and especially to several agents or processes working simultaneously — each gets a real directory that nobody else writes to. See [[Multi-Agent Orchestration]].

The complications are all about the things a worktree does *not* isolate.

**Untracked files do not come along.** Environment files, local configuration, and installed dependencies must be provisioned per worktree, and a worktree missing them fails in ways that look like code defects — tests asserting a port that differs, a service tier that differs, an empty credential.

**Ports and containers collide.** A per-worktree port derived from the directory name is not collision-free, and a command that reads its port from the shell rather than the local environment file will happily bind the *primary* checkout's port — at which point someone else's browser is talking to your code and writing to your database.

**Shared repository state is still shared.** The object store, the recorded conflict resolutions, and anything in the common git directory are common to all worktrees.

## See also
- [[Version Control]]
- [[Race Condition]]
- [[Environment Variable]]
- [[Port]]
- [[Subagent]]

## Related
- [[Fan-Out and Fan-In]]
- [[Token Budget]]
- [[Shell]]
