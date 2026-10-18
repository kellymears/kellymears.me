---
aliases:
  - Cascading failures
  - Metastable failure
  - Retry amplification
tags:
  - networks
summary: How one overloaded component pushes its load onto others until the whole system falls over, why the collapse often outlasts its cause, and the defenses that keep a local fault local.
---
A **cascading failure** happens when the failure of one part of a system pushes work onto the parts that remain, overloading them in turn until the whole system collapses. The trigger is often small; the damage comes from coupling.

The classic example is a power grid. In the 2003 Northeast blackout, a few transmission lines in Ohio sagged into trees and tripped offline. Their power flow shifted onto neighboring lines, which overheated and tripped too. Within minutes, 50 million people had lost power.

Software systems fail the same way:

- **Load redistribution.** One of four servers crashes, and a load balancer spreads its traffic over the other three. If each was running at 80 percent, each now needs about 107 percent, and they fall over one by one; see [[Load Balancing]].
- **Retry amplification.** A slow service makes callers time out and retry. Each retry is new load on a service that's already struggling. With three layers of services, each retrying three times, one user request can become 27 at the bottom; see [[Thundering Herd]].
- **Resource exhaustion.** A hung dependency ties up threads and connections in every caller while they wait. Callers run out of capacity for unrelated requests, and the failure spreads upstream; see [[Timeout]] and [[Connection Pool]].
- **Queue buildup.** Overloaded services build queues, and latency grows sharply as utilization nears 100 percent; see [[Queueing Theory]]. By the time requests reach the front, their callers have given up, so the system spends its capacity on work no one will use.

The hardest cases are **metastable failures**: the system stays down after the trigger is gone. A brief spike causes timeouts, the timeouts cause retries, and the retries sustain the overload indefinitely. The feedback loop has become self-sustaining. Recovery often requires shedding nearly all traffic and bringing it back slowly, because restarting into the same load just repeats the collapse.

Defenses aim to break the feedback loops:

- **Bounded retries.** Retry with [[Exponential Backoff]] and jitter, and cap retries as a fraction of total traffic, a retry budget.
- **Fail fast.** A [[Circuit Breaker]] stops calling a failing dependency so callers don't pile up waiting.
- **Shed load.** Reject excess requests early and cheaply rather than accept them all and serve none well; see [[Load Shedding]].
- **Isolation.** Separate resource pools for different dependencies or customers, called bulkheads after a ship's watertight compartments, keep one flood from sinking everything.
- **Headroom.** Running with spare capacity means losing one instance doesn't overload the rest.

These failures appear only under real load and coupling. Deliberately injecting faults in production-like conditions exposes them; see [[Chaos Engineering]]. The underlying lesson matches [[Fallacies of Distributed Computing]]: networks and dependencies fail, and a design that assumes otherwise turns a local fault into a global one.

## See also
- [[Backpressure]]
- [[Tail Latency]]
