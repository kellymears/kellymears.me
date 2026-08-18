---
aliases:
  - Recursive function
tags:
  - computation
summary: A function defined in terms of itself, solving a problem by solving smaller instances of the same problem.
---
**Recursion** defines a function in terms of a smaller call to itself, plus a base case that stops the descent. `factorial(n) = n * factorial(n - 1)`, with `factorial(0) = 1` as the base case, is the canonical shape: every recursive definition needs exactly this pair — a case that doesn't recurse, and a case that does but moves strictly closer to one that doesn't — or it never terminates.

Recursion is the natural fit for anything with a recursive shape in the data itself: a tree, where each subtree is itself a tree; a nested JSON value, where each value can contain more values of the same kind; a [[Trie]], defined as nodes whose children are tries. Writing a tree traversal iteratively usually means manually managing a stack to remember where to come back to — recursion gets that stack for free from the call stack the language already maintains, which is both its convenience and its risk, since an unbounded or miscounted recursion overflows that same stack.

[[Tail Call Optimization]] is the escape hatch for the stack-overflow risk, when a language actually performs it: a tail-recursive function's frames get reused rather than piled up, turning the recursion into constant stack space. Where TCO isn't guaranteed, deeply recursive algorithms are rewritten iteratively, or the recursion depth is bounded so it never approaches the stack limit in practice.

[[Memoization]] and recursion are frequent partners: naive recursive Fibonacci recomputes the same subproblems exponentially many times (`fib(5)` calls `fib(3)` twice, `fib(2)` three times, and so on), and caching each `fib(n)` the first time it's computed turns the same recursive structure into linear work — the technique generalizes to [[Dynamic Programming]], which is recursion with memoization (or its iterative, bottom-up equivalent) applied systematically to problems with overlapping subproblems.

## See also
- [[Tail Call Optimization]]
- [[Memoization]]
- [[Dynamic Programming]]
- [[Trie]]
- [[Finite State Machine]]
