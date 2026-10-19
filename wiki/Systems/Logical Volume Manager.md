---
aliases:
  - LVM
  - Volume group
  - Thin provisioning
tags:
  - systems
summary: A layer between disks and filesystems that pools physical drives and carves them into resizable virtual partitions, with snapshots and overcommitted thin volumes on Linux.
---
**A logical volume manager** puts a layer of indirection between physical disks and the filesystems on them. Instead of carving a disk into fixed partitions, it pools storage and hands out virtual volumes that can be grown, shrunk, moved, and snapshotted while in use. The idea came from commercial Unix systems such as IBM's AIX and HP-UX. Linux gained its LVM in the late 1990s, and the current version, LVM2, runs on the kernel's device mapper; see [[Kernel]].

It has three layers:

- **Physical volumes** are whole disks, partitions, or RAID arrays marked for LVM's use; see [[Disk Partition]].
- **Volume groups** pool one or more physical volumes into a single store of space, cut into fixed-size extents of a few megabytes.
- **Logical volumes** are allocated from that pool and appear to the system as ordinary block devices, holding a filesystem, swap space, or anything else a partition could; see [[Device File]] and [[Swap]].

The payoff is flexibility. A partition is fixed by where its neighbors sit on the disk, so enlarging one often means backing up and starting over. A logical volume's extents can come from anywhere, so growing it is a command, followed by growing the filesystem inside it. A new disk can be added to a full group, and data can be moved off a failing disk onto another while the system runs.

**Snapshots** freeze a volume's state at an instant. Classic LVM snapshots copy each original block aside before it is overwritten, which makes taking one instant but slows writes for as long as it exists; see [[Copy-on-Write]] and [[Filesystem Snapshot]]. A common use is to snapshot, back up from the frozen view, and discard it; see [[Backup and Restore]].

**Thin provisioning** allocates space only when data is written, so volumes can promise more than the pool holds. It works like memory overcommit and fails like it: if the pool runs out, writes to every volume in it start failing at once. Monitoring the pool is not optional; see [[Virtual Memory]] and [[Out-of-Memory Killer]].

LVM often sits under encryption. A whole disk is encrypted, and logical volumes for the system, home directories, and swap are created inside, so one passphrase unlocks them all; see [[Full-Disk Encryption]].

Each added layer is another one to understand when recovering a broken system. A disk holding LVM can't be mounted directly: the tools must first find the group and activate its volumes, which a rescue system may not do on its own; see [[Boot Process]].

Newer filesystems fold volume management into the filesystem itself, pooling disks and handing out space without a separate layer; see [[ZFS]]. LVM remains the default in several Linux installers because it works under any filesystem; see [[Filesystem]].

## See also
- [[File Fragmentation]]
- [[Sparse File]]
