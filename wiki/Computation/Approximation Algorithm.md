---
aliases:
  - Approximation ratio
  - Polynomial-time approximation scheme
tags:
  - computation
summary: An efficient algorithm for a hard optimization problem that comes with a proof that its answer is within a fixed factor of the best possible, trading exactness for speed while still bounding the worst case.
---
An **approximation algorithm** is a method for an optimization problem that runs efficiently and comes with a proof that its answer is within some factor of the best possible. Many important problems, such as finding the shortest route through a set of cities, the most valuable way to pack items, or the fewest colors needed for a map, are NP-hard: no known algorithm solves every instance exactly in polynomial time, and it's widely believed none exists; see [[P versus NP Problem]]. Approximation algorithms accept a worse answer for speed and a guarantee.

The guarantee is the **approximation ratio**. An algorithm for a minimization problem with ratio 2 always returns a solution costing at most twice the optimum, on every input, even though the optimum itself is unknown. The proofs typically find an easily computed lower bound on the optimum and show the answer is never far above it.

The traveling salesman problem is the classic example; see [[Traveling Salesman Problem]]. When distances obey the triangle inequality, a tour built by walking around a minimum spanning tree costs at most twice the optimum, because any tour with one edge removed is itself a spanning tree, so the tree can't cost more than the best tour; see [[Minimum Spanning Tree]]. Nicos Christofides improved the ratio to 1.5 in 1976 by adding a matching step, a bound that stayed the best known for over four decades. Without the triangle inequality, no constant ratio is possible at all unless P equals NP.

Some problems admit arbitrarily good approximations. The knapsack problem has a **polynomial-time approximation scheme**: for any chosen error, such as 1 percent, there's an efficient algorithm achieving it, though the running time grows as the error shrinks; see [[Knapsack Problem]]. Others are provably hard to approximate. Coloring a graph with close to the minimum number of colors is, in general, nearly as hard as coloring it optimally; see [[Graph Coloring]].

Common techniques include greedy choices, which pick the locally best option at each step; see [[Greedy Algorithm]]. Another approach solves a relaxed version of the problem with fractional answers allowed, which is easy, and then rounds the result to whole numbers carefully; see [[Linear Programming]]. Randomized versions make random choices and prove that the expected result is good; see [[Monte Carlo Method]].

Approximation algorithms differ from heuristics, which often find excellent answers in practice but promise nothing; see [[Simulated Annealing]]. The two are complementary. On real inputs a heuristic often beats the guaranteed bound by a wide margin, while the approximation algorithm ensures the worst case can't be a disaster.

The field formalizes an old idea about decision-making: when the best answer is too costly to find, a provably good-enough one may be the rational choice; see [[Satisficing]].

## See also
- [[Boolean Satisfiability Problem]]
- [[Big-O Notation]]
- [[Online Algorithm]]
