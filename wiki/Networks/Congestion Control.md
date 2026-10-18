---
aliases:
  - TCP congestion control
  - Congestion collapse
  - Slow start
  - Bufferbloat
  - BBR
  - Additive increase multiplicative decrease
tags:
  - networks
summary: How senders on a shared network discover how fast they can transmit without overwhelming it, and the voluntary restraint that keeps the internet usable.
---
**Congestion control** is how a sender decides how fast to transmit over a network shared with everyone else. Links have finite capacity, and routers queue packets that arrive faster than they can be forwarded. When queues overflow, packets are dropped. A sender that responds to loss by resending harder makes things worse for everyone, including itself.

That is what happened in October 1986, when throughput between Lawrence Berkeley Laboratory and UC Berkeley, a few hundred meters apart, fell by a factor of about a thousand. The network was busy retransmitting packets that would be dropped again: **congestion collapse**. Van Jacobson's response, deployed in TCP in 1988, established the approach still used today. Senders probe for available capacity and back off when they detect congestion. Every connection runs it voluntarily. Nothing in the network forces a sender to slow down. The internet stays usable because nearly every implementation shows restraint, a rare working solution to a [[Tragedy of the Commons]].

Classic TCP congestion control works with a *congestion window*, the amount of unacknowledged data allowed in flight:

- **Slow start.** A new connection begins with a small window and doubles it each round trip until loss occurs, despite the name an exponential ramp.
- **Additive increase, multiplicative decrease.** Afterward, the window grows by a little each round trip and is cut in half on loss. This sawtooth, analyzed mathematically, makes competing flows converge toward a fair share.
- **Loss as signal.** Traditional algorithms read packet loss as congestion, which works poorly on wireless links where loss often comes from interference.

Newer algorithms refine this. CUBIC, the long-time Linux default, grows the window faster on high-bandwidth, long-distance paths. Google's **BBR** models the path's bandwidth and round-trip time directly instead of waiting for loss, which keeps queues short.

Short queues matter because of **bufferbloat**: routers and modems with oversized buffers absorb congestion as delay instead of loss, so a single upload can add seconds of latency to everything else on a home connection. Loss-based algorithms fill those buffers before backing off. The fix involves smarter queue management in routers as well as better senders, and it shows up directly as reduced [[Latency and Jitter]] for calls and games.

Congestion control lives in [[TCP and UDP]] stacks, and [[QUIC]] reimplements it in user space, which makes new algorithms easier to deploy. UDP applications such as video calls over [[WebRTC]] must do their own. The idea generalizes: [[Backpressure]] in software systems and [[Rate Limiting]] in APIs are the same principle of slowing the source rather than overflowing the queue.

## See also
- [[TCP and UDP]]
- [[QUIC]]
- [[Latency and Jitter]]
- [[Backpressure]]
- [[Tragedy of the Commons]]
- [[Packet Switching]]
- [[Exponential Backoff]]
- [[Head-of-Line Blocking]]
