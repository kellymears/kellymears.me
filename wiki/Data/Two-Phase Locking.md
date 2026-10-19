---
aliases:
  - 2PL
  - Strict two-phase locking
tags:
  - data
summary: The classic database rule for making concurrent transactions behave as if they ran one at a time, in which a transaction acquires all its locks before releasing any, at the cost of waiting and deadlocks.
---
**Two-phase locking**, or 2PL, is a rule for how database transactions take and release locks so that running them at the same time produces the same result as running them one after another. It was described in 1976 by Kapali Eswaran, Jim Gray, Raymond Lorie, and Irving Traiger at IBM, who proved that the rule guarantees that property, called serializability; see [[Isolation Level]].

Each transaction locks the data it touches. A shared lock lets several transactions read the same row at once; an exclusive lock, needed to write, admits only one holder. The rule divides a transaction's life into two phases. In the growing phase it may acquire locks but not release any. Once it releases its first lock, it enters the shrinking phase and may not acquire any more. That boundary ensures no other transaction can slip in between two of its operations and observe a half-finished state; see [[ACID]].

Basic 2PL allows locks to be released before the transaction commits, which creates a problem: another transaction might read a value that is later rolled back, forcing it to abort as well. Most real systems use **strict** two-phase locking, holding write locks until commit or abort, and many hold all locks until then. That's the form generally meant when a database is described as lock-based; see [[Pessimistic Locking]].

The price is waiting. A transaction that wants a row someone else has locked must block, and long transactions hold up everyone behind them, which is especially painful on heavily used rows; see [[Hot Partition]]. Worse, two transactions can each hold a lock the other needs, and neither can proceed; see [[Deadlock]]. Databases detect this by building a graph of who is waiting for whom and looking for a cycle, then aborting one transaction as the victim so the other can finish. Applications using 2PL databases must be ready to retry.

Locking individual rows isn't quite enough. A query for every order over a hundred dollars could be repeated and find a new row that another transaction inserted in between, a phantom. Preventing it requires locking ranges, not just existing rows, typically by locking gaps in an index; see [[Database Index]].

Many databases now avoid read locks altogether by keeping multiple versions of each row, so readers see a snapshot and never block writers; see [[Multiversion Concurrency Control]]. PostgreSQL's serializable level detects dangerous patterns among snapshot transactions instead of locking. MySQL's InnoDB engine and SQL Server still use locking for writes and for their strictest isolation. Other systems skip locks and check for conflicts at commit; see [[Optimistic Locking]].

Despite the similar name, two-phase locking is unrelated to the protocol for committing a transaction across several machines; see [[Two-Phase Commit]].

## See also
- [[Relational Database]]
- [[Lock-Free Data Structure]]
