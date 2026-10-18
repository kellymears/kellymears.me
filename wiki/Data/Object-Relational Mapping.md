---
aliases:
  - ORM
  - Object-relational mapper
  - Active Record pattern
  - Data mapper
  - Impedance mismatch
tags:
  - data
summary: A library that lets code treat database rows as ordinary objects, saving a great deal of boilerplate at the cost of hiding the queries that actually run.
---
An **object-relational mapping (ORM)** library translates between a program's objects and a [[Relational Database]]. Instead of writing SQL and copying result columns into variables by hand, a developer defines a `User` class, calls something like `User.find(42)`, and gets back an object whose properties map to the row's columns. Saving the object writes the changes back. Popular examples include Rails's Active Record, Django's ORM, Hibernate for Java, SQLAlchemy, Prisma, and Entity Framework.

ORMs exist because objects and tables don't fit together naturally, a problem known as the *object-relational impedance mismatch*. Objects have identity, inheritance, and references to other objects that form graphs. Tables have rows, keys, and [[Foreign Key]] relationships expressed through joins. Translating between them by hand is repetitive and error-prone.

Two main patterns, both named by Martin Fowler in 2002:

- **Active Record.** Each object wraps one row and knows how to save itself. Simple and quick to write, it ties the domain model closely to the table layout.
- **Data mapper.** Separate mapper objects move data between plain domain objects and the database, so the domain model knows nothing about persistence. More flexible and more complex.

The benefits are real. ORMs remove boilerplate, build parameterized queries that prevent [[SQL Injection]], generate a [[Database Migration]] from model changes, and let code compose queries from reusable pieces.

The criticisms are just as familiar. Ted Neward famously called object-relational mapping "the Vietnam of computer science" in 2006, a quagmire that is easy to enter and hard to leave. The common problems:

- **Hidden queries.** Accessing `post.author` looks like reading a property but may trigger a database query. In a loop over a hundred posts, that becomes a hundred queries, the [[N+1 Query Problem]]. ORMs offer *eager loading* to fetch related rows up front, but developers must know to ask for it.
- **Inefficient SQL.** Generated queries can select every column, join unnecessarily, or confuse the [[Query Planner]].
- **Leaky abstraction.** Transactions, locking, [[Isolation Level]] choices, and database-specific features still matter, so developers must understand SQL anyway, now through an extra layer.
- **Lazy loading surprises.** Related objects loaded on first access, a form of [[Lazy Evaluation]], may fail if the database session has already closed.

A middle ground has grown popular: *query builders* such as Knex and Kysely, and libraries that generate typed code from handwritten SQL, keep the queries visible while still avoiding string concatenation. Most teams that use a full ORM drop down to raw SQL for reports and hot paths.

Choosing an ORM shapes a codebase for years, much like choosing a framework. Its models often become the de facto domain model, and the database schema evolves with it, which is how [[Schema Drift]] between code and database tends to begin.

## See also
- [[Document Database]]
- [[Relational Database]]
- [[Query Planner]]
- [[Database Migration]]
- [[SQL Join]]
