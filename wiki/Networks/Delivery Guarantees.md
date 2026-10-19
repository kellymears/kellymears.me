---
aliases:
  - At-least-once delivery
  - At-most-once delivery
  - Exactly-once delivery
  - Message delivery semantics
tags:
  - networks
summary: The three promises a messaging system can make about whether a message arrives, at most once, at least once, or exactly once, and why the last is only possible as an effect.
---
**Delivery guarantees** describe what a messaging system promises about whether a message reaches its recipient. Networks lose messages, and senders crash. When a sender gets no acknowledgment, it can't tell whether the message was lost, the recipient crashed before processing it, or the acknowledgment itself was lost on the way back. Every guarantee is a decision about what to do with that ambiguity.

- **At-most-once.** Send once and never retry. Messages may be lost but are never duplicated. It suits data where a gap is harmless and a duplicate is not, or where freshness matters more than completeness, such as metrics samples and live position updates over [[TCP and UDP|UDP]].
- **At-least-once.** Retry until acknowledged. Messages are never lost, but a retry after a lost acknowledgment delivers the same message again. Most [[Message Queue]] systems and [[Webhook]] senders default to this.
- **Exactly-once.** Each message delivered and processed exactly once. It is what everyone wants, and in the strict sense across independent systems it is impossible.

The impossibility follows from the [[Two Generals Problem]]: two parties communicating over an unreliable channel can never be certain they agree, since every confirmation needs its own confirmation. A sender can't distinguish "processed but the acknowledgment was lost" from "never processed," so it must either risk losing the message or risk sending it twice.

What systems actually achieve is **exactly-once effect**: at-least-once delivery combined with processing that tolerates duplicates. The usual techniques:

- **Idempotent handlers.** Design the operation so that doing it twice gives the same result as doing it once, such as "set balance to 100" rather than "add 10." See [[Idempotence]].
- **Deduplication.** Attach a unique ID, often a [[Universally Unique Identifier]], to each message, record processed IDs, and skip repeats. An idempotency key on a payment API does exactly this.
- **Transactional processing.** Record the processing result and the "done" marker in the same transaction, as the inbox side of a [[Transactional Outbox]] does.

Products that advertise exactly-once semantics, such as Kafka's, provide this within their own boundaries, where they control both the log and the consumer's position. The guarantee ends at the boundary: a consumer that charges a card or sends an email outside that transaction is back to at-least-once. A [[Saga Pattern]] and [[Durable Execution]] frameworks build on the same foundation, retrying steps and relying on idempotence to make retries safe. The choice of guarantee also shapes [[Backpressure]] and [[Circuit Breaker]] behavior, since aggressive retries can turn one slow consumer into an overload.

## See also
- [[Pigeon Post]]
- [[MQTT]]
- [[Dead Letter Queue]]
- [[Pager]]
