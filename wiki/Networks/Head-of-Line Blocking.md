---
aliases:
  - HOL blocking
  - Head of line blocking
  - Convoy effect
tags:
  - networks
summary: When the first item in a queue is stuck and everything behind it waits, even items that could have gone ahead, the problem HTTP/2 half-solved and QUIC finished.
---
**Head-of-line blocking** occurs when the item at the front of a queue is held up and everything behind it must wait, even items that are ready and unrelated. A supermarket line stuck behind one shopper with a price check is the everyday version. In computing, it appears wherever work must be delivered or processed in order.

The best-known case is in web protocols, which removed it in stages:

- **HTTP/1.1.** A connection carries one request and response at a time. Pipelining, sending several requests without waiting, was defined but rarely used, because responses still had to come back in order, so one slow response blocked the rest. Browsers worked around it by opening about six connections per site.
- **HTTP/2** multiplexes many requests over one TCP connection as interleaved streams, removing blocking at the HTTP layer. But TCP itself guarantees in-order delivery of bytes. If one packet is lost, the operating system holds back everything after it until the retransmission arrives, stalling every stream, not just the one the lost packet belonged to. On lossy mobile networks, HTTP/2 can do worse than several HTTP/1.1 connections. See [[TCP and UDP]].
- **HTTP/3** runs over [[QUIC]], which handles streams itself over UDP. A lost packet delays only the stream it belonged to. See [[HTTP2 and HTTP3]].

The pattern shows up well beyond the web:

- **Network switches.** A switch that queues packets at its input ports can leave a packet stuck behind another waiting for a busy output, even when its own output is free. A classic 1987 analysis showed this caps throughput at about 59 percent, which is why switches use separate queues per output.
- **Message queues.** A [[Message Queue]] that delivers strictly in order can be stuck behind a "poison" message that keeps failing, until it is moved aside to a dead-letter queue.
- **Single-threaded processing.** A slow task blocks everything queued behind it on an [[Event Loop]], which is why long computations get moved off the main thread.
- **Merging.** A [[Merge Train]] stalls when the change at the front fails its checks, holding up everyone behind it.
- **Page loading.** Render-blocking scripts and stylesheets hold back the rest of the [[Critical Rendering Path]].

The general remedies are to keep independent work in separate queues, to allow out-of-order completion when order doesn't matter, and to set timeouts so one stuck item can be skipped. Ordering is often a [[Delivery Guarantees]] requirement, so the design question is usually how narrowly it can be scoped, per stream, per user, or per key, rather than whether to drop it. Head-of-line delays show up in measurements as [[Tail Latency]] and [[Latency and Jitter]] rather than in averages.

## See also
- [[Packet Loss]]
- [[Nagle's Algorithm]]
- [[Quality of Service]]
- [[Voice over IP]]
- [[Bandwidth]]
