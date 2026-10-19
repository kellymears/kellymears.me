---
aliases:
  - A*
  - A* search
  - Admissible heuristic
  - Heuristic search
tags:
  - computation
summary: The shortest-path algorithm that guides Dijkstra's search with an estimate of the remaining distance, finding optimal paths far faster when the estimate is good, and the workhorse of game pathfinding.
---
**A\*** (pronounced "A star") is an algorithm for finding the shortest path between two points in a graph. It extends [[Dijkstra's Algorithm]] with a **heuristic**, an estimate of how far each node is from the goal, so the search heads toward the destination instead of spreading evenly in every direction. It was published in 1968 by Peter Hart, Nils Nilsson, and Bertram Raphael, who developed it for Shakey, an early mobile robot at the Stanford Research Institute.

A\* scores every node it considers by adding two numbers:

- **g(n)**, the known cost of the best path found so far from the start to that node.
- **h(n)**, the heuristic's estimate of the cost from that node to the goal.

It keeps a priority queue of candidate nodes, ordered by g + h, and always expands the most promising one; see [[Binary Heap]]. When it pulls the goal off the queue, it has the shortest path.

The heuristic controls everything:

- If it is **zero**, A\* becomes Dijkstra's algorithm, exploring in all directions.
- If it **never overestimates** the true remaining cost, it is called **admissible**, and A\* is guaranteed to find the optimal path. Straight-line distance is admissible for road maps, because no road is shorter than a straight line.
- The **closer** an admissible heuristic is to the true cost, the fewer nodes A\* explores. A perfect heuristic walks straight to the goal.
- If it **overestimates**, A\* runs faster but may return a path that isn't the shortest, behaving more like a [[Greedy Algorithm]]. Games often accept this trade deliberately.

On grids, common heuristics are Manhattan distance when movement is in four directions and diagonal distance when it's in eight. Choosing a heuristic that matches the movement rules matters: a heuristic that ignores diagonal moves overestimates on an eight-direction grid and loses the optimality guarantee.

A\* is the default for pathfinding in video games, where characters need routes through levels in real time; see [[Game AI]]. Large worlds strain it, since it stores every node it visits, so games add techniques on top:

- **Navigation meshes** replace fine grids with a few large walkable polygons, shrinking the graph.
- **Hierarchical pathfinding** plans first between regions, then within them.
- **Jump point search** skips over symmetric paths on uniform grids.
- **Precomputation** caches distances between landmarks for better heuristics.

Many other problems can be posed as a shortest path through a space of states, including puzzle solving, planning, and parsing. A\* applies whenever a good lower-bound estimate of the remaining cost exists. When the space is too large to search, or no path needs to be optimal, local search methods take over; see [[Simulated Annealing]] and [[Backtracking]].

## See also
- [[Graph Traversal]]
- [[Spatial Partitioning]]
- [[Traveling Salesman Problem]]
- [[Monte Carlo Tree Search]]
- [[Flood Fill]]
- [[Alpha-Beta Pruning]]
