---
aliases:
  - Eulerian path
  - Graph theory
  - Hamiltonian path
  - Chinese postman problem
tags:
  - computation
summary: Leonhard Euler's 1736 proof that no walk through Königsberg could cross each of its seven bridges exactly once, the problem that founded graph theory.
---
The **Seven Bridges of Königsberg** is a puzzle solved by Leonhard Euler in 1736, and his solution is usually counted as the beginning of graph theory. Königsberg, a Prussian city that is now Kaliningrad in Russia, sat on the Pregel River, which flowed around two islands. Seven bridges joined the islands and the two banks. Residents reportedly wondered whether anyone could walk through the city crossing every bridge exactly once.

Euler's insight was to throw away almost everything. Shapes, distances, and routes across each island didn't matter. All that counted was which landmasses each bridge connected. In modern terms he reduced the city to four points, called vertices, and seven lines between them, called edges, the same abstraction behind route maps and network diagrams; see [[Map and Territory]].

Then he counted. A walker who enters a landmass on one bridge must leave on another, so every landmass passed through uses up bridges in pairs. Only the start and end of the walk can have an odd number of bridges. In Königsberg all four landmasses had an odd number, three or five, so no such walk exists. More generally, a connected graph has a path using every edge exactly once, an **Eulerian path**, exactly when zero or two of its vertices have an odd number of edges, and with zero the path can end where it began. The test takes moments even for huge graphs; see [[Graph Traversal]].

A similar-looking question turned out to be far harder. A **Hamiltonian path** visits every vertex exactly once rather than every edge. No efficient method is known for deciding whether one exists; the problem is NP-complete and closely related to finding the shortest tour of a set of cities; see [[Traveling Salesman Problem]] and [[P versus NP Problem]]. It's a standard lesson in how a small change can move a question from easy to intractable.

Euler's problem has practical descendants:

- **Route inspection.** Snowplows, street sweepers, and mail carriers need to cover every street, ideally without repeating any. When that's impossible, the task is to repeat as little as possible, called the Chinese postman problem after the mathematician Meigu Guan, who posed it in 1960.
- **Genome assembly.** Sequencers read DNA in short overlapping fragments, and one way to reassemble them finds an Eulerian path through a graph of the overlaps.
- **Networks.** Much of the graph theory that followed, from shortest paths to network flow, starts from Euler's abstraction; see [[Dijkstra's Algorithm]], [[Maximum Flow]], and [[Small-World Network]].

Wartime bombing and later rebuilding left five bridges at the original sites. Only two landmasses now have an odd number, so a walk crossing each exactly once is possible, from one island to the other.

## See also
- [[Graph Coloring]]
- [[Topological Sort]]
- [[Knowledge Graph]]
- [[De Bruijn Sequence]]
- [[Network Topology]]
