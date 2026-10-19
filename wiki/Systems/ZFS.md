---
aliases:
  - Btrfs
  - Data scrubbing
  - Copy-on-write filesystem
tags:
  - systems
summary: A filesystem from Sun Microsystems that merges volume management with checksums on every block and never overwrites data in place, so it can detect silent corruption, repair it from redundancy, and snapshot instantly.
---
**ZFS** is a filesystem and volume manager in one, designed at Sun Microsystems by Jeff Bonwick and Matthew Ahrens, announced in 2004 and shipped with Solaris in 2006. Its premise is that disks lie: they return wrong data without reporting an error, through firmware bugs, misdirected writes, and decaying media. Traditional filesystems trust what the disk hands back. ZFS verifies it; see [[Bit rot]].

Every block is checksummed, and the checksum is stored not with the block but in the pointer to it, in the parent block. Parents are checksummed by their parents, up to a single root, so the whole pool forms a tree of hashes; see [[Merkle Tree]] and [[Hash Function]]. A block that was damaged, or written to the wrong place, fails verification when read.

Detection becomes repair when there is redundancy. ZFS manages the disks itself, as mirrors or RAID-Z, its parity layout, so when a block fails its checksum, it reads another copy, returns the good data, and rewrites the bad copy. Hardware RAID can't do this, because it can tell that copies disagree but not which one is right; see [[RAID]]. **Scrubbing** reads every block in the pool on a schedule, finding and fixing decay before a second failure makes it unrecoverable.

ZFS never overwrites live data. A change is written to free space, then the pointers above it are rewritten, also to new places, up to the root, which is updated last in one step. A crash at any point leaves the previous consistent tree intact, so there's no long consistency check at boot; see [[Copy-on-Write]]. The same design makes **snapshots** nearly free: keep the old root and don't reuse its blocks. Snapshots can be sent to another machine as streams of changed blocks, which makes incremental replication efficient; see [[Filesystem Snapshot]] and [[Backup and Restore]].

Folding in volume management means disks join a pool and filesystems draw from it as needed, a job a separate layer does elsewhere; see [[Logical Volume Manager]]. ZFS also caches aggressively in memory with its own adaptive cache, apart from the operating system's; see [[Page Cache]].

Licensing kept it out of Linux. ZFS was released under Sun's CDDL, which is widely held to be incompatible with the kernel's GPL, so it ships as a separately built module; see [[Copyleft]] and [[Kernel]]. After Oracle bought Sun in 2010 and closed later development, the open version continued as OpenZFS, now used on Linux and FreeBSD.

**Btrfs**, begun at Oracle in 2007, brings a similar copy-on-write, checksummed design into the mainline Linux kernel, though its parity modes have long been considered unsafe for important data. Filesystems that update in place rely on a journal instead; see [[Journaling File System]].

## See also
- [[Hard Disk Drive]]
- [[Filesystem]]
- [[Sparse File]]
