---
aliases:
  - Max-flow min-cut theorem
  - Ford-Fulkerson algorithm
  - Minimum cut
  - Bipartite matching
tags:
  - computation
summary: Finding the most that can move through a network of capacity-limited links from a source to a sink, which always equals the capacity of the narrowest cut and solves matching, scheduling, and segmentation problems.
---
The **maximum flow** problem asks how much can be pushed through a network from a source to a sink when every link has a capacity. The network might be pipes carrying water, roads carrying trucks, or cables carrying data; the question is the same. It is one of the central problems of combinatorial optimization, because a surprising range of other problems can be rewritten as flows.

It has a Cold War origin. In 1955 T. E. Harris and F. S. Ross of the RAND Corporation studied the Soviet rail network into Eastern Europe, asking both how much it could carry and where it could be cut most cheaply. Their report stayed classified until 1999. Lester Ford and Delbert Fulkerson published the general method in 1956.

The key result is the **max-flow min-cut theorem**: the largest flow equals the smallest total capacity of any set of links whose removal separates source from sink. A network is exactly as strong as its narrowest cut, which formalizes the intuition behind bottleneck thinking; see [[Theory of Constraints]]. It is also an instance of duality, where every maximization problem has a matching minimization with the same answer; see [[Linear Programming]].

The **Ford-Fulkerson method** finds the flow by repetition: find any path from source to sink with spare capacity, push as much as it allows, and repeat. The trick is the residual network. Pushing flow along a link also creates a reverse link, so later paths can undo earlier choices; without it the method would be a [[Greedy Algorithm]] that can get stuck. Always choosing the shortest augmenting path with breadth-first search, the Edmonds-Karp algorithm, guarantees polynomial time; see [[Graph Traversal]]. Faster methods followed for decades, and in 2022 researchers announced an algorithm running in almost linear time.

Many problems reduce to flow:

- **Bipartite matching.** Assigning workers to jobs or students to projects becomes a flow from one side to the other with capacity one per link; see [[Stable Matching]] for the version where preferences matter.
- **Image segmentation.** Separating foreground from background can be framed as a minimum cut between pixels, where cutting between similar neighbors is expensive.
- **Scheduling and elimination.** Routing goods through warehouses with limited throughput, or deciding whether a sports team can still win its league, both reduce to flows.
- **Reliability.** The min cut says how many links must fail before two points lose contact; see [[IP Routing]] and [[Cascading Failure]].

Flow differs from shortest paths. [[Dijkstra's Algorithm]] finds the best single route, while flow finds how to split traffic across many routes at once, which is what data networks and road systems actually do; see [[Bandwidth]]. A [[Minimum Spanning Tree]] answers yet another question, the cheapest way to connect every node.

## See also
- [[Graph Coloring]]
- [[Topological Sort]]
