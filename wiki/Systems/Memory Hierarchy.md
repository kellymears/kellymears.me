---
aliases:
  - Storage hierarchy
  - Latency numbers every programmer should know
tags:
  - systems
summary: The ladder of storage from registers and caches to main memory, disks, and the network, each step larger, cheaper, and slower by roughly an order of magnitude or more, which shapes how fast programs actually run.
---
The **memory hierarchy** is the arrangement of storage in a computer into levels, from small and fast to large and slow. No single technology is fast, large, cheap, and persistent at once, so computers stack several, keeping the data in use close to the processor and the rest farther away.

Typical access times, roughly:

- **Registers.** Inside the processor core, effectively immediate.
- **L1 cache.** About one nanosecond. Tens of kilobytes per core, built from fast static RAM.
- **L2 and L3 caches.** A few to a few tens of nanoseconds, megabytes in size, the largest shared among cores; see [[Cache Coherence]].
- **Main memory.** Around a hundred nanoseconds, gigabytes in size; see [[Dynamic Random-Access Memory]].
- **Solid-state drive.** Tens to hundreds of microseconds; see [[Solid-State Drive]].
- **Spinning hard disk.** Several milliseconds, mostly waiting for the platter to rotate.
- **Network.** A round trip within a data center takes about half a millisecond; across an ocean, over a hundred; see [[Latency and Jitter]].

The gaps are hard to feel at these scales, so they are often stretched. If an L1 cache hit took one second, a trip to main memory would take about a minute and a half, an SSD read about a day, and a disk seek several months. Lists like this circulated widely among programmers in the 2000s and 2010s as "latency numbers every programmer should know." The physics behind them is partly distance: Grace Hopper famously handed out pieces of wire about 30 centimeters long to show how far electricity travels in a nanosecond.

The hierarchy works because programs tend to reuse recent data and data stored nearby, so each level can keep a small working set from the level below; see [[Locality of Reference]]. Each level acts as a cache for the next, deciding what to keep and evict; see [[Least Recently Used Cache]].

Software design follows from these numbers:

- **Data layout.** Walking an array in order is far faster than chasing pointers scattered through memory, even when both do the same number of steps; see [[Linked List]] and [[Big-O Notation]].
- **Disk structures.** Databases use wide, shallow trees so each lookup touches only a few slow pages; see [[B-Tree]].
- **Operating system caches.** File reads are served from memory when possible, and memory is extended onto disk when needed; see [[Page Cache]], [[Virtual Memory]], and [[Translation Lookaside Buffer]].

The numbers also explain why measuring beats guessing. Two algorithms with the same complexity can differ tenfold in practice because of where their data lives, and optimizing anything but the slowest level is usually wasted; see [[Premature Optimization]].

## See also
- [[Instruction Pipelining]]
- [[Swap]]
