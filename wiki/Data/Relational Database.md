---
aliases:
  - SQL database
  - Postgres
tags:
  - data
summary: Data organised as tables with declared relationships, queried declaratively and guarded by constraints.
---
A **relational database** stores data as tables of rows and columns, with relationships expressed by keys and integrity enforced by declared constraints. It is queried declaratively: you describe the result you want and the engine chooses how to obtain it.

Its enduring advantage is that **correctness can be delegated to the schema**. A foreign key, a uniqueness constraint, or a not-null declaration is enforced for every writer, including the ones written years later by people who never read the original code. Application-level validation protects only the paths that go through it.

Transactions are the second pillar: a set of changes either all happen or none do, which is what makes multi-step operations safe under concurrency and failure.

Two things worth holding onto when working through an abstraction layer. The layer's update semantics are usually *partial* — an absent key means "leave this column alone", not "clear it" — so clearing a field means writing an explicit null, and deleting a key from an object before saving is a no-op that in-memory tests happily pass. And a mirrored copy of a database in an analytics warehouse can carry duplicate rows from the synchronisation process, so any count taken there should be de-duplicated before it is trusted.

## See also
- [[Database Migration]]
- [[Schema Drift]]
- [[Draft and Published]]
- [[Idempotence]]
- [[Multi-Tenancy]]

## Related
- [[Seed Data]]
- [[Headless CMS]]
- [[Feature Flag]]
