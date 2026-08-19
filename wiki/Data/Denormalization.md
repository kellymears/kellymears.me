---
aliases:
  - Denormalized data
tags:
  - data
summary: Deliberately duplicating data to make reads faster, trading update complexity for query simplicity.
---
**Denormalization** deliberately duplicates data that a normalized schema would store in exactly one place, in order to make a read faster or simpler. A normalized order table stores a `customer_id` and joins out to the customer table for the name every time; a denormalized version also stores the customer's name directly on the order row, so displaying an order list needs no join at all — at the cost that if the customer changes their name, every order row that copied it is now out of date until something goes back and updates them all.

This is the deliberate opposite of normalization's actual goal, which is eliminating duplicate data so an update only ever has to happen in one place — the property that keeps a normalized database from developing internal contradictions. Denormalization trades that safety for speed, and it's a legitimate trade, not a mistake, when reads vastly outnumber writes or when a join would be too expensive to run on every request — which is why it shows up constantly in read models, caches, and search indexes rather than in a system's primary transactional tables.

The operational cost is that every denormalized copy is now a piece of data that can silently drift from its source of truth if the update path that's supposed to keep it in sync ever misses a case — the exact class of bug [[Change Data Capture]] and event-driven sync pipelines exist to prevent, by deriving every copy from the same underlying log rather than trusting application code to update them all by hand. A useful rule of thumb: normalize until it hurts, denormalize until it works, and never denormalize before measuring that the join was actually the bottleneck.

## See also
- [[Change Data Capture]]
- [[Database Replication]]
- [[Relational Database]]
- [[Event Sourcing]]
