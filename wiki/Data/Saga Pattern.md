---
aliases:
  - Saga
  - Sagas
  - Compensating transaction
  - Choreography and orchestration
tags:
  - data
summary: Running a business transaction across several services as a sequence of local steps, each paired with a compensating action that undoes it if a later step fails.
---
A **saga** is a way to run a transaction that spans several services or databases without locking them all together. It breaks the work into a sequence of local transactions, one per service. Each step commits on its own. If a later step fails, the saga runs **compensating transactions** for the steps that already succeeded, in reverse order, to undo their effects. The idea comes from a 1987 paper by Hector Garcia-Molina and Kenneth Salem on long-lived database transactions, and it found a second life with microservices.

Booking a trip is the standard example: reserve a flight, then a hotel, then charge the card. If the charge fails, cancel the hotel and then the flight. The alternative, [[Two-Phase Commit]], would hold locks across all three services until everyone agreed, which is slow and fragile, and impossible when the services belong to different companies. A saga gives up isolation to gain availability. Between steps, other parts of the system can see the half-finished state: a reserved seat with no booking behind it.

Two coordination styles:

- **Choreography.** Each service listens for events and reacts, so the flight service's "reserved" event triggers the hotel service. There is no central coordinator, but the overall flow exists only implicitly across many services and is hard to follow or change.
- **Orchestration.** A central coordinator tells each service what to do next and tracks progress. The flow is explicit and easy to read, at the cost of one more component. [[Durable Execution]] engines are essentially saga orchestrators that survive crashes.

Sagas demand careful design:

- **Compensations aren't rollbacks.** An email already sent can't be unsent, only followed by an apology. Some actions can only be compensated semantically, such as a refund rather than an uncharged card.
- **Every step must be retry-safe.** Messages may be delivered twice, so steps and compensations need [[Idempotence]]. Steps usually communicate through a [[Message Queue]], published reliably with a [[Transactional Outbox]].
- **Order risky steps last.** Steps that can't be compensated, such as shipping, go at the end, after everything that might fail.
- **Intermediate states are visible.** Designs often add pending states, like a booking marked "pending" until the saga finishes, a concession similar to [[Eventual Consistency]].

The pattern accepts that distributed systems can't make several services behave as one atomic database, the lesson of [[ACID]] at scale and the [[CAP Theorem]], and replaces atomicity with a plan for undoing. [[Rollback]] in deployment follows the same reasoning.

## See also
- [[Microservices]]
- [[Command Query Responsibility Segregation]]
- [[Distributed Lock]]
- [[Idempotence]]
- [[Eventual Consistency]]
- [[Message Queue]]
