---
aliases:
  - B+Tree
tags:
  - computation
summary: A self-balancing tree with many children per node, designed to minimize the number of disk reads a lookup costs.
---
**B-Tree** is a self-balancing tree where each node holds many sorted keys and many children — not the two of a binary tree, but often hundreds — chosen specifically to minimize how many nodes a lookup, insert, or range scan has to visit. The design target isn't fewer comparisons, it's fewer disk (or SSD page) reads: a node is sized to fill exactly one storage page, so descending from root to leaf costs one I/O per level, and a high branching factor keeps the tree shallow — a B-tree over a billion rows is typically three or four levels deep, versus roughly thirty for a balanced binary tree over the same data.

This is why a B-tree, not a binary search tree, is the default index structure in essentially every relational database (Postgres, MySQL's InnoDB, SQLite) and filesystem — the bottleneck being optimized against is disk latency, not CPU comparisons, and a binary tree's extra depth translates directly into extra seeks. The B+tree variant, which most databases actually use, keeps all the data in the leaf nodes and chains the leaves together in a linked list, so a range scan (`WHERE id BETWEEN 100 AND 200`) walks sideways along the leaf level after one descent, rather than re-descending the tree for each value in range.

The self-balancing part matters as much as the fan-out: an insert that overflows a node's capacity splits it and promotes a key upward, keeping every leaf at the same depth no matter the insertion order — unlike an unbalanced binary search tree, which degrades to a linked list (and linear lookup) on already-sorted input. [[Big-O Notation]] states this as O(log n) with a very large base for the logarithm, which is the whole point: the same asymptotic class as a binary tree, but with a constant factor small enough that "logarithmic" means single digits of disk reads even at enormous scale.

## See also
- [[Hash Table]]
- [[Trie]]
- [[Write-Ahead Logging]]
- [[Big-O Notation]]
