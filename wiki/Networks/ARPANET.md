---
aliases:
  - Advanced Research Projects Agency Network
  - Interface Message Processor
tags:
  - networks
summary: The US research network that first sent a message in 1969, proved packet switching worked, and grew into the internet once it adopted TCP/IP on a single flag day in 1983.
---
**ARPANET** was a computer network funded by the US Defense Department's Advanced Research Projects Agency (ARPA), first switched on in 1969. It was the first large network built on [[Packet Switching]], and the protocols, tools, and culture developed on it became the internet.

The motivation was sharing scarce, expensive computers between universities and research labs. J. C. R. Licklider at ARPA had written about an "intergalactic computer network" in the early 1960s, and Bob Taylor got funding to build one in 1966. A popular story says it was designed to survive nuclear war; its builders say that wasn't the aim, though Paul Baran's earlier work on survivable networks did influence the packet-switching design.

The first message was sent on October 29, 1969, from UCLA to the Stanford Research Institute. The plan was to type "LOGIN." The system crashed after "LO." By December there were four sites: UCLA, SRI, UC Santa Barbara, and the University of Utah.

Each site connected through an **Interface Message Processor** (IMP), a refrigerator-sized minicomputer built by the firm Bolt Beranek and Newman, which handled the networking so host computers didn't have to: the first routers; see [[IP Routing]]. Hosts talked to each other through a protocol called NCP.

Things that came from ARPANET:

- **Email**, in 1971, when Ray Tomlinson sent messages between machines and picked the @ sign to separate the user from the host. Email quickly became the network's most popular use, which nobody had planned; see [[Simple Mail Transfer Protocol]].
- **Requests for Comments**, the informal memos in which the network's designers proposed and argued over protocols, which remain how internet standards are written; see [[Request for Comments]].
- **The hosts file**, a single list of every machine's name and address, copied from a central server, which stopped scaling in the 1980s and led to the [[Domain Name System]].

NCP assumed one reliable network. Vint Cerf and Bob Kahn's TCP/IP, designed in the mid-1970s, connected *different* networks, radio, satellite, and wired, into an internetwork, putting reliability in the end hosts rather than the network; see [[TCP and UDP]] and [[End-to-End Principle]]. On January 1, 1983, ARPANET switched every host from NCP to TCP/IP at once, a "flag day" that took months of preparation; see [[Backward Compatibility]].

Military sites split off that year. The National Science Foundation's NSFNET took over as the academic backbone, and ARPANET was shut down in 1990. Commercial traffic was allowed on the backbone from the early 1990s, and with the [[World Wide Web]] the internet reached the public.

ARPANET's history is a case of infrastructure built for one purpose finding a different, larger one; see [[Path Dependence]].

## See also
- [[File Transfer Protocol]]
- [[Mailing List]]
- [[Network Topology]]
- [[Delay-Tolerant Networking]]
- [[Telnet]]
