---
aliases:
  - Shortest path
  - Shortest path algorithm
  - Pathfinding
  - Priority queue
tags:
  - computation
summary: The classic method for finding the shortest paths through a weighted graph, expanding outward from the start in order of distance, and its goal-directed descendant A*.
---
**Dijkstra's algorithm** finds the shortest path from a starting point to every other point in a graph whose edges have non-negative costs, such as roads with lengths or network links with delays. Edsger Dijkstra designed it in 1956, reportedly in about twenty minutes while sitting at a café in Amsterdam with his fiancée, without pencil and paper, and published it in 1959. It remains one of the most widely used algorithms in computing.

The idea is to settle nodes in order of their distance from the start:

1. Give the start a distance of zero and every other node infinity.
2. Take the unsettled node with the smallest known distance. Its distance is now final.
3. For each of its neighbors, check whether going through this node is shorter than the best route known so far, and update it if so.
4. Repeat until every node is settled, or the destination is.

The greedy step is safe because costs are never negative. Once the closest unsettled node is chosen, no detour through farther nodes could make its route shorter. With negative costs, that reasoning fails, and the Bellman–Ford algorithm, a form of [[Dynamic Programming]], is needed instead.

Efficiency depends on finding the closest unsettled node quickly. A **priority queue**, usually a binary heap, does it in logarithmic time, giving a running time of roughly O((V + E) log V) for V nodes and E edges (see [[Big-O Notation]]). Without weights, the algorithm reduces to breadth-first [[Graph Traversal]].

**A*** search, developed in 1968 by Peter Hart, Nils Nilsson, and Bertram Raphael for the Shakey robot at the Stanford Research Institute, adds a heuristic: an estimate of the remaining distance to the goal, such as a straight line on a map. It explores nodes in order of known distance plus estimate, heading toward the goal instead of spreading in all directions. As long as the estimate never overstates the true distance, A* still finds the optimal path, often after examining far fewer nodes.

Applications are everywhere:

- **Network routing.** Link-state protocols such as OSPF run Dijkstra on each router's map of the network. Between networks, the policy-driven [[Border Gateway Protocol]] works differently. [[Mesh Network]] routing faces the same shortest-path problem.
- **Navigation.** Map apps start from these algorithms, with heavy precomputation so a query across a continent takes milliseconds.
- **Games.** A* moves units, enemies, and companions through levels in [[Game AI]], often over a simplified navigation mesh. [[Companion AI]] that gets stuck on scenery and [[Tower Defense]] enemies rerouting around new towers both expose pathfinding at work.

Shortest paths are easy, but small changes make problems much harder: the traveling salesman's shortest tour through every city is NP-hard (see [[P versus NP Problem]]).

## See also
- [[IP Routing]]
- [[Traveling Salesman Problem]]
- [[Dynamic Programming]]
- [[A-Star Search Algorithm]]
- [[Binary Heap]]
- [[Minimum Spanning Tree]]
