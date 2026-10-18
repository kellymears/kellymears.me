---
aliases:
  - Greedy algorithms
  - Hill climbing
  - Local optimum
  - Greedy choice
  - Greedy decoding
tags:
  - computation
summary: Solving a problem by always taking the choice that looks best right now, which is fast and sometimes provably optimal, and otherwise walks confidently into a dead end.
---
A **greedy algorithm** builds a solution step by step, always taking whichever option looks best at the moment and never reconsidering. It does not look ahead, and it does not undo. That makes greedy algorithms simple and fast. The interesting question is when they also happen to be right.

They are right when a problem has two properties. The *greedy choice property* says some optimal solution begins with the locally best choice. *Optimal substructure* says that after making it, what remains is a smaller instance of the same problem. When both hold, a greedy algorithm finds the true optimum. Classic examples:

- **Shortest paths.** [[Dijkstra's Algorithm]] repeatedly settles the closest unvisited node, which is safe as long as no edge has negative weight.
- **Minimum spanning trees.** Kruskal's algorithm adds the cheapest edge that does not form a cycle, checked with [[Union-Find]].
- **Huffman coding.** David Huffman's 1952 method for [[Data Compression]] repeatedly merges the two least frequent symbols, using a [[Binary Heap]], and provably produces the shortest prefix code.
- **Interval scheduling.** To fit the most non-overlapping meetings into a room, always pick the one that ends earliest.

When the properties fail, greedy algorithms can fail badly. Making change for 6 with coins of 1, 3, and 4, greedy picks 4, then 1, then 1, three coins, when 3 and 3 uses two. U.S. coins happen to be designed so greedy works; arbitrary denominations need [[Dynamic Programming]], which considers every way of reaching each subtotal instead of committing early.

For hard problems, greedy is often used as a deliberate approximation. Many problems sit in NP-hard territory, as described under [[P versus NP Problem]], and greedy heuristics give decent answers quickly. Greedy set cover is guaranteed within a logarithmic factor of optimal, and under standard assumptions nothing efficient does better. Nearest-neighbor tours for the traveling salesman problem are greedy, fast, and typically about 25 percent longer than the best tour.

**Hill climbing** is greedy search over a landscape of solutions: move to whichever neighbor scores higher until no neighbor does. It stops at a *local optimum*, a peak that is not the highest. Remedies include random restarts, simulated annealing, which sometimes accepts a worse move, and [[Backtracking]], which revisits earlier choices.

The same trade-off appears in language models. *Greedy decoding* always emits the single most likely next [[Token]], equivalent to a [[Temperature Sampling]] temperature of zero. It is deterministic but tends toward repetitive, bland text, because the most likely next word does not add up to the most likely or most interesting sentence.

Outside computing, greedy choices explain a lot of [[Path Dependence]]: each locally sensible decision narrows the next, until a system is stuck somewhere nobody would have chosen from the start.

## See also
- [[Dynamic Programming]]
- [[Divide and Conquer]]
- [[Overfitting]]
- [[Gradient Descent]]
- [[Test Parallelization]]
