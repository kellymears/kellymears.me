---
aliases:
  - Skiplist
  - Skip lists
tags:
  - computation
summary: A sorted linked list with randomly chosen express lanes stacked above it, giving the fast search of a balanced tree with far simpler code.
---
A **skip list** is a sorted [[Linked List]] with extra layers of shortcuts. The bottom layer holds every element in order. Above it, a sparser list holds about half the elements, and above that one about a quarter, and so on, like express lanes skipping local stops. To search, start at the top layer and move right until the next element would overshoot, then drop down a layer and repeat. Each layer halves the remaining distance, so a search takes O(log n) steps on average, comparable to [[Binary Search]] over an array.

William Pugh introduced the structure in 1990 as "a probabilistic alternative to balanced trees." The key trick is how elements get their height. A [[Self-Balancing Binary Search Tree]] keeps its shape by rotating nodes after inserts and deletes, logic that is famously fiddly to get right. A skip list instead flips a coin. Each new element goes in the bottom layer; with probability one half it also goes in the next layer up, with probability one quarter the one above that, and so on. No rebalancing ever happens. The random heights produce good structure on average, regardless of the order elements arrive in, so a skip list never degrades on sorted input the way a naive tree does.

That randomness changes the nature of the guarantee. A balanced tree promises O(log n) in the worst case; a skip list promises it in *expectation*, with the probability of a badly slow search shrinking rapidly as lists grow. An adversary who could predict the coin flips could force a bad shape, which is why implementations use a decent [[Pseudorandom Number Generator]] and keep its state private. The analysis is a cousin of [[Big-O Notation]] for average rather than worst cases.

Skip lists show up where simplicity and concurrency matter:

- **Redis** uses them for sorted sets, which support range queries and rank lookups that a [[Hash Table]] can't.
- **LevelDB and RocksDB** hold recent writes in an in-memory skip list, the *memtable*, before flushing them to disk as a [[Log-Structured Merge Tree]].
- **Concurrent maps** in Java and other languages use skip lists because inserting touches only a few neighboring pointers, which makes them well suited to [[Lock-Free Data Structure|lock-free]] updates. Trees need rotations that reach across large parts of the structure, which are hard to make safe without locks.

There are costs. Each node carries a variable number of forward pointers, averaging two, so skip lists use more memory than arrays. Following pointers scattered across memory also defeats [[Locality of Reference]], so a cache-friendly [[B-Tree]] usually beats both skip lists and binary trees for large data on real hardware.

## See also
- [[Iterator]]
- [[Persistent Data Structure]]
- [[Bloom Filter]]
- [[Database Index]]
- [[Approximate Nearest Neighbor Search]]
