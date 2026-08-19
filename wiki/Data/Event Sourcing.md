---
aliases:
  - Event-sourced
tags:
  - data
summary: Storing every change that ever happened, instead of only the current state, so the current state becomes a derived view.
---
**Event sourcing** stores the full sequence of events that happened to a piece of data — `OrderPlaced`, `OrderShipped`, `OrderRefunded` — as the source of truth, rather than storing only the current row and overwriting it on each change. Current state is derived by replaying the events in order; it isn't stored independently at all, or if it is, it's a cache that could in principle be rebuilt from the log.

This inverts the usual relationship between a database's current state and its history. A conventional table with an `updated_at` column keeps the present and discards the past — the row before the last update is simply gone. Event sourcing keeps everything and treats the present as one particular view computed from it, which makes an audit log, a point-in-time reconstruction, or a "why does this order look like this" investigation a query against existing data rather than something that had to be anticipated and logged separately in advance.

The cost is that querying "current state" now requires either replaying potentially very long event histories, or maintaining a **read model** — a materialized, denormalized projection kept in sync with the event log — which is exactly the split that CQRS (command query responsibility segregation) names: writes go to the event log, reads go to a separately maintained projection built for the query pattern that needs it. [[Change Data Capture]] is the more common on-ramp to this idea in practice — it turns an ordinary database's own write history into the same kind of event stream, without requiring the whole system to be designed around events from the start.

## See also
- [[Change Data Capture]]
- [[Message Queue]]
- [[Write-Ahead Logging]]
- [[Denormalization]]
