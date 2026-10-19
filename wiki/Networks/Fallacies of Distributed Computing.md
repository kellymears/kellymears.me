---
aliases:
  - Eight fallacies of distributed computing
  - Fallacies of distributed systems
  - The network is reliable
tags:
  - networks
summary: Eight assumptions programmers new to networked systems tend to make, each false, listed at Sun Microsystems in the 1990s and still the source of many outages.
---
The **fallacies of distributed computing** are eight false assumptions that programmers new to networked systems tend to make. L. Peter Deutsch drew up the first seven at Sun Microsystems in 1994, building on earlier observations by Bill Joy and Tom Lyon, and James Gosling added the eighth a few years later. Each one, believed, produces a familiar class of failure.

1. **The network is reliable.** Packets get lost, connections drop, and a request can succeed on the server while its response vanishes, leaving the client unsure what happened, as in the [[Two Generals Problem]]. Systems need timeouts, retries with [[Exponential Backoff]], [[Idempotence]], and a clear view of their [[Delivery Guarantees]].
2. **Latency is zero.** A call across a network takes thousands to millions of times longer than one in memory. Code that makes one remote call per item in a loop, the [[N+1 Query Problem]], works in testing and crawls in production. See [[Latency and Jitter]].
3. **Bandwidth is infinite.** Large payloads, chatty protocols, and uncompressed data run into real limits, especially on mobile networks.
4. **The network is secure.** Traffic can be read, altered, or forged anywhere along the path. This fallacy is why [[Transport Layer Security]] became the default and why a zero trust network treats the internal network as hostile too.
5. **Topology doesn't change.** Servers move, IP addresses change, and routes shift. Hard-coded addresses break, which is why systems rely on the [[Domain Name System]] and service discovery.
6. **There is one administrator.** Different parts of the path belong to different organizations with different policies, firewalls, and upgrade schedules.
7. **Transport cost is zero.** Serializing data, encrypting it, and paying for bandwidth and network hardware all cost time and money.
8. **The network is homogeneous.** Networks mix hardware, operating systems, and link types, with different packet sizes and behaviors. Assumptions about the maximum transmission unit are a classic example.

The deeper lesson is that a remote call is not a local call with extra delay. It can fail partially: the request may never arrive, may arrive and fail, or may succeed with the reply lost. A 1994 paper by Jim Waldo and colleagues at Sun argued that technologies trying to make remote objects look exactly like local ones, as early [[Remote Procedure Call]] systems did, were doomed for this reason.

Partitions in particular force hard trade-offs, formalized in the [[CAP Theorem]], and can leave a cluster with two leaders, a [[Split Brain]]. Patterns such as the [[Circuit Breaker]], eventual consistency, and [[Chaos Engineering]] exist because these fallacies are false.

## See also
- [[Distributed Lock]]
- [[Murphy's Law]]

