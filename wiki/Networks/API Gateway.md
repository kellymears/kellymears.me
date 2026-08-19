---
aliases:
  - Edge Gateway
tags:
  - networks
summary: An API gateway is the single front door to a set of backend services, handling cross-cutting policy once instead of per-service.
---
**An API gateway** sits in front of a collection of backend services and gives clients one address and one contract to talk to, rather than making every client know where each individual service lives. It's the layer where cross-cutting concerns — authentication, [[Rate Limiting]], TLS termination, request logging, response caching — get handled once, centrally, instead of being reimplemented inside every service behind it.

This matters most once an architecture has split into many small services. Without a gateway, each service has to independently implement auth checks and rate limits, and clients need service discovery to find the right host for each call. With one, the gateway authenticates the request, decides whether it's within its quota, and then routes it — often by path prefix — to whichever backend actually owns it, translating a stable public API into an internal topology that's free to change without breaking anyone.

A gateway is also a natural place to put a [[Circuit Breaker]] per backend route, since it already sees every call to every service and can track failure rates without extra instrumentation. Similarly it can do request/response transformation — reshaping a legacy service's payload into the shape a public API promises — so the messiness of internal services never leaks to callers.

It's easy to conflate an API gateway with a plain [[Load Balancing|load balancer]], but they solve different problems: a load balancer picks *which instance* of a single service handles a request, while a gateway decides *which service* handles it at all, plus everything policy-related around that decision. Large systems typically have both — a gateway routing by API contract, and a load balancer behind each route spreading traffic across that service's instances.

## See also
- [[Rate Limiting]]
- [[Load Balancing]]
- [[Circuit Breaker]]
- [[Webhook]]
- [[Content Delivery Network]]
