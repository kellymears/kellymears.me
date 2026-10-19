---
aliases:
  - Chromatic number
  - Four color theorem
  - Register allocation
tags:
  - computation
summary: Assigning colors to a graph's nodes so that no two connected nodes share one, a hard problem in general that underlies register allocation, scheduling, Sudoku, and the famous four color theorem.
---
**Graph coloring** assigns a color to each node of a graph so that no two nodes joined by an edge share a color. The smallest number of colors that works is the graph's **chromatic number**. Colors are just labels; what matters is that neighbors differ.

The problem began with maps. In 1852, Francis Guthrie noticed that four colors seemed enough to color any map so that neighboring regions differ. Turning regions into nodes and shared borders into edges makes this a graph question. The **four color theorem** resisted proof for over a century until Kenneth Appel and Wolfgang Haken proved it in 1976 by reducing it to nearly two thousand configurations checked by computer. It was the first major theorem proved with essential computer help, and many mathematicians were uneasy about a proof no person could check by hand. In 2005, a version was verified in a proof assistant, settling doubts about the computer work; see [[Formal Verification]].

For general graphs, coloring is hard:

- **Two colors** are easy. A graph is 2-colorable exactly when it has no odd cycles, which a simple traversal can check; see [[Graph Traversal]].
- **Three colors** is already NP-complete: no known efficient algorithm decides whether an arbitrary graph can be 3-colored; see [[P versus NP Problem]].
- Even approximating the chromatic number closely is believed to be hard.

In practice, heuristics work well. **Greedy coloring** visits nodes in some order and gives each the lowest color not used by its neighbors. The order matters a lot, and good orderings, such as coloring the most constrained nodes first, often come close to optimal; see [[Greedy Algorithm]]. Exact methods use [[Backtracking]] with pruning, and large instances use local search; see [[Simulated Annealing]].

Many problems are coloring in disguise:

- **Register allocation.** A [[Compiler]] must assign a program's many variables to a processor's few registers. Variables that are in use at the same time conflict, forming an interference graph; coloring it with as many colors as there are registers gives an assignment. When it can't be colored, some variables "spill" to slower memory.
- **Scheduling.** Exams that share students can't be held at the same time. Coloring a conflict graph assigns time slots.
- **Frequency assignment.** Nearby radio transmitters need different frequencies to avoid interference.
- **Sudoku.** Each cell is a node, cells in the same row, column, or box are connected, and the digits are nine colors; see [[Constraint Propagation]].

Graph coloring shows a common pattern in computing: a problem that's intractable in the worst case can be routinely solved in practice, because real instances have structure that heuristics exploit; see [[Traveling Salesman Problem]].

## See also
- [[Wave Function Collapse]]
- [[Graph Neural Network]]
- [[Union-Find]]
- [[Stack Machine]]
- [[Maximum Flow]]
- [[Seven Bridges of Königsberg]]
