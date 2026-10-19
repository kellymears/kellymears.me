---
aliases:
  - Fenwick tree
  - Summed-area table
  - Prefix scan
tags:
  - computation
summary: The running total of a sequence, computed once so that the sum of any range becomes a single subtraction, a small idea that powers parallel GPU algorithms, image filters, and data structures for changing data.
---
**A prefix sum** of a sequence is the list of its running totals. For the numbers 3, 1, 4, 1, 5, the prefix sums are 3, 4, 8, 9, 14. Once those are computed, the sum of any contiguous range is the difference of two entries. The sum of the second through fourth numbers is 9 minus 3, or 6, no matter how long the range is.

That trade, one pass of preparation for constant-time answers later, appears throughout computing. Running totals in spreadsheets and database queries are prefix sums; see [[Spreadsheet]] and [[Window Function]]. Cumulative distributions in statistics, and positions computed from lengths in text layout, are the same operation.

The idea extends to two dimensions. A **summed-area table** stores, for each pixel, the sum of all pixels above and to its left. The sum over any rectangle then takes four lookups. Franklin Crow introduced it for texture filtering in 1984; see [[Texture Mapping]] and [[Mipmapping]]. The Viola-Jones face detector, published in 2001, used the same structure, under the name integral image, to evaluate thousands of rectangular features quickly; see [[Object Detection]]. Box blurs of any size cost the same with it; see [[Convolution]].

Prefix sums also handle changing data. Recomputing totals after every update is slow. A **Fenwick tree**, described by Peter Fenwick in 1994, stores partial sums arranged by the binary representation of each index. Both updating a value and querying a prefix take time proportional to the logarithm of the length. The navigation uses a bit trick that isolates the lowest set bit of an index; see [[Bitwise Operation]] and [[Binary Number]]. Segment trees generalize the approach to other operations such as minimum and maximum.

In parallel computing, prefix sum is known as **scan**, and it's a fundamental building block. It looks inherently sequential, since each total depends on the one before, but it can be computed in logarithmic depth by combining pairs, then pairs of pairs, and propagating results back. Guy Blelloch's work around 1990 showed how many algorithms reduce to scans. On graphics processors, scans let thousands of threads cooperate to compact arrays, allocate output positions, and sort; see [[Graphics Processing Unit]] and [[SIMD]]. The same pattern runs on multicore processors and across clusters. Parallel radix sort, for example, uses a scan to decide where each element goes; see [[Radix Sort]].

The operation works for any associative combination, not just addition. Multiplication, maximum, and more complex operations can be scanned the same way, which is part of why the pattern appears in data processing frameworks; see [[MapReduce]].

Prefix sums are a common first example of precomputation in algorithm courses, and many interview problems hide one; see [[Dynamic Programming]].

## See also
- [[Amortized Analysis]]
- [[Fold]]
