---
aliases:
  - HTTP/2 and HTTP/3
  - HTTP/2
  - HTTP/3
tags:
  - web
summary: Two successive rewrites of HTTP's transport layer, each solving the previous version's head-of-line blocking at a different layer.
---
**HTTP/2 and HTTP/3** are two successive rewrites of how HTTP moves bytes over the wire, both aimed at the same complaint about HTTP/1.1: too many round trips, one connection doing too little at once. HTTP/1.1 sends one request per connection at a time (or opens several connections in parallel, which is what browsers did instead, at real cost to the server). HTTP/2 fixes this within a single TCP connection: it multiplexes many requests and responses as interleaved streams over one connection, so a large, slow response no longer blocks smaller ones queued behind it the way it did on HTTP/1.1.

That fix has a ceiling, though, and it's TCP itself. TCP guarantees in-order delivery of *all* bytes on a connection, so if one packet is lost, every stream multiplexed onto that connection stalls waiting for retransmission — even the streams whose own packets arrived fine. This is head-of-line blocking at the transport layer, and no amount of clever multiplexing at the HTTP layer can route around it, because TCP itself doesn't know streams exist.

HTTP/3 fixes this by discarding TCP altogether, running instead over QUIC, a transport built on UDP that implements its own reliability and congestion control per-stream, so a lost packet only stalls the one stream it belonged to. QUIC also folds the TLS handshake into its own connection setup, so establishing a new HTTP/3 connection takes fewer round trips than the old TCP-handshake-then-TLS-handshake sequence — a real latency win especially on slow or lossy mobile networks, which is exactly the condition HTTP/1.1's design assumed away.

Both versions are transparent to application code — no request or response format changed, and a browser negotiates the highest version both sides support automatically — which is why "we're on HTTP/2 now" is usually an infrastructure change, not a rewrite.

## See also
- [[QUIC]]
- [[WebSocket]]
- [[HTTP Caching]]
- [[Core Web Vitals]]

## Related
- [[Critical Rendering Path]]
