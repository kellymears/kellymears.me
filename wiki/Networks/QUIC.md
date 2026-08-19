---
aliases:
  - HTTP/3 transport
tags:
  - networks
summary: QUIC rebuilds reliable, multiplexed transport on top of UDP so one lost packet stops blocking unrelated streams.
---
**QUIC** is a transport protocol, originally from Google and now an IETF standard, that provides TCP-like reliability and ordering but is built on UDP instead of being a peer to it. The motivating problem is head-of-line blocking: over a single TCP connection carrying multiple logical streams (as HTTP/2 does), one lost packet stalls *all* of them until it's retransmitted, because TCP only knows about one ordered byte stream, not the independent streams multiplexed inside it. QUIC gives each stream its own sequencing, so a lost packet on stream A never blocks stream B from being delivered to the application.

QUIC also folds the transport and TLS handshakes into one round trip instead of two sequential ones (TCP's three-way handshake, then a separate TLS negotiation on top), and it can often resume a previous connection with zero additional round trips at all — meaningful savings on high-latency or lossy mobile networks where every round trip counts. Because QUIC runs in userspace over UDP rather than in the kernel like TCP, it can also evolve faster: shipping a new congestion-control algorithm is a library update, not an OS update.

It underlies [[HTTP/3]], which is effectively "HTTP semantics over QUIC" the way [[HTTP/2]] was "HTTP semantics over TCP with multiplexing." Connection migration is one of its more distinctive features: a QUIC connection is identified by a connection ID rather than by the traditional IP-and-port tuple, so a phone can switch from Wi-Fi to cellular mid-download without dropping the connection, something TCP has no clean way to express.

The cost is CPU: encrypting and processing every packet in userspace is more work than the kernel's optimized TCP stack, which is part of why adoption took years even after the spec stabilized.

## See also
- [[TCP and UDP]]
- [[HTTP/2 and HTTP/3]]
- [[Latency and Jitter]]
- [[Streaming Response]]
- [[DNS over HTTPS]]
