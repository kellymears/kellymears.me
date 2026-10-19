---
aliases:
  - SCCS
  - Revision Control System
  - RCS
tags:
  - delivery
summary: The first widely used version control tool, written at Bell Labs in 1972, and its successor RCS, which together established file-by-file revision history, locking and stored differences as the shape of version control for two decades.
---
The **Source Code Control System**, or **SCCS**, was one of the first tools built to track changes to source code. Marc Rochkind wrote it at Bell Labs in 1972, initially for an IBM mainframe, and it later shipped with many versions of Unix; see [[Unix]]. Its descendant, the **Revision Control System** or **RCS**, written by Walter Tichy at Purdue in the early 1980s, replaced it on many systems. Between them they set the template that version control followed for about twenty years; see [[Version Control]].

Both tools worked on **one file at a time**. Each source file had a companion history file holding every past revision. A developer checked a file out to edit it and checked it back in with a comment, creating a new numbered revision such as 1.4. There was no notion of a change spanning several files, so a fix touching three files became three unrelated revisions that happened to share a comment and a timestamp; see [[Atomic Commit]] and [[Commit]].

Storage was the main engineering problem of the era, since disks were small and expensive. Rather than keep every full copy, both tools stored differences between revisions; see [[Diff]]. SCCS used an interleaved format: one file containing every line that had ever existed, each tagged with the revisions it belonged to. Retrieving any version took a single pass through the file. RCS chose **reverse deltas**: it kept the newest revision complete and stored instructions to reconstruct older ones backward from it. The reasoning was that developers usually want the latest version, so that should be the fastest to get.

Concurrency was handled by **locking**. Checking out a file for editing locked it, and no one else could change it until it was checked back in. That prevented conflicting edits, at the cost of developers waiting on one another or hunting down a colleague who had gone on vacation holding a lock; see [[Pessimistic Locking]]. RCS also supported branches, numbered like 1.3.1.1, though merging them back was largely manual work; see [[Merge Conflict]].

The limits of per-file history drove what came next. The Concurrent Versions System began in 1986 as a set of scripts on top of RCS that let developers edit simultaneously and merge afterward; see [[Subversion]]. Later centralized systems stored changes to many files as one unit; see [[Perforce]]. Distributed systems went further, with whole-project snapshots and history in every copy; see [[Distributed Version Control]] and [[Git Object Model]].

Some traces survive. RCS's dollar-sign keywords, which expanded to the revision number or author inside the file itself, still turn up in old source headers, and both tools remain installable on modern systems. The idea that every change carries an author, a date and a message started here; see [[Commit Message]] and [[Software Heritage]].

## See also
- [[Git Blame]]
- [[Three-Way Merge]]
