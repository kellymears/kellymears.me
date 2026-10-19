---
aliases:
  - Star topology
  - Bus topology
  - Ring topology
tags:
  - networks
summary: The shape of a network, which devices connect to which, and how that shape decides what a single failure can take down, how traffic flows, and how much cable or hardware the network costs.
---
**Network topology** is the arrangement of a network's devices and the links between them. It can describe the physical layout, where the cables actually run, or the logical one, how data actually flows, and the two often differ. The study of topologies borrows directly from graph theory, which treats any network as nodes and edges; see [[Graph theory]].

The classic shapes each trade cost against resilience:

- **Bus.** Every device taps into one shared cable. Early Ethernet worked this way, using thick coaxial cable along which machines clamped on. It's cheap, but a single break or a single misbehaving device can take down everything, and all devices compete for the same medium; see [[Ethernet]] and [[Carrier-Sense Multiple Access]].
- **Ring.** Each device connects to two neighbors and data travels around the loop. Token passing gave every station a fair turn, and some designs used a second ring in the opposite direction to survive a cut; see [[Token Ring]].
- **Star.** Every device connects to a central switch or hub. A broken cable affects only one device, and adding devices is easy, but the center is a single point of failure. Modern wired networks and home Wi-Fi are stars; see [[Wi-Fi]].
- **Mesh.** Devices connect to many others, so traffic can route around failures. A full mesh connects everything to everything, which grows quickly expensive, so most real meshes are partial; see [[Mesh Network]].
- **Tree.** Stars connected in a hierarchy, as in many office and campus networks.

Loops create their own problems. A switched network with redundant links can forward the same frames in a circle forever, which is why switches run a protocol to disable redundant paths until they're needed; see [[Spanning Tree Protocol]].

The internet itself grew from a topology argument. In the early 1960s Paul Baran, studying communications that could survive attack, compared centralized, decentralized, and distributed networks and argued that a distributed mesh of modest links could stay connected even after many nodes were destroyed. That work fed into the design of packet switching; see [[Packet Switching]] and [[ARPANET]].

At larger scales, topology becomes something to measure rather than design. The internet's connections between providers form a graph with a few heavily connected hubs and many sparsely connected edges, which keeps paths short but concentrates risk; see [[Internet Exchange Point]] and [[Small-World Network]]. Data centers, by contrast, are designed from scratch, typically as layered fabrics in which every rack switch connects to every switch in the layer above, so traffic between any two servers has many equal paths.

Topology matters most when something breaks. Whether a failure stays local, splits the network into islands, or spreads depends on the shape; see [[Network Partition]] and [[Cascading Failure]].

## See also
- [[IP Routing]]
- [[Hourglass Model]]
