---
aliases:
  - Load Balancer
tags:
  - networks
summary: A load balancer spreads requests across many backend instances, turning "one server" into "one address."
---
**Load balancing** is the practice of distributing incoming requests across multiple backend instances instead of sending them all to one machine, so that no single server becomes a bottleneck or a single point of failure. The load balancer itself becomes the address clients actually talk to, and it decides — per request or per connection — which backend handles it, using a strategy like round robin, least-connections, or consistent hashing.

The strategy choice matters more than it looks. Round robin is simple but ignores that requests aren't uniform cost, so a balancer that tracks active connections per backend (least-connections) handles uneven workloads better. Consistent hashing routes the same client, or the same cache key, to the same backend repeatedly — valuable when backends hold local state or a cache, since it turns "any backend can answer" into "this backend usually can," reducing cache misses without full stickiness.

Health checks are what make a load balancer more than a simple router: it polls each backend and stops routing to one that's failing, which is the mechanism that lets a fleet tolerate individual instance failures without the caller ever noticing. This pairs naturally with a [[Circuit Breaker]] on the client side — the load balancer removes a dead backend from rotation, while a circuit breaker stops a client from hammering a service that's failing entirely.

Layer 4 balancers work at the TCP/UDP level and just forward packets, cheap and protocol-agnostic; layer 7 balancers understand HTTP and can route on path, header, or cookie, which is what enables things like routing `/api/` to one fleet and static assets to another, or an [[API Gateway]] doing the same job with more policy attached. A [[Content Delivery Network]] is, in a sense, load balancing generalized across geography instead of just across a server rack.

## See also
- [[Circuit Breaker]]
- [[API Gateway]]
- [[Content Delivery Network]]
- [[Anycast]]
- [[Rate Limiting]]
- [[Consistent Hashing]]
