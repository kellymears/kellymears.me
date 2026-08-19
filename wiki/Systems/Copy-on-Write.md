---
aliases:
  - COW
tags:
  - systems
summary: Sharing a copy until the moment one side writes to it, deferring the cost of duplication until it's actually needed.
---
**Copy-on-write** is a strategy for sharing data cheaply: two owners are handed the same underlying storage, and neither pays the cost of a real copy until one of them writes. At that point, and only then, the writer's view is duplicated and diverges from the original, while a reader that never writes never triggers the copy at all.

The technique appears at several layers that rarely get connected. When a Unix process calls `fork()`, the child gets its parent's entire memory space mapped copy-on-write rather than physically duplicated — cheap and instant, with actual page copies happening lazily, one 4KB page at a time, only for the pages either side later modifies. Filesystems like ZFS and Btrfs apply the same idea to disk blocks: a [[Filesystem Snapshot]] is nearly free to create because it shares every existing block with the live filesystem, and only diverges block-by-block as writes land. Some database engines use it for transaction isolation, giving a long-running read a consistent view without blocking writers, since the writer's changes land on new copies rather than mutating what the reader is looking at.

The trade copy-on-write makes is complexity for cost: tracking which pages or blocks are shared and which have diverged requires reference counting (see [[Garbage Collection]]) or a similar bookkeeping structure, and a workload that writes to nearly everything it touches gets little benefit and pays that bookkeeping overhead anyway. It earns its keep specifically when most of the shared data survives unmodified — the common case for both process forking and filesystem snapshots.

## See also
- [[Filesystem Snapshot]]
- [[Inode]]
- [[Process]]
- [[Idempotence]]
