---
aliases:
  - Transmission Control Protocol
  - User Datagram Protocol
tags:
  - networks
summary: TCP guarantees ordered, reliable delivery at the cost of latency; UDP delivers packets fast with no such promise.
---
**TCP and UDP** are the two transport-layer protocols nearly everything on the internet is built from, and the choice between them is a choice about which failure mode you'd rather have. TCP (Transmission Control Protocol) establishes a connection, numbers every byte, retransmits anything lost, and delivers data to the application in order — a stream abstraction that hides the packet-switched, unreliable network underneath it. UDP (User Datagram Protocol) does none of that: it fires datagrams and does not confirm they arrived, does not reorder them, and does not retry.

The handshake is the visible cost of TCP's guarantees. A connection opens with a three-way handshake (SYN, SYN-ACK, ACK) before a single byte of application data moves, and closing is similarly ceremonial. UDP has no handshake — the first packet sent is the first packet of data — which is why protocols built for speed over correctness ([[Domain Name System|DNS]] queries, video calls, game state) often prefer it. A dropped UDP packet just doesn't arrive; nothing pauses waiting for a retransmit that reliability would demand.

This tradeoff is exactly why real-time media favors UDP: a [[WebRTC]] call would rather skip a lost audio frame than stall the whole stream waiting for TCP to retransmit it in order, since a slightly glitchy stream beats a frozen one. [[QUIC]] is the modern rebuttal to "just use TCP for reliability" — it builds TCP-like guarantees on top of UDP, per-stream instead of per-connection, to avoid one lost packet blocking unrelated data (head-of-line blocking).

Reliability is also why TCP is the wrong tool for anything latency-sensitive under packet loss: its congestion control treats loss as a signal to slow down, which is correct for bulk transfer and actively harmful for a live call.

## See also
- [[QUIC]]
- [[WebRTC]]
- [[Latency and Jitter]]
- [[Port]]
- [[IPv6]]
