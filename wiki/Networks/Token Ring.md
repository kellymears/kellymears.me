---
aliases:
  - IEEE 802.5
  - Token passing
  - FDDI
tags:
  - networks
summary: IBM's local network in which a single circulating token granted permission to transmit, giving orderly, collision-free access that outperformed early Ethernet under heavy load and still lost to it on cost, openness, and speed.
---
**Token Ring** was a local area network technology, promoted by IBM and standardized as IEEE 802.5 in 1985, in which stations took turns transmitting by passing a special frame called the **token**. Through the 1980s and into the 1990s it was Ethernet's main rival in offices and was common in large corporations that ran IBM equipment; see [[Ethernet]].

The scheme is the networking equivalent of a talking stick. Stations are arranged in a logical ring, and a small token frame circulates from each station to the next. A station may transmit only while it holds the token. When it has data, it captures the token, sends its frame around the ring, and when the frame returns, removes it and releases a new token to its neighbor. Each station regenerates and forwards frames not meant for it.

Token passing had real advantages over the shared-cable Ethernet of the time; see [[Carrier-Sense Multiple Access]]:

- **No collisions.** Only the token holder sends, so no capacity is wasted on garbled frames and retries.
- **Predictable delay.** Each station's wait for the token is bounded, which suited factory control and time-sensitive work; see [[Latency and Jitter]].
- **Graceful load.** Early Ethernet's throughput fell as collisions multiplied under heavy traffic, while Token Ring kept delivering close to its full rate.

It also had to handle failure. If the token was lost or a frame circled endlessly, the network stopped. One station acted as the **active monitor**, watching for a missing token and removing orphaned frames, and if it failed, the others negotiated a replacement; see [[Failure Detection]] and [[Leader Election]]. Despite the name, the cabling was usually a physical star, with each station wired to a central access unit that formed the ring internally and bypassed disconnected ports. The same principle ran at 100 megabits a second in FDDI, a dual fiber ring used for campus backbones that could heal itself around a cut; see [[Optical Fiber]].

Ethernet won anyway. Token Ring hardware was considerably more expensive, and much of it came from IBM and a few partners, while Ethernet was an open standard with many competing vendors; see [[Network Effect]]. Ethernet over cheap twisted-pair telephone-style cable arrived in 1990, switching removed its collision problem, and Fast Ethernet at 100 megabits a second in 1995 outran Token Ring's 16. By the late 1990s new installations had largely stopped.

The contest is a standard example of a simpler, cheaper, good-enough technology beating a more orderly one as volume drives prices down and speeds up; see [[Worse Is Better]] and [[Path Dependence]]. Token passing survives in some industrial networks, and the idea of a circulating permission recurs in distributed algorithms for mutual exclusion; see [[Quorum]].

## See also
- [[ALOHAnet]]
- [[Spanning Tree Protocol]]
- [[Network Topology]]
- [[Peterson's Algorithm]]
- [[Twisted Pair]]
