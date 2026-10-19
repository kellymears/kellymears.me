---
aliases:
  - Service registry
  - Service registration
tags:
  - networks
summary: How the parts of a distributed system find each other's current addresses when instances start, stop, and move constantly, from DNS to consensus-backed registries.
---
**Service discovery** is how one service finds the network address of another. In a small system, addresses can be written into configuration. In a large one, instances start and stop constantly as they scale, crash, and are redeployed, and each new instance may get a different address. Something has to keep track of which instances exist right now and where they are.

The usual design has three parts:

- **Registration.** Each instance announces itself when it starts, either by registering directly or by having the platform that launched it register it.
- **A registry.** A database of current instances and their addresses for each service name.
- **Health checking.** Instances that stop responding are removed, so callers aren't sent to dead machines; see [[Failure Detection]].

Callers then look up a name and get a list of live addresses. That lookup happens in one of two places:

- **Client-side discovery.** The caller queries the registry and picks an instance itself, usually with built-in [[Load Balancing]]. Fast and flexible, but every client in every language needs the logic.
- **Server-side discovery.** The caller sends traffic to a fixed address, such as a load balancer or [[Reverse Proxy]], which consults the registry and forwards it. Clients stay simple at the cost of an extra hop.

The oldest registry is the [[Domain Name System]]. DNS can return several addresses for a name, and service records add ports. Its weakness is caching: resolvers and clients hold answers for the record's [[Time to Live]], sometimes longer, so a removed instance may keep receiving traffic. Short TTLs help but increase lookup load.

Dedicated registries keep their data consistent across a cluster using a [[Consensus Algorithm]], so every node agrees on the list even when machines fail. Clients can *watch* for changes rather than poll, learning within moments when an instance appears or disappears. Container orchestrators bundle discovery in: a service name resolves through cluster DNS to a stable virtual address, and the platform routes it to whichever instances are currently healthy; see [[Kubernetes]].

On a local network, devices find each other without any registry by broadcasting questions such as "who offers printing?"; see [[Multicast DNS]]. Large peer-to-peer systems spread membership information by gossip instead; see [[Gossip Protocol]].

Discovery is a quiet dependency. If the registry goes down, new connections can't be made even though every service is healthy, so registries are replicated, and clients cache the last known list to keep working through brief outages. Stale entries are the opposite risk: sending traffic to an address that now belongs to a different service. That's one reason connections between services are increasingly authenticated, so a misdirected request is refused rather than answered; see [[Mutual TLS]].

## See also
- [[Service Mesh]]
- [[Microservices]]
- [[API Gateway]]
- [[Universal Plug and Play]]
