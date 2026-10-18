---
aliases:
  - Little's Law
  - Utilization
  - Kingman's formula
  - Erlang
tags:
  - networks
summary: The mathematics of waiting lines, which shows why delays explode as a server, network link, or team approaches full utilization, and why some slack is not waste.
---
**Queueing theory** is the mathematics of waiting in line. Wherever work arrives at something that serves it, such as packets at a router, requests at a server, customers at a counter, or tasks for a team, a queue forms whenever arrivals briefly outpace service. The theory predicts how long things wait and how long the line grows, and its central lesson runs against intuition: as utilization approaches 100 percent, waiting time doesn't grow steadily, it explodes.

The field began with Agner Krarup Erlang, an engineer at the Copenhagen Telephone Company, who published in 1909 on how many lines an exchange needed so callers rarely found them all busy. The unit of telephone traffic is named the erlang after him.

**Little's Law**, proved by John Little in 1961, holds for almost any stable system: the average number of items in the system equals the arrival rate times the average time each spends there. If a service handles 100 requests per second and each takes 0.2 seconds, about 20 are in flight at any moment. It needs no assumptions about distributions, which makes it useful for sizing a [[Connection Pool]], thread counts, or work in progress on a team: to cut delivery time, limit how much work is in progress at once.

The explosion comes from the utilization curve. In the simplest model, the average wait is proportional to *ρ* / (1 − *ρ*), where *ρ* is utilization:

- **At 50 percent**, the average wait equals one service time.
- **At 80 percent**, it is four times the service time.
- **At 90 percent**, nine times; at 95 percent, nineteen.
- **At 100 percent**, the queue grows without limit.

Variability makes it worse. John Kingman's 1961 approximation shows waiting also scales with how variable arrivals and service times are, so bursty traffic and occasional slow requests produce long queues even at moderate load. That is one source of [[Tail Latency]]: the slow requests are often the ones that waited behind others.

Lessons follow:

- **Keep headroom.** Systems that must respond quickly run well below full utilization, often 50 to 70 percent. Slack is not waste.
- **Pool servers.** One shared queue feeding several servers beats separate lines per server, as in a bank's single serpentine line. [[Load Balancing]] applies this to machines.
- **Bound queues.** An unbounded queue turns overload into unbounded delay. Better to reject early with [[Rate Limiting]] or push back with [[Backpressure]]. Oversized network buffers create exactly this problem, called bufferbloat, as described under [[Congestion Control]].
- **Beware retries.** Under overload, retries add arrivals, pushing utilization above 100 percent and causing collapse, why clients need [[Exponential Backoff]] and servers a [[Circuit Breaker]].

[[Load Testing]] finds the knee of the curve empirically, the point where latency suddenly climbs.

## See also
- [[Kanban]]
- [[Amdahl's Law]]
- [[Thundering Herd]]
- [[Message Queue]]
- [[Bandwidth]]
