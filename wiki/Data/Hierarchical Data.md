---
aliases:
  - Adjacency list
  - Nested set
  - Closure table
  - Materialized path
tags:
  - data
summary: Trees such as categories, org charts, folders, and comment threads stored in flat relational tables, using one of four classic designs that trade fast reads against cheap writes.
---
**Hierarchical data** is data shaped like a tree: product categories, an organization chart, folders, a threaded discussion. A [[Relational Database]] stores flat tables, so representing a tree takes a deliberate design, and there are four classic options, each fast at different things.

1. **Adjacency list.** Each row stores its parent's ID, a [[Foreign Key]] pointing back into the same table. Inserting or moving a node changes one row. Reading a whole subtree is the hard part, because the depth is unknown. Before recursive queries, code fetched one level at a time, sending a query per level or per node; see [[N+1 Query Problem]]. Since the SQL:1999 standard, a recursive query walks the tree in a single statement; see [[Common Table Expression]].
2. **Materialized path.** Each row stores its full ancestry as a string, such as `1/4/9/`. Finding all descendants is a prefix match that an ordinary index can serve, and depth is the number of separators; see [[Database Index]]. Moving a node means rewriting the path of every descendant. PostgreSQL's `ltree` type is built for this design.
3. **Nested set.** Popularized by Joe Celko, this design numbers every node with a left and right value from a depth-first walk of the tree, so each node's descendants are exactly those numbered between its two values; see [[Graph Traversal]]. Reading a subtree is one fast range query. Inserting a node, though, renumbers on average half the table, so it suits trees that rarely change.
4. **Closure table.** A separate table lists every ancestor-descendant pair, with the distance between them. Any question about ancestry is a simple join, and moves are manageable, but the table grows with the number of nodes times the depth.

The choice is the usual trade between reads and writes, and the last three designs store redundant information that must be kept consistent; see [[Denormalization]]. Many systems keep a parent ID as the source of truth and a path or closure table as a derived index.

Some problems cut across all four. An adjacency list will happily store a cycle, a node that is its own ancestor, unless a check prevents it, and few databases can express that rule directly; see [[Database Constraint]]. Ordering siblings, such as the chapters of a book, needs its own position column, and inserting between two neighbors without renumbering everything leads to schemes that use fractional or string positions.

Other kinds of database handle trees differently. A [[Document Database]] can nest children inside parents directly, which is natural until something must move or be referenced from two places. When relationships stop being a tree, with many parents or arbitrary links, the data is a graph, and a [[Graph Database]] fits better.

Deciding what the hierarchy should be is a separate, often harder question; see [[Taxonomy]] and [[Information Architecture]].

## See also
- [[Scene Graph]]
- [[Archival Science]]
