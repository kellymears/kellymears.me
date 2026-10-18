---
aliases:
  - CQRS
  - Write model
  - Command-query separation
tags:
  - data
summary: Splitting a system's model for changing data from its models for reading it, so each can be shaped for its job, at the cost of keeping them in sync and accepting that reads may lag behind writes.
---
**Command Query Responsibility Segregation** (CQRS) is an architecture that uses one model to change data and separate models to read it. Commands, such as "place order" or "cancel subscription," go to a *write model* that validates them and enforces business rules. Queries, such as "show my order history," go to *read models* shaped for exactly what each screen or report needs.

The name extends an older principle, command-query separation, from the language designer Bertrand Meyer: a method should either change state or return a value, never both. Greg Young applied the idea to whole systems around 2010.

The motivation is that reading and writing pull a data model in opposite directions:

- **Writes need integrity.** The write model should be normalized, so each fact lives in one place, and should enforce invariants such as "an order can't ship before it's paid"; see [[Database Normalization]].
- **Reads need shape and speed.** A dashboard wants data pre-joined, pre-aggregated, and denormalized into exactly the form it displays; see [[Denormalization]].

A single model compromises both. Queries end up with many joins, and the write model accumulates columns that exist only to make some screen fast; see [[N+1 Query Problem]]. CQRS stops forcing one structure to serve both.

In practice, the write side records each change, and those changes are used to update one or more read models, often stored as a [[Materialized View]] or in a different database entirely: a search index for text queries, a [[Key-Value Store]] for fast lookups, a columnar store for analytics; see [[Columnar Storage]]. Changes typically flow through a [[Message Queue]] or are captured from the database's log; see [[Change Data Capture]].

CQRS is often paired with [[Event Sourcing]], where the write side stores the sequence of events itself rather than current state. The events become the natural feed for building read models, and new read models can be built later by replaying history. The two are independent, though.

The costs:

- **Eventual consistency.** Read models update after the write commits, so a user may save a change and not see it on the next screen. Interfaces handle this with [[Optimistic UI]], by reading their own writes from the write side, or by waiting for the read model to catch up; see [[Eventual Consistency]].
- **Complexity.** Two or more models, the code to synchronize them, and the failure modes when synchronization breaks.
- **Duplication.** The same data stored several times in different shapes.

Martin Fowler warns that most systems don't need CQRS. It earns its place in parts of a system with complex rules, very different read and write loads, or many differently shaped views of the same data. Milder forms are common without the name: a [[Database Replication]] read replica for reporting, or a cache in front of expensive queries.

## See also
- [[Saga Pattern]]
- [[Transactional Outbox]]
- [[Microservices]]
