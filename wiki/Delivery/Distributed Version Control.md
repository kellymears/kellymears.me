---
aliases:
  - DVCS
  - Centralized version control
  - Mercurial
  - BitKeeper
tags:
  - delivery
summary: Version control in which every developer holds a full copy of the project's history, which made branching cheap, offline work normal, and forking trivial, and which displaced central servers in the 2000s.
---
**Distributed version control** gives every developer a complete copy of a project's history, not just the latest files. Each copy can record commits, create branches, and view the full log without contacting a server. Changes move between copies by pushing and pulling. Git and Mercurial, both released in 2005, made this the dominant model; see [[Version Control]].

Earlier systems were **centralized**. CVS, from the 1980s, and Subversion, from 2000, kept history on one server. Developers checked out a working copy, and almost every operation, from viewing history to committing, required a connection. Committing meant publishing: there was no private place to record work in progress, so people committed rarely and in large chunks.

The switch began with the Linux kernel. From 2002 its developers used BitKeeper, a proprietary distributed system offered free to open-source projects. In 2005 the license was withdrawn after a dispute over reverse engineering, and Linus Torvalds wrote Git in a few weeks as a replacement; see [[Linux kernel]]. Matt Mackall released Mercurial around the same time, for the same reason.

Several things changed once every copy held the full history:

- **Local commits.** Developers could commit often and privately, then tidy the history before sharing it; see [[Interactive Rebase]] and [[Atomic Commit]].
- **Cheap branching.** Branches became lightweight pointers, created and discarded freely, which made merging routine rather than feared; see [[Three-Way Merge]].
- **Speed and offline work.** Log, diff, and blame run against local data. Work continues on a plane.
- **Integrity.** Git names every commit by a hash of its contents and its parents' hashes, so tampering with history changes every later identifier; see [[Merkle Tree]].
- **Forking.** Anyone with a copy holds everything needed to continue the project independently; see [[Software Fork]].

Technically there's no central server, since every copy is equal. In practice, teams designate one copy as authoritative, and hosting sites added pull requests, issues, and review on top; see [[Pull Request]]. Git's dominance owes much to that hosting and to [[Network Effect]]s: Mercurial was considered easier to learn, but Git won the ecosystem.

The model has costs. Full copies of history grow large, and Git handles big binary files poorly; see [[Git LFS]]. Very large companies built their own centralized or virtualized systems to cope with enormous repositories; see [[Monorepo]]. And a system flexible enough to rewrite history lets people destroy work; see [[Force Push]].

The same ideas show up elsewhere. Applications that keep a full local copy and sync changes later borrow from distributed version control; see [[Local-First Software]].

## See also
- [[Software Heritage]]
- [[Darcs]]
