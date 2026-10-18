---
aliases:
  - Reverse proxies
  - Forward proxy
  - Proxy server
  - TLS termination
  - Ingress
tags:
  - networks
summary: A server that sits in front of other servers and receives clients' requests on their behalf, handling encryption, routing, caching, and protection in one place.
---
A **reverse proxy** is a server that accepts requests from clients and forwards them to one or more backend servers, then returns the backends' responses as if they were its own. Clients see only the proxy. A **forward proxy** works the other way around: it sits in front of clients and makes requests to the internet on their behalf, as in a corporate web filter. The reverse proxy represents servers, the forward proxy represents clients.

Putting one component in front of everything lets it do jobs every backend would otherwise duplicate:

- **TLS termination.** The proxy handles [[Transport Layer Security]] and certificates in one place, so backends can speak plain HTTP on a private network.
- **Routing.** Requests go to different backends by hostname or path, so `/api` and `/blog` can be separate services behind one domain.
- **Load distribution.** Spreading requests across several backend instances is [[Load Balancing]], one of the most common reasons to run a proxy.
- **Caching and compression.** Static responses and cacheable pages can be served from the proxy without touching the backend, following [[HTTP Caching]] rules.
- **Protection.** It can enforce [[Rate Limiting]], filter malicious requests, buffer slow clients so backends aren't tied up, and hide backend addresses.

Common reverse proxies include nginx, HAProxy, Caddy, Envoy, and Traefik. The last of these discovers backends automatically from container labels, which suits [[Containerization]]. In Kubernetes the same role is called an *ingress*. A [[Content Delivery Network]] is a reverse proxy distributed around the world, and an [[API Gateway]] is a reverse proxy specialized for APIs, adding authentication, quotas, and request transformation.

The proxy hides the client from the backend, which causes predictable trouble. The backend sees every request coming from the proxy's address, so the original client IP has to travel in a header such as `X-Forwarded-For`, and the backend must trust that header only when it comes from the proxy, or anyone can spoof it. The backend also sees plain HTTP, so generated URLs come out as `http://` unless the proxy forwards the original scheme. Timeouts at each layer have to agree, or the proxy gives up on requests the backend is still finishing, and long-lived connections like [[WebSocket]] and [[Streaming Response]] bodies need explicit support. The proxy is also a single point of failure unless it is itself redundant.

## See also
- [[Microservices]]
- [[Service Mesh]]
- [[Man-in-the-Middle Attack]]
- [[Hypertext Transfer Protocol]]
- [[Firewall]]
- [[Port]]
