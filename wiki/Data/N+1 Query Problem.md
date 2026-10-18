---
aliases:
  - N+1 queries
  - N plus one
  - Eager loading
  - Dataloader
tags:
  - data
summary: Fetching a list with one query and then each item's related data with one more query apiece, so a page that looks like one request makes hundreds.
---
The **N+1 query problem** is a performance bug in which code fetches a list of records with one query, then loops over the list and runs a separate query for each record's related data. Showing 50 blog posts with their authors becomes 1 query for the posts plus 50 queries for authors: N+1 round trips where 2, or 1, would do. Each query is fast, so nothing looks wrong in isolation. Together they add up to hundreds of milliseconds of network latency per page, and the total grows with the size of the list.

It is the classic hazard of [[Object-Relational Mapping|object-relational mappers]] (ORMs), which make related data look like ordinary properties. Writing `post.author.name` in a template reads like accessing a field, but with *lazy loading* it silently issues a query the first time it is touched. The code is clean and obviously correct, and the database traffic is invisible unless someone looks. It also appears in GraphQL resolvers, which naturally fetch each field independently, and in microservice architectures as N+1 network calls instead of queries.

The fixes all batch the related lookups:

- **Eager loading.** Tell the ORM up front which relations to fetch. It runs one query for posts and one for all their authors with `WHERE id IN (…)`, or a single join.
- **Joins.** Fetch everything in one query, at the cost of duplicated parent data in each row.
- **Batching loaders.** The *dataloader* pattern, from GraphQL, collects every lookup requested during one tick of the [[Event Loop]] and issues one combined query, then hands each caller its result. It also deduplicates repeated keys, a form of [[Memoization]].
- **Denormalizing** frequently read related data into the parent, through [[Denormalization]] or a [[Materialized View]].

Detection is the harder half. Query logs that count queries per request, test assertions on query counts, and ORM warnings for lazy loads in loops all help. The problem tends to hide in development, where lists are short and the database is local, and appear in production with long lists and real network latency, the same shape as a missing [[Database Index]].

The pattern isn't unique to databases. [[Layout Thrashing]] in the browser is the same mistake, interleaving reads and writes inside a loop so each step pays a full round of work. Any loop that hides an expensive call behind a cheap-looking interface invites it, a reminder from [[Big-O Notation]] that the cost of each step matters as much as the count.

## See also
- [[Stored Procedure]]
- [[Leaky Abstraction]]
- [[SQL Join]]
- [[GraphQL]]
- [[Lazy Loading]]
- [[Connection Pool]]
- [[Draw Call]]
