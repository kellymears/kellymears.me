---
aliases:
  - Breadth-first search
  - Depth-first search
  - BFS
  - DFS
  - Graph search
  - Reachability
tags:
  - computation
summary: The two basic ways to visit every node in a graph, wide with a queue or deep with a stack, beneath crawlers, garbage collectors, mazes, and dependency tools.
---
**Graph traversal** visits the nodes of a graph, a set of nodes joined by edges, in a systematic order. Graphs model anything made of connections: web pages and links, people and friendships, modules and imports, notes and wikilinks. Most graph algorithms start from one of two traversals, which differ only in the order they explore.

- **Breadth-first search (BFS)** visits all neighbors of the starting node, then all of their neighbors, spreading outward in layers. It keeps a queue of nodes to visit. Because it reaches nodes in order of distance, the first time BFS finds a node is along a shortest path, counted in edges.
- **Depth-first search (DFS)** follows one path as far as it can, then backtracks to the most recent branch and tries the next. It keeps a stack, often the call stack via [[Recursion]]. DFS is the natural tool for detecting cycles, finding connected regions, and producing a [[Topological Sort]].

Both take time proportional to the number of nodes plus edges. Both need a set of visited nodes, since graphs can contain cycles, and without remembering where it has been a traversal will loop forever. A tree is a graph with no cycles, so a [[Trie]] or [[B-Tree]] can be traversed without that bookkeeping.

Traversals do a lot of practical work:

- **Reachability.** The mark phase of [[Garbage Collection]] traverses from root references, and everything unvisited is garbage. [[Tree Shaking]] does the same from a bundle's entry points across the [[Module Graph]], dropping code nothing reaches.
- **Crawling.** Search engine crawlers traverse the link graph, usually breadth-first with priorities.
- **Degrees of separation.** BFS over a social graph finds the shortest chain of acquaintances. A [[Knowledge Graph]] uses the same layers to show notes within a few links, as this wiki's local graph does.
- **Flood fill and mazes.** Paint bucket tools are a BFS or DFS over neighboring pixels. Randomized DFS generates classic mazes for [[Procedural Generation]].
- **Puzzles and states.** Treating each state of a puzzle or [[Finite State Machine]] as a node turns solving into search. BFS finds the fewest moves.

When edges have different costs, such as road lengths, plain BFS no longer finds the shortest path. [[Dijkstra's Algorithm]] replaces the queue with a priority queue ordered by distance, and A* adds a heuristic toward the goal, the basis of pathfinding in [[Game AI]]. Iterative deepening combines the two basic searches: repeated depth-limited DFS that finds shortest paths like BFS while using little memory.

## See also
- [[Union-Find]]
- [[Seven Bridges of Königsberg]]
- [[A-Star Search Algorithm]]
