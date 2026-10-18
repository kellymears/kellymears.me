---
aliases:
  - TTL
  - Hop limit
  - Traceroute
  - Expiry
tags:
  - networks
summary: A limit on how long something may live, counted in hops or seconds, which keeps lost packets from circling forever and tells caches when their copies go stale.
---
A **time to live (TTL)** is a limit on how long a piece of data may exist or be trusted before it is discarded or refreshed. The term covers two related ideas in networking, one counted in hops and one in seconds, and spread from there to caches, sessions, and storage.

**In IP packets**, the TTL is a counter in each packet's header, usually starting at 64 or 128. Every router that forwards the packet subtracts one, and a router that brings it to zero drops it and sends an error back to the sender. The point is protection against routing loops: without a limit, a misrouted packet could circle between routers forever, and enough of them would choke the network. The original 1981 IPv4 specification defined the field in seconds, but since every router subtracted at least one, it became a hop count in practice, and [[IPv6]] renamed it the *hop limit*.

That error message made possible a well-known diagnostic. **Traceroute**, written by Van Jacobson in 1987, sends packets with TTL 1, then 2, then 3, and so on. Each one expires one router further along, and each router's error reply reveals its address and round-trip time, mapping the path hop by hop. It is a staple for finding where [[Latency and Jitter]] creep in or where a route breaks, as with a [[Border Gateway Protocol]] misconfiguration.

**In caching**, a TTL says how many seconds a copy may be used before it must be fetched again:

- **DNS records** carry a TTL that tells resolvers how long to cache an answer. A long TTL reduces lookups but delays changes, so administrators lower TTLs a day or two before moving a service. See [[Domain Name System]].
- **HTTP responses** use `Cache-Control: max-age` as a TTL for browsers, a [[Content Delivery Network]], and a [[Reverse Proxy]], central to [[HTTP Caching]].
- **Application caches** such as Redis let each key expire after a set time.

TTLs are the simplest answer to [[Cache Invalidation]], one of the famously hard problems in computing: rather than tracking every change, accept data that may be stale for at most the TTL. Short TTLs mean fresher data and more requests, while long TTLs mean less load and slower propagation of changes. When many entries share an expiry moment, they all miss together and trigger a [[Thundering Herd]], which is why TTLs are often randomized slightly.

The same idea covers other expiring things: session tokens and [[OAuth]] access tokens that stop working after an hour, signed URLs, lock leases in [[Leader Election]], [[Message Queue]] messages that are dropped if not consumed in time, and records that a database deletes automatically after a set age.

## See also
- [[DNS Cache Poisoning]]
- [[Cache Invalidation]]
- [[IP Routing]]
