---
aliases:
  - Force-push
  - Force-with-lease
  - git push --force
  - History rewriting
tags:
  - delivery
summary: Overwriting a remote branch with local history that doesn't contain it, the operation that makes rewritten history shareable and silently deletes other people's work when used carelessly.
---
A **force push** replaces a branch on a remote repository with your local version, even when your version does not contain the commits already there. Normally Git refuses such a push. A regular push must be a fast-forward of the remote branch, adding commits on top of what exists, so nothing on the server is lost. `git push --force` overrides that check.

The need arises from history rewriting. Commands such as [[Rebase]], amending a commit, or squashing create new commits with new hashes, since a [[Commit]] hash covers its parent and content. The old commits are no longer ancestors of the branch, so the push is no longer a fast-forward. On a personal feature branch, that is fine and routine: you rebase onto the latest `main`, tidy up commits before review, and force push the result. Many [[Pull Request]] workflows depend on it.

The danger is shared branches. If a teammate pushed a commit to the branch after you last fetched, your force push deletes it from the remote. The teammate's work survives only in their local copy, and their next pull produces a confusing mess of duplicated or conflicting commits, since their history and the remote's have diverged.

**Force-with-lease** makes this much safer. `git push --force-with-lease` overwrites the remote branch only if it is still where your local copy last saw it. If someone else has pushed in the meantime, the push fails, and you fetch and integrate their work first. It is a compare-and-swap, the same idea as [[Optimistic Locking]] in databases: update only if nobody changed the value since you read it. A further option, `--force-if-includes`, closes a gap where a background fetch would otherwise make the lease check pass without your having seen the new commits.

Teams build guardrails around it:

- **Protect the main branches.** [[Branch Protection]] rules on `main` and release branches forbid force pushes outright, so published history can't be rewritten. Rewriting what others have built on breaks their clones and invalidates every [[Git Tag]] or reference pointing into the old history.
- **Rewrite only your own branches.** The common rule is to never rewrite history someone else has pulled.
- **Know the recovery path.** A force-pushed commit isn't immediately destroyed. Your own [[Reflog]] records where the branch pointed before, and hosting platforms often keep the old commits reachable for a time. Recovery is usually possible if someone notices quickly.

The tension between rewriting and preserving history runs through Git practice. A clean, linear history built from [[Squash Merge|squashed]] or rebased commits is easier to read and to bisect; an untouched one is an accurate record. Force push is the tool that makes the first option possible across machines, and force-with-lease is what makes it reasonably safe.

## See also
- [[Fast-Forward Merge]]
- [[Branching Model]]
- [[Stacked Pull Requests]]
- [[Merge Conflict]]
- [[Git Revert]]
