---
aliases:
  - Materialized views
  - Precomputed query
  - Read model
  - Projection
tags:
  - data
summary: The stored result of a query, kept as a table so that expensive reads become cheap, at the cost of keeping that result up to date.
---
A **materialized view** stores the result of a query as if it were a table. An ordinary database view is just a saved query: every time you read from it, the database runs the query again. A materialized view runs the query once and keeps the rows, so reading it is as fast as reading any table. The trade is freshness. When the underlying data changes, the stored result is out of date until it is refreshed.

They suit queries that are expensive and read often: dashboards aggregating millions of rows, leaderboards, search listings that join many tables, and reports summing sales by region and month. Computing these on every page load wastes work, since the answer changes far less often than it is asked for.

The main design question is how to refresh:

- **Full refresh** reruns the query and replaces the stored result, often on a schedule. It is simple but costs as much as the original query, and the data is stale between runs.
- **Incremental refresh** applies only the changes since the last refresh. It is much cheaper but works only for queries whose results can be updated piece by piece, such as sums and counts.
- **Streaming maintenance** updates the view continuously as changes arrive, often fed by [[Change Data Capture]] from the source tables. Dedicated streaming databases are built around this.

Materialized views are a controlled form of [[Denormalization]]: the database keeps the duplicate copy instead of application code. In [[Event Sourcing]] and CQRS architectures, the same idea is called a *projection* or *read model*, a view built by replaying events into a shape optimized for one kind of query. Each read model can be thrown away and rebuilt from the log.

The difficulty is the familiar one of [[Cache Invalidation]], since a materialized view is a cache of a query with a database-managed refresh. Every consumer has to tolerate some staleness, which makes it a form of [[Eventual Consistency]] inside a single system. [[Incremental Static Regeneration]] on the web applies the same trade to whole pages, and [[Memoization]] applies it to function calls.

## See also
- [[Denormalization]]
- [[Change Data Capture]]
- [[Event Sourcing]]
- [[Cache Invalidation]]
- [[Eventual Consistency]]
- [[Database Index]]
- [[ETL Pipeline]]
- [[Columnar Storage]]
