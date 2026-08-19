---
aliases:
  - Circuit Breaker Pattern
tags:
  - networks
summary: A circuit breaker stops calling a failing dependency, converting slow repeated failures into a fast, cheap one.
---
**A circuit breaker** is a client-side safeguard that stops sending requests to a dependency once it's clearly failing, rather than letting every caller retry against it and pile up. The name and mental model come from electrical circuit breakers: trip once, and stop the current until someone (or something) decides it's safe again.

It runs as a small state machine. **Closed** is the normal state — requests pass through, and failures are counted. Enough failures in a window trips it **open**, where calls fail immediately without ever touching the network, which is the whole point: an open breaker turns a slow timeout into an instant, cheap failure, and stops one struggling dependency from starving the caller's own thread pool or connection limit while it waits on doomed requests. After a cooldown the breaker goes **half-open** and lets a small number of test requests through; if those succeed, it closes again, and if they fail, it reopens the cooldown.

This is a different failure mode than a plain timeout. A timeout still pays the full wait on every call before giving up; a circuit breaker remembers that the dependency was failing and skips the wait entirely, which matters most under load — a slow database doesn't just get one request stuck, it gets every concurrent request stuck, and that's what actually takes a system down. It also complements [[Rate Limiting]] and [[Backpressure]]: rate limiting protects a service from too many callers, backpressure tells a caller to slow down, and a circuit breaker is the caller giving up on a dependency it decides isn't going to answer usefully anyway.

Circuit breakers are usually scoped per dependency, not globally — a failing payment provider shouldn't trip a breaker that also gates calls to an unrelated, healthy service.

## See also
- [[Backpressure]]
- [[Rate Limiting]]
- [[Load Balancing]]
- [[Race Condition]]
