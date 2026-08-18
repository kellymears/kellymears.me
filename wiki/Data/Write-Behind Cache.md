---
aliases:
  - Write-back cache
tags:
  - data
summary: A cache that acknowledges a write immediately and persists it to the real store later, trading durability for write latency.
---
A **write-behind cache** (also called write-back) accepts a write, acknowledges it to the caller immediately, and persists it to the underlying durable store asynchronously afterward, rather than waiting for that persistence to complete first. The write appears instantly fast from the caller's point of view, because the caller's request really does finish before the data has been made durable anywhere but the cache.

This is the opposite trade from a **write-through cache**, which writes to the durable store synchronously before acknowledging, and only then updates the cache — slower per write, but a write that returns success genuinely happened, since nothing was deferred. Write-behind is faster and can batch many writes into fewer, more efficient trips to the backing store, but it opens a durability gap: if the cache crashes or loses power before flushing a pending write, that write is gone, and the caller was already told it succeeded.

The gap is precisely why write-behind is reached for selectively rather than by default — it fits data where losing the last few seconds of writes on a crash is tolerable (view counts, non-critical telemetry, session activity) and is a poor fit for anything that needs [[ACID|durability]] guarantees, like a financial ledger entry. Systems that want the latency benefit without the loss risk typically pair it with a durable, replayable log ahead of the flush — the same role a [[Write-Ahead Logging|write-ahead log]] or [[Message Queue]] plays elsewhere — so a crash loses nothing, only delays it.

## See also
- [[Read Replica]]
- [[Write-Ahead Logging]]
- [[ACID]]
- [[Eventual Consistency]]
