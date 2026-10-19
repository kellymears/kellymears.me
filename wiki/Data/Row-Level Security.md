---
aliases:
  - RLS
  - Row-level access control
  - Security policy
tags:
  - data
summary: Database policies that filter which rows each user can see or change, enforced by the database on every query, so a forgotten WHERE clause in the application can't leak another tenant's data.
---
**Row-level security**, or **RLS**, lets a database decide which rows each user may read or modify. A *policy* attached to a table adds a condition, such as "the row's `tenant_id` matches the current user's tenant," and the database applies it to every query against that table automatically. A user who runs `SELECT * FROM invoices` sees only their own invoices, without the query saying so. PostgreSQL added it in version 9.5 in 2016, and SQL Server, Oracle, and others have equivalents.

Ordinary database permissions work on whole tables and columns: a role can read `invoices` or it can't. Most applications need finer control, with each user seeing a subset of the rows, so that filtering usually lives in application code as a `WHERE` clause added to every query. That works until someone forgets one. In a [[Multi-Tenancy]] system where customers share tables, one missing filter in a new endpoint, a report, or an admin script exposes one customer's data to another. RLS moves that rule into the database, where it applies to every path at once.

A policy has a few parts:

- **Which commands** it covers: reading, inserting, updating, deleting, or all of them.
- **Which roles** it applies to.
- **A visibility condition** that decides which existing rows a query can see.
- **A check condition** that decides which new or changed rows are allowed, so a user can't insert a row belonging to another tenant.

The condition needs to know who is asking. Applications that connect as a separate database role per user can rely on the role itself. More often, an application connects through a shared [[Connection Pool]] and sets a session variable, such as the current tenant ID, at the start of each transaction, and the policy reads it. Getting that setup wrong, or leaking the variable between pooled connections, defeats the scheme, so it deserves its own tests.

Trade-offs:

- **Performance.** A policy is one more predicate on every query. With a [[Database Index]] on the tenant column it's cheap, but a complex policy, especially one with subqueries, can confuse the [[Query Planner]].
- **Visibility.** Rows that silently vanish can make debugging confusing, and administrative roles usually bypass policies, which must be remembered when testing.
- **Defense in depth, not a replacement.** RLS backs up application checks rather than replacing them, in the same spirit as [[Least Privilege]].

Some backend platforms expose the database directly to browsers and rely entirely on RLS for authorization, typically checking a [[JSON Web Token]] issued at login. There, a missing policy is not a hidden bug but an open door, so policies are best written alongside schema in [[Database Migration]] files and reviewed like code.

## See also
- [[Data Masking]]
- [[Stored Procedure]]
- [[Data Governance]]
- [[Database Sharding]]
- [[Audit Log]]
- [[Mandatory Access Control]]
- [[Database View]]
