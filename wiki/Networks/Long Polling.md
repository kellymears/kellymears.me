---
aliases:
  - Polling
  - Short polling
  - Comet
  - Push versus pull
tags:
  - networks
summary: The ways a client learns that something changed on a server, from asking repeatedly, to holding a request open until there's news, to the push channels that replaced both.
---
**Polling** is the simplest way for a client to learn about changes on a server: ask repeatedly. **Long polling** is the trick that made it feel instant. Both exist because HTTP was designed so that only the client can start a conversation, while many applications need the server to speak first, to say a message arrived, a build finished, or a price changed.

There are several approaches, in roughly historical order:

- **Short polling.** The client asks "anything new?" on a fixed interval. It's easy and works everywhere, but it trades freshness against waste: poll every 30 seconds and updates arrive up to 30 seconds late, poll every second and most requests return nothing while costing a full round trip, headers included.
- **Long polling.** The client sends a request, and the server doesn't answer until it has something to say or a timeout passes, often around 30 seconds. On a response, the client immediately sends the next request. Updates arrive almost as soon as they happen, and empty responses become rare. Gmail and early Facebook chat used it in the mid-2000s under the name *Comet*.
- **Server-sent events.** One long HTTP response stays open and the server writes events down it as they happen, as described in [[Streaming Response]]. It's one-way, server to client, and reconnects automatically.
- **[[WebSocket]].** A full two-way connection upgraded from HTTP, for chat, games, and collaborative editing.

Long polling has costs that pushed the web toward the later options. Each waiting client holds a connection and, on older thread-per-request servers, a whole thread, so a server with thousands of idle listeners exhausted its resources. That pressure drove the move to servers built on an [[Event Loop]], which can hold many quiet connections cheaply. Messages can also be lost or duplicated in the gap between one response and the next request, so clients usually send the ID of the last event they saw, and the system needs the Delivery Guarantees thinking that any messaging does.

Polling hasn't gone away. It survives proxies and [[Firewall]] rules that break long-lived connections, it needs no special server support, and it's stateless, so any server behind a [[Load Balancing]] layer can answer. Many systems combine the two: a push channel for speed and an occasional poll to catch anything missed. Between servers, a [[Webhook]] reverses the direction entirely, so the provider calls the consumer instead.

Polling well means being polite. Clients should back off when nothing changes or the server struggles, using [[Exponential Backoff]] with random jitter, since thousands of clients polling in lockstep produce a thundering herd. Browsers throttle timers in hidden tabs, which slows polling too, a deliberate saving described in [[Background Tab Throttling]].

## See also
- [[File Watching]]
- [[MQTT]]
- [[Optimistic UI]]
