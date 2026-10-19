---
aliases:
  - Admission control
  - Bulkhead
tags:
  - networks
summary: Deliberately turning away some requests when a service is overloaded so that it can keep serving the rest, choosing what to drop rather than letting everything slow down at once.
---
**Load shedding** is the practice of deliberately rejecting some work when a system has more than it can handle. The term comes from power grids, where operators cut power to some neighborhoods during a shortage to keep the grid from failing everywhere. A web service does the same with requests: refuse some quickly so the rest still succeed.

It seems backwards to reject requests on purpose, but the alternative is worse. A service that accepts every request under overload builds queues. Latency rises sharply as utilization approaches its limit; see [[Queueing Theory]]. Soon every request is slow, many exceed their callers' [[Timeout]] and are abandoned, and the service spends its capacity finishing work nobody is waiting for. Raw *throughput* may stay high while *goodput*, the useful work completed in time, falls toward zero. That's how overload becomes a [[Cascading Failure]].

Shedding keeps goodput up by rejecting early and cheaply. Turning a request away with an HTTP 503 or 429 takes microseconds; failing it after thirty seconds of work wastes everything spent on it. A `Retry-After` header tells well-behaved clients when to return; see [[Exponential Backoff]].

Deciding when to shed:

- **Static limits.** Cap concurrent requests or queue length. Simple, but the right number changes as code and hardware change.
- **Latency signals.** Shed when queueing delay exceeds a target, an idea borrowed from network routers that drop packets when their buffers hold traffic too long; see [[Congestion Control]].
- **Adaptive concurrency.** Adjust the limit continuously from observed latency, probing upward when responses are fast and backing off when they slow, much as TCP does.

Deciding what to shed matters as much. Not all requests are equal: a checkout or login matters more than a prefetch or analytics ping. Services tag requests by priority and drop the lowest first. Requests that have already waited too long can be dropped, since their callers have probably given up. Some services switch their queues to last-in, first-out under overload, so the freshest requests, whose callers are still waiting, get served.

**Bulkheads**, named for a ship's watertight compartments, apply the same thinking to isolation. Separate pools of threads, connections, or capacity for each dependency or customer mean one runaway client or slow dependency can exhaust only its own share. Per-client quotas are the long-term counterpart; see [[Rate Limiting]].

Load shedding works with other defenses rather than replacing them. [[Backpressure]] slows producers when the protocol allows it; a [[Circuit Breaker]] stops callers from hammering a service that's already failing; autoscaling adds capacity, but takes minutes, while shedding works instantly. A system shedding load is degrading gracefully: serving fewer users well instead of all users badly.

## See also
- [[Slashdot Effect]]
- [[Healthcare.gov Launch]]
- [[Maintenance Window]]
- [[Northeast Blackout of 2003]]
- [[Cloudflare Outage of 2019]]
- [[Amazon S3 Outage of 2017]]
- [[Resource Limit]]
