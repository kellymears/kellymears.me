---
aliases:
  - Window functions
  - OVER clause
  - Running total
  - Ranking function
  - Analytic function
tags:
  - data
summary: SQL functions that compute across a set of related rows while keeping every row in the result, the tool for running totals, rankings, moving averages, and comparisons with the previous row.
---
A **window function** computes a value for each row of a query using a set of related rows, its *window*, without collapsing those rows into one. An ordinary aggregate such as `SUM` with `GROUP BY` returns one row per group. A window function returns every row, each annotated with something computed over its group. It is marked by an `OVER` clause, and it arrived in the SQL standard in 2003. Every major [[Relational Database]] now supports it.

The `OVER` clause has three parts, all optional:

- **`PARTITION BY`** splits rows into groups, such as one per customer. The function restarts for each.
- **`ORDER BY`** sorts rows within each partition, which matters for running totals and rankings.
- **The frame** limits the window to nearby rows, such as the previous six plus the current one for a seven-day moving average.

Common uses:

- **Running totals.** `SUM(amount) OVER (PARTITION BY account ORDER BY date)` gives each account's balance after every transaction.
- **Ranking.** `ROW_NUMBER`, `RANK`, and `DENSE_RANK` number rows within a partition, differing only in how they treat ties. Picking each user's latest order, the "top N per group" problem, becomes a filter on `ROW_NUMBER() = 1`.
- **Comparing neighbors.** `LAG` and `LEAD` read a value from the previous or next row, so day-over-day changes, gaps between events, and session boundaries take one query.
- **Moving averages.** A frame of the last N rows smooths noisy data, a staple of [[Time Series Database]] work and fitness dashboards that average training load over weeks.
- **Shares of a total.** Dividing each row's value by the `SUM` over its whole partition gives a percentage without a second query.

Before window functions, these needed a self-join, matching each row to the earlier rows in its group, or a correlated subquery that ran once per row. Both are hard to read and can be quadratic in the number of rows, as described in [[Big-O Notation]]. A window function usually needs a single sort, which the [[Query Planner]] can sometimes skip by reading a suitable [[Database Index]] in order.

Window functions are evaluated after `WHERE` and `GROUP BY` but before the final `ORDER BY` and `LIMIT`, so their results can't be filtered in the same query's `WHERE` clause. Filtering on a rank means wrapping the query in a subquery or a [[Common Table Expression]]. Some databases add a `QUALIFY` clause to make this shorter.

They are central to analytics, where [[Columnar Storage]] engines and [[Dimensional Modeling]] meet questions like rankings, cohorts, and period-over-period change. The same idea appears outside SQL as windowed aggregation in [[Stream Processing]], where the window is a span of time over an unbounded stream instead of a set of rows.

## See also
- [[SQL Join]]
- [[Pagination]]
- [[MapReduce]]
- [[Training Load]]
