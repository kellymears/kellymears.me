---
aliases:
  - Heap
  - Min-heap
  - Max-heap
  - Heapsort
  - Heap data structure
tags:
  - computation
summary: A tree packed into an array where every parent beats its children, the standard way to always know the smallest item while items keep arriving.
---
A **binary heap** is a tree in which every parent is smaller than its children (a *min-heap*) or larger (a *max-heap*). It answers one question fast: what is the smallest item right now? It is the usual way to implement a priority queue, where items arrive in any order and leave in priority order. J. W. J. Williams introduced it in 1964 as part of heapsort.

The trick is the layout. A binary heap is a complete tree, filled level by level, so it fits in a plain array with no pointers. The children of the element at index *i* sit at 2*i* + 1 and 2*i* + 2, and its parent at (*i* − 1) / 2. Contiguous storage keeps it friendly to the cache, a benefit of [[Locality of Reference]] that pointer-based trees lack.

The operations are short:

- **Peek** at the minimum: it is always the first element, in constant time.
- **Insert**: place the item at the end and swap it upward while it beats its parent.
- **Extract** the minimum: move the last element to the root and swap it downward with its smaller child until order is restored.

Insert and extract both take logarithmic time in [[Big-O Notation]], since the tree's height is logarithmic. Building a heap from n unsorted items takes only linear time with Robert Floyd's bottom-up method.

A heap is only partially ordered. Siblings and cousins can be in any order, so it cannot be searched quickly or iterated in sorted order. That looseness is the point: maintaining just enough order to find the top is far cheaper than keeping everything sorted.

Heaps sit inside many algorithms and systems:

- **Shortest paths.** [[Dijkstra's Algorithm]] repeatedly takes the closest unvisited node from a priority queue. A* search in [[Game AI]] pathfinding does the same.
- **Sorting.** Heapsort builds a heap and extracts repeatedly, sorting in place in n log n time with no worst case. See [[Sorting Algorithm]].
- **Timers and scheduling.** An [[Event Loop]] such as libuv keeps pending timers in a min-heap so the next one to fire is always at the top.
- **Top-k and merging.** Keeping the k largest items in a stream needs only a heap of size k, a common move in [[Stream Processing]]. Merging many sorted files, as in external sorting and the compaction of a [[Log-Structured Merge Tree]], uses a heap to pick the next smallest item across all inputs.
- **Compression.** Huffman coding in [[Data Compression]] repeatedly merges the two least frequent symbols, which a heap makes efficient, an instance of a [[Greedy Algorithm]].

The word "heap" also names the region of memory used for dynamic allocation. The two are unrelated; the overlap is a historical accident that confuses students every year.

## See also
- [[Self-Balancing Binary Search Tree]]
- [[Loop Invariant]]
- [[Process Priority]]
