---
aliases:
  - ETL
  - ELT
  - Extract, transform, load
  - Data pipeline
  - Reverse ETL
  - Backfill
tags:
  - data
summary: The job of pulling data out of operational systems, cleaning and reshaping it, and loading it somewhere it can be analyzed, and the move from transforming before loading to transforming after.
---
An **ETL pipeline** moves data from where it is produced to where it is analyzed. It **extracts** records from source systems such as application databases, payment providers and log files, **transforms** them by cleaning, joining and reshaping, and **loads** the result into an analytical store, usually a data warehouse built on [[Columnar Storage]]. The pattern dates from the data warehousing movement of the 1980s and 1990s, when operational databases were too busy and too differently shaped to answer business questions directly.

The transform step does most of the work:

- **Cleaning.** Fix types, trim junk, standardize dates and currencies, and drop or flag invalid rows.
- **Conforming.** Make "customer" mean the same thing across systems that each define it differently, which often requires [[Entity Resolution]] to match records describing the same person.
- **Reshaping.** Turn normalized operational tables into wide, analysis-friendly ones, a deliberate [[Denormalization]].
- **Aggregating.** Precompute daily totals and other rollups, much like a [[Materialized View]].

**ELT** reorders the steps. Cloud warehouses made storage cheap and compute elastic, so teams now load raw data first and transform it inside the warehouse with SQL. Raw copies make it possible to redo a transformation later without going back to the source, and transformations become version-controlled SQL models that can be reviewed and tested like code. **Reverse ETL** sends warehouse results back out to operational tools, such as customer scores into a sales system.

A pipeline is a graph of dependent steps. Schedulers run it as a DAG, ordering tasks with a [[Topological Sort]] and triggering runs on a [[Cron]]-like schedule or when upstream data lands.

Most of the hard problems are operational:

- **Upstream change.** A renamed column or a new enum value in a source system breaks the pipeline or, worse, quietly produces nulls. This is [[Schema Drift]] crossing a team boundary, and data contracts try to make it explicit.
- **Reruns.** A failed or corrected run must be re-executable without duplicating rows, so each step should have [[Idempotence]], typically by overwriting whole partitions rather than appending. A *backfill* reruns history after a logic change.
- **Silent wrongness.** A pipeline that completes successfully with half the expected rows is a [[Silent Failure]]. Row counts, freshness checks and value assertions catch what a green status hides.
- **Lineage.** When a dashboard number looks wrong, someone needs to trace which sources and transformations produced it, a question of [[Provenance]].

Nightly batch jobs leave data a day old. [[Change Data Capture]] streams each database change as it happens, and [[Stream Processing]] transforms it continuously, so the distinction between batch and streaming pipelines is blurring. For very large batch workloads, the approach descends from [[MapReduce]].

## See also
- [[Data Lake]]
- [[Data Lineage]]
