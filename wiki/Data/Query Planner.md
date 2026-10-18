---
aliases:
  - Query optimizer
  - Execution plan
  - EXPLAIN
  - Cost-based optimizer
  - Table statistics
tags:
  - data
summary: The part of a database that turns a declarative query into a concrete strategy, choosing indexes and join orders by estimating the cost of each option.
---
A **query planner**, or query optimizer, is the part of a database that decides how to run a query. SQL is declarative: a query says what rows to return, not how to find them. For any non-trivial query there are many possible strategies, which index to use, which table to read first, how to join them, and the planner picks one. The chosen strategy is the *execution plan*.

The approach dates to IBM's System R project. A 1979 paper by Patricia Selinger and colleagues described *cost-based optimization*, which still underlies most planners. The planner enumerates candidate plans, estimates the cost of each in disk reads and CPU work, and picks the cheapest.

The main decisions:

- **Access paths.** Read the whole table sequentially, or look rows up through a [[Database Index]]. An index wins when a query wants a few rows, while a full scan wins when it wants most of them, since sequential reads are much faster than scattered ones.
- **Join order.** Joining A to B and then to C can cost very differently from joining B to C first. The number of possible orders grows factorially with the number of tables, so planners prune the search, and very large joins fall back on heuristics or, in PostgreSQL, a genetic algorithm.
- **Join algorithms.** A *nested loop* looks up matching rows for each row, good when one side is small. A *hash join* builds a hash table of one side, good for large unsorted inputs. A *merge join* walks two sorted inputs together.

Everything rests on estimates of how many rows each step will produce, called *cardinality*. Databases keep **table statistics**, row counts, value distributions, and common values, gathered by commands like `ANALYZE`. When statistics are stale or the data is skewed, estimates can be off by orders of magnitude, and the planner confidently picks a terrible plan.

Seeing the plan is the first step in diagnosing a slow query. `EXPLAIN` shows the chosen plan and its estimates, and `EXPLAIN ANALYZE` actually runs the query and shows real row counts next to estimated ones. A large gap between the two usually points at the problem.

Planners also explain several familiar performance surprises. A query fast in development can be slow in production because a different data size leads to a different plan, a reason to test against realistic [[Seed Data]]. A plan can change suddenly when statistics are refreshed. And a [[Object-Relational Mapping]] layer may generate queries the planner handles poorly, or many small ones, the [[N+1 Query Problem]].

When the planner's choice is wrong and can't be fixed with better statistics, the usual answers are rewriting the query, adding a [[Materialized View]], or [[Denormalization]].

## See also
- [[Database Index]]
- [[N+1 Query Problem]]
- [[Relational Database]]
- [[Benchmarking]]
- [[SQL Join]]
