---
aliases:
  - Redundant array of independent disks
  - Disk mirroring
  - Disk striping
  - RAID 5
tags:
  - systems
summary: Combining several disks into one logical volume for speed, redundancy, or both, through striping, mirroring, and parity, and why it is never a substitute for backups.
---
**RAID**, a redundant array of independent disks, combines several physical drives into one logical volume to gain speed, survive drive failures, or both. The name originally said "inexpensive" disks: a 1988 paper from UC Berkeley argued that arrays of cheap PC drives could match the expensive large disks of the day.

RAID uses three techniques:

- **Striping** splits data into chunks spread across drives, so reads and writes proceed on all of them in parallel.
- **Mirroring** writes identical copies to two or more drives.
- **Parity** stores extra information computed from the data, usually with XOR, so a missing drive's contents can be rebuilt from the others. It's a simple error-correcting code.

The common levels combine these:

- **RAID 0** stripes with no redundancy. It's fast, but losing any one drive loses everything, so its failure risk grows with every drive added.
- **RAID 1** mirrors. Any surviving drive holds all the data, at the cost of half the capacity.
- **RAID 5** stripes data with parity spread across drives, surviving one failure while losing only one drive's worth of capacity.
- **RAID 6** keeps two parity blocks and survives two failures.
- **RAID 10** stripes across mirrored pairs, giving speed and redundancy at half capacity.

Rebuilding is the dangerous moment. When a drive fails, the array must read every other drive in full to reconstruct it, which on large modern disks can take a day or more. Drives bought together tend to wear out together, and the heavy rebuild load can trigger a second failure, which RAID 5 can't survive. That's why RAID 6 and mirroring became preferred for large drives.

A subtler problem is the **write hole**: if power fails midway through updating data and parity, they no longer agree, and the array may silently rebuild corrupt data later. Hardware controllers use battery-backed caches to prevent it, and filesystems such as ZFS and Btrfs build redundancy into the filesystem itself, using [[Copy-on-Write]] and checksums so they can tell which copy is correct, rather than trusting whichever disk answers.

The most important rule: **RAID is not a backup**. It protects against a drive dying, not against deleting a file, ransomware, a filesystem bug, a fire, or a controller writing garbage to every disk at once, since every mistake is faithfully mirrored. Real protection needs separate copies, ideally offsite, as in the 3-2-1 rule; see [[Filesystem Snapshot]].

With solid-state drives, some trade-offs shift: rebuilds are faster and striping matters less for speed, but identical SSDs given identical writes can wear out at nearly the same moment. The same ideas, redundancy, parity, and rebuilding, appear at larger scale in [[Database Replication]] and in erasure coding in [[Object Storage]].
