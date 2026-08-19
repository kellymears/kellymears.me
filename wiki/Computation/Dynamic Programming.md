---
aliases:
  - DP
tags:
  - computation
summary: Solving a problem by solving each distinct overlapping subproblem exactly once and reusing the results.
---
**Dynamic Programming** solves a problem that decomposes into overlapping subproblems by solving each distinct subproblem exactly once, storing the result, and reusing it every subsequent time that same subproblem recurs — rather than recomputing it from scratch each time it comes up, as naive [[Recursion]] would. The "overlapping" part is the whole point: a divide-and-conquer algorithm like merge sort also recurses into subproblems, but its subproblems never repeat, so there's nothing to cache and DP wouldn't help it.

There are two equivalent ways to organize the same computation. Top-down starts from the original problem, recurses down, and [[Memoization]]s each subproblem's result the first time it's computed — the code looks like ordinary recursion with a cache bolted on. Bottom-up builds a table starting from the smallest subproblems (the base cases) and works upward, filling in each entry from ones already computed, with no recursion at all — the code looks like a loop filling an array. Both compute identical results; the choice is usually about which is easier to write correctly for the recurrence at hand, and bottom-up sometimes uses less memory since it can discard rows of the table it no longer needs.

Two properties are required for a problem to be a DP candidate at all: optimal substructure (an optimal solution to the whole problem is built from optimal solutions to its subproblems — not true of every combinatorial problem) and overlapping subproblems (the same subproblem recurs, rather than each recursive call being distinct). Edit distance, the knapsack problem, and longest common subsequence are the standard teaching examples, each with a recurrence relation that a table fills in directly.

The common mistake is reaching for DP on a problem that only has optimal substructure but no overlap — the memoization table then never gets a cache hit, and the "optimization" is pure overhead over plain recursion.

## See also
- [[Recursion]]
- [[Memoization]]
- [[Big-O Notation]]
- [[Amortized Analysis]]
