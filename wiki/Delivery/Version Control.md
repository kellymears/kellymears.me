---
aliases:
  - Git
  - Source control
tags:
  - delivery
summary: A system recording the history of a project's files, enabling branching, merging, and recovery.
---
**Version control** records the successive states of a project so that any past state can be recovered, changes can be attributed, and independent work can proceed in parallel and be recombined. Git is the near-universal implementation.

Git's model is worth understanding directly, because most confusion with it comes from working against the model rather than with it. A repository is a content-addressed object store: every file version, directory tree, and [[Commit]] is stored under the hash of its contents, and a commit records a tree plus its parents. Branches are just movable pointers into that graph. Nothing is ever modified in place; operations that appear to rewrite history create new objects and move pointers.

Two consequences matter constantly. **Anything committed is recoverable**, even after a branch is deleted or a reset appears to destroy it — the objects persist until garbage collection. **Anything not committed is not protected**, which is why a destructive command in a shared working directory is genuinely destructive and why committing frequently is a safety practice rather than a bookkeeping one.

History is also a document. It is the durable answer to *why is this here*, which is what makes a change description part of the deliverable rather than paperwork; see [[Provenance]].

## See also
- [[Commit]]
- [[Branching Model]]
- [[Three-Way Merge]]
- [[Git Worktree]]
- [[Hash Function]]
- [[Monorepo]]
- [[Regression]]

## Related
- [[Squash Merge]]
- [[Pull Request]]
