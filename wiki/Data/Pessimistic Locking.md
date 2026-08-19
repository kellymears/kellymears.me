---
aliases:
  - Pessimistic concurrency control
tags:
  - data
summary: Blocking every other writer up front for the duration of a transaction, betting that collisions are common enough to prevent rather than clean up.
---
**Pessimistic locking** takes a lock on a row (or a broader range) the moment a transaction intends to modify it, and holds that lock until the transaction commits or rolls back, so no other transaction can write — sometimes even read — the same data in the meantime. `SELECT ... FOR UPDATE` in a relational database is the usual entry point: it reads a row and simultaneously claims a lock on it, guaranteeing no other transaction can change it before this one finishes.

This is the opposite bet from [[Optimistic Locking]]: rather than letting everyone proceed and catching collisions at commit time, pessimistic locking prevents the collision from ever being possible, at the cost of every other writer queuing behind the lock even when a conflict was never going to happen. It's the right trade when contention on the same rows is genuinely common, or when the cost of a conflict discovered late — after a lot of wasted work, or a customer-visible inconsistency — is much higher than the cost of writers occasionally waiting.

Its characteristic failure mode is the **deadlock**: transaction A holds a lock on row 1 and waits for row 2, while transaction B holds row 2 and waits for row 1, and neither can ever proceed. Databases detect this pattern and forcibly abort one of the two transactions to break the cycle, which means code taking pessimistic locks has to be written to handle being killed and retried — the same discipline needed anywhere concurrent writers compete, just enforced by the database rather than left to occasionally corrupt data the way an unlocked [[Race Condition]] would.

## See also
- [[Optimistic Locking]]
- [[Race Condition]]
- [[ACID]]
- [[Two-Phase Commit]]
