---
aliases:
  - Loop invariants
  - Weakest precondition
tags:
  - testing
summary: A statement that is true before a loop starts and stays true after every pass through it, the main tool for reasoning that a loop does what it should, and the reason binary search is easy to describe and hard to get right.
---
A **loop invariant** is a condition that holds before a loop begins and remains true after every iteration. Combined with the condition that ends the loop, it tells you what must be true when the loop finishes. It is the main tool for reasoning about loops.

Proving a loop correct with an invariant takes three steps, much like a proof by induction; see [[Recursion]]:

1. **Initialization.** The invariant is true before the first iteration.
2. **Maintenance.** If it's true at the start of an iteration, it's still true at the end.
3. **Termination.** When the loop stops, the invariant plus the exit condition imply the desired result.

A separate argument shows the loop stops at all, usually by finding a quantity that shrinks every iteration and can't go below zero; see [[Halting Problem]] for why no general method exists.

Take a loop that sums an array. The invariant is "`total` equals the sum of the elements before index `i`." It holds at the start, when both are zero. Each pass adds one element and moves `i` forward, so it stays true. When `i` reaches the end, `total` is the sum of everything.

[[Binary Search]] shows why this matters. Its invariant is "if the target is present, it lies between `low` and `high`." Most binary search bugs come from code that breaks it: updating a bound to `mid` instead of `mid + 1`, which loops forever, or using the wrong comparison and skipping the target; see [[Boundary Value Analysis]]. Even widely used library code had a bug for years in which computing `(low + high) / 2` overflowed on very large arrays; see [[Integer Overflow]]. [[Sorting Algorithm]]s and [[Binary Heap]] operations have invariants of the same kind, such as "everything left of `i` is sorted."

The idea comes from the program-proof methods of Robert Floyd and C. A. R. Hoare in the 1960s. Edsger Dijkstra went further, arguing that programmers should choose the invariant first and derive the loop from it. His **weakest precondition** method computes, working backward from a desired result, the least that must be true beforehand; see [[Formal Verification]] and [[Design by Contract]].

Verification tools can check invariants automatically, but they usually can't invent them: a person must write them down, and that remains the hardest part of verifying programs. Some analyzers infer simple invariants, such as numeric ranges, at the cost of precision; see [[Abstract Interpretation]].

In everyday code, invariants are useful even unproven. Writing one as a comment clarifies what a loop does, and checking it with an [[Assertion]] catches violations during testing. [[Property-Based Testing]] can check the same claims over many random inputs. Explaining a loop aloud, invariant included, is a reliable way to find the off-by-one mistake; see [[Rubber Duck Debugging]].

## See also
- [[Zune Leap Year Bug]]
- [[Structured Programming]]
