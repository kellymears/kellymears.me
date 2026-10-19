---
aliases:
  - mDNS
  - Bonjour
  - Zeroconf
  - Zero-configuration networking
  - DNS-SD
  - Avahi
tags:
  - networks
summary: How devices on a local network find each other by name, and discover printers, speakers, and screens, without any server or configuration, by asking everyone at once.
---
**Multicast DNS** lets devices on a local network resolve names without a DNS server. Instead of asking a configured server who `printer.local` is, a device sends the question to every device on the network at once, and the one with that name answers. Paired with **DNS-based service discovery**, the same mechanism lets devices advertise what they offer, so a laptop can list every printer, speaker, or screen nearby without anyone typing an address.

Apple drove its adoption. Stuart Cheshire led the work, released as Rendezvous in 2002 and renamed Bonjour in 2005, and the protocols were published as RFC 6762 and RFC 6763 in 2013. Linux implements them through Avahi, Windows supports them, and the same discovery underlies AirPlay, AirPrint, many smart speakers, casting to TVs, and countless home devices.

The approach is called **zero-configuration networking**, which bundles three pieces:

- **Addressing.** If no DHCP server hands out an address, a device can pick a random link-local one in the 169.254.x.x range and check that nobody else has it. Normally DHCP assigns addresses on the [[Subnet]].
- **Naming.** Names in the `.local` domain are resolved by mDNS.
- **Service discovery.** Devices announce service types such as `_ipp._tcp` for printers or `_airplay._tcp`, with a name, port, and details.

Mechanically, mDNS reuses ordinary [[Domain Name System]] message formats but sends them by [[Multicast]] to the address 224.0.0.251 on port 5353, or its [[IPv6]] equivalent. Every device listens there and answers queries about itself. Answers carry a cache lifetime, like any DNS record's [[Time to Live]], and devices announce themselves on joining and send goodbye messages when leaving, so caches stay roughly current. Duplicate names get a number appended.

Its main limitation is scope. Multicast traffic stays on the local network segment and is not routed, so mDNS stops at the subnet boundary. That is a feature for privacy and a nuisance in practice:

- **Separate networks.** Devices on a guest network, a separate VLAN for smart-home gear, or the other side of a [[Virtual Private Network]] can't see each other, so casting and printing fail. Gateways can run an *mDNS reflector* that repeats announcements between segments.
- **Client isolation.** Many [[Wi-Fi]] access points block traffic between wireless clients for security, which silently breaks discovery.
- **Firewalls.** A host [[Firewall]] that drops UDP on port 5353 makes a device invisible.

On large networks mDNS gets chatty, since every query reaches every device, so enterprises restrict or proxy it. It also leaks information: devices announce names that often include their owner's first name and model, visible to anyone on the same network.

Smart-home protocols such as Matter use DNS-SD over mDNS to find devices on the local network, an example of the decentralized, [[Peer-to-Peer]] design the protocol family made routine.

## See also
- [[Virtual LAN]]
- [[Multicast]]
- [[Subnet]]
- [[Mesh Network]]
- [[Service Discovery]]
