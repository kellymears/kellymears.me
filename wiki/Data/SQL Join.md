---
aliases:
  - Join
  - Inner join
  - Outer join
  - Hash join
  - Nested loop join
  - Cartesian product
tags:
  - data
summary: Combining rows from two tables by matching them on a condition, the core operation of relational databases, along with the algorithms that execute it and the mistakes that inflate or drop rows.
---
A **join** combines rows from two tables wherever they satisfy a condition, usually that a column in one equals a column in the other. It is how a [[Relational Database]] reassembles data that [[Database Normalization]] split apart: orders live in one table and customers in another, linked by a [[Foreign Key]], and a join puts each order beside its customer at query time.

The kinds of join differ in what they do with rows that have no match:

- **Inner join** keeps only pairs that match.
- **Left outer join** keeps every row from the left table, filling the right side with [[Null]] where there is no match. It answers "all customers, with their orders if any".
- **Full outer join** keeps unmatched rows from both sides.
- **Cross join** pairs every row with every other, the Cartesian product.
- **Semi- and anti-joins**, written with `EXISTS` and `NOT EXISTS`, ask whether a match exists without returning its columns. They are the safe way to write "customers with no orders", since `NOT IN` breaks when the subquery contains a NULL.

The database chooses among three main algorithms:

- **Nested loop.** For each row of one table, look up matches in the other. It is fast when the outer side is small and the inner side has a [[Database Index]] on the join column.
- **Hash join.** Build a [[Hash Table]] from the smaller input keyed on the join column, then stream the larger input past it.
- **Merge join.** If both inputs are already sorted on the key, or can be sorted cheaply with a [[Sorting Algorithm]], walk through them in step.

The [[Query Planner]] picks the algorithm and, for queries joining many tables, the order. The number of possible orders grows factorially, so planners since IBM's System R (1979) have used [[Dynamic Programming]] and cost estimates from table statistics. Stale statistics lead to bad plans.

Common mistakes:

- **Row multiplication.** Joining a one-to-many relationship repeats the "one" side for each match. Summing order totals after joining to order items counts each total once per item.
- **Missing condition.** Forgetting the join condition silently produces a cross join.
- **Filters in the wrong place.** In a left join, a condition on the right table belongs in `ON`. Putting it in `WHERE` discards the null-filled rows and quietly turns it into an inner join.

Joins are also why some systems avoid them. Across shards, matching rows live on different machines, so a join means shipping data over the network. Distributed systems therefore favor [[Denormalization]] and keys designed around access patterns, and a [[Key-Value Store]] offers no joins at all. Inside one database, a join is usually far cheaper than the [[N+1 Query Problem]], where an [[Object-Relational Mapping]] issues a separate query for each row.

## See also
- [[Window Function]]
- [[DataFrame]]
