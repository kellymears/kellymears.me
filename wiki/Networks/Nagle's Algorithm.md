---
aliases:
  - TCP_NODELAY
  - Delayed ACK
tags:
  - networks
summary: A 1984 rule that makes TCP hold back small packets while earlier data is unacknowledged, which tamed keystroke traffic and still causes mysterious 40 to 200 millisecond stalls when it meets delayed acknowledgments.
---
**Nagle's algorithm** is a rule in TCP that holds back small packets while earlier data is still waiting for acknowledgment, combining them into fewer, larger packets. John Nagle described it in 1984 to fix what he called the small-packet problem, and nearly every TCP implementation enables it by default; see [[TCP and UDP]].

The problem came from interactive terminals. Every keystroke sent over a remote session became its own packet, carrying one byte of data inside about forty bytes of headers. On the slow, congested links of the early 1980s, thousands of these tiny packets could clog a network so badly that little useful data got through; see [[Congestion Control]].

The rule is simple. If there is no unacknowledged data in flight, send immediately. If there is, buffer any new small writes until either the acknowledgment arrives or enough data has built up to fill a full-size packet; see [[Maximum Transmission Unit]]. The delay adjusts itself to the network. On a fast link acknowledgments return almost at once and nothing waits; on a slow one, keystrokes typed during a round trip go out together. It is the same trade of latency for efficiency as [[Batching]].

Trouble comes from another optimization. With **delayed acknowledgments**, standardized in 1989, a receiver waits briefly, up to 200 milliseconds in many systems and about 40 on Linux, before acknowledging data, hoping to piggyback the acknowledgment on a reply. Each idea is reasonable alone. Together they can deadlock briefly: a sender writes a request header and then its body in two writes, Nagle holds the body until the header is acknowledged, and the receiver holds the acknowledgment because it is waiting for the complete request. Nothing moves until the receiver's timer fires. The symptom is a request that takes almost exactly 40 or 200 milliseconds longer than it should, which turns up in [[Tail Latency]] graphs and is hard to explain without a [[Packet Capture]]. Nagle has said that delayed acknowledgment is the real problem.

The standard fix is the socket option `TCP_NODELAY`, which turns the algorithm off. Most latency-sensitive software sets it: [[Remote Procedure Call]] frameworks, databases, remote shells, and online games, where every input must go out at once; see [[Secure Shell]] and [[Rollback Netcode]]. The Go language's networking library enables it by default.

Turning Nagle off moves the burden to the application, which should then gather its own output and write it in one call rather than dribbling out small writes. Linux offers the opposite control too, a cork option that holds data until the application releases it.

The underlying tension, sending now versus waiting for more, recurs throughout systems; see [[Debounce and Throttle]] and [[Latency and Jitter]].

## See also
- [[Head-of-Line Blocking]]
- [[QUIC]]
- [[Sliding Window Protocol]]
