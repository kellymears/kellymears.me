---
aliases:
  - SQL view
  - Virtual table
  - Updatable view
tags:
  - data
summary: A named, stored query that behaves like a table, used to hide complexity, narrow what a user can see, and keep old shapes working while the tables beneath them change.
---
A **database view** is a named query saved in the database that can be read as if it were a table. It holds no data of its own: each time someone selects from it, the database substitutes the view's definition into the query and runs it against the underlying tables. Views were part of the [[Relational Database]] model from the start, and the SQL standard has included them since 1986.

Views earn their place for a handful of reasons:

- **Hiding complexity.** A view can package a five-table [[SQL Join]] and its filters behind one name, so reports and analysts query `active_customers` instead of rebuilding the logic and getting it slightly wrong each time; see [[Common Table Expression]] for the same idea scoped to one query.
- **Narrowing access.** Granting someone a view rather than the base table limits which columns and rows they can see, an old form of [[Least Privilege]]. Per-user row filters are now often done with [[Row-Level Security]] instead.
- **Stable interfaces.** When a table is split or renamed, a view with the old name and shape keeps existing queries working while callers move over; see [[Database Migration]] and [[Expand and Contract]].
- **Logical independence.** The relational model's founders wanted applications to depend on a logical schema, not physical storage. Views are the main tool for that separation. It is the database's version of [[Information hiding]].

Because a view is just a query, it costs nothing to store but something every time it is read. The [[Query Planner]] usually merges the view's definition into the outer query and optimizes the whole, so a simple view adds no overhead. Views stacked on views, though, can produce enormous plans that are hard to read and slow to run, and a filter in the outer query sometimes can't be pushed down into an aggregate inside the view.

When reading is too slow, the result can be stored instead. A [[Materialized View]] saves the rows and refreshes them on a schedule or on change, trading freshness for speed.

Writing through a view is possible but restricted. A simple view over one table, without aggregates or `DISTINCT`, is usually **updatable**: inserts and updates pass through to the base table. A view over a join or a `GROUP BY` usually isn't, since the database can't tell which row a change should land in. `WITH CHECK OPTION` refuses writes through a view that would produce rows the view itself would no longer show. Triggers of the `INSTEAD OF` kind let a developer define what writing to a complex view should do; see [[Stored Procedure]].

Views are also a common place for [[Object-Relational Mapping]] layers to point, so application code can treat a read-only reporting shape like any other model.

## See also
- [[Data Masking]]
- [[Pivot Table]]
- [[Schema Evolution]]
