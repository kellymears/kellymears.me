---
aliases:
  - GraphQL schema
  - Over-fetching
  - Resolver
tags:
  - web
summary: A query language for APIs, released by Facebook in 2015, in which the client asks for exactly the fields it wants in one request, and the caching, performance, and security problems that flexibility moves to the server.
---
**GraphQL** is a query language for APIs in which the client writes a query describing exactly the data it wants, in the shape it wants, and the server returns that and nothing else. Facebook developed it in 2012 for its mobile apps and released it publicly in 2015.

It answered two problems with conventional REST APIs, where each URL returns a fixed resource; see [[Hypertext Transfer Protocol]]:

- **Over-fetching.** An endpoint returns the whole user record when a screen needs only a name and avatar, wasting bandwidth on mobile networks.
- **Under-fetching.** Showing a post with its author and comments takes several requests in sequence, each waiting on the last; see [[Latency and Jitter]].

A GraphQL query names the fields it needs, nested as deep as necessary: this post's title, its author's name, and the first ten comments with each commenter's avatar. One request, one response shaped like the query.

The server publishes a **schema** describing every type, field, and relationship, in a typed language; see [[Type System]]. Clients can inspect the schema at runtime, which powers autocomplete in query editors and generates exact [[TypeScript]] types for every query. Each field is backed by a **resolver** function that fetches its value, and the server assembles the result by walking the query.

The flexibility moves complexity to the server:

- **The N+1 problem.** Naively, resolving the author of each of fifty posts runs fifty separate lookups. Servers batch them with a loader that collects requests within one tick and fetches them together; see [[N+1 Query Problem]] and [[Event Loop]].
- **Caching.** Queries usually go through one URL as POST requests, so ordinary [[HTTP Caching]] and CDNs don't help. Clients keep their own normalized caches keyed by object ID, and servers use **persisted queries**, registered in advance and requested by hash, to make GET caching possible again.
- **Expensive queries.** A client can request deeply nested data that is costly to compute, accidentally or as an attack. Servers limit query depth and assign each query a cost budget; see [[Rate Limiting]] and [[Denial-of-Service Attack]].
- **Authorization.** Permissions must be checked per field, since any field is reachable through many paths.
- **Evolution.** Instead of versioning, GraphQL encourages adding fields and marking old ones deprecated; see [[Schema Evolution]] and [[Deprecation]].

GraphQL also works as a gateway: one schema stitching together many backend services, so clients see a single graph; see [[API Gateway]].

It's not always the right choice. For simple APIs, public data that benefits from HTTP caching, or teams where frontend and backend are the same people, plain REST or typed [[Remote Procedure Call]]s are simpler. Server components that fetch data on the server and send only what the page needs address the same over-fetching problem differently; see [[React Server Components]].

## See also
- [[API Versioning]]
