---
aliases:
  - CDN
tags:
  - networks
summary: A CDN answers requests from servers near the requester, trading a single origin for many cached edges.
---
**A content delivery network** is a distributed set of edge servers that cache and serve content close to the requester instead of routing every hit back to one origin. The win is latency — fewer network hops and less contention — and resilience, since the origin only has to handle cache misses and can survive a traffic spike that would otherwise flatten it directly.

Routing a request to the "nearest" edge is itself an interesting problem, and CDNs mostly solve it with [[Anycast]] or with [[Domain Name System]] tricks: the same IP address is announced from many locations, and normal internet routing (BGP) sends each client to whichever announcement is topologically closest, with no client-side logic involved. Some CDNs instead run DNS resolvers that return different edge IPs depending on where the query came from — geolocation by resolver, not by packet.

Caching introduces its own correctness problems. Static assets (images, JS bundles) are easy — hash the filename and cache forever. Anything personalized or frequently updated needs cache invalidation, which is famously one of the two hard problems in computer science. CDNs handle this with TTLs, purge APIs, and increasingly with edge compute — small pieces of application logic (auth checks, A/B routing, header rewriting) that run at the edge instead of the origin, blurring the line between "CDN" and "distributed platform."

The tradeoff CDNs make explicit is between consistency and locality: an edge node can serve a slightly stale copy fast, or fetch a fresh one slowly. That's the same tension [[Eventual Consistency]] names in distributed databases, just applied to HTTP responses instead of replicated state.

## See also
- [[Anycast]]
- [[Domain Name System]]
- [[Load Balancing]]
- [[Eventual Consistency]]
- [[API Gateway]]

## Related
- [[DNS over HTTPS]]
