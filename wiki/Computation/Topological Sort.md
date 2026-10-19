---
aliases:
  - Topological ordering
  - Directed acyclic graph
  - DAG
  - Circular dependency
  - Kahn's algorithm
tags:
  - computation
summary: Ordering tasks so that everything comes after the things it depends on, the algorithm behind build systems, package installs, and every circular-dependency error.
---
A **topological sort** puts the nodes of a directed graph in an order where every node comes after all the nodes it depends on. If B requires A, A comes first. Getting dressed is the everyday example: socks before shoes, shirt before jacket, but socks and shirt in either order. The result usually isn't unique, since independent tasks can go in any order, but every valid order respects every dependency.

A topological order exists only if the graph has no cycles, a *directed acyclic graph* or **DAG**. If A needs B and B needs A, neither can go first. Topological sorting therefore doubles as cycle detection, which is where every "circular dependency" error message comes from.

There are two standard algorithms, both running in time proportional to nodes plus edges:

- **Kahn's algorithm** (Arthur Kahn, 1962) repeatedly takes any node with no remaining unmet dependencies, outputs it, and removes its edges, which may free up other nodes. If nodes remain but none are free, there is a cycle. It naturally reveals which tasks can run in parallel: all the free nodes at each step.
- **Depth-first search** visits each node's dependencies before recording the node itself, a post-order [[Graph Traversal]]. Reaching a node already on the current path means a cycle.

Dependency graphs are everywhere in computing:

- **Builds.** `make` and modern build tools compile each file after its inputs, and run independent steps in parallel. In a [[Monorepo]], the build graph decides which packages to rebuild after a change.
- **Packages.** A [[Package Manager]] installs dependencies before what depends on them, and a [[Bundler]] orders modules in the [[Module Graph]] so each runs after its imports.
- **Services.** An [[Init System]] such as [[Systemd]] orders startup by declared dependencies, starting independent services at the same time to speed up boot.
- **Data and workflows.** Spreadsheets recalculate cells in dependency order. Workflow schedulers express pipelines as DAGs, and [[Database Migration]] tools order schema changes the same way. [[Fan-Out and Fan-In]] patterns are small DAGs.
- **History.** A [[Version Control]] history is a DAG of commits, and `git log --topo-order` lists them topologically.
- **Games.** A [[Skill Tree]] is a prerequisite DAG, and so is a tech tree.

Cycles are the recurring problem. Circular imports in a module system, packages that require each other, and services that wait on each other at boot all fail for the same reason, and they hint at [[Deadlock]], its runtime cousin. Breaking a cycle usually means extracting the shared part into a new node both can depend on.

## See also
- [[Bellman-Ford Algorithm]]
- [[Build System]]
- [[Seven Bridges of Königsberg]]
