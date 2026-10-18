---
aliases:
  - Helix Core
  - Exclusive checkout
  - Changelist
tags:
  - delivery
summary: The centralized version control system built for enormous repositories and binary files, with numbered changelists and exclusive checkouts, which remains the standard in game development long after Git won elsewhere.
---
**Perforce** is a centralized version control system first released in 1995 by Christopher Seiwald's company of the same name, and now sold as **Helix Core**. It was built for speed on very large codebases, and for a long time it hosted the source of some of the largest software companies. Google kept its main code in Perforce until it outgrew a single server and moved to an in-house system; see [[Version Control]] and [[Monorepo]].

Its model differs from Git's in several ways:

- **A central depot.** The server holds all history. A developer's workspace maps chosen paths from the depot onto local folders and syncs only those, so a checkout can be a small slice of a repository holding terabytes.
- **Files are read-only until opened.** Before editing a file, you tell the server you are opening it, so the server always knows who is working on what. Editors and game tools usually do this for you.
- **Changelists.** Opened files go into a numbered **changelist**, which is submitted as one atomic change; see [[Atomic Commit]]. A developer can keep several pending changelists to separate unrelated work, and **shelving** stores a pending changelist on the server for someone else to review or pick up.
- **Exclusive checkout.** A file type can be marked so only one person may open it at a time; see [[Pessimistic Locking]].

That last feature is why Perforce is still the standard in game development, film effects, and chip design. Textures, models, audio, and level files are large binaries that cannot be merged. If two artists edit one character model at once, one loses a day's work; see [[Merge Conflict]]. Locking prevents it, and a distributed system, where every clone carries the full history and there is no central record of who holds a file, cannot easily enforce it; see [[Distributed Version Control]]. Game repositories also grow to sizes that make cloning the whole history impractical. Unreal Engine's editor integrates with Perforce directly, and many studios run their build farms from it; see [[Build System]].

Git has narrowed the gap. Large-file storage with file locking, and partial and shallow clones, address the same problems, though they are additions to a model designed for small text files; see [[Git LFS]] and [[Shallow Clone]]. Many studios run both: Git for engine and tools code, Perforce for content.

The trade-offs follow from centralization. Branching is heavier, work needs a connection to the server, and the server is a single point that must scale and be backed up. In return, administrators get fine-grained permissions on paths and a single, authoritative history.

The same niche was once shared with [[Subversion]], which also offered locking, but Perforce's speed on very large depots kept it ahead in game development; see [[Branching Model]].

## See also
- [[Code Review]]
- [[Artifact Repository]]
