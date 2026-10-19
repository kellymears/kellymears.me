---
aliases:
  - Sliding window
  - Receive window
  - Go-Back-N
tags:
  - networks
summary: A method for reliable data transfer that lets a sender have several packets in flight before receiving acknowledgments, keeping a long link busy while the receiver limits how much it can be sent, the basis of TCP's flow control.
---
A **sliding window protocol** is a way to send data reliably over a network without waiting for each packet to be confirmed before sending the next. The sender may have up to a fixed number of unacknowledged packets in flight, called the window. As acknowledgments arrive, the window slides forward and more packets can go out.

The simplest reliable protocol is stop-and-wait: send one packet, wait for the receiver to acknowledge it, then send the next, resending if no acknowledgment arrives in time; see [[Timeout]]. It works but wastes the link. If a round trip takes 100 milliseconds, the sender spends almost all its time idle, no matter how fast the link is. The amount of data needed to keep a link full is its speed multiplied by its round-trip time; see [[Bandwidth-delay product]]. A window at least that large keeps the pipe full.

Packets are numbered so the receiver can put them in order and report what has arrived. Protocols differ in how they recover from loss; see [[Packet Loss]]. In **Go-Back-N**, the receiver accepts only packets in order, and after a loss the sender retransmits the missing packet and everything after it, which is simple but wasteful. In **selective repeat**, the receiver buffers out-of-order packets and the sender resends only those missing. Detecting corrupted packets relies on checksums; see [[Checksum]].

TCP uses a sliding window measured in bytes rather than packets; see [[TCP and UDP]]. Each acknowledgment carries the **receive window**, how much more data the receiver has room to accept, so a slow receiver can throttle a fast sender. That's flow control, protecting the receiver; see [[Backpressure]]. A separate congestion window, maintained by the sender, protects the network from overload, and the sender is limited by whichever window is smaller; see [[Congestion Control]].

The original TCP header gave the window a 16-bit field, capping it at 64 kilobytes. That was ample in the 1980s but far too small for fast long-distance links, where it limited throughput regardless of capacity. A window scaling option, defined in 1992, multiplies the field to allow windows of up to a gigabyte; see [[Request for Comments]]. Satellite links, with their long round trips, depend heavily on large windows; see [[Satellite Internet]].

Reliable in-order delivery has a cost. When one packet is lost, later packets that have arrived wait in the receiver's buffer until the gap is filled, stalling everything behind it; see [[Head-of-Line Blocking]]. QUIC keeps the windowing ideas but applies them to each stream independently; see [[QUIC]].

The pattern recurs outside networking. Rate limiters count requests in sliding windows of time, and stream processors aggregate events over moving intervals; see [[Rate Limiting]].

## See also
- [[Delivery Guarantees]]
- [[Two Generals Problem]]
