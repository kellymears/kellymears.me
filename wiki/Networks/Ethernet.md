---
aliases:
  - MAC address
  - Network switch
  - Ethernet frame
  - Address Resolution Protocol
  - ARP
  - Power over Ethernet
tags:
  - networks
summary: The wired local networking standard that carries most of the world's traffic over its first hop, from the frame format and MAC addresses to switches, ARP, and power over the same cable.
---
**Ethernet** is the family of standards for wired local networks, and the most common answer to how a packet crosses the first few meters of its journey. Bob Metcalfe and David Boggs designed it at Xerox PARC in 1973, and it became the IEEE 802.3 standard in 1983. Speeds have grown from 3 megabits per second to 400 gigabits and beyond, while the basic frame format has barely changed. In the [[OSI Model]] it covers the physical and data link layers: the cable and signaling, plus how machines on one link address each other.

Every network interface has a 48-bit **MAC address**, assigned by the manufacturer and written as six hex pairs such as `3c:22:fb:91:0a:7e`. The first half identifies the vendor. An Ethernet **frame** carries a destination MAC, a source MAC, a type field naming what's inside, usually IP, a payload of up to 1,500 bytes by default, and a checksum. That 1,500-byte limit is where the internet's usual [[Maximum Transmission Unit]] comes from.

Key pieces of a modern Ethernet network:

- **Switches.** Original Ethernet was a shared cable where everyone heard everything, and collisions were resolved by waiting a random time and retrying, an early form of [[Exponential Backoff]]. Modern networks use switches, which learn which MAC address sits on which port and forward each frame only where it needs to go. Every link is full duplex, so collisions no longer happen.
- **ARP.** IP addresses and MAC addresses are different layers, so a machine that wants to reach 192.168.1.20 on its own [[Subnet]] broadcasts the *Address Resolution Protocol* question "who has this IP?" and caches the answer. [[IPv6]] replaces ARP with neighbor discovery over [[Multicast]].
- **VLANs.** A tag in the frame splits one physical switch into several isolated logical networks, a common way to keep smart home devices apart from computers.
- **Power over Ethernet.** The same cable can carry tens of watts, enough for cameras, wireless access points, and small displays, so a device needs only one wire.

Ethernet's weakness is that the local link trusts its neighbors. ARP has no authentication, so any machine on the network can answer for an address it doesn't own. This *ARP spoofing* is a classic route to a [[Man-in-the-Middle Attack]], and part of why [[Zero Trust Network]] designs refuse to treat the local network as safe.

Compared with [[Wi-Fi]], a cable gives lower and steadier latency, no interference, and no sharing of airtime with neighbors, which is why gaming, streaming boxes, and servers prefer a wire whenever one is available. Wireless still uses the same addressing, and a Wi-Fi access point bridges its clients onto Ethernet.

## See also
- [[Wake-on-LAN]]
- [[Carrier-Sense Multiple Access]]
- [[Spanning Tree Protocol]]
- [[Twisted Pair]]
- [[Packet Capture]]
- [[ALOHAnet]]
