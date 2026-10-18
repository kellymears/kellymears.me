---
aliases:
  - Property graph
  - Cypher
  - Neo4j
  - GQL
tags:
  - data
summary: A database that stores records as nodes and the connections between them as first-class relationships, built for questions that hop across many links at once.
---
A **graph database** stores data as *nodes*, such as people, products, or accounts, and *relationships* between them, such as FOLLOWS, BOUGHT, or TRANSFERRED_TO, with properties on both. Relationships are stored as first-class records, not reconstructed from matching keys at query time. That makes questions that travel across many connections, such as "friends of friends who live nearby" or "every account within four transfers of this one", natural to express and fast to answer.

In a [[Relational Database]], relationships live in [[Foreign Key]] columns and are rebuilt at query time with an [[SQL Join]]. One or two hops are cheap. But each additional hop is another join, and a query of unknown depth, such as "all reports under this manager at any level", needs a recursive query whose cost can balloon. Graph databases instead follow stored pointers from node to node, so a traversal's cost depends on how much of the graph it touches, not on the total size of the tables, a property often called *index-free adjacency*.

The dominant model is the **property graph**, popularized by Neo4j, whose company was founded in 2007. Its query language, Cypher, draws patterns with ASCII art: `(a:Person)-[:KNOWS]->(b:Person)` matches pairs of people where one knows the other. In 2024 ISO published GQL, a standard graph query language heavily influenced by Cypher, the first new ISO database language since SQL. An older alternative, RDF triple stores queried with SPARQL, comes from the semantic web and underlies many a public [[Knowledge Graph]].

Graph databases suit problems where the connections are the point:

- **Fraud detection.** Rings of accounts sharing devices, addresses, or phone numbers show up as tight clusters, linked in ways that a row-by-row check misses. It overlaps with [[Entity Resolution]].
- **Recommendations.** People who bought this also bought, weighted by paths through shared purchases.
- **Permissions.** Access checks such as "is this user in a group that owns a folder containing this file?" are graph walks. Google's Zanzibar authorization system, described in 2019, popularized modeling permissions this way.
- **Dependencies and networks.** Software dependency graphs, supply chains, IT infrastructure, and citation networks.

Classic algorithms run inside them: shortest paths, as in [[Dijkstra's Algorithm]], [[Graph Traversal]], centrality, and community detection.

Graphs have weaknesses too. Splitting a large graph across machines is hard, since most traversals cross partition boundaries, so [[Database Sharding]] that works well for independent rows works poorly for densely connected data. Aggregate questions over every record, such as totals by month, are usually faster in a relational or columnar store. Many teams find a relational database with recursive queries is enough.

A wiki is itself a graph: notes as nodes, links as relationships, and a [[Backlink]] is simply the same relationship read in reverse.

## See also
- [[GraphQL]]
- [[Entity-Relationship Model]]
- [[Hierarchical Data]]
- [[Document Database]]
- [[Common Table Expression]]
- [[Seven Bridges of Königsberg]]
