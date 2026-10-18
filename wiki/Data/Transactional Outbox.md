---
aliases:
  - Outbox pattern
  - Dual write problem
  - Inbox pattern
tags:
  - data
summary: Writing outgoing messages into the same database transaction as the state change they describe, so the two can never disagree, then publishing them separately.
---
The **transactional outbox** solves the **dual write problem**: a service needs to update its database and also publish a message about the change, to a [[Message Queue]], a [[Webhook]], or another service. Doing both directly is unsafe. If the database commit succeeds and the publish fails, the rest of the system never hears about the change. If the publish succeeds and the commit then fails, other services act on something that never happened. Retrying doesn't fix it, since the process can crash between the two steps. There is no shared transaction spanning a database and a message broker, short of [[Two-Phase Commit]], which most brokers don't support and few teams want.

The outbox removes the second write from the critical path. In the same database transaction as the business change, the service inserts a row describing the message into an `outbox` table. The [[ACID]] guarantees of that one transaction mean either both the change and the message are recorded, or neither is. A separate relay process then reads unsent rows from the outbox, publishes them, and marks them sent.

The relay can work in two ways:

- **Polling.** Periodically query the outbox for unsent rows. It is simple, though it adds a little latency and database load.
- **Log tailing.** Read new outbox rows straight from the database's replication log with [[Change Data Capture]]. It is lower latency and keeps load off the tables.

The relay can crash after publishing but before marking a row sent, so a message may be published twice. The outbox therefore gives *at-least-once* delivery, and consumers must handle duplicates, usually by tracking processed message IDs, often a [[Universally Unique Identifier]], in an **inbox** table, so that handling each message has [[Idempotence]]. Exactly-once delivery across systems is not on offer. Exactly-once *effect*, from at-least-once delivery plus idempotent consumers, is.

The outbox is a building block for larger patterns. A [[Saga Pattern]] uses it to send each step's commands reliably. [[Event Sourcing]] gets the same guarantee for free, since the event log *is* the state. [[Durable Execution]] frameworks apply the same idea of recording intent durably before acting, generalized to entire workflows.

## See also
- [[Stored Procedure]]
- [[Command Query Responsibility Segregation]]
- [[Idempotence]]
- [[Audit Log]]
- [[Durable Execution]]
