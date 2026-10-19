---
aliases:
  - Buffer cache
  - Disk cache
  - Dirty page
  - fsync
  - Memory-mapped file
  - mmap
tags:
  - systems
summary: The operating system's use of spare memory to hold recently read and written file data, which makes repeated disk access fast and makes "free memory" look alarmingly low.
---
The **page cache** is memory the operating system [[Kernel]] uses to hold file data. When a program reads a file, the kernel loads the data into memory pages and keeps them there after the read is done. The next read of that data, by any program, comes straight from memory. Writes usually go into the cache too and reach the disk later.

The effect is large. Reading from RAM takes around 100 nanoseconds; reading from a fast SSD takes tens of microseconds, and from a spinning disk several milliseconds. A second run of a build is often much faster than the first purely because the files are cached. Anyone [[Benchmarking]] disk-heavy code has to decide whether they're measuring a cold or warm cache.

The kernel uses nearly all otherwise idle memory for this. That produces a common scare: tools report almost no "free" memory on a healthy machine. But cached pages are reclaimable. When programs need memory, the kernel drops clean cached pages instantly, since their data is still on disk. Linux's `free` command shows this as "available" memory, which is the meaningful number. Under real memory pressure, the cache shrinks first, and if programs keep re-reading files whose pages were just dropped, performance collapses, one of the stalls [[Pressure Stall Information]] measures, before the system resorts to [[Swap]] or the [[Out-of-Memory Killer]].

**Writes** are where the cache gets subtle. A `write` call normally just copies data into the cache, marks those pages *dirty*, and returns. The kernel writes dirty pages to disk in the background, typically within about 30 seconds. This makes writes fast, but a successful write doesn't guarantee the data is on disk; if the power fails, recent writes are lost.

Programs that need durability call **fsync**, which blocks until a file's dirty pages, and the metadata needed to find them, have reached stable storage. Databases call it when committing a transaction, a core part of [[ACID]] durability and of [[Write-Ahead Logging]]. Getting it right is hard: in 2018 PostgreSQL developers discovered that on Linux, a failed fsync could clear the error, so a retry would falsely report success and data could be silently lost. Correct handling of fsync errors became a standard concern for databases afterward.

Programs can also map a file directly into their address space with **mmap**. Reading the memory triggers a page fault that loads the data from the cache, so the file behaves like an array, managed by the same machinery as [[Virtual Memory]]. Databases use this to avoid copying.

The page cache is a cache like any other: it relies on [[Locality of Reference]], and some databases bypass it with direct I/O to manage memory themselves.

## See also
- [[Origin Private File System]]
- [[In-Memory Database]]
- [[File Fragmentation]]
- [[Hard Disk Drive]]
- [[Zero-Copy]]
- [[Translation Lookaside Buffer]]
