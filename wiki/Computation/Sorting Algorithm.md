---
aliases:
  - Sorting
  - Quicksort
  - Merge sort
  - Stable sort
  - Timsort
  - Comparison sort
tags:
  - computation
summary: Procedures for putting items in order, a proving ground for algorithm design where the trade-offs among speed, memory, and stability show up clearly.
---
A **sorting algorithm** puts a collection of items in order. Sorting is among the most studied problems in computing, partly because it's everywhere, from displaying search results to preparing data for a [[Binary Search]] or merge, and partly because it shows the trade-offs of algorithm design so clearly.

Simple algorithms such as insertion sort and bubble sort compare neighboring items and swap them. They take time proportional to the square of the input size, written O(n²) in [[Big-O Notation]], which is fine for a few dozen items and hopeless for a million. Faster algorithms split the problem:

- **Merge sort.** Split the list in half, sort each half with [[Recursion]], then merge the two sorted halves. It always takes O(n log n) time but needs extra memory for merging.
- **Quicksort.** Pick a *pivot*, move smaller items before it and larger ones after, then sort each side. Tony Hoare invented it in 1959. It sorts in place and is usually the fastest in practice, but a bad pivot choice, such as always picking the first item of an already sorted list, degrades it to O(n²).
- **Heapsort.** Builds a heap, a tree that keeps the largest item on top, and repeatedly removes the top. It guarantees O(n log n) with no extra memory but is often slower in practice because it jumps around in memory, defeating [[Locality of Reference]].

There's a hard limit. Any sort that works only by comparing pairs needs at least about n log₂ n comparisons in the worst case, since there are n! possible orderings and each comparison at best halves the possibilities. Sorts that don't compare can beat this for special data: counting sort and radix sort order integers or fixed-length keys in linear time by looking at their digits.

**Stability** is a subtle but important property. A stable sort keeps items with equal keys in their original order. Sort a list of people by city, and a stable sort keeps them in, say, alphabetical order within each city if they were alphabetical before. This lets sorts be chained, sorting by secondary key first and primary key second. Merge sort is stable; quicksort and heapsort usually aren't.

Real libraries use hybrids. **Timsort**, written by Tim Peters for Python in 2002 and later adopted by Java and others, finds runs of items already in order and merges them, so nearly sorted data, which is common in practice, sorts in close to linear time.

Sorting at scale shapes databases too. A [[B-Tree]] keeps data sorted as it changes, so a [[Database Index]] can answer range queries without sorting at all, and [[Columnar Storage]] often sorts data to compress it better. Ordering by dependencies rather than values is a different problem, the [[Topological Sort]].

## See also
- [[Big-O Notation]]
- [[Binary Search]]
- [[Recursion]]
- [[Topological Sort]]
