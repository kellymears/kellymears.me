---
aliases:
  - Cache locality
  - Spatial locality
  - Temporal locality
  - CPU cache
  - Cache line
  - False sharing
tags:
  - computation
summary: The tendency of programs to reuse recently accessed data and data stored nearby, which hardware caches exploit and which can make algorithms with the same complexity differ in speed many times over.
---
**Locality of reference** is the tendency of programs to access the same data repeatedly, and to access data stored near what they accessed recently. It comes in two forms:

- **Temporal locality.** Data used now will probably be used again soon, like a loop counter or a frequently called function.
- **Spatial locality.** Data near what was just used will probably be used next, like the next element of an array.

Computer hardware is built around this tendency. Main memory is slow compared with the processor: fetching a value from memory takes on the order of 100 nanoseconds, while the processor can execute hundreds of instructions in that time. So processors keep small, fast **caches** close to the cores, typically three levels, ranging from tens of kilobytes taking about a nanosecond to reach, to tens of megabytes taking ten or more. When a program needs data already in cache, a *hit*, it gets it almost instantly. A *miss* means waiting on memory.

Caches move data in fixed blocks called **cache lines**, usually 64 bytes. Reading one byte brings its 63 neighbors along. That's where spatial locality pays off: walking through an array in order uses every byte of each line fetched, and hardware *prefetchers* detect the pattern and fetch upcoming lines in advance.

The effect on performance can be dramatic:

- **Arrays beat linked lists.** A linked list's nodes are scattered across memory, so each step is likely a cache miss. Traversing an array of the same items can be many times faster, even though both are O(n) in [[Big-O Notation]].
- **Layout matters.** Storing each field of many objects in its own array, instead of an array of whole objects, keeps a loop that needs one field from loading the others. This is the idea behind [[Columnar Storage]] in databases and data-oriented design in game engines.

Locality also shapes data structures. A [[B-Tree]] packs many keys into each node so one fetch from disk or memory brings many useful comparisons. Some sorts that look equally fast on paper differ in practice because one moves through memory in order and another jumps around; see [[Sorting Algorithm]].

The same principle repeats at every level of the memory hierarchy. [[Virtual Memory]] keeps recently used pages in RAM and moves others to [[Swap]], and performance collapses when a program's working set no longer fits.

Multicore processors add a trap called **false sharing**. When two threads write to different variables that happen to share a cache line, the cores keep passing the line back and forth, slowing both, though they never touch each other's data. Padding variables onto separate lines fixes it. Problems like these rarely show up in code review and are found with [[Profiling]] and [[Benchmarking]].

## See also
- [[Binary Heap]]
- [[B-Tree]]
- [[Columnar Storage]]
- [[Profiling]]
- [[MapReduce]]
- [[Linked List]]
