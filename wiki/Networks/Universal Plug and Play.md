---
aliases:
  - UPnP
  - Port mapping
  - NAT-PMP
tags:
  - networks
summary: A set of protocols that let devices on a home network find each other and ask the router to open ports automatically, which made games, calls and file sharing work without configuration and made it just as easy for malware to punch holes in the network.
---
**Universal Plug and Play**, or UPnP, is a family of protocols that lets devices on a local network discover each other and use each other's services with no setup. A forum of companies led by Microsoft introduced it in 1999, aiming to make networked devices as easy to connect as a printer plugged into a computer.

Devices announce themselves and search for others by sending messages to a group address that every device on the network listens to; see [[Multicast]]. Each describes its capabilities in an [[XML]] document, and others control it by sending structured requests over web protocols. Media players, smart televisions and network storage boxes use it to find and share music and video. Apple's equivalent system takes a similar approach for printers and speakers; see [[Multicast DNS]] and [[Service Discovery]].

UPnP's most consequential feature is **port mapping**. Most home networks sit behind a router that shares one public address among many devices, which blocks unsolicited incoming connections; see [[Network Address Translation]]. Games, voice calls and file-sharing programs need peers to reach them directly, so UPnP lets any program ask the router to forward a port to it; see [[NAT Traversal]], [[Peer-to-Peer]] and [[Voice over IP]]. Apple's NAT Port Mapping Protocol and its standardized successor do the same job more simply.

The problem is that the router doesn't ask who's asking. UPnP has no real authentication: any program on the network is trusted to request openings, including malware, which can expose internal devices to the internet or turn infected machines into servers. The design assumes everything inside the home network is friendly, an assumption modern security models reject; see [[Zero Trust Network]] and [[Least Privilege]].

Implementations made it worse. Many routers responded to UPnP requests from the internet side as well as the local network, a configuration error with no legitimate use. A 2013 scan found tens of millions of devices doing so, many running outdated code with known vulnerabilities. Attackers have used exposed UPnP services to reflect and amplify floods of traffic at victims, and in 2020 researchers disclosed a flaw that let the protocol be abused to send traffic to arbitrary addresses; see [[Denial-of-Service Attack]]. Internet-connected cameras and gadgets that quietly opened ports for themselves became easy targets for botnets; see [[Internet of Things]].

Security advice has long been to disable UPnP on routers unless something needs it, and to check that it's never reachable from outside; see [[Port Scanning]]. The underlying tension remains: users want things to work without configuration, and every automatic opening is one nobody reviewed. Newer games and calling apps lean more on relay servers and hole-punching techniques that need no router cooperation.

## See also
- [[Firewall]]
- [[BitTorrent]]
