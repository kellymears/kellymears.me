---
aliases:
  - Thundering herd problem
  - Cache stampede
  - Dogpile effect
  - Request coalescing
  - Retry storm
tags:
  - networks
summary: Many clients or processes waking up and rushing a resource at the same instant, overwhelming it, as when a popular cache entry expires or a server comes back from an outage.
---
A **thundering herd** happens when a large number of processes or clients are triggered by the same event and all rush at a resource at once, even though only one, or a few, can usefully act. The resource is swamped, often failing in a way that triggers the next herd.

The name comes from operating systems. When many processes waited on the same network socket and a connection arrived, older Unix kernels woke all of them. One won the connection and the rest went back to sleep, having wasted CPU time. Linux added mechanisms to wake only one waiter, but the pattern recurs at every scale.

Common forms:

- **Cache stampede.** A popular cache entry expires, and every request that would have hit it now misses at once and goes to the database to rebuild it. The database, sized for the cache's hit rate, collapses. See [[Cache Invalidation]].
- **Reconnect storms.** A server restarts and every client reconnects in the same second, or a [[Connection Pool]] refills all at once after a network blip.
- **Synchronized retries.** Clients that fail together and retry on the same fixed schedule hit the service in waves, keeping it down.
- **Clock-aligned jobs.** Thousands of machines run a [[Cron]] job at exactly midnight or on the hour, and a shared service sees a spike at the same moment every day.

The defenses share a theme: break the synchronization, or let one actor do the work for the rest.

- **Jitter.** Add randomness to retry delays, expiration times, and schedules. [[Exponential Backoff]] with jitter spreads retries out, and randomized cache lifetimes stop many entries expiring together.
- **Request coalescing.** When many requests want the same missing item, let one fetch it while the others wait for that result. This *single-flight* pattern is common in caching proxies and a [[Content Delivery Network]].
- **Serve stale while refreshing.** Keep returning the old value while one request refreshes it in the background, the approach of `stale-while-revalidate` in [[HTTP Caching]] and of [[Incremental Static Regeneration]].
- **Early refresh.** Refresh popular entries a little before they expire, with probability rising as expiry approaches, so one request renews it before the herd forms.
- **Admission control.** [[Rate Limiting]], [[Backpressure]], and a [[Circuit Breaker]] cap how much load reaches the recovering system, buying it time.

Thundering herds are a classic reason systems fail during recovery rather than during the original incident. [[Load Testing]] rarely reproduces them unless it simulates a cold start, and [[Chaos Engineering]] experiments that restart dependencies are a good way to find them. [[Load Balancing]] can't help much, since every backend receives the same surge at the same time.

## See also
- [[Cache-Aside]]
- [[Feedback Loop]]
