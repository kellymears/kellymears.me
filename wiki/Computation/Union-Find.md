---
aliases:
  - Disjoint-set
  - Disjoint set union
  - Disjoint-set data structure
  - Path compression
tags:
  - computation
summary: A tiny structure that tracks which items belong to the same group as groups merge, nearly constant time per operation thanks to two simple tricks.
---
**Union-find**, also called the disjoint-set data structure, keeps track of items partitioned into groups and supports two operations: *find*, which reports which group an item belongs to, and *union*, which merges two groups. It answers "are these two things connected?" while connections keep being added. Bernard Galler and Michael Fischer described it in 1964.

Each group is stored as a tree of parent pointers, usually in a plain array. The root of the tree is the group's representative. Find follows parent pointers up to the root; two items are in the same group when their roots match. Union attaches one root under the other.

Done naively, trees can degenerate into long chains. Two tricks fix that:

- **Union by rank or size.** Always attach the smaller tree under the larger, so trees stay shallow.
- **Path compression.** During a find, point every node visited directly at the root, flattening the path for next time.

With both, Robert Tarjan proved in 1975 that a sequence of operations costs nearly constant time each. The bound involves the inverse Ackermann function, which grows so slowly it stays below five for any input that could exist in the physical universe. The guarantee is amortized, in the sense of [[Amortized Analysis]]: individual operations can be slower, but the average over any sequence is tiny.

The structure is a few lines of code and turns up in many places:

- **Minimum spanning trees.** Kruskal's algorithm sorts edges by weight and adds each one unless its endpoints are already connected, a check union-find answers instantly. It is a textbook [[Greedy Algorithm]].
- **Connected components.** Grouping pixels into regions in an image, or nodes into clusters in a network, without a full [[Graph Traversal]] after every change.
- **Type inference.** The unification step in Hindley–Milner [[Type Inference]] merges type variables found to be equal, using union-find to track which variables share a type.
- **Record linkage.** In [[Entity Resolution]], each pairwise match merges two records' groups, so chains of matches collapse into one entity.
- **Maze generation.** Randomized Kruskal knocks down walls between cells only if the cells are not yet connected, producing a maze with exactly one path between any two points, a staple of [[Procedural Generation]].

Union-find has a notable limitation: it cannot split groups. Once merged, items stay merged, so problems where connections are also removed need more elaborate dynamic-connectivity structures. It also answers only whether items are connected, not how; recovering an actual path requires a separate search.

Its appeal is the ratio of power to code. A dozen lines give near-constant connectivity queries, which is why it appears so often in competitive programming and in compilers alike.

## See also
- [[Graph Traversal]]
- [[Greedy Algorithm]]
- [[Topological Sort]]
- [[Consistent Hashing]]
- [[Minimum Spanning Tree]]
- [[Ackermann Function]]
- [[Flood Fill]]
