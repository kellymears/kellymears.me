---
aliases:
  - Simplex algorithm
  - Integer programming
  - Linear optimization
tags:
  - computation
summary: Finding the best value of a linear objective subject to linear constraints, a method born in wartime planning that now schedules airlines, routes freight, and balances supply chains, and whose integer version is NP-hard.
---
**Linear programming** is the problem of maximizing or minimizing a linear objective, such as profit or cost, subject to linear constraints, such as limits on materials, hours, or capacity. "Programming" here means planning, in the old military sense of a schedule, not writing code.

A small example: a bakery makes bread and cakes. Each uses known amounts of flour, oven time, and labor, each of which is limited, and each earns a known profit. How many of each maximizes profit? Every constraint is an inequality, and the objective is a sum of quantities times prices.

Leonid Kantorovich developed the idea in the Soviet Union in 1939 while optimizing plywood production, but his work was little noticed. George Dantzig independently formulated the general problem in 1947 while planning for the US Air Force and invented the **simplex algorithm** to solve it. Kantorovich and Tjalling Koopmans shared the 1975 Nobel Prize in economics for applying it to allocating resources.

Geometrically, the constraints define a region of allowed solutions shaped like a many-sided gem, and because the objective is linear, the best point is always at a corner. The simplex algorithm starts at one corner and walks along edges to neighboring corners, each better than the last, until none improves. In practice it is very fast. In 1972 Victor Klee and George Minty built cases where it visits exponentially many corners, but such cases essentially never arise in real problems; see [[Big-O Notation]]. In 1979 Leonid Khachiyan showed the problem can always be solved in polynomial time, and in 1984 Narendra Karmarkar's **interior-point method**, which cuts through the middle of the region rather than along its surface, made that guarantee practical.

Every linear program has a **dual**, a mirror problem whose solution assigns a price to each constraint: how much the objective would improve if that resource were slightly more available. These shadow prices tell a manager which bottleneck is worth paying to relieve; see [[Opportunity Cost]]. John von Neumann noticed that duality is closely tied to two-player zero-sum games, which can be solved as linear programs; see [[Prisoner's Dilemma]].

Many real problems need whole-number answers: you can't schedule half a flight. **Integer programming** adds that requirement and becomes NP-hard; see [[P versus NP Problem]]. Solvers handle it with branch and bound, solving relaxed linear versions to prune a search tree; see [[Backtracking]]. Shortest paths, matchings, and network flows are special cases with fast dedicated algorithms; see [[Dijkstra's Algorithm]] and [[Stable Matching]].

Applications include airline crew scheduling, freight routing, refinery blending, and the classic diet problem of meeting nutritional needs at the lowest cost. Hard combinatorial problems are often attacked by combining integer programming with heuristics; see [[Traveling Salesman Problem]], [[Simulated Annealing]], and [[Boolean Satisfiability Problem]].

## See also
- [[Newton's Method]]
- [[Gradient Descent]]
- [[Transformation Matrix]]
- [[Convex Hull]]
- [[Maximum Flow]]
