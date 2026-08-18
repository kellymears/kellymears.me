---
aliases:
  - Volume snapshot
tags:
  - systems
summary: A point-in-time, near-free copy of a filesystem's state, made possible by sharing unchanged blocks with the live data.
---
A **filesystem snapshot** captures the exact state of a volume at one instant, in a way that can be mounted or rolled back to later, without the cost of a full physical copy. Filesystems like ZFS and Btrfs, and block layers like LVM, make this cheap using the same trick underneath: [[Copy-on-Write]]. A snapshot shares every existing block with the live filesystem at the moment it's taken, and only starts consuming its own space as the live filesystem's later writes diverge from what the snapshot still points to.

This is what makes snapshotting practical for routine use rather than an occasional heavyweight operation — taking one is close to instantaneous regardless of volume size, because nothing is actually copied at snapshot time. The cost shows up gradually afterward, proportional to how much data changes, not to how much data exists. It's also why a filesystem can silently run low on space from snapshots alone: each one anchors its shared blocks in place, so deleting old files on the live volume doesn't reclaim their space as long as a snapshot still references them.

A snapshot is not a backup by itself, even though it's often confused for one, because it typically lives on the same physical disks as the data it's a snapshot of — a drive failure takes both down together. Its real value is as a fast, cheap rollback point and as a *consistent* source to back up *from*: streaming a snapshot to another host produces a backup that can't be caught mid-write, which copying a live filesystem directly cannot guarantee.

## See also
- [[Copy-on-Write]]
- [[Inode]]
- [[Database Migration]]
- [[Idempotence]]
