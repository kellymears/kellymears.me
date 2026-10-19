---
aliases:
  - Partial failure
  - Fail-slow
tags:
  - networks
summary: A failure that some observers see and others don't, such as a server that passes its health checks while failing real requests, the kind of fault that large systems handle worst because their detectors report everything as fine.
---
A **gray failure** is a fault that appears differently to different observers. A server might answer the monitoring system's health checks perfectly while timing out on a fraction of real requests, or a network link might pass small probe packets while dropping larger data packets. The system's own failure detector concludes nothing is wrong, while the applications using it suffer.

The term was popularized by a 2017 paper from Microsoft researchers describing problems in large cloud systems. Its central idea is **differential observability**: a failure is gray when the component responsible for detecting faults and the components that depend on it see different things. Clean crashes, which every observer agrees on, are what most fault-tolerance designs handle; see [[Failure Detection]].

Common examples:

- **Slow disks.** A drive that retries reads internally still returns correct data, only far more slowly, so it is never marked as failed; see [[Hard Disk Drive]].
- **Partial network faults.** A faulty cable or switch port drops a small percentage of packets, enough to wreck throughput but not enough to break connectivity; see [[Packet Loss]].
- **Shallow health checks.** A check that only confirms a process is running misses a process whose database connection pool is exhausted.
- **Resource exhaustion.** A node that has run out of memory or file handles accepts connections and fails the work.

A related category, **fail-slow** hardware, describes components that keep working at a fraction of their normal speed. Studies of large clusters found such components common, and found that one slow node can drag down a whole distributed job that waits on its slowest member; see [[Tail Latency]].

Gray failures are dangerous partly because of how systems respond to them. A load balancer that sees a healthy server keeps sending it traffic. Retries pile onto a struggling component and make things worse. When the fault finally does become visible, it can trigger failover all at once; see [[Load Balancing]] and [[Cascading Failure]].

Remedies focus on observing from where the pain is felt:

- **Client-side signals.** Track error rates and latency as callers experience them, and treat a component that's consistently worse than its peers as suspect; see [[Observability]].
- **Deeper probes.** Health checks that perform real work, such as a test query, catch more than checks that only confirm a response.
- **Defensive callers.** Timeouts, hedged requests, and circuit breakers limit the damage from a component that is slow rather than dead; see [[Timeout]], [[Hedged Requests]], and [[Circuit Breaker]].

Fault injection that slows or degrades components, not just kills them, exposes gray failures before production does; see [[Chaos Engineering]]. The broader lesson echoes studies of accidents in complex systems: the failures that matter most are the ones a system wasn't designed to notice; see [[Normal Accidents]].

## See also
- [[Byzantine Fault Tolerance]]
- [[Fallacies of Distributed Computing]]
