---
aliases:
  - malloc
  - Arena allocator
  - Slab allocator
  - Memory fragmentation
  - jemalloc
tags:
  - systems
summary: The library code behind malloc and free that carves large blocks from the operating system into the small pieces programs request, and the trade-offs among speed, fragmentation, and thread contention that shape it.
---
A **memory allocator** hands out pieces of memory to a running program on request and takes them back when the program is done. In C the interface is two functions, malloc and free; in other languages it hides behind every new object. Underneath, the allocator asks the operating system for memory in large chunks, through system calls that extend the heap or map fresh pages, and carves those chunks into the small sizes programs actually ask for; see [[Virtual Memory]] and [[System Call]].

That layer exists because asking the kernel is slow and works only in whole pages.

The basic design keeps track of free blocks, often in a **free list** threaded through the free memory itself; see [[Linked List]]. Modern allocators group requests into size classes, so all 32-byte objects come from pages holding only 32-byte objects, which makes finding a slot fast and keeps related data close together; see [[Locality of Reference]].

The central problem is **fragmentation**. Free memory ends up scattered in holes too small for the next request, so a long-running process can hold far more memory than it uses, even with no leak; see [[Memory Leak]]. Allocators also rarely return memory to the operating system, since a page can be released only when every object on it is freed. A server whose memory grows and never shrinks is often showing fragmentation, not a bug.

Threads add contention. A single lock around the heap serializes every allocation in a busy multithreaded program; see [[Spinlock]]. Doug Lea's dlmalloc (1987), the ancestor of the allocator in GNU's C library, came from a single-threaded era. Later designs give each thread its own cache of small blocks: jemalloc (2005), written for FreeBSD and later used by Firefox and Facebook, Google's tcmalloc, and Microsoft's mimalloc (2019). Swapping in a different allocator is a common performance fix.

Special-purpose strategies:

- **Arenas.** Allocate by bumping a pointer through one big block, then free everything at once. Game engines use a per-frame arena discarded at the end of each frame; see [[Game Loop]]. Compilers do the same per compilation.
- **Slabs.** Jeff Bonwick's slab allocator (1994), for the Solaris kernel, keeps caches of identical kernel objects ready to reuse; Linux adopted the idea.
- **The stack.** Local variables need no allocator at all, freed automatically when a function returns; see [[Call Stack]].

Mistakes here are among the most dangerous bugs. Using memory after freeing it, or freeing it twice, corrupts the allocator's own bookkeeping, and attackers exploit that corruption to take control of programs; see [[Memory Safety]].

Managed languages sit a layer above. A [[Garbage Collection]] runtime decides when objects die, and [[Reference Counting]] frees them as counts reach zero, but both still need an allocator to decide where objects live.

## See also
- [[Out-of-Memory Killer]]
- [[Copy-on-Write]]
