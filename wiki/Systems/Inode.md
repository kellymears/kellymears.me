---
aliases:
  - Index node
tags:
  - systems
summary: The record a Unix filesystem keeps about a file's metadata and data location — everything except its name.
---
An **inode** is the data structure a Unix-style filesystem uses to store everything about a file except its name: ownership, permissions, size, timestamps, and the pointers to where its actual data blocks live on disk. A directory entry is just a name mapped to an inode number; the name is not part of the file at all, which is the detail that makes a surprising amount of Unix filesystem behavior make sense at once.

Because a name is only a pointer to an inode, a file can have multiple names — hard links (as opposed to a [[Symbolic Link]], which points at a name rather than an inode) — pointing at the same inode, and none of them is more "real" than another; the file itself is only deleted, and its space reclaimed, once its link count reaches zero. This is also why deleting the file a process still has open doesn't free the disk space immediately: the process holds the inode open by its own reference, independent of any directory entry, and the space is reclaimed only when the last open handle closes.

Traditional filesystems like ext4 fix the number of inodes at creation time, allocated separately from disk space (XFS, Btrfs, and ZFS allocate them dynamically instead). Such a filesystem can therefore run out of inodes and refuse to create new files while `df` still reports plenty of free space — a classic trap when a workload creates huge numbers of tiny files, since each one consumes an inode regardless of size. `df -i` shows inode usage the way plain `df` shows block usage, and it's the first thing to check when "no space left on device" appears on a disk that looks empty.

## See also
- [[Symbolic Link]]
- [[Copy-on-Write]]
- [[Filesystem Snapshot]]
- [[Process]]
