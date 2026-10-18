---
aliases:
  - Transaction isolation
  - Isolation levels
  - Serializable
  - Read committed
  - Snapshot isolation
  - Write skew
tags:
  - data
summary: How much concurrent transactions are allowed to see of each other's unfinished work, a dial between correctness and speed that most databases set lower than people assume.
---
An **isolation level** defines how much one database transaction can see of other transactions running at the same time. It is the "I" in [[ACID]]. Perfect isolation would make concurrent transactions behave as if they ran one after another, which is called being *serializable*. That is expensive, so databases offer weaker levels that allow some interference in exchange for speed.

The SQL standard defines levels by which *anomalies* they permit:

- **Dirty read.** Seeing another transaction's changes before it commits, changes that may then be rolled back.
- **Non-repeatable read.** Reading the same row twice in one transaction and getting different values, because someone committed in between.
- **Phantom read.** Running the same query twice and getting different sets of rows, because someone inserted a matching one.

The four standard levels, from weakest to strongest:

- **Read uncommitted** allows all three. Rarely used.
- **Read committed** prevents dirty reads. It is the default in PostgreSQL, Oracle, and SQL Server.
- **Repeatable read** also prevents non-repeatable reads. It is the default in MySQL's InnoDB.
- **Serializable** prevents every anomaly.

The standard's list turned out to be incomplete. A 1995 paper by Hal Berenson, Jim Gray, and colleagues showed that the definitions were ambiguous and described **snapshot isolation**, in which each transaction sees a consistent snapshot of the database as of its start, usually built on [[Multiversion Concurrency Control]]. Snapshot isolation prevents the three standard anomalies but allows a subtler one, **write skew**. Two doctors are on call, and the rule is that at least one must stay on. Each checks that the other is on call, sees yes, and goes off call. Each transaction was valid against its snapshot, they touched different rows so neither conflicted, and now nobody is on call.

Weak isolation causes real bugs. Classic examples include two withdrawals each checking a balance and both succeeding, two users claiming the last seat, or a read-modify-write counter that loses updates. These are a [[Race Condition]] at the database level, and they rarely appear in testing, since they need precise timing.

The fixes depend on the pattern:

- **Raise the level** to serializable for the transactions that need it, and retry when the database aborts one for conflicting.
- **Lock explicitly** with `SELECT ... FOR UPDATE`, a form of [[Pessimistic Locking]].
- **Detect conflicts** with a version column, [[Optimistic Locking]], and retry.
- **Use constraints** so the database itself refuses invalid states, such as a unique index on seat assignments.

Isolation is a single-database concern. Across replicas, the analogous guarantees are consistency models, discussed in the [[CAP Theorem]] and [[Eventual Consistency]], and across services there is no shared transaction at all, which is why [[Two-Phase Commit]] and the [[Saga Pattern]] exist.

## See also
- [[ACID]]
- [[Multiversion Concurrency Control]]
- [[Optimistic Locking]]
- [[Pessimistic Locking]]
- [[Linearizability Checking]]
- [[Distributed SQL]]
