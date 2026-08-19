---
aliases:
  - Queue
  - Pub/sub
tags:
  - data
summary: A buffer that decouples a producer from a consumer in time, so neither has to be up, fast, or reachable at the same moment.
---
A **message queue** sits between a producer and a consumer, holding messages until the consumer is ready to process them. Its core value is decoupling: the producer doesn't need the consumer to be running, reachable, or fast at the moment it sends — it hands the message to the queue and moves on, and the consumer picks it up whenever it can, at its own pace. That's a fundamentally different contract than a direct synchronous call, where the caller blocks until the callee finishes or errors.

Queues come with delivery guarantees that matter more than they first appear to. *At-most-once* delivery can silently drop a message on a crash. *At-least-once* — the far more common default (RabbitMQ, SQS, Kafka in most configurations) — guarantees a message is never lost but may be delivered more than once, typically when a consumer crashes after processing a message but before acknowledging it. That combination means any consumer built on an at-least-once queue must be written to be [[Idempotence|idempotent]], since redelivery isn't an edge case, it's the queue's normal operating mode.

**Pub/sub** is the closely related pattern of one message reaching many independent consumers instead of exactly one — a topic broadcasting to every subscriber rather than a queue handing a job to a single worker. Kafka blurs the line by keeping messages in an ordered, replayable log that many consumer groups can each read independently at their own position, which is also the foundation [[Event Sourcing]] and [[Change Data Capture]] pipelines are usually built on top of.

## See also
- [[Event Sourcing]]
- [[Change Data Capture]]
- [[Idempotence]]
- [[Eventual Consistency]]
- [[Backpressure]]
