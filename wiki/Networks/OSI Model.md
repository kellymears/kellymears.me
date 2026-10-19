---
aliases:
  - Open Systems Interconnection model
  - TCP/IP model
  - Network layers
  - Protocol stack
  - Encapsulation
  - Layer 7
tags:
  - networks
summary: The seven-layer reference model for networking, from physical signals up to applications, which lost to TCP/IP as a protocol suite but survives as the vocabulary for where things happen in a network.
---
The **OSI model** (Open Systems Interconnection) divides networking into seven layers, each providing services to the one above and relying on the one below. The International Organization for Standardization published it in 1984 as the blueprint for a family of interoperable protocols.

The layers, bottom to top:

1. **Physical.** Bits as voltages, light pulses or radio waves.
2. **Data link.** Frames between machines on the same local network, addressed by hardware (MAC) address. Ethernet and Wi-Fi live here.
3. **Network.** Packets routed across networks by IP address. IP, [[IPv6]] and routers belong here.
4. **Transport.** End-to-end delivery between programs, identified by [[Port]] number. See [[TCP and UDP]].
5. **Session.** Setting up and tearing down long-running exchanges.
6. **Presentation.** Encoding, compression and encryption.
7. **Application.** Protocols programs speak, such as [[Hypertext Transfer Protocol|HTTP]] and DNS.

The OSI protocols themselves lost the "protocol wars" of the 1980s to TCP/IP, which was already running and freely available. TCP/IP has its own four-layer model (link, internet, transport, application) and merges OSI's top three layers into one. In practice, layers five and six rarely correspond to anything distinct.

The model survived as vocabulary. Engineers say a "layer 2 switch" forwards frames by MAC address, a "layer 3" device routes packets, and a "layer 4" [[Load Balancing|load balancer]] spreads TCP connections while a "layer 7" one reads HTTP requests and routes by path. A [[Firewall]] may filter at layer 3 and 4 or inspect application traffic. Jokes about "layer 8" refer to the user.

**Encapsulation** is the mechanism behind the layers. Each layer wraps what it receives from above in its own header. An HTTP request is wrapped in a TCP segment, which is wrapped in an IP packet, which is wrapped in an Ethernet frame. Each hop unwraps only as far as it needs: a switch reads the frame, a router reads the packet, and only the endpoints read the TCP and HTTP layers. Every header adds bytes, which is why the [[Maximum Transmission Unit]] leaves less room for data than it seems.

Layering lets each layer change independently: the same TCP runs over fiber, Wi-Fi or cellular. The boundaries leak in practice, though:

- **Ill-fitting protocols.** [[Transport Layer Security]] sits between transport and application and fits neither cleanly. [[QUIC]] merges transport, encryption and parts of HTTP into one layer on top of UDP.
- **Middleboxes.** [[Network Address Translation]] rewrites layer 3 and 4 headers, and many devices inspect traffic above the layer they nominally work at. That inspection freezes protocols in place, which is why new ones are encrypted and why the [[End-to-End Principle]] argues for keeping the middle of the network simple.

## See also
- [[Twisted Pair]]
- [[Hourglass Model]]
- [[IP Routing]]
- [[Leaky Abstraction]]
