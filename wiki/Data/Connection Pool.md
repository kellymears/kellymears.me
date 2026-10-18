---
aliases:
  - Connection pooling
  - Pool exhaustion
  - PgBouncer
tags:
  - data
summary: A set of open database connections kept ready and lent out to requests, avoiding the cost of opening a new connection each time and capping load on the database.
---
A **connection pool** keeps a fixed set of open connections to a database (or any service) and lends them out to application code as needed. When a request needs the database, it borrows a connection, runs its queries, and returns it to the pool for the next request. Without a pool, each request opens a fresh connection and closes it afterward.

Opening a connection is expensive. It takes a TCP handshake, often a [[Transport Layer Security|TLS]] handshake, authentication, and session setup, which together can cost more than the query itself. On the database side, each connection consumes memory and, in PostgreSQL, a whole operating system [[Process]]. A database that comfortably runs a few hundred connections can fall over at a few thousand. Pooling solves both problems: setup cost is paid once, and the pool size caps how many connections the application can ever hold.

Pool sizing is counterintuitive. More connections are not faster. The database has a limited number of CPU cores and disks, so beyond a point, extra concurrent queries just contend with each other, adding locking, context switching, and cache thrashing. A widely cited rule of thumb sets the pool near twice the database's core count, far smaller than most people's instinct. Requests beyond that wait in a queue, which is better than overloading the database, a form of [[Backpressure]].

The common failures:

- **Pool exhaustion.** Every connection is checked out, and new requests wait until they time out. Causes include slow queries, leaked connections that were never returned, and long transactions holding a connection while waiting on something else, such as an external API call. It looks like an outage even though the database is healthy.
- **Too many pools.** Each application instance has its own pool, so twenty instances with 20 connections each means 400 connections. Serverless functions make this worse, since each instance may open its own. External poolers such as PgBouncer sit between apps and the database and share a small set of real connections among many clients.
- **Stale connections.** Network devices silently drop idle connections, so pools validate connections or recycle them on a schedule.

The pattern is general: thread pools, HTTP keep-alive, and object pools in games all trade a bounded set of reusable resources for repeated setup costs. [[Load Testing]] is where pool limits usually surface first, often as [[Resource Starvation]].

## See also
- [[Backpressure]]
- [[Resource Starvation]]
- [[Load Testing]]
- [[Relational Database]]
- [[N+1 Query Problem]]
- [[Circuit Breaker]]
- [[Rate Limiting]]
- [[Thundering Herd]]
- [[Queueing Theory]]
