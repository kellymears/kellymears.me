---
aliases:
  - Inverse Ackermann function
  - Primitive recursive function
tags:
  - computation
summary: A simple recursive function that grows faster than any function computable with bounded loops, proving that some computations need unrestricted recursion, and whose inverse is the nearly constant cost in union-find.
---
The **Ackermann function** is a short recursive definition whose values grow almost unimaginably fast. Wilhelm Ackermann, a student of David Hilbert, published it in 1928 to settle a question about what can be computed. The version usually taught, a simplification by Rózsa Péter and Raphael Robinson, takes two whole numbers m and n:

- If m is 0, the answer is n + 1.
- If n is 0, the answer is A(m − 1, 1).
- Otherwise, it is A(m − 1, A(m, n − 1)).

Each level iterates the one below. With m = 1 the function adds, with m = 2 it roughly doubles, with m = 3 it raises 2 to a power, and with m = 4 it builds towers of exponents. A(4, 1) is 65,533. A(4, 2) is 2^65536 − 3, a number with 19,729 digits, and A(4, 3) has too many digits to write down in the observable universe; see [[Arbitrary-Precision Arithmetic]].

The point was a distinction between kinds of computation. A **primitive recursive** function can be computed using only loops whose number of repetitions is fixed before the loop starts, like a for-loop over a known range. Most everyday functions are of this kind, from addition to sorting. Ackermann's function always finishes and always gives an answer, but it grows faster than any primitive recursive function, so no program built from bounded loops alone can compute it. It needs recursion whose depth isn't known in advance, or an equivalent unbounded loop; see [[Recursion]] and [[Turing Completeness]]. Its existence showed that "computable" is a larger class than the bounded-loop functions, a step toward the theory that Turing and Church completed in the 1930s; see [[Lambda Calculus]].

Programmers know it as a stress test. A naive implementation makes an enormous number of nested calls and exhausts the call stack even for small inputs, so it has long been used to benchmark how compilers handle recursion; see [[Call Stack]] and [[Tail Call Optimization]]. Caching earlier results helps only a little; see [[Memoization]].

Its inverse matters more in practice. The **inverse Ackermann function**, written α(n), grows as slowly as the original grows fast: it is at most 4 for any n that could ever be stored in a computer. In 1975 Robert Tarjan showed that the union-find data structure, with two standard optimizations, takes time proportional to α(n) per operation, effectively constant but provably not quite; see [[Union-Find]] and [[Amortized Analysis]]. The same function appears in the best known bound for computing minimum spanning trees; see [[Minimum Spanning Tree]] and [[Big-O Notation]].

Functions like this show how quickly simple rules escape intuition. Tiny inputs produce values beyond anything physical, and whether an arbitrary program finishes at all is undecidable in general; see [[Halting Problem]].

## See also
- [[Collatz Conjecture]]
- [[Structured Programming]]
