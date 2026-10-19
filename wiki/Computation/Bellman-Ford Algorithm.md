---
aliases:
  - Bellman-Ford
  - Distance-vector routing
  - Count to infinity
tags:
  - computation
summary: A shortest-path algorithm that tolerates negative edge weights by repeatedly relaxing every edge, which detects negative cycles and, run in a distributed form, became the basis of early internet routing.
---
The **Bellman-Ford algorithm** finds the shortest paths from one starting vertex to every other vertex in a weighted graph. It is slower than [[Dijkstra's Algorithm]] but handles something Dijkstra's cannot: edges with negative weights. It is named for Richard Bellman and Lester Ford Jr., who published versions in the 1950s.

The algorithm is simple. Start with a distance of zero for the source and infinity for every other vertex. Then **relax** every edge: if going to a vertex through this edge is shorter than its current best distance, update the distance. Repeat the full pass over all edges as many times as there are vertices, minus one. After pass k, every shortest path that uses at most k edges has been found, and since a shortest path in a graph with V vertices never needs more than V − 1 edges, the distances are then final. The running time is proportional to vertices times edges; see [[Big-O Notation]] and [[Dynamic Programming]], a term Bellman coined.

Dijkstra's algorithm fails with negative edges because it finalizes the nearest vertex greedily and never revisits it, while a later negative edge might make a cheaper route; see [[Greedy Algorithm]]. Bellman-Ford makes no such commitment.

A **negative cycle** is a loop whose total weight is below zero. Going around it repeatedly makes a path ever cheaper, so no shortest path exists. Bellman-Ford detects this with one more pass: if any distance still improves, a negative cycle is present. A classic use is finding **currency arbitrage**. Make each currency a vertex and weight each exchange edge with the negative logarithm of its rate, and a sequence of trades that ends with more money than it started becomes a negative cycle; see [[Graph Traversal]].

The algorithm also works when nobody has the whole graph. In **distance-vector routing**, each router keeps a table of its best known distance to every destination and periodically shares it with its neighbors, who update their own tables, which amounts to Bellman-Ford running in parallel across a network; see [[IP Routing]]. The early ARPANET and the Routing Information Protocol, standardized in 1988, worked this way.

The distributed version has a notorious flaw, **count to infinity**. When a link fails, two routers can each believe the other still has a route to the lost destination, raising their estimates one step at a time for many rounds. The Routing Information Protocol caps distances at 15 hops, treating 16 as unreachable, and adds rules such as not advertising a route back to the neighbor it came from. Larger networks moved to link-state protocols, which share the whole topology and run Dijkstra's algorithm locally, and to [[Border Gateway Protocol]], which carries entire paths to prevent loops.

## See also
- [[A-Star Search Algorithm]]
- [[Topological Sort]]
- [[Seven Bridges of Königsberg]]
