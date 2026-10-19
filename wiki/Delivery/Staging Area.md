---
aliases:
  - Git index
  - Partial staging
tags:
  - delivery
summary: The intermediate snapshot in Git between the working files and the next commit, which lets a developer choose exactly which changes go into each commit, down to individual lines.
---
The **staging area**, also called the **index**, is Git's holding area for the next commit. Git tracks three versions of a project at once: the last commit, the files on disk as the developer edits them, and the staging area in between. Running git add copies a file's current contents into the staging area. Committing then records exactly what's staged, not whatever happens to be on disk; see [[Commit]] and [[Git Object Model]].

The point is control over what each commit contains. A developer who fixes a bug and, along the way, tidies some unrelated formatting can stage the fix alone, commit it with its own message, and commit the tidying separately. Commits that each do one thing are easier to review, to revert and to search for the source of a bug; see [[Atomic Commit]] and [[Git Bisect]].

Staging can be finer than whole files. Interactive staging walks through the changes in a file chunk by chunk, called hunks, and asks which to include. Graphical tools and editors let developers stage single lines. The staging area therefore holds a version of the file that may never have existed on disk, which is powerful and occasionally a trap: a commit can pass review but fail to build because the staged version lacks a change still sitting unstaged; see [[Continuous Integration]].

Under the hood, the index is a single binary file in the repository. Beyond recording what to commit, it caches information about each tracked file, such as size and modification time, so Git can tell which files changed without reading them all, which keeps status checks fast on large projects; see [[Monorepo]]. During a merge, the index holds up to three versions of each conflicted file, from the common ancestor and both sides, which is how Git knows which files still need resolving; see [[Merge Conflict]].

The staging area is one of the features newcomers find most confusing. Most earlier systems, and some later ones, had nothing like it: commit simply recorded every change in the working files. Mercurial had no index by default. Some newer Git-compatible tools drop the staging area altogether, treating the working copy itself as a commit that's continually amended and split afterward if needed; see [[Jujutsu]] and [[Distributed Version Control]].

Related commands interact with it constantly. Stashing saves both the staged and unstaged changes and clears them; see [[Git Stash]]. Rewriting history before sharing often goes back to splitting or combining commits that were staged badly the first time; see [[Interactive Rebase]]. Hooks that run before a commit inspect the staged snapshot, so a formatter can check exactly what is about to be recorded; see [[Git Hook]] and [[Code Formatter]].

## See also
- [[Diff]]
- [[Commit Message]]
