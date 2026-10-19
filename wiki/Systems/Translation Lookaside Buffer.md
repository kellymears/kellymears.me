---
aliases:
  - TLB
  - Huge pages
  - Transparent huge pages
  - TLB shootdown
tags:
  - systems
summary: The small cache of address translations that makes virtual memory fast, and why its limited reach, flushes, and shootdowns show up in performance.
---
The **translation lookaside buffer** (TLB) is a small, very fast cache inside the CPU that remembers recent translations from virtual addresses to physical ones. Every memory access a program makes uses a virtual address, as described in [[Virtual Memory]], and without the TLB each access would first need a walk through the page tables in memory to find where the data really lives.

That walk is expensive. On x86-64, page tables have four levels, five on the newest systems, so a translation that misses every cache costs four or five dependent memory reads before the actual read can begin. The TLB short-circuits it. A typical modern core has a few dozen first-level entries and one or two thousand in a second level, and hit rates on ordinary code are above 99%. That rate depends on [[Locality of Reference]], the same principle that makes data caches work.

The key limit is **TLB reach**: the amount of memory the TLB can cover at once, entries times page size. With standard 4-kilobyte pages and about 1,500 entries, reach is around 6 megabytes. A program that touches gigabytes randomly, such as a database, a large [[Hash Table]], or a garbage-collected heap, misses constantly and spends much of its time on page walks.

**Huge pages** extend the reach. x86-64 also supports 2-megabyte and 1-gigabyte pages, so one entry covers 512 or 262,144 times as much memory. Databases and virtual machines often reserve huge pages explicitly. Linux's *transparent huge pages* (2011) does it automatically by assembling huge pages in the background, but the compaction work can cause latency spikes, and several databases long recommended turning it off.

The TLB also shapes the cost of other operations:

- **Context switches.** Switching to another [[Process]] changes the address space, so old entries become invalid. Older CPUs flushed the whole TLB on every switch. Tagging entries with an address-space identifier, called PCID on x86, avoids the flush, and became critical in 2018 when the Meltdown fix began switching page tables on every [[System Call]] as well, one of the costs of [[Speculative Execution]] mitigations.
- **Shootdowns.** When the [[Kernel]] unmaps memory, every other core that might hold the stale translation must drop it. The kernel sends inter-processor [[Interrupt]]s and waits, a *TLB shootdown*, which makes frequent `munmap` and page migration costly on many-core machines.
- **Virtualization.** A guest under a [[Hypervisor]] has its own page tables on top of the host's, so a full miss walks both: up to 24 memory reads. Huge pages help even more there.

The TLB rarely appears in application code, but it explains a lot of puzzling performance: why random access is slower than its cache-miss count suggests, and why the same workload speeds up when the pages get bigger.

## See also
- [[Memory Hierarchy]]
- [[Page Cache]]
- [[Position-Independent Code]]
- [[Swap]]
- [[Cache Coherence]]
