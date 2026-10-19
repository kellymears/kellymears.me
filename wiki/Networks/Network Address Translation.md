---
aliases:
  - NAT
  - Carrier-grade NAT
  - CGNAT
  - Private IP address
  - Masquerading
tags:
  - networks
summary: Rewriting the addresses in packets as they cross a router so that many devices can share one public IPv4 address, a stopgap that became permanent and broke the internet's end-to-end design.
---
**Network address translation** (NAT) lets a router rewrite the IP addresses, and usually the port numbers, of packets passing through it. Its everyday use is sharing one public IPv4 address among every device in a home or office. Devices get *private* addresses from reserved ranges such as `192.168.0.0/16` and `10.0.0.0/8`, which are not routed on the public internet. The router swaps in its own public address on the way out and reverses the swap on the way back.

It was proposed in 1994 as a temporary measure. IPv4 has about 4.3 billion addresses, which was clearly too few as the internet grew, and the real fix, [[IPv6]], would take years to deploy. NAT bought time, and IPv4's central free pool was still exhausted in 2011. NAT turned out to be the permanent arrangement for most networks.

How the common form works:

- When a device at `192.168.1.20:51000` opens a connection, the router picks a free port on its public address, say `203.0.113.5:62001`, and records the pair in a translation table.
- Replies to `203.0.113.5:62001` match that entry and are rewritten back to the device.
- Entries expire after a period of silence, so long-lived connections send keepalives to hold their mapping open.
- Packets that arrive with no matching entry have nowhere to go and are dropped.

That last property makes NAT behave somewhat like a [[Firewall]], since unsolicited inbound traffic can't reach the devices behind it. It is a side effect rather than a security design, and a real firewall with a default-deny policy does the job deliberately.

The cost is the [[End-to-End Principle]]. On the original internet any host could reach any other. Behind NAT, a device can start connections but can't easily receive them, which breaks hosting, [[Peer-to-Peer]] applications, voice calls and multiplayer games. Workarounds pile up:

- **Port forwarding**, configured by hand or requested automatically with UPnP, maps a public [[Port]] to an internal device.
- **[[NAT Traversal]]** techniques such as hole punching let two devices behind NATs connect directly with help from a [[Signaling Server]], and relay traffic when that fails. [[WebRTC]] and mesh [[Virtual Private Network]] tools depend on it.

**Carrier-grade NAT** (CGNAT) adds a second layer at the ISP, so many customers share one public address. Customers can't forward ports at all, and services can no longer tell users apart by IP address. That complicates [[Rate Limiting]] and abuse bans, since blocking one address may block a whole neighborhood.

NAT also appears inside machines. [[Containerization]] tools usually give containers private addresses and translate their traffic through the host. IPv6 has enough addresses for every device to have its own, removing the original reason for NAT, though many networks keep a firewall that blocks unsolicited inbound connections by default.

## See also
- [[Port Scanning]]
- [[Captive Portal]]
- [[File Transfer Protocol]]
- [[Wake-on-LAN]]
