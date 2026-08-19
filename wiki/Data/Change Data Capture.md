---
aliases:
  - CDC
tags:
  - data
summary: Turning a database's own internal write log into a stream other systems can subscribe to, without touching the application.
---
**Change data capture** reads a database's own internal record of writes — usually its [[Write-Ahead Logging|write-ahead log]] — and turns it into a stream of change events that other systems can subscribe to: a row inserted, updated, or deleted, with the before and after values. Tools like Debezium tap Postgres's or MySQL's replication log the same way a replica would, but instead of applying the changes to another database, they publish each one onto a [[Message Queue]] like Kafka for anything downstream to consume.

The alternative it replaces is the application itself publishing an event every time it changes something — reliable in principle, but only if every single write path in the codebase remembers to do it, forever, including the migration script someone runs by hand at 2am. CDC instead reads from the log the database was already going to write regardless, so it captures every change with no cooperation required from application code, and nothing can slip through by omission.

This is what makes CDC the practical backbone for keeping a search index, a cache (see [[Cache Invalidation]]), or an analytics warehouse in sync with a primary database without dual writes — the well-known failure mode where an application writes to the database, then separately writes to the search index, and a crash between the two leaves them permanently disagreeing. CDC instead derives the second write from the first one's own durable log, so the two can never drift out of guaranteed order, only lag behind by some bounded delay — the same [[Eventual Consistency]] tradeoff [[Database Replication]] makes for the same underlying reason.

## See also
- [[Write-Ahead Logging]]
- [[Event Sourcing]]
- [[Message Queue]]
- [[Eventual Consistency]]
