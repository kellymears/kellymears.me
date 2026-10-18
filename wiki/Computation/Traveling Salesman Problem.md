---
aliases:
  - TSP
  - Combinatorial optimization
  - Combinatorial explosion
  - Vehicle routing problem
tags:
  - computation
summary: Finding the shortest route that visits every city once, the classic NP-hard problem whose exact solution explodes combinatorially but whose near-optimal solutions are found routinely.
---
The **traveling salesman problem** asks for the shortest route that visits every city in a list exactly once and returns to the start. It's easy to state and famously hard to solve exactly. It became the standard example of **combinatorial optimization**, choosing the best among a finite but astronomically large set of possibilities.

The difficulty is **combinatorial explosion**. With *n* cities there are (*n* − 1)!/2 distinct tours. Ten cities give 181,440; twenty give about 6 × 10^16; sixty give more tours than there are atoms in the observable universe. Checking every tour is hopeless beyond a few dozen cities, and the decision version of the problem is NP-complete, meaning no known algorithm solves every instance in polynomial time; see [[P versus NP Problem]]. A [[Dynamic Programming]] algorithm by Held and Karp, from 1962, cuts the work to roughly *n*² × 2^*n*, still exponential but far better than brute force.

Yet practical instances are solved routinely, using several strategies:

- **Exact methods.** Branch and bound and cutting-plane methods prune huge parts of the search space by proving they can't contain the optimum, a refined form of [[Backtracking]]. The Concorde solver has proved optimal tours for instances with tens of thousands of cities, including one of 85,900 points from a chip layout.
- **Heuristics.** The nearest-neighbor rule, always visiting the closest unvisited city, is a [[Greedy Algorithm]] that typically lands within about 25 percent of optimal. Local improvements such as 2-opt, which removes two edges and reconnects the route if that's shorter, and the Lin-Kernighan heuristic usually get within a few percent.
- **Metaheuristics.** [[Simulated Annealing]], genetic algorithms, and ant colony optimization explore widely before settling, escaping the local optima that trap simple improvement.
- **Approximation guarantees.** For distances that obey the triangle inequality, Nicos Christofides's 1976 algorithm guarantees a tour at most 1.5 times optimal, a bound only slightly improved in 2020.

The problem appears in many guises: delivery and vehicle routing, the order a drill visits holes on a circuit board, scheduling, and genome sequencing. Real routing adds constraints such as time windows, capacities, and traffic, making it harder still, so logistics companies combine heuristics with exact methods on subproblems.

The traveling salesman problem illustrates a broader lesson: worst-case hardness doesn't mean practical hopelessness. Real instances have structure that good algorithms exploit, and a solution within 1 percent of optimal found in seconds is usually better than a perfect one found in a week. The same holds for SAT solvers and other NP-hard problems; [[Big-O Notation]] describes the worst case, not the typical one.

It's related to, but much harder than, finding the shortest path between two points, which [[Dijkstra's Algorithm]] solves efficiently, and to finding a [[Stable Matching]], another combinatorial problem with an elegant exact solution.

## See also
- [[Minimum Spanning Tree]]
- [[Divide and Conquer]]
- [[Monte Carlo Method]]
