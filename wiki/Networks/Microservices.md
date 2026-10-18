---
aliases:
  - Microservice
  - Microservice architecture
  - Service-oriented architecture
  - Distributed monolith
tags:
  - networks
summary: Building an application as many small, independently deployed services that talk over the network, the organizational benefits that motivate it, and the distributed-systems costs it brings.
---
**Microservices** is an architecture that splits one application into many small services, each owning one business capability and its own data, deployed independently and communicating over the network. The opposite is a *monolith*, a single deployable unit where every part calls the others in memory. The approach grew out of service-oriented architecture and became popular in the 2010s, as large web companies described how they had broken up their own monoliths.

The case for microservices is mostly organizational. A service can be built, deployed, and scaled by one team without coordinating releases with everyone else, which fits [[Conway's Law]]: systems mirror the communication structure of the teams that build them. Other benefits follow:

- **Independent deployment.** One service can ship many times a day through continuous deployment without redeploying the rest.
- **Independent scaling.** A busy service gets more instances, an idle one fewer, usually packaged through [[Containerization]].
- **Fault isolation.** A crash in one service need not take down the others, if the callers are built for it.
- **Technology choice.** Each team can pick its own language and database.

The costs come from turning in-memory calls into network calls, and every one of the [[Fallacies of Distributed Computing]] applies. Calls can fail, time out, or arrive twice, so services need retries, [[Idempotence]], and a [[Circuit Breaker]] to keep one slow dependency from cascading into an outage. A request that touches ten services is only as fast as the slowest, the problem described in [[Tail Latency]]. Data split across services can't be updated in one transaction, so consistency comes from patterns like the [[Saga Pattern]], with eventual consistency in between. Debugging means following one request across many processes, which needs real observability with distributed tracing.

Communication is synchronous, through [[Remote Procedure Call]] or HTTP APIs, or asynchronous, through events on a [[Message Queue]]. An [[API Gateway]] usually sits in front, giving clients one entry point. Large deployments often add a *service mesh*, a proxy beside every service that handles encryption, retries, and metrics uniformly.

The common failure is the **distributed monolith**: services that still must deploy together because they share a database or change in lockstep, combining the costs of both approaches with the benefits of neither. Splitting along the wrong boundaries is expensive to undo, so many teams now start with a well-modularized monolith and extract services only where team or scaling pressure is real. Extraction itself is usually done gradually, routing one capability at a time to new code with the [[Strangler Fig Pattern]].

## See also
- [[Load Balancing]]
- [[Service Level Objective]]
- [[Monorepo]]
- [[Distributed Tracing]]
