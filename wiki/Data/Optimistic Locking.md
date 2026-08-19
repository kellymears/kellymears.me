---
aliases:
  - Optimistic concurrency control
tags:
  - data
summary: Letting concurrent writers proceed unchecked and catching conflicts only at commit time, betting that collisions are rare.
---
**Optimistic locking** lets multiple transactions read and prepare to write the same row concurrently, without taking any lock up front, and only checks for a conflict at the moment of commit. The usual mechanism is a version number or timestamp column on the row: a transaction reads the row along with its current version, does its work, and on write includes a condition — "update this row only if its version still equals what I read" — that fails if anyone else committed a change in between. A failed check means the transaction retries against the fresh data rather than silently overwriting someone else's change.

This is the opposite bet from [[Pessimistic Locking]], which stops other writers from touching a row at all for the duration of one transaction. Optimistic locking bets that two transactions rarely touch the same row at the same moment, so paying nothing up front and occasionally retrying is cheaper overall than making every writer wait behind a lock most of the time for a collision that mostly doesn't happen. Under low contention this is a clear win — no lock overhead, no writer blocked by a slow reader — but under high contention on the same rows, retries pile up and it can perform worse than a lock would have, because every failed attempt has to redo its work from scratch.

It fits naturally with stateless web request handling, where a "lock," if taken, would have to be held across an HTTP request and a possibly slow or abandoned client — exactly the scenario pessimistic locking handles badly, since a lock held by a client that never comes back blocks everyone else indefinitely.

## See also
- [[Pessimistic Locking]]
- [[Race Condition]]
- [[ACID]]
- [[Idempotence]]

## Related
- [[Optimistic UI]]
