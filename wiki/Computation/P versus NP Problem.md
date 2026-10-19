---
aliases:
  - P vs NP
  - P = NP
  - NP-complete
  - NP-completeness
  - NP-hard
  - Computational complexity
tags:
  - computation
summary: The open question of whether every problem whose answer is quick to check is also quick to solve, the most important unsolved problem in computer science.
---
**P versus NP** asks whether every problem whose solution can be *checked* quickly can also be *solved* quickly. "Quickly" means in polynomial time, where the running time grows as some fixed power of the input size, as described by [[Big-O Notation]]. *P* is the class of problems solvable in polynomial time. *NP* is the class whose proposed solutions can be verified in polynomial time. Every problem in P is in NP. The question is whether the reverse holds. It is one of the seven Millennium Prize Problems, with a million-dollar reward offered since 2000, and it remains open.

Sudoku shows the asymmetry. Checking a filled grid is easy: scan each row, column, and box. Finding a solution for a generalized n×n grid may require trying an enormous number of possibilities. Most problems people want to solve have this shape. Verifying is cheap. Searching is expensive.

In 1971 Stephen Cook showed that one problem, Boolean satisfiability (SAT), is as hard as anything in NP: any NP problem can be translated into SAT efficiently. Leonid Levin found the same result independently. Richard Karp then showed in 1972 that 21 other common problems share this property. These are called **NP-complete**, and thousands are now known: the decision version of the traveling salesman problem, graph coloring, scheduling, packing, and generalized versions of Sudoku, Tetris, and Minesweeper. If any one of them could be solved in polynomial time, all of them could, and P would equal NP. Problems at least that hard, but not necessarily in NP themselves, are called *NP-hard*.

Most researchers believe P ≠ NP, but nobody has proven it. The stakes are practical. Much of cryptography assumes some problems are hard to solve but easy to check. [[Public-Key Cryptography]] depends on problems like factoring, which isn't known to be NP-complete but would fall if P = NP. Optimization, logistics, and drug design would be transformed in the other direction.

NP-completeness is a statement about worst cases, not a ban on solving real instances:

- **SAT solvers** routinely handle industrial problems with millions of variables, verifying hardware and resolving dependencies. Choosing package versions that satisfy every constraint is NP-complete, and some [[Package Manager]] tools embed SAT solvers to do it.
- **Approximation and heuristics** find good-enough answers fast, and [[Constraint Propagation]] prunes a search before brute force is needed.
- **Pseudo-polynomial algorithms** such as [[Dynamic Programming]] solve problems like knapsack efficiently when the numbers involved are small.

Small changes can cross the line. Finding the shortest path in a graph is easy, solved by [[Dijkstra's Algorithm]], while finding the longest simple path is NP-hard. Matching text against a [[Regular Expression]] is fast, but adding backreferences makes it NP-complete.

## See also
- [[Stable Matching]]
- [[Approximation Algorithm]]
- [[Traveling Salesman Problem]]
- [[Integer Factorization]]
- [[Prime Number]]
- [[Boolean Satisfiability Problem]]
- [[Knapsack Problem]]
- [[Zero-Knowledge Proof]]
