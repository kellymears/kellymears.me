---
aliases:
  - Doubly linked list
  - Singly linked list
  - Cons cell
  - Intrusive list
tags:
  - computation
summary: A chain of nodes that each point to the next, cheap to splice anywhere but slow to search and hostile to the CPU cache, which is why it shows up inside other structures more than on its own.
---
A **linked list** stores a sequence as a chain of separate nodes, each holding a value and a pointer to the next node. A *doubly* linked list also points back to the previous node. There is no contiguous block of memory, only a head pointer and a trail to follow. Allen Newell, Cliff Shaw, and Herbert Simon used lists in their 1956 Information Processing Language, and Lisp made them the central data structure in 1958, building every list from two-slot *cons cells*.

The trade-offs against an array are sharp:

- **Splicing is cheap.** Given a pointer to a node, inserting or removing next to it takes constant time, with no shifting of later elements. Lists can also be split and joined in constant time.
- **Access is slow.** Reaching the hundredth element means following ninety-nine pointers. Indexing and searching are linear in [[Big-O Notation]], where an array indexes in constant time.
- **Memory is scattered.** Each node is a separate allocation, often far from its neighbors, so walking a list defeats the CPU cache. [[Locality of Reference]] is why a list frequently loses to an array even for insert-heavy workloads; Bjarne Stroustrup's 2012 benchmark showing a vector beating a list at random insertion made the point famous.
- **Overhead per element.** Every value carries one or two pointers, which can double memory use for small values.

The structure is most useful as a component inside something else:

- **[[Least Recently Used Cache]].** A [[Hash Table]] finds an entry, and a doubly linked list orders entries by recency, so moving one to the front or evicting the oldest is constant time.
- **Kernels.** Operating system kernels use *intrusive* lists, where the links live inside the objects themselves, to track processes, timers, and free memory without extra allocations.
- **Hash table buckets.** Chaining resolves collisions by keeping a short list per bucket.
- **Free lists.** Memory allocators thread unused blocks into a list for quick reuse.

Singly linked lists are also the classic [[Persistent Data Structure]]. Prepending creates a new head that shares the entire old tail, so many versions coexist cheaply and nothing is ever copied. That sharing is why functional languages built on [[Immutability]] lean on them, and why processing a list by [[Recursion]], handling the head and recursing on the tail, is the natural idiom in Lisp, Haskell, and Elixir. Shared tails depend on [[Garbage Collection]] or [[Reference Counting]] to know when a node is truly unused.

Lists have hazards. A cycle, where a node points back to an earlier one, turns a traversal into an infinite loop; Floyd's tortoise-and-hare algorithm detects it with two pointers moving at different speeds. Forgetting to free removed nodes produces a [[Memory Leak]] in languages without automatic memory management.

## See also
- [[Ring Buffer]]
- [[Binary Heap]]
- [[Memory Allocator]]
- [[Skip List]]
- [[Webring]]
