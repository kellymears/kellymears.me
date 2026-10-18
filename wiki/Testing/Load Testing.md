---
aliases:
  - Load test
  - Stress testing
  - Soak testing
  - Performance testing
  - Capacity testing
tags:
  - testing
summary: Simulating many users or requests at once to learn how a system behaves under pressure, where it breaks, and how it breaks.
---
**Load testing** measures how a system behaves when many users or requests hit it at once. Functional tests ask whether a feature works. Load tests ask whether it still works when ten thousand people use it simultaneously, and what happens to response times, error rates, and resources as demand climbs. The family has several members, distinguished by the question each answers:

- **Load test.** Run at expected peak traffic. Does the system meet its targets?
- **Stress test.** Push past capacity until something fails. Where is the limit, and does the system degrade gracefully or collapse?
- **Spike test.** Jump from quiet to heavy instantly, as after a launch or a viral post. Do autoscaling and caches keep up?
- **Soak test.** Hold a moderate load for hours or days. Slow problems such as a [[Memory Leak]], connection pool exhaustion, or growing log files only appear with time.

Results are reported as percentiles, not averages. A median response of 80 ms can hide a 99th percentile of four seconds, and at scale that slowest one percent is thousands of users. [[Latency and Jitter]] covers why the tail matters. Throughput is usually flat until a resource saturates, then latency rises sharply as requests queue, a knee that queueing theory predicts. Finding that knee is often the main result.

Load tests are notoriously easy to get wrong:

- **Unrealistic traffic.** Hammering one endpoint with identical requests mostly tests the cache. Real traffic mixes reads, writes, and expensive queries in uneven proportions.
- **The load generator is the bottleneck.** A single test machine may saturate its own CPU or network before the target does.
- **Coordinated omission.** A generator that waits for each slow response before sending the next quietly stops sending load exactly when the system is struggling, so the worst latencies never get measured.
- **Unrealistic environments.** A staging system with a small database and warm caches behaves nothing like production.

Load tests also check the protective machinery: [[Rate Limiting]], [[Backpressure]], [[Circuit Breaker]] trips, and [[Load Balancing]] all only show their worth under load. A test that overloads a system on purpose shades into [[Chaos Engineering]]. [[Resource Starvation]] and [[Race Condition]] bugs that never appear in development often surface here first.

## See also
- [[Queueing Theory]]
- [[Backpressure]]
- [[Bathtub Curve]]
- [[Circuit Breaker]]
- [[Benchmarking]]
- [[Chaos Engineering]]
- [[Connection Pool]]
- [[Database Index]]
