---
aliases:
  - Hedged request
  - Request hedging
  - Tied requests
tags:
  - networks
summary: Sending a backup copy of a slow request to a second server and using whichever answers first, a cheap way to cut the rare very slow responses that dominate latency in large systems.
---
A **hedged request** is a duplicate of a request sent to a second server when the first hasn't answered quickly. The client uses whichever response arrives first and cancels or ignores the other. The idea, popularized by Jeffrey Dean and Luiz André Barroso in their 2013 paper "The Tail at Scale," attacks the slowest responses rather than the average.

Those slow responses matter more than they seem. Any single server is occasionally slow for reasons unrelated to the request: garbage collection pauses, a background job, a noisy neighbor on shared hardware, a dropped packet; see [[Garbage Collection]]. If one server is slow 1 percent of the time, a page that waits on 100 servers will hit at least one slow one on most loads. In systems that fan out widely, the rare delay becomes the common case; see [[Tail Latency]] and [[Fan-Out and Fan-In]].

Hedging exploits the fact that these delays are usually random and independent. If the first server is having a bad moment, a second one probably isn't. The trick is to avoid doubling the load:

- **Wait before hedging.** Send the backup only after the first request has been outstanding longer than, say, the 95th percentile latency. Then only about 5 percent of requests get a second copy.
- **Cancel the loser.** When one copy answers, tell the other server to stop.

Dean and Barroso reported a benchmark reading 1,000 values spread across 100 servers: hedging after a 10-millisecond delay cut the 99.9th-percentile latency from 1,800 milliseconds to 74, at the cost of about 2 percent more requests.

**Tied requests** go further. The client sends the request to two servers at once, each told about the other. Whichever begins processing first tells its twin to cancel. Because most of a slow request's time is spent waiting in a queue, this captures most of hedging's benefit while rarely doing the work twice.

Hedging has limits and risks:

- **Idempotence.** Two copies may both execute. That's safe for reads and dangerous for writes such as charging a card; see [[Idempotence]].
- **Overload.** If a server is slow because the whole system is overloaded, hedging adds load and makes things worse. Hedges need a budget, such as a cap on what fraction of traffic they can be, so they can't amplify into a [[Cascading Failure]].
- **Correlated slowness.** When every replica is slow for the same reason, a second copy waits just as long.

Related techniques work at other layers. Some storage systems read from extra replicas or use erasure-coded fragments, finishing once enough pieces arrive; see [[Error-Correcting Code]]. The general lesson from tail-tolerant design is to accept that some components will always be slow and design around it, using [[Load Balancing]] and redundancy rather than chasing every source of delay.

## See also
- [[Timeout]]
- [[Queueing Theory]]
- [[Exponential Backoff]]
