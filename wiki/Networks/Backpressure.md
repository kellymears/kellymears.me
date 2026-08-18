---
aliases:
  - Flow Control
tags:
  - networks
summary: Backpressure is a slow receiver telling a fast sender to hold up, so a queue grows on purpose instead of by accident.
---
**Backpressure** is what a system needs when a producer can generate data faster than a consumer can process it, and something has to give — either the sender slows down, the extra data gets buffered, or it gets dropped. The term names the mechanism of pushing that signal back upstream deliberately, rather than letting an unbounded queue grow until memory runs out or the consumer falls arbitrarily far behind.

TCP has backpressure built in at the transport layer: the receive window tells a sender how much buffer space the receiver has left, and the sender must stop when it fills up, which is why a slow reader on one end of a TCP connection eventually makes the writer on the other end block too, all the way back through the chain. Streaming APIs replicate this idea in software — Node's streams, reactive extensions, and similar libraries all expose a way for a consumer to say "pause" and for the producer to respect it, instead of firing events into an unbounded buffer.

The alternative to real backpressure is an unbounded queue, which feels fine until it isn't: the queue grows silently under load, latency climbs as everything waits in line, and the system fails suddenly rather than gracefully when memory or disk finally runs out. Backpressure converts that hidden failure into a visible, immediate signal — the producer either blocks, drops the newest data, or drops the oldest, and each choice is a deliberate policy rather than an accident of running out of room.

It's the flip side of [[Rate Limiting]]: rate limiting is a hard external cap a service imposes on callers, while backpressure is a live, continuous signal a receiver sends about its actual current capacity. A [[Circuit Breaker]] is what a caller reaches for once backpressure has been ignored long enough that the dependency looks fully down rather than just slow.

## See also
- [[Rate Limiting]]
- [[Circuit Breaker]]
- [[Streaming Response]]
- [[Latency and Jitter]]
