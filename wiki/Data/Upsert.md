---
aliases:
  - Insert or update
  - ON CONFLICT
  - MERGE statement
tags:
  - data
summary: Inserting a row if it doesn't exist and updating it if it does, in one atomic statement, which is harder than it sounds because the obvious check-then-insert version races with itself.
---
An **upsert** writes a record by inserting it if it doesn't exist yet and updating it if it does. The word blends "update" and "insert." It is the natural operation for syncing data from elsewhere, loading a pipeline's output, or keeping a running count.

The obvious implementation is wrong. Code that first checks whether the row exists and then inserts or updates leaves a gap between the two steps. Two clients can both check, both find nothing, and both insert, producing a duplicate or an error. It is a textbook [[Race Condition]] of the [[Time-of-Check to Time-of-Use]] kind. A real upsert has to be a single atomic operation inside the database.

That requires a definition of "already exists," which comes from a unique [[Database Constraint]] on some column or set of columns, often a natural key such as an email address or an ID from an outside system. Databases spell it differently:

- **PostgreSQL** (since 2016) and **SQLite** use `INSERT ... ON CONFLICT (key) DO UPDATE`, with the proposed row available as `EXCLUDED`.
- **MySQL** uses `INSERT ... ON DUPLICATE KEY UPDATE`.
- **The SQL standard** has `MERGE`, which matches a source table against a target and applies different actions to matched and unmatched rows. It is powerful for bulk loads, but some implementations aren't safe under concurrency without extra locking.
- **[[Key-Value Store|Key-value stores]]** usually make every write an upsert, since putting a value at a key overwrites whatever was there.

Several details catch people out:

- **Replace is not update.** SQLite's and MySQL's `REPLACE` delete the old row and insert a new one, which fires delete triggers, cascades through [[Foreign Key|foreign keys]], and resets any columns not supplied.
- **Stale overwrites.** An upsert from a slow, out-of-order source can overwrite newer data with older. A condition such as "update only if the incoming timestamp is newer" prevents it; see [[Optimistic Locking]].
- **Sequence gaps.** Databases often reserve an auto-increment ID before discovering the conflict, so IDs skip numbers. That is harmless but surprises people who expected them to be contiguous.
- **Deadlocks.** Two large batches that upsert the same keys in different orders can [[Deadlock|deadlock]]. Sorting each batch by key first avoids it.

Upserts are what make a sync job safe to rerun. Running the same load twice leaves the same result, so a failure halfway through needs no cleanup; see [[Idempotence]] and [[ETL Pipeline]]. They also fit streams of changes copied from another database, where each event says what a row should now contain; see [[Change Data Capture]].

ORMs often offer a `findOrCreate` or `upsert` method. Some implement it as the racy check-then-insert, so it is worth reading what SQL they actually send; see [[Object-Relational Mapping]].

## See also
- [[Idempotency Key]]
- [[SQL]]
