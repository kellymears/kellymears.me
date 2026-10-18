---
aliases:
  - Lakehouse
  - Data lakehouse
  - Apache Iceberg
  - Delta Lake
  - Open table format
  - Data swamp
tags:
  - data
summary: Storing raw data of every kind as files in cheap object storage and imposing structure only when it is read, plus the table formats that later added transactions on top.
---
A **data lake** is a central store that holds raw data in its original form, as files in inexpensive storage, to be structured and analyzed later. Logs, exports, event streams, images, and CSV dumps all land there. James Dixon coined the term in 2010: a data mart is bottled water, cleansed and packaged, while a lake holds data in its natural state.

The idea grew up with Hadoop, which stored files across clusters of ordinary machines and processed them with [[MapReduce]]. Cloud object storage such as Amazon S3 later became the standard lake: nearly unlimited, durable, and far cheaper per terabyte than a database. Data typically lands in an open columnar file format such as Parquet, described under [[Columnar Storage]].

The defining approach is **schema-on-read**. A warehouse requires data to be cleaned and fitted to a schema before loading, the classic order of an [[ETL Pipeline]]. A lake accepts anything and applies structure at query time, which favors the ELT ordering: load first, transform later. Separating storage from compute also means many engines, such as Spark, Trino, and DuckDB, can query the same files.

The weakness is just as clear. Without discipline, lakes became **data swamps**: files nobody could identify, duplicated copies of uncertain freshness, inconsistent formats, and no record of who produced what. A lake also lacked the guarantees a database provides. Files could be read halfway through being written, two jobs could overwrite each other's output, and updating a single record meant rewriting whole files.

**Open table formats** fixed much of this and produced the *lakehouse*. Apache Hudi came from Uber, Apache Iceberg from Netflix, and Delta Lake from Databricks, all between 2016 and 2019. They keep data in Parquet files but add a layer of metadata describing exactly which files make up a table at each version:

- **Atomic commits.** A write produces new files and then swaps a pointer to new metadata in one step, so readers see the old version or the new one, never a mix, giving [[ACID]] behavior on plain object storage. Concurrent writers use [[Optimistic Locking]], retrying if someone else committed first.
- **Time travel.** Old versions stay readable through old metadata, since data files are never modified in place, as with [[Copy-on-Write]] and a [[Filesystem Snapshot]].
- **Schema changes.** Columns can be added, renamed, or retyped safely, as described under [[Schema Evolution]].
- **Row updates and deletes.** Supported by rewriting affected files or recording delete markers, important for honoring requests to erase [[Personal Data]].

Lakes are fed in batches and from [[Change Data Capture]] streams. Keeping a lake useful depends less on technology than on knowing where each dataset came from and who owns it, the role of [[Data Lineage]] and a data catalog.

## See also
- [[Columnar Storage]]
- [[ETL Pipeline]]
- [[Data Lineage]]
- [[Dimensional Modeling]]
