---
aliases:
  - Circuit switching
  - Statistical multiplexing
  - Store and forward
  - Datagram
  - Packet
tags:
  - networks
summary: Breaking data into small, independently routed packets that share links with everyone else's traffic, the design choice that made the internet possible and made its delays variable.
---
**Packet switching** sends data as small, self-contained chunks called packets, each carrying a header with its destination. Routers forward each packet independently toward that destination, and packets from many conversations share the same links. The alternative, **circuit switching**, reserves a dedicated path for the whole conversation, as the telephone network did: when you placed a call, a chain of switches connected a line end to end, and it stayed yours, used or idle, until you hung up.

The idea arrived twice, independently:

- **Paul Baran**, at the RAND Corporation in the early 1960s, wanted a communications network that could survive heavy damage. He proposed splitting messages into blocks routed hop by hop through a mesh with no central switch, so traffic could flow around destroyed nodes.
- **Donald Davies**, at the UK's National Physical Laboratory in 1965, wanted efficient time-sharing of computers and coined the word "packet".

ARPANET, the internet's predecessor, adopted packet switching and sent its first message in 1969.

Its main advantage is **statistical multiplexing**. Computer traffic is bursty: long silences, then sudden transfers. A reserved circuit wastes capacity during the silences, while packets let everyone share the link and use whatever capacity is free at that moment. A link can serve far more users than it could if each had a guaranteed slice.

The costs follow from the sharing:

- **Variable delay.** Each router uses *store and forward*: it receives a packet, then queues it for the next link. Queue lengths change constantly, so delay varies from packet to packet, which is [[Latency and Jitter]].
- **Loss.** When a queue overflows, packets are dropped. [[Congestion Control]] treats loss as the signal to slow down, and [[Backpressure]] is the general form of the same problem.
- **Reordering.** Packets can take different paths and arrive out of order.
- **Size limits.** Each link has a [[Maximum Transmission Unit]], so large messages must be split.

The internet's IP layer offers only *best effort*: no guarantees of delivery, order or timing. Reliability is left to the endpoints, where [[TCP and UDP|TCP]] numbers, acknowledges and retransmits packets. This division follows the [[End-to-End Principle]]. A [[Time to Live]] counter in each packet stops one that loops between routers from circulating forever, and [[Border Gateway Protocol]] decides the paths between networks.

The two approaches have converged in places. Telephone calls now travel as packets, and real-time media such as [[WebRTC]] uses jitter buffers to smooth out variable delay. Meanwhile, technologies such as MPLS set up virtual circuits over packet networks for predictable performance. Baran's survivability goal shows up in a [[Mesh Network]], which routes around failed nodes just as he described.

## See also
- [[TCP and UDP]]
- [[Latency and Jitter]]
- [[Congestion Control]]
- [[OSI Model]]
- [[Submarine Cable]]
