---
aliases:
  - Normalization
  - Normal form
  - Normal forms
  - Third normal form
  - 3NF
tags:
  - data
summary: Organizing a relational schema so each fact is stored in exactly one place, which removes the contradictions that duplicated data invites.
---
**Database normalization** is the practice of structuring a relational schema so that each fact is stored once, in one place. Edgar Codd introduced it alongside the relational model around 1970 and 1971, and it is defined as a series of *normal forms*, each a stricter rule about how columns may depend on one another.

The motivation is a set of problems called *anomalies*, which appear when the same fact is copied across many rows. Picture an orders table that repeats the customer's name and address on every order:

- **Update anomaly.** The customer moves, and their address must be changed on every order. Miss one and the database now holds two addresses, with no way to tell which is right.
- **Insertion anomaly.** A new customer can't be recorded until they place an order, because there is nowhere else to put them.
- **Deletion anomaly.** Delete a customer's only order and the customer disappears too.

Splitting customers into their own table, with orders pointing to them by key, removes all three. That splitting is normalization. The first three normal forms cover most practical cases:

- **First normal form (1NF).** Every column holds a single value, not a list. Tags stored as a comma-separated string violate it, and belong in their own table.
- **Second normal form (2NF).** In a table whose key spans several columns, every other column depends on the whole key, not part of it.
- **Third normal form (3NF).** Non-key columns depend only on the key, not on each other. If a table stores both a zip code and the city it implies, the city belongs in a table keyed by zip code.

A popular summary of 3NF is that every column must depend on "the key, the whole key, and nothing but the key."

The links between normalized tables are enforced by a [[Foreign Key]], and queries reassemble the data with joins. That is the trade-off: normalized schemas are easy to keep correct but can need many joins to read. Read-heavy systems often reverse the process on purpose with [[Denormalization]], keeping redundant copies or a [[Materialized View]] for speed, and accepting the work of keeping them in sync.

Normalization is a form of the "single source of truth" principle found throughout software. The same thinking appears in a [[Design Token]] system, where each color is defined once, and in [[Event Sourcing]], where derived views are rebuilt from one authoritative log. Document databases and JSON columns invite denormalized designs, which is fine when data is read together, and a source of [[Schema Drift]] when it isn't. A [[Relational Database]] does its best work on a schema normalized first and denormalized only where measurements justify it, and a [[Database Migration]] is usually how that happens.

## See also
- [[Entity-Attribute-Value]]
- [[Dimensional Modeling]]
- [[Postal Address]]
- [[Tidy Data]]
- [[Entity-Relationship Model]]
