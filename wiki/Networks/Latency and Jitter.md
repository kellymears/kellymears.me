---
aliases:
  - Network Jitter
tags:
  - networks
summary: Latency is how long a packet takes; jitter is how much that time varies — and the second often matters more.
---
**Latency and jitter** are both about delay, but they break applications in different ways. Latency is the one-way or round-trip time a packet takes to travel — a fixed-feeling cost that's mostly about physical distance and the number of hops in between, bounded below by the speed of light. Jitter is the *variation* in that delay from one packet to the next. A connection can have high latency and still feel fine if it's consistent; it can have low average latency and still feel terrible if that number swings wildly.

Jitter is what breaks real-time media specifically. A video call doesn't care that packets take 80ms on average — it cares whether frame 500 arrives 40ms before or after frame 499, because audio and video have to be replayed in a steady rhythm regardless of when the network handed them over. The standard fix is a **jitter buffer**: deliberately hold received packets for a short window before playing them, smoothing out arrival-time variance into a steady output stream at the cost of adding a bit of latency on top. Buffer too little and you get stutter; buffer too much and the call feels laggy — tuning that tradeoff live is most of what makes real-time media engineering hard, and it's a core concern for anything built on [[WebRTC]].

Latency itself splits into components worth naming separately: propagation delay (distance divided by signal speed), transmission delay (time to push all the bits onto the wire), processing delay (routers making forwarding decisions), and queuing delay (waiting behind other traffic at a congested link). Queuing delay is the one that spikes under load and is largely what jitter *is* at the packet level — a queue that isn't uniformly full.

[[QUIC]] and modern congestion control algorithms both target latency directly rather than just throughput, on the theory that a fast-but-bursty connection is worse to use than a slightly slower, steadier one.

## See also
- [[WebRTC]]
- [[QUIC]]
- [[TCP and UDP]]
- [[Streaming Response]]
- [[Backpressure]]
