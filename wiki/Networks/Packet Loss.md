---
aliases:
  - Dropped packet
tags:
  - networks
summary: Data that is sent across a network and never arrives, a normal and even necessary part of how the internet works, which reliable protocols repair by resending and real-time applications must instead hide.
---
**Packet loss** is the failure of a packet to reach its destination. On the internet it isn't an exceptional event but a routine one, and much of the network's design assumes it. A packet-switched network makes no promise of delivery; it forwards packets when it can and discards them when it can't; see [[Packet Switching]].

Packets are lost for several reasons:

- **Congestion.** A router's queue fills faster than its outgoing link can drain it, and new arrivals are dropped. This is the most common cause on wired networks, and it rises sharply as a link approaches full use.
- **Corruption.** Interference or faulty hardware flips bits, the packet fails its integrity check, and the receiver throws it away; see [[Checksum]].
- **Radio.** Wireless links suffer interference, distance, and obstacles, so they lose packets far more often than cables do, and devices retry at the link layer to hide some of it; see [[Wi-Fi]].
- **Policy.** Firewalls, rate limiters, and routers discarding packets whose hop count ran out all drop traffic deliberately; see [[Time to Live]].

TCP recovers from loss by resending, which is what makes it reliable. It also treats loss as a message: a dropped packet usually means a queue somewhere is full, so the sender slows down. That feedback loop is how millions of independent connections share links without central coordination; see [[TCP and UDP]] and [[Congestion Control]]. A side effect is that even small loss rates can sharply cut throughput on long-distance connections, because each loss halves the sending rate and recovery takes many round trips.

Overly large buffers can make matters worse. Equipment that queues enormous amounts of data before dropping anything hides congestion until delays become severe; see [[Latency and Jitter]]. Routers can instead drop or mark packets early, signaling senders to slow down before queues fill.

Real-time applications can't wait for a resend, since a voice packet that arrives late is useless. They choose other strategies:

- **Concealment.** Audio codecs fill short gaps by stretching or synthesizing sound from what came before; see [[Voice over IP]].
- **Redundancy.** Senders add error-correcting data so the receiver can rebuild a lost packet; see [[Error-Correcting Code]].
- **Prediction.** Games guess where objects are and correct when real updates arrive; see [[Rollback Netcode]].

Video streams step down to a lower quality when loss and delay rise; see [[Adaptive Bitrate Streaming]].

Loss is measured with tools that send test packets and count replies, though some routers deprioritize those probes, so apparent loss at a middle hop is often harmless; see [[Internet Control Message Protocol]]. Capturing traffic at both ends shows where packets actually disappear; see [[Packet Capture]].

## See also
- [[Sliding Window Protocol]]
- [[Head-of-Line Blocking]]
