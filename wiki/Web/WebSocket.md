---
aliases:
  - WebSockets
tags:
  - web
summary: A persistent, full-duplex connection between browser and server, replacing repeated request-response with an open channel.
---
**WebSocket** is a protocol that upgrades a single HTTP request into a persistent, bidirectional connection: once established, either side can send a message at any time, with no new request needed and no polling. It's the standard answer to "the server needs to tell the browser something happened," which plain HTTP's request-response model has no native way to do — the server can only ever reply to a request the client already made.

The handshake is the clever part: a client sends a normal HTTP request with an `Upgrade: websocket` header, the server replies `101 Switching Protocols`, and from that point the same TCP connection carries WebSocket frames instead of HTTP. This is why WebSocket traffic passes through most existing infrastructure — load balancers, proxies — that already understands HTTP's initial handshake, even though what flows afterward isn't HTTP anymore.

Before WebSocket existed, the workaround was long polling: the client holds a request open until the server has something to say, then immediately reopens another one. It works, but at the cost of connection overhead and latency that a genuinely persistent connection avoids. Server-Sent Events cover the *server pushes to client* half of that gap with a simpler, HTTP-native mechanism, but only in that one direction; WebSocket is the choice when the client needs to push too — chat, collaborative editing, live multiplayer state.

The tradeoff is statefulness: a WebSocket connection is pinned to one server process for its lifetime, which complicates horizontal scaling and deployment in a way that stateless HTTP requests don't — a rolling deploy has to account for existing connections rather than just routing the next request to a new instance. See [[Zero-Downtime Deployment]] for the general shape of that problem.

## See also
- [[Optimistic UI]]
- [[Zero-Downtime Deployment]]
- [[Same-Origin Policy]]
- [[HTTP/2 and HTTP/3]]

## Related
- [[Web Worker]]
