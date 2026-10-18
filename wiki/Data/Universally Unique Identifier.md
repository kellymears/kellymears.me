---
aliases:
  - UUID
  - GUID
  - UUIDv7
  - Snowflake ID
  - Surrogate key
  - Auto-increment
tags:
  - data
summary: A 128-bit identifier that any machine can generate without coordination and still be practically certain no one else will produce the same one.
---
A **universally unique identifier (UUID)** is a 128-bit value, written as 32 hexadecimal digits in five groups, that can be generated independently by any machine with a negligible chance of colliding with any other. Microsoft calls them GUIDs. Their main use is identifying records, messages, files, and devices without a central authority handing out numbers.

The alternative is the **auto-incrementing integer**: the database assigns 1, 2, 3, and so on. It is compact, readable, and naturally ordered, but it has drawbacks:

- **It needs coordination.** Only the database knows the next number, so a client can't create an ID before saving, and sharded or offline systems can't generate IDs independently without collisions.
- **It leaks information.** Sequential IDs reveal how many orders or users exist and how fast they grow, and they invite users to guess other records' URLs, a risk if access checks are weak.
- **It collides on merge.** Two databases both have a record 42.

UUIDs remove the coordination. The common versions differ in how they get their uniqueness:

- **Version 4** is 122 random bits. Collisions are so improbable that a billion IDs per second would take about 85 years to reach even odds of one, provided the random source is good.
- **Version 7**, standardized in 2024, puts a millisecond timestamp in front of random bits, so IDs sort roughly by creation time.
- **Version 5** derives the ID from a hash of a name, so the same input always yields the same ID, a deterministic [[Hash Function]] use.

Sort order matters for databases. Random v4 IDs scatter inserts across a [[B-Tree]] index, splitting pages and wrecking cache locality, which slows writes on large tables. Time-ordered IDs, such as UUIDv7, ULID, and Twitter's Snowflake IDs (64 bits holding a timestamp, a machine number, and a sequence), append near the end of the index like an auto-increment does, while still being generated without coordination.

UUIDs let clients create records offline and sync later, as in [[Conflict-Free Replicated Data Type]] designs. They make operations safe to retry, since a request carrying its own ID can be deduplicated, which gives [[Idempotence]]. They also make [[Database Sharding]] and merging simple. The costs are size (16 bytes against 4 or 8), poor readability, and the false sense of security that unguessable IDs give. An unguessable ID is not access control.

## See also
- [[Hash Function]]
- [[B-Tree]]
- [[Idempotence]]
- [[Database Sharding]]
- [[Seeded Randomness]]
- [[Transactional Outbox]]
- [[Foreign Key]]
- [[Entity Resolution]]
- [[JSON]]
- [[Hot Partition]]
