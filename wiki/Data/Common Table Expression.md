---
aliases:
  - CTE
  - CTEs
  - WITH clause
  - Recursive CTE
  - Recursive query
tags:
  - data
summary: Named subqueries declared with WITH at the top of a SQL statement, which make long queries readable step by step and, in their recursive form, let SQL walk trees and graphs.
---
A **common table expression**, or **CTE**, is a named, temporary result defined at the start of a SQL statement with the `WITH` keyword and used by the query that follows. It lets a long query be written as a sequence of steps, each building on the last, instead of subqueries nested inside each other. CTEs entered the SQL standard in 1999 and are now supported by every major [[Relational Database]].

A simple CTE looks like this: `WITH recent AS (SELECT * FROM orders WHERE created_at > now() - interval '30 days') SELECT customer_id, count(*) FROM recent GROUP BY customer_id`. The named step `recent` reads like a variable. A statement can define several, and later ones can refer to earlier ones.

The main benefits:

- **Readability.** A query becomes a top-to-bottom pipeline, such as filter, then join, then aggregate, then rank, each step named for what it means. This is the same move as extracting a well-named function in application code.
- **Reuse.** A step referenced twice in the main query is written once.
- **Filtering computed values.** A [[Window Function]] result can't be filtered in the same query's `WHERE` clause, but wrapping it in a CTE makes it filterable in the next step.

Whether a CTE is a performance tool depends on the database. Some engines always computed CTEs once and stored the result, an *optimization fence* that stopped the [[Query Planner]] from pushing filters inside. PostgreSQL behaved this way until version 12, which now inlines simple CTEs unless asked to materialize them. A CTE is usually best treated as a readability tool, with performance checked in the query plan.

The more powerful form is the **recursive CTE**. It has two parts joined by `UNION ALL`: a starting query, then a step that joins the CTE to the table again to find the next level. The database repeats the step until it returns no new rows. This lets SQL walk hierarchical data stored as parent references:

- **Trees.** An organization chart, a comment thread, or nested categories, finding every descendant or the full path to the root.
- **Graphs.** Following [[Foreign Key]] references through a dependency or friendship graph, as a breadth-first [[Graph Traversal]].
- **Sequences.** Generating a series of dates or numbers to join against, filling gaps in time-series data.

Recursive CTEs give SQL [[Turing Completeness]], and they can loop forever on a graph with cycles. Tracking visited rows or capping the depth prevents that. For heavily connected data, a [[Graph Database]] may still fit better. Each pass is a step of [[Recursion]], ending at a base case of no new rows.

## See also
- [[SQL Join]]
- [[Materialized View]]
- [[Topological Sort]]
- [[Database Normalization]]
- [[Database View]]
