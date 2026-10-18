---
aliases:
  - Stored procedures
  - Database trigger
  - Triggers
  - User-defined function
  - PL/pgSQL
tags:
  - data
summary: Code that lives and runs inside the database, from procedures called by name to triggers that fire on every change, and the long argument about how much logic belongs there.
---
A **stored procedure** is a named block of code stored in the database and run there, close to the data. Instead of sending several queries over the network and combining the results in the application, a client calls one procedure and the database does the work in a single round trip. Most databases have their own procedural language for this, such as PL/pgSQL in PostgreSQL and T-SQL in SQL Server, adding variables, loops, and error handling to [[Relational Database]] queries.

Close relatives share the idea:

- **User-defined functions** return a value and can be used inside queries, such as a function that normalizes email addresses before comparison.
- **Triggers** run automatically when rows are inserted, updated, or deleted. They are used to keep audit history, maintain derived columns, enforce rules too complex for a constraint, or refresh a [[Materialized View]].

The case for putting logic in the database:

- **Fewer round trips.** A loop that would issue hundreds of queries from the application, the [[N+1 Query Problem]], runs as one call.
- **Integrity no matter the client.** A rule enforced by a trigger or constraint holds for every application, script, and manual query, which is the same reason [[Foreign Key]] constraints exist.
- **Security.** Applications can be allowed to call specific procedures without direct access to the tables behind them, a form of [[Least Privilege]].
- **Atomicity.** A procedure runs inside one transaction, so the steps succeed or fail together, as [[ACID]] guarantees.

The case against is largely about the development workflow. Database code is harder to version, test, review, and deploy than application code. It often lives outside [[Version Control]] or is changed only through [[Database Migration]] files, which makes history harder to follow. Debugging tools are weaker, and every change risks schema drift between environments. Procedural database languages are also vendor-specific, which ties an application to one database. And triggers are invisible from the application: an update that quietly changes three other tables surprises the next developer, a kind of hidden coupling.

For these reasons the 2000s and 2010s swung toward keeping logic in the application, with the database as storage, often behind an [[Object-Relational Mapping]] layer. The pendulum has partly swung back. Constraints and simple triggers are widely seen as cheap insurance for data integrity, and some modern platforms put [[Row-Level Security]] policies and API logic directly in the database, generating endpoints from its schema.

A reasonable middle ground keeps business rules that must always hold, such as uniqueness, referential integrity, and audit records, in the database, and keeps workflows, integrations, and anything needing frequent change in the application. Whichever side holds the code, it needs tests, and [[Seed Data]] makes database logic testable.

## See also
- [[Query Planner]]
- [[Transactional Outbox]]
- [[Database View]]
- [[SQL Injection]]
