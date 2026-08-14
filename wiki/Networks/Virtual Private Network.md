---
aliases:
  - VPN
  - WireGuard
tags:
  - networks
summary: An encrypted tunnel that presents a remote network as local, and the narrow set of things a commercial one actually hides.
---
**A virtual private network** is an encrypted tunnel that makes a remote network reachable as though the machine were attached to it directly. Traffic is encapsulated, carried across the untrusted path, and decapsulated at the far end, where it emerges with an address belonging to the remote network.

The distinction that causes the most confusion is where the tunnel sits. An operating-system-level VPN creates a virtual interface and installs routes, so every program is carried whether or not it knows the tunnel exists. An application-level proxy is configured per program — a browser setting, an SSH dynamic forward — and everything else keeps the default route, including background updaters and, usually, name resolution. **Split tunnelling** sits between the two: named destinations go through the tunnel and the rest go direct, limiting blast radius in the spirit of [[Least Privilege]], provided the list is right.

WireGuard, merged into the Linux kernel in 2020, reorganised the problem around **cryptokey routing**: a peer is a public key bound to a list of permitted addresses, and that single table serves as both routing table and access control list. There is no cipher negotiation — a fixed modern suite with keyed [[Hash Function]] constructions from the Noise framework — and no reply at all to unauthenticated packets. A few thousand lines against hundreds of thousands for IPsec or OpenVPN is the security argument. It runs over one UDP [[Port]] and treats the network as [[Peer-to-Peer]]; mesh products add key distribution on top, a role resembling a [[Signaling Server]].

A commercial VPN relocates trust rather than removing it: the local network and access provider stop seeing destinations, and the provider starts. It does not anonymise. Logged-in accounts, cookies and browser fingerprints identify the same person, [[Domain Name System]] queries leak whenever the resolver is not tunnelled too, and [[WebRTC]] can expose local addresses. Since transport is already encrypted, the hostile-café argument is largely obsolete.

## See also
- [[Secret Management]]
- [[eSIM]]
- [[Streaming Response]]
- [[Code Signing]]
