---
aliases:
  - HDD
  - Head crash
  - Shingled magnetic recording
tags:
  - systems
summary: Spinning magnetic platters read by heads flying nanometers above them, cheap per terabyte but slow to reach any one spot, a gap that shaped decades of filesystem and database design.
---
**A hard disk drive** stores data magnetically on rigid platters spinning at thousands of revolutions per minute. A read-write head on an arm floats over each surface, magnetizing tiny regions one way or the other to record bits; see [[Magnetism]]. IBM shipped the first in 1956 with its RAMAC computer: fifty platters two feet across, holding about five million characters, in a cabinet weighing roughly a ton. Drives now hold more than 30 terabytes in a box that fits in a hand.

The heads never touch the platters in normal use. They ride on a cushion of air, or helium in sealed high-capacity drives, a few nanometers above the surface. If a head touches the spinning surface, through a jolt or a speck of dust, it scrapes off the magnetic coating and the data with it. That is a **head crash**, and it's why drives are assembled in clean rooms.

Mechanics set the speed. To read a block, the arm must swing to the right track, a seek of several milliseconds, and then wait for the block to rotate under the head, half a turn on average, about 4 milliseconds at 7,200 revolutions per minute. A drive manages only a hundred or two random reads a second, yet once positioned it streams hundreds of megabytes a second. A random read is roughly a hundred thousand times slower than one from [[Dynamic Random-Access Memory]]; see [[Memory Hierarchy]].

Software spent decades working around that gap:

- **Caching** recently used blocks in memory; see [[Page Cache]].
- **Reordering** queued requests so the arm sweeps across the platter in one direction, like an elevator, instead of jumping back and forth.
- **Laying out files contiguously**, since a fragmented file needs a seek per piece. Defragmenting tools existed to fix that; see [[Filesystem]].
- **Appending** changes to a sequential log and applying them later, as journaling filesystems and databases do; see [[Journaling File System]].

[[Solid-State Drive]]s have no moving parts and made random reads nearly free, which retired most of these tricks on laptops. Hard drives survive where cost per terabyte matters most: data centers, backups, and home media servers.

To keep growing, manufacturers squeezed tracks closer. **Shingled magnetic recording** overlaps tracks like roof shingles, so rewriting one disturbs its neighbors and the drive must rewrite whole bands. In 2020 Western Digital was found selling shingled drives in a line marketed for storage arrays without saying so, and some arrays struggled or failed while rebuilding onto them; see [[RAID]].

Drives fail mechanically, often after warning signs such as reallocated sectors that their self-monitoring reports. Failure rates follow a bathtub curve, high early and late in life, which is why backups matter more than any single drive; see [[Bathtub Curve]] and [[Backup and Restore]].

## See also
- [[Read-Only Memory]]
- [[Bit rot]]
- [[Power Supply Unit]]
- [[Gray Failure]]
