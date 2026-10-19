---
aliases:
  - Binary search tree
  - BST
  - Red-black tree
  - AVL tree
  - Tree rotation
tags:
  - computation
summary: Binary trees that keep themselves short by rearranging nodes after each change, so lookups, inserts, and ordered scans all stay logarithmic regardless of insertion order.
---
A **binary search tree** stores sorted data in nodes, each with up to two children: everything in the left subtree is smaller than the node, everything in the right is larger. Finding a value means starting at the root and going left or right at each step, the same halving as [[Binary Search]], but on a structure that also supports fast inserts and deletes. Walking the tree in order visits every element sorted, which is what a [[Hash Table]] can't offer.

The weakness is shape. Insert values in already-sorted order and each new node becomes the right child of the last, producing a tree that is really a [[Linked List]], with searches taking linear time. Real data is often sorted or nearly so, so a plain binary search tree is a trap.

**Self-balancing** trees fix this by checking their shape after every change and repairing it with *rotations*: local rearrangements of a node, its child, and their subtrees that preserve the ordering while shifting height from one side to the other. A rotation touches a constant number of pointers, so rebalancing costs little, and the tree's height stays proportional to the logarithm of its size, keeping every operation O(log n) in the worst case.

The two classic variants differ in how strict they are:

- **AVL trees**, from Georgy Adelson-Velsky and Evgenii Landis in 1962, require the heights of every node's two subtrees to differ by at most one. They are tightly balanced, so lookups are fast, but inserts trigger more rotations.
- **Red-black trees** color each node red or black and enforce rules, chiefly that no red node has a red child and every path to a leaf passes the same number of black nodes. The longest path is at most twice the shortest. Balance is looser, but updates are cheaper. Rudolf Bayer described the idea in 1972, and Leonidas Guibas and Robert Sedgewick gave it its colors in 1978. A red-black tree is equivalent to a small [[B-Tree]] with up to four children per node, encoded in binary form.

Red-black trees are the workhorse. They sit behind ordered maps in many language standard libraries and appear in many places in operating system kernels, including process scheduling. Variants trade differently: *splay trees* move each accessed node to the root, so frequently used items get faster, and *treaps* use random priorities, much as a [[Skip List]] uses random heights.

Balanced binary trees lose to B-trees on disk and often in memory, because each node visit is a pointer chase to a new location, hurting [[Locality of Reference]]. Functional languages favor them anyway: with [[Immutability]], an update copies only the path from root to the changed node, sharing the rest, which makes them a natural [[Persistent Data Structure]].

## See also
- [[Binary Heap]]
- [[Trie]]
- [[Iterator]]
- [[Database Index]]
- [[Text Buffer]]
