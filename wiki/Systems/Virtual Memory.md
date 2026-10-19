---
aliases:
  - Paging
  - Page table
  - Page fault
  - Memory overcommit
tags:
  - systems
summary: Giving every process its own private address space that the kernel maps onto physical memory page by page, on demand.
---
**Virtual memory** gives every [[Process]] its own private address space, which the [[Kernel|kernel]] maps onto physical memory in fixed-size *pages* (usually 4 KB) through per-process page tables. A process sees one contiguous range of addresses. Behind it, the pages may sit anywhere in RAM, may be shared with other processes, may live on disk in [[Swap]], or may not exist at all yet.

Most of a modern operating system's memory behavior follows from that indirection:

- **Isolation.** One process cannot address another's memory, because its page table has no entry for it. A stray pointer causes a fault rather than silent corruption elsewhere.
- **Lazy allocation.** Asking for memory reserves address space, not RAM. A page is backed by physical memory only when first touched, through a *page fault* the kernel handles invisibly. This is [[Lazy Evaluation]] at the hardware level.
- **Sharing.** Libraries, and a forked child's pages, map to the same physical frames until someone writes, which is [[Copy-on-Write]].
- **The page cache.** File contents read from disk stay in otherwise unused RAM. That is why a healthy Linux machine shows almost no "free" memory: free RAM is wasted RAM, and the cache gives way when processes need the space.

The consequence that surprises people is **overcommit**. Since allocation reserves only address space, the kernel lets processes collectively allocate more than exists, betting that much of it will never be touched. The bet usually wins. When it loses, there is no allocation call left to fail gracefully, because the allocation succeeded long ago and the failure arrives at the moment a page is touched. The kernel's only recourse is the [[Out-of-Memory Killer]]. It also means "how much memory does this process use" has several honest answers (virtual size, resident set, proportional share of shared pages) and they can differ by orders of magnitude.

The same design appears wherever a fixed pool has to be shared among variable demands. Inference engines page a model's [[KV Cache]] into fixed blocks for exactly the reasons the kernel pages RAM: no fragmentation, and allocation on demand.

## See also
- [[Address Space Layout Randomization]]
- [[Translation Lookaside Buffer]]
- [[Time-Sharing]]
- [[Rowhammer]]
- [[Protection Ring]]
- [[Position-Independent Code]]
- [[Memory Allocator]]
- [[Texture Streaming]]
