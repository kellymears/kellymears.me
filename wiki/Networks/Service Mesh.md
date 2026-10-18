---
aliases:
  - Sidecar proxy
  - Sidecar pattern
  - Control plane
tags:
  - networks
summary: A layer of proxies that handles all traffic between services, adding encryption, retries, and telemetry uniformly without changing application code, at the cost of extra hops and operational weight.
---
A **service mesh** is infrastructure that takes over the network traffic between a system's services. Instead of each service implementing its own retries, timeouts, encryption, and metrics, a proxy sits beside every service instance and handles those concerns for it. The application makes a plain call to another service; the proxies do the rest.

It grew out of [[Microservices]]. A system with hundreds of services written in several languages needs consistent behavior on every connection, and reimplementing that logic in each language's libraries drifts out of sync. Moving it into a shared proxy makes it uniform. The term appeared around 2016, and open-source meshes followed within a year.

A mesh has two halves:

- **Data plane.** The proxies that carry traffic. In the classic design each instance gets its own *sidecar* proxy, running alongside it in the same unit of deployment; see [[Containerization]]. The application's outbound and inbound traffic is redirected through it transparently.
- **Control plane.** A central service that configures all the proxies, tells them where other services live, and distributes certificates; see [[Service Discovery]].

What the proxies provide:

- **Encryption and identity.** Every connection is encrypted and both ends prove who they are with certificates; see [[Mutual TLS]]. This is a common way to implement a [[Zero Trust Network]] inside a data center.
- **Reliability.** [[Timeout]]s, retries with backoff, and [[Circuit Breaker]]s, configured centrally rather than coded per service.
- **Traffic control.** Sending a percentage of traffic to a new version enables gradual rollouts; see [[Canary Release]]. Load balancing is per request rather than per connection.
- **Observability.** Every proxy reports request counts, error rates, and latency, and can propagate trace headers; see [[Distributed Tracing]].
- **Policy.** Rules about which services may call which, enforced at the proxy.

The costs are real. Every call passes through two extra proxies, adding latency and CPU. Thousands of sidecars consume memory. The mesh becomes a complex system in its own right, and when it misbehaves, failures look like application bugs. Retries configured in both the mesh and the application can multiply into a [[Thundering Herd]].

Newer designs reduce the overhead. Some replace per-instance sidecars with one shared proxy per machine; others move parts of the work into the kernel; see [[eBPF]]. Many teams conclude that a mesh is worth it only past a certain scale, and that a smaller system can get most of the benefit from a shared client library or an [[API Gateway]] at the edge.

The mesh reflects a recurring pattern: moving cross-cutting concerns out of application code into a layer below it, much as operating systems took over device handling, and load balancing moved into dedicated proxies; see [[Reverse Proxy]].

## See also
- [[Fallacies of Distributed Computing]]
- [[Software-Defined Networking]]
