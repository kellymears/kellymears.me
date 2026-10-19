---
aliases:
  - MST
  - Kruskal's algorithm
  - Prim's algorithm
tags:
  - computation
summary: The cheapest set of edges that connects every node in a weighted graph without cycles, found by simple greedy algorithms, with uses from network design to clustering and maze generation.
---
A **minimum spanning tree** (MST) of a weighted, connected graph is a subset of its edges that connects every node, contains no cycles, and has the smallest possible total weight. If the nodes are towns and the edge weights are the cost of laying cable between them, the MST is the cheapest network that connects every town.

The problem was first solved in 1926 by Otakar Borůvka, who was asked to design an efficient electrical network for Moravia. It is one of the rare optimization problems where a [[Greedy Algorithm]], always taking the locally best choice, provably gives the global optimum. The reason is the **cut property**: for any division of the nodes into two groups, the cheapest edge crossing between them belongs to some minimum spanning tree.

Two classic algorithms build on that:

- **Kruskal's algorithm** (1956) sorts all edges by weight and adds them cheapest first, skipping any edge that would create a cycle. Checking for cycles efficiently uses [[Union-Find]], which tracks which nodes are already connected. Its cost is dominated by the sort; see [[Sorting Algorithm]].
- **Prim's algorithm** (published 1957, discovered earlier by Vojtěch Jarník) grows a single tree from a starting node, repeatedly adding the cheapest edge that reaches a new node. With a priority queue it runs much like [[Dijkstra's Algorithm]]; see [[Binary Heap]].

Kruskal suits sparse graphs given as edge lists; Prim suits dense graphs. Both run in near-linear time in the number of edges; see [[Big-O Notation]].

The MST shows up in many places:

- **Network design.** Cheapest layouts for cables, pipes, and roads, as in Borůvka's original problem. Real designs add redundancy.
- **Clustering.** Building an MST and removing its heaviest edges splits the data into groups of nearby points, a method known as single-linkage clustering.
- **Approximation.** For the [[Traveling Salesman Problem]] with ordinary distances, walking around an MST gives a tour at most twice the optimal length, and smarter methods built on it get within 50%.
- **Maze generation.** Running Kruskal's or Prim's algorithm on a grid with random weights produces a perfect maze, with exactly one path between any two cells; see [[Procedural Generation]].
- **Image segmentation.** Treating pixels as nodes and color differences as weights, MST-based methods group similar regions.

An MST is not the same as a shortest-path tree. The MST minimizes total edge weight; a shortest-path tree minimizes the distance from one root to every node. A road network optimized for total length can still make some trips long; see [[Graph Traversal]].

The problem is a good example of how structure makes a problem easy. Small changes, such as requiring each node to have limited connections, or connecting only a chosen subset of nodes, make it NP-hard; see [[P versus NP Problem]].

## See also
- [[Amortized Analysis]]
- [[Approximation Algorithm]]
- [[Ackermann Function]]
- [[Maximum Flow]]
