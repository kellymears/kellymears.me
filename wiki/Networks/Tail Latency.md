---
aliases:
  - p99
  - p99 latency
  - Latency percentiles
  - The tail at scale
tags:
  - networks
summary: The slowest few percent of response times, which averages hide and which dominate the experience of large systems, because one request often waits on many others.
---
**Tail latency** is the response time of the slowest requests, usually measured as high percentiles: the 99th percentile, or **p99**, is the time within which 99 percent of requests finish, so the slowest 1 percent take longer. Averages hide the tail. A service whose median is 10 milliseconds can have a p99 of two seconds, and the average looks fine either way. Latency distributions are heavily skewed, so they are reported as percentiles, p50, p95, p99, p99.9, rather than means.

The tail matters more than its share suggests, for two reasons:

- **Users make many requests.** A page that loads 100 resources will almost certainly hit at least one p99 response.
- **Fan-out amplifies it.** When one request calls many backends in parallel and must wait for all of them, it is as slow as the slowest. If each server is slow 1 percent of the time, a request touching 100 servers is slow about 63 percent of the time. See [[Fan-Out and Fan-In]].

Jeff Dean and Luiz André Barroso described this in "The Tail at Scale" (2013), drawing on Google's experience: in large systems, rare slowness on individual machines becomes common slowness for users.

Causes of tail latency are usually brief and random rather than steady:

- **Pauses.** [[Garbage Collection]] stops, background jobs, and log rotation.
- **Queueing.** A burst briefly fills a queue, or a slow item blocks those behind it, [[Head-of-Line Blocking]].
- **Contention.** Noisy neighbors on shared hardware, lock waits, and a saturated [[Connection Pool]].
- **Cold paths.** A cache miss, a cold start, or a retransmitted packet in [[TCP and UDP]].

Dean and Barroso's remedies accept that variability can't be eliminated and work around it:

- **Hedged requests.** Send a request to one replica, and if it hasn't answered within, say, the p95 time, send it to a second and use whichever answers first.
- **Tied requests.** Send to two replicas at once, each told about the other, so the second cancels when the first starts.
- **Load-aware routing.** [[Load Balancing]] that prefers the least busy server, or picks the better of two at random, avoids sending work to a slow one.
- **Timeouts and degradation.** Return a partial answer instead of waiting for the last backend.

Measuring the tail takes care. Percentiles can't be averaged across servers, and many tools measure only from when a request was served rather than when it was sent, hiding queueing time, a flaw Gil Tene called *coordinated omission*. Good [[Observability]] keeps full histograms. Tail percentiles are the usual target of a [[Performance Budget]] and of [[Load Testing]], and [[Core Web Vitals]] are judged at the 75th percentile of real visits for a similar reason.

## See also
- [[Nagle's Algorithm]]
- [[Normal Distribution]]
- [[Inference Serving]]
- [[Hedged Requests]]
- [[Hot Partition]]
