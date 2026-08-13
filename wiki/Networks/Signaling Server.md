---
aliases:
  - Signalling
tags:
  - networks
summary: The small coordination service peers use to find each other before connecting directly.
---
A **signalling server** relays the messages two peers need to exchange in order to establish a direct connection: session descriptions and candidate network paths. Once the connection exists, it carries no further traffic.

It is the irreducible centre of an otherwise decentralised design. Peers cannot discover each other from nothing, so *something* must introduce them — and that something is a server, however small. Recognising this early prevents a lot of disappointment about how serverless a peer-to-peer architecture really is.

Its saving grace is that it is genuinely small. It holds no application state, stores nothing durable, and handles a message or two per connection. It can be a few dozen lines, it scales trivially, and it can be run on the cheapest infrastructure available.

Two design consequences follow. **Room identity is signalling's concern**: peers find each other by agreeing on a name, which is why URL-slug lobbies are the natural pattern — the address *is* the coordination, with no accounts required. And **signalling availability is application availability**: if the server is unreachable, nobody connects, so surfacing that state honestly is part of the design rather than an edge case.

## See also
- [[WebRTC]]
- [[Peer-to-Peer]]
- [[Conflict-Free Replicated Data Type]]

## Related
- [[Eventual Consistency]]
- [[Idempotence]]
