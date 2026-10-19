---
aliases:
  - RCU
  - Grace period
  - Quiescent state
tags:
  - systems
summary: A synchronization technique that lets readers access shared data with no locks at all, by having writers publish a modified copy and wait until every reader that might still hold the old version has finished before freeing it, used throughout the Linux kernel.
---
**Read-copy-update**, or RCU, is a way to share data between threads when reads vastly outnumber writes. Readers take no locks and perform no atomic operations, so reading costs almost nothing and scales across any number of cores. Writers pay instead; see [[Multithreading]] and [[Lock-Free Data Structure]].

A writer never modifies data in place. To change an item in a linked list, it copies the item, updates the copy, then swaps a single pointer so new readers find the new version. A properly aligned pointer write is atomic on the hardware, so a reader sees either the old item or the new one, never half of each; see [[Copy-on-Write]].

The hard part is freeing the old item. Some readers may have picked up the old pointer just before the swap and still be using it. RCU waits for a **grace period**, an interval after which every reader that was active at the time of the swap must have finished. Readers aren't allowed to sleep inside their read sections, so once every processor has passed through a **quiescent state**, such as a [[Context Switch]], no old reader can remain and the memory can be freed. Marking a read section is cheap; in some kernel configurations it compiles to nothing at all.

The technique trades memory and write latency for read speed. Old versions linger until the grace period ends, and a writer must either wait or register a callback that frees memory later. Multiple writers still need ordinary locks among themselves; see [[Spinlock]]. RCU suits data that changes rarely and is read constantly, such as routing tables, lists of loaded modules, security policies and caches for looking up file paths; see [[IP Routing]] and [[Filesystem]].

Ordering needs care. On processors that reorder memory operations, the writer must make the new item's contents visible before the pointer to it, and readers must not see the pointer before the data it points to. RCU's primitives insert just the barriers needed and no more; see [[Memory Model]].

Paul McKenney and colleagues developed RCU at Sequent Computer Systems in the 1990s, building on earlier ideas, and brought it into the Linux kernel in 2002. Its use there has grown to many thousands of call sites, and it's a large part of why the kernel scales to machines with hundreds of cores; see [[Kernel]]. A user-space library makes it available to ordinary programs too.

The design echoes garbage collection, since old versions are reclaimed only once no reader can reach them. Languages with a collector get some of the same benefit by replacing whole immutable objects and letting the collector notice when old ones are unused; see [[Garbage Collection]] and [[Persistent Data Structure]]. Epoch-based reclamation and hazard pointers solve the same reclamation problem with different trade-offs.

## See also
- [[Futex]]
- [[Cache Coherence]]
