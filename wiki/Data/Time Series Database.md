---
aliases:
  - TSDB
  - Time series
  - Downsampling
  - Cardinality explosion
  - Retention policy
tags:
  - data
summary: A database specialized for timestamped measurements, which arrive constantly, are rarely updated, are queried by time range, and compress extremely well.
---
A **time series database** (TSDB) stores measurements indexed by time: CPU usage every ten seconds, a sensor's temperature, a stock's price, a heart-rate trace from a ride. Each point is a timestamp, a value and a set of labels identifying the series, such as `host=web-3, region=us-east`. General-purpose databases can store this data, but its shape is so regular that specialized systems handle it orders of magnitude more efficiently.

The workload is unusual:

- **Write-heavy and append-only.** Points arrive constantly, almost always in time order, and are almost never updated.
- **Recent data is hot.** Dashboards and alerts query the last hour far more than last year.
- **Range queries and aggregation.** Typical queries ask for the average per minute over the past day, or the 99th percentile per host, not for individual rows.
- **Old data loses detail.** A per-second reading from last year matters less than the hourly trend.

Systems exploit each property. Data is partitioned by time into chunks, so recent chunks stay in memory and old ones can be compressed, moved to cheaper storage, or deleted whole under a **retention policy** instead of row by row. **Downsampling** replaces old raw points with per-minute or per-hour rollups, a kind of [[Materialized View]] computed as data ages. Storage is usually organized like [[Columnar Storage]], with timestamps and values stored apart.

Compression is the standout trick. Timestamps arriving at regular intervals have nearly constant differences, so storing the *difference between differences* takes about one bit per point. Consecutive values are often similar, so XORing each [[Floating-Point Arithmetic|floating-point]] value with the previous one leaves mostly zero bits. Facebook's Gorilla system (2015) used both tricks to shrink 16-byte points to under 1.4 bytes on average. See [[Data Compression]].

The lineage runs from RRDtool (1999), which kept fixed-size round-robin archives, through Graphite, InfluxDB, Prometheus and TimescaleDB, an extension that adds time partitioning to Postgres.

The common failure is **cardinality explosion**. Every unique combination of label values is a separate series with its own index entry. Adding a label like `user_id` or `request_id` turns a few thousand series into millions, and memory and query times collapse. Labels should identify *where* a measurement came from, from a small fixed set, while unbounded detail belongs in logs or traces.

Time series databases are the storage layer of [[Observability]]: metrics from [[Instrumentation]] land there, and alerting and [[Service Level Objective]] tracking query them. They also store IoT telemetry, financial ticks and fitness data such as power and heart rate, the raw material for metrics like [[Training Load]].

Two practical hazards: clocks on many machines disagree, so [[Network Time Protocol]] matters to anything that compares series. Storing timestamps in UTC and converting at display time avoids the [[Time Zone]] traps that surface around daylight-saving changes.

## See also
- [[Window Function]]
- [[Observability]]
- [[Bitemporal Data]]
- [[Prefix Sum]]
- [[ISO 8601]]
