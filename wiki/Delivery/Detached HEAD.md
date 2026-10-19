---
aliases:
  - Detached HEAD state
  - Symbolic ref
tags:
  - delivery
summary: The Git state in which the current checkout points directly at a commit rather than a branch, harmless for looking around but a trap for new work, since commits made there belong to no branch and can quietly disappear.
---
**Detached HEAD** is a state in Git where the current checkout isn't on any branch. It's one of Git's most alarming-sounding messages and one of the most commonly misunderstood. The state itself is harmless. The risk is losing work made while in it.

In Git, HEAD is a pointer to whatever is currently checked out. Normally it points to a branch name, such as main, and the branch name in turn points to a commit. HEAD is then called a symbolic reference. When a new commit is made, the branch moves forward to it, and HEAD follows because it points to the branch; see [[Commit]].

HEAD becomes detached when it points directly at a commit instead of at a branch. Common ways to get there:

- **Checking out a tag or commit**, to look at an old version; see [[Git Tag]].
- **Bisecting**, where Git checks out a series of commits to find where a bug appeared; see [[Git Bisect]].
- **Rebasing**, which replays commits one at a time and is detached until it finishes; see [[Rebase]] and [[Interactive Rebase]].
- **Submodules**, which deliberately record and check out an exact commit of another repository; see [[Git Submodule]].
- **CI systems**, which often check out the exact commit being tested; see [[Continuous Integration]].

Looking around in this state is fine. The danger comes from committing. New commits in detached HEAD build on each other normally, but no branch points to them. If the user then switches to another branch, nothing refers to the new commits anymore. Git doesn't delete them right away, but they're no longer reachable from any branch, and eventually Git's housekeeping removes unreferenced objects; see [[Garbage Collection]] and [[Git Object Model]].

Recovery is usually possible. Git keeps a local record of where HEAD has been, so recent commits can be found and given a branch name; see [[Reflog]]. Git also prints a warning, with the commit's hash, when leaving detached commits behind.

The simplest prevention is to create a branch before making changes. Git's newer commands make the distinction clearer than the older checkout command did: switching to a branch and detaching onto a commit are separate actions, and detaching requires an explicit flag.

The confusion partly comes from Git's model, in which branches are just movable labels on commits rather than containers of work; see [[Branching Model]]. Once that model is clear, detached HEAD stops being mysterious. It simply means there's no label at the current position. Tools that make every working copy a commit, such as Jujutsu, avoid the problem entirely; see [[Jujutsu]].

Other workflows reduce the need to detach at all. Checking out a separate working directory for an old version keeps experiments apart; see [[Git Worktree]].

## See also
- [[Git Stash]]
- [[Version Control]]
