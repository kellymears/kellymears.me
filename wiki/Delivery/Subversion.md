---
aliases:
  - SVN
  - Apache Subversion
  - Concurrent Versions System
tags:
  - delivery
summary: The centralized version control system launched in 2000 as a better CVS, with atomic commits, versioned directories, and cheap copies for branches, which dominated open source until Git displaced it.
---
**Subversion**, usually called SVN, is a centralized version control system started in 2000 by the company CollabNet to replace the **Concurrent Versions System**, or CVS, then the standard for open source. Its stated aim was to be "CVS done right." It reached version 1.0 in 2004, became a top-level Apache Software Foundation project in 2010, and for most of the 2000s was the default choice for new projects; see [[Version Control]].

CVS had serious flaws, and Subversion fixed the worst of them:

- **Atomic commits.** In CVS, a commit touching several files could fail halfway, leaving some changed and others not. Subversion commits succeed or fail as a whole; see [[Atomic Commit]].
- **Global revision numbers.** Every commit gets one number for the whole repository, so revision 1234 names a single state of every file, not a separate version per file.
- **Versioned directories and renames.** CVS tracked files only, so renaming one meant deleting it and adding a new file without its history.
- **Cheap copies.** Copying a directory costs almost nothing, and branches and tags are just copies. By convention a repository has three top folders, trunk, branches, and tags; see [[Git Tag]].

The model is centralized. The server holds the only full history; a developer's working copy holds one revision plus local edits. Every commit, log, or comparison with history needs the server. That has costs, since you can't commit on a plane or create private branches cheaply, and benefits: checking out only one subdirectory of an enormous repository is easy, access can be controlled per path, and files that cannot be merged, such as images, can be locked while someone edits them; see [[Pessimistic Locking]] and [[Monorepo]].

Branching was Subversion's weak spot. Creating a branch was cheap, but merging was not. Early versions didn't record what had already been merged, so repeated merges between branches meant tracking revision ranges by hand, which fed a culture of avoiding branches; see [[Merge Conflict]] and [[Three-Way Merge]]. Merge tracking arrived in 2008, by which point distributed systems had made branching and merging routine; see [[Distributed Version Control]].

Linus Torvalds, in a 2007 talk introducing Git, called Subversion pointless on the grounds that there was no way to do CVS right. Within a few years Git, helped by GitHub, had replaced it in most open source projects. GitHub, which had let Subversion clients check out its repositories, ended that support in 2024.

Subversion is still used, especially where its centralized model suits the work: large binary assets, strict access control, and teams that want a single, linear history. It shares that niche with [[Perforce]]. Its convention of a single main line also anticipated a practice that came back into favor; see [[Trunk-Based Development]].

## See also
- [[Commit]]
- [[Branching Model]]
