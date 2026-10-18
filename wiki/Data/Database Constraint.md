---
aliases:
  - Check constraint
  - Unique constraint
  - Integrity constraint
tags:
  - data
summary: Rules declared in the schema that the database itself enforces on every write, such as uniqueness, required values, and allowed ranges, so bad data is refused at the door rather than cleaned up later.
---
A **database constraint** is a rule about the data that the database itself enforces on every write. If an insert or update would break it, the database rejects the statement and the transaction fails. Constraints are declared once, in the schema, and hold no matter which application, script, or person is writing.

The standard kinds in a [[Relational Database]]:

- **NOT NULL.** The column must have a value; see [[Null]].
- **Unique.** No two rows may share the value, or the combination of values, in these columns. Databases enforce it with an index, which is why a unique constraint also speeds lookups; see [[Database Index]].
- **Primary key.** Unique and not null together, the row's identity.
- **Foreign key.** The value must match a row in another table, which prevents orphans; see [[Foreign Key]].
- **Check.** An arbitrary condition on the row, such as `price >= 0` or `end_date > start_date`.
- **Exclusion.** Offered by some databases, it forbids any two rows that conflict under an operator, such as two bookings of one room with overlapping time ranges.

The case for constraints is that application checks are not enough. Validation code in one service doesn't cover the import script, the admin console, or the next service someone writes. Two requests checking "is this email taken?" at the same moment can both see no and both insert, a race only a unique constraint closes; see [[Race Condition]]. The database is the one place every write must pass through.

This is the same idea as an [[Invariant]] in code, enforced at the storage boundary. It pairs well with a strong [[Type System]]: types reject impossible values inside the program, constraints reject them at rest. Constraints also document intent. A reader of the schema learns that quantity is never negative without hunting through code; see [[Documentation Rot]].

The costs are real but usually small:

- **Write overhead.** Each insert checks every constraint. Foreign keys need an index on the referencing column or deletes in the parent table get slow.
- **Migrations.** Adding a constraint to a large table scans every existing row, and fails if old data breaks it. Many databases allow adding it as "not valid" first, enforcing it for new writes, then validating the backlog later; see [[Database Migration]].
- **Error handling.** A constraint violation surfaces as a database error the application must translate into a useful message.

Some teams leave constraints out, arguing the application owns the rules or that sharding makes foreign keys impossible; see [[Database Sharding]]. The usual result is data that slowly fills with orphans and duplicates, discovered later and fixed by hand; see [[Data Cleaning]].

## See also
- [[Database Normalization]]
- [[Data Contract]]
- [[ISBN]]
- [[Upsert]]
