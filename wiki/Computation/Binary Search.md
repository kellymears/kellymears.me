---
aliases:
  - Bisection search
  - Binary chop
tags:
  - computation
summary: Finding a value in a sorted range by repeatedly discarding half of it.
---
**Binary search** locates a value in a sorted sequence by comparing against the middle element and discarding the half that cannot contain it, repeating until the range is empty. Each step halves the candidates, so the cost is logarithmic: forty comparisons suffice for a trillion elements — see [[Big-O Notation]].

The precondition is that the sequence is sorted by the same ordering the search compares with. No ordinary type system expresses this, since a sorted array and an unsorted one have the same type, so the invariant lives in an [[Assertion]] or nowhere. When it is violated the search does not crash; it reports "not found" for a value that is present, a textbook [[Silent Failure]]. Checking sortedness costs linear time and defeats the purpose, so the check belongs in a debug build — see [[Fail Fast]].

Boundaries are where implementations break. Whether the upper index is inclusive, whether the loop runs while low is less than or not greater than high, and whether the midpoint avoids overflow as low + (high − low) / 2 are independent choices. Each is correct alone; mixing them yields code that works on ordinary input and fails on the empty range, the single element, or a value at either end — exactly the cases a [[Unit Test]] should pin and usually does not ([[Branch Coverage]]).

**Lower bound** returns the first position not less than the target, **upper bound** the first strictly greater; together they give first and last occurrence, duplicate count, and insertion point — better derived from one careful lower bound than written as separate loops.

The halving generalises to any predicate that is false then true, which is why bisecting a history in [[Version Control]] finds the commit that introduced a [[Regression]].

## See also
- [[Big-O Notation]]
- [[Hash Table]]
- [[Assertion]]
- [[Unit Test]]
- [[Reproducible Case]]
