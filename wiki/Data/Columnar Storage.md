---
aliases:
  - Column store
  - Column-oriented database
  - Columnar database
  - OLAP
  - Data warehouse
  - Parquet
tags:
  - data
summary: Storing a table column by column rather than row by row, which makes analytical queries over millions of rows dramatically faster and smaller.
---
**Columnar storage** stores a table's data one column at a time instead of one row at a time. In a traditional *row store*, each row's fields sit together on disk: one customer's name, city, and signup date, then the next customer's. In a *column store*, all the names sit together, then all the cities, then all the dates.

The difference matters because of how different workloads read data. Applications serving users run *transactional* queries, often called OLTP: fetch one order, update one account, touching a few whole rows at a time. Row storage suits them. Analysis runs *analytical* queries, called OLAP: total revenue by month across a hundred million orders, touching a few columns across nearly every row. A row store must read every field of every row to answer that, while a column store reads only the columns the query mentions, often a small fraction of the data.

Column stores gain further from three effects:

- **Compression.** Values in one column are similar, often repetitive. A column of country codes or dates compresses enormously with techniques such as *run-length encoding*, which stores "USA, repeated 40,000 times," and *dictionary encoding*, which replaces strings with small integers. Ratios of ten to one are common.
- **Vectorized execution.** Processing a tightly packed array of one type suits modern CPUs, which can apply one instruction to many values at once and keep data in cache.
- **Skipping.** Files store each block's minimum and maximum values, so a query for last week's data can skip blocks whose date range doesn't overlap.

The costs fall on writes. Inserting one row means touching every column's storage, and updating a value inside a compressed block is expensive. Column stores usually batch writes, buffering recent rows and merging them in bulk, like a [[Log-Structured Merge Tree]], and work best with data that is appended rather than changed.

The idea is old, but a 2005 research system called C-Store, led by Michael Stonebraker, showed its advantages convincingly. It now dominates analytics: cloud data warehouses such as BigQuery, Snowflake, and Redshift, embedded engines like DuckDB, and the open Apache Parquet and Arrow formats, which let different tools share columnar data without conversion. Arrow is an in-memory columnar format, and Parquet is its on-disk counterpart.

Data usually reaches a warehouse from transactional databases through [[Change Data Capture]] or batch exports, and analytical models are often deliberately denormalized into wide tables, the reverse of [[Database Normalization]]. A [[Materialized View]] can precompute common aggregates on top. The same layout principle appears outside databases: [[Observability]] platforms store logs and metrics in columnar form, and the entity component system pattern in games stores each component type in its own array for the same cache benefits.

## See also
- [[Pivot Table]]
- [[Big Data]]
- [[Object Storage]]
- [[In-Memory Database]]
- [[DataFrame]]
- [[Wide-Column Store]]
- [[Data Lake]]
