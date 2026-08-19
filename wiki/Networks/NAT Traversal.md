---
aliases:
  - Hole Punching
  - STUN/TURN
tags:
  - networks
summary: NAT traversal is the set of tricks two devices behind separate routers use to open a direct connection anyway.
---
**NAT traversal** describes the techniques two devices behind network address translation use to establish a direct connection despite neither having a public, routable address of its own. Network address translation lets many devices on a private network share one public IP, which is why home internet works at all under IPv4 scarcity — but it also means an unsolicited inbound packet usually has nowhere to go, since the router has no mapping for it yet.

The classic fix is **hole punching**: both peers first send outbound packets to a public rendezvous server, which tells each peer the other's observed public IP and port. Each peer then sends a packet directly to the other's address. The outbound packet from each side creates a temporary mapping in its own NAT, and if timing lines up, the "unsolicited" inbound packet from the peer arrives just after that mapping opens and slips through. This is the mechanism behind most [[Peer-to-Peer]] connections and underlies [[WebRTC]]'s ICE negotiation.

**STUN** servers tell a device what its own public IP and port look like from the outside — necessary because NAT rewrites both. **TURN** servers are the fallback when punching fails: a relay that both peers connect to normally, sacrificing the direct-connection latency win for guaranteed connectivity. ICE (Interactive Connectivity Establishment) is the algorithm that tries several candidate paths — host, STUN-reflexive, TURN-relayed — and picks the best one that actually works, coordinated through a [[Signaling Server]] that carries none of the media itself, only the negotiation.

Some NATs are more hostile than others: "symmetric" NATs assign a different external port per destination, which breaks the simplest hole-punching approach and often forces TURN.

## See also
- [[WebRTC]]
- [[Signaling Server]]
- [[Peer-to-Peer]]
- [[IPv6]]
- [[Anycast]]
