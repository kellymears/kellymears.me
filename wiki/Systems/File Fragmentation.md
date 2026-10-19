---
aliases:
  - Defragmentation
  - Disk fragmentation
  - Extent
tags:
  - systems
summary: The scattering of a file's data across many separate places on a disk as files grow, shrink and are deleted, which once slowed hard drives badly and spawned defragmenting tools, and which modern filesystems and solid-state drives have largely tamed.
---
A filesystem stores each file in blocks on a disk. Ideally a file's blocks sit next to each other in one contiguous run. Over time, though, files are created, deleted, grown and shrunk, and free space breaks into scattered gaps. A new or growing file may then have to be split across many separate runs. That's **fragmentation**; see [[Filesystem]].

On a spinning hard drive it matters a lot. Reading contiguous data is fast because the head stays in place while the platter turns. Each break in a file forces the head to move and wait for the platter to come around, costing several milliseconds, an eternity compared to the transfer itself; see [[Hard Disk Drive]]. A badly fragmented drive could feel dramatically slower than a fresh one.

That made **defragmentation** a familiar maintenance chore. Utilities read fragmented files and rewrote them contiguously, often consolidating free space too. Windows shipped a defragmenter from the mid-1990s, and watching its grid of colored blocks rearrange was a ritual of the era. The FAT filesystem used by MS-DOS and early Windows was especially prone to fragmentation because it simply took the first free cluster available.

Filesystems learned to avoid the problem rather than repair it:

- **Extents.** Instead of listing every block, a file records runs as a start and a length. That encourages contiguous allocation and makes large files cheap to describe; see [[Inode]].
- **Delayed allocation.** Waiting until data is actually written to disk, rather than when a program asks to write, lets the filesystem see a file's final size and place it in one run; see [[Page Cache]].
- **Spreading files out.** Leaving space between files gives each room to grow. Unix filesystems have long done this, which is one reason defragmenting tools were rarely needed there.
- **Reserved space.** Keeping a percentage of the disk free helps, because fragmentation worsens sharply as a disk fills.

Copy-on-write filesystems are a partial exception. Since they never overwrite data in place, a file modified often, such as a database or virtual machine image, becomes heavily fragmented, and such files are sometimes exempted from copy-on-write; see [[Copy-on-Write]] and [[ZFS]].

Solid-state drives changed the picture. With no moving parts, reading scattered blocks costs about the same as reading contiguous ones, and defragmenting an SSD mostly wears it out with extra writes. Operating systems now skip it on SSDs and instead tell the drive which blocks are free so it can manage its own internal layout; see [[Solid-State Drive]].

The same problem appears wherever space is allocated and released in varying sizes: in memory, where it can make a process use far more than it needs, and in garbage-collected heaps; see [[Memory Allocator]] and [[Garbage Collection]].

## See also
- [[Sparse File]]
- [[Journaling File System]]
