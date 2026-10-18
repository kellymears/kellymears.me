---
aliases:
  - Event streaming
  - Kafka
  - Watermark
  - Event time
  - Kappa architecture
  - Lambda architecture
tags:
  - data
summary: Computing over data continuously as events arrive, rather than in periodic batches, which forces explicit decisions about time, windows, late data and state.
---
**Stream processing** computes results continuously over data that never ends: clicks, payments, sensor readings and database changes, handled as they arrive rather than gathered into periodic batches. Where a batch job reports on yesterday, a stream processor keeps its answer current within seconds.

Most modern systems sit on a durable, partitioned **log**. Apache Kafka, created at LinkedIn around 2011, stores events in order within each partition and keeps them for days or indefinitely. Consumers track their own position, so several can read the same stream independently, and any of them can rewind and reprocess. Unlike a classic [[Message Queue]], reading an event doesn't remove it. The log is the same idea that underlies [[Write-Ahead Logging]] and [[Event Sourcing]], applied between systems.

Streams force decisions about time that batches hide:

- **Event time and processing time.** An event happened at one moment and is processed at another. Aggregations should use event time, or the counts depend on network conditions.
- **Windows.** An endless stream has no total, so results are computed over windows: *tumbling* (fixed and adjacent, such as each minute), *sliding* (overlapping), or *session* (grouped by gaps in activity).
- **Watermarks.** A watermark is the system's estimate that no more events older than a given time will arrive, so a window can close and emit its result. Events after the watermark are *late*, and each pipeline must choose whether to drop them, update an earlier result, or send them aside.

Stream processors hold **state**, such as running counts and joins waiting for a matching event, and must not lose it when a machine fails. Frameworks such as Apache Flink take periodic consistent snapshots of all operators' state alongside their positions in the input log, and restore both together after a crash.

Delivery semantics matter too. Systems advertise "exactly once", but networks can only offer at-least-once delivery, as [[Delivery Guarantees]] explains. The effect becomes exactly-once when the output is written with [[Idempotence]] or in a transaction tied to the input position. When producers outpace consumers, [[Backpressure]] slows the source rather than letting buffers grow without limit.

Two architectures framed the debate. The *Lambda architecture* ran a batch layer for correct results and a streaming layer for fast approximate ones, which meant writing every computation twice. The *Kappa architecture* (2014) argued for streams only, reprocessing history by replaying the log through new code when logic changes.

Common uses include fraud detection, live dashboards, alerting, keeping search indexes and caches in sync through [[Change Data Capture]], and maintaining a continuously updated [[Materialized View]]. Metrics streams often land in a [[Time Series Database]]. Streaming has largely replaced the nightly batch [[ETL Pipeline]] where freshness matters, though batch remains simpler where it doesn't.

## See also
- [[Window Function]]
- [[Reservoir Sampling]]
- [[Big Data]]
- [[Delivery Guarantees]]
- [[HyperLogLog]]
