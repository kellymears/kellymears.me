---
aliases:
  - STP
  - Broadcast storm
  - Algorhyme
tags:
  - networks
summary: The protocol Radia Perlman designed in 1985 so that bridges and switches could build redundant networks without loops, by agreeing on a root and disabling extra links until one fails, and the broadcast storm it prevents.
---
The **Spanning Tree Protocol**, or STP, prevents loops in local networks built from bridges and switches. Network designers want redundant links, so that one failed cable doesn't cut a building off, but redundant links at this level create loops, and loops are catastrophic. STP lets the switches discover the topology, agree on a loop-free subset of links, and hold the rest in reserve; see [[Ethernet]].

The danger comes from how switches handle frames. A switch learns which addresses live behind which port, and frames for unknown addresses, as well as broadcasts, are copied out of every port. Ethernet frames carry no hop limit, unlike IP packets, so in a loop a single broadcast is copied endlessly, multiplying at each switch, until the links are saturated and the network stops working. This **broadcast storm** can take down a whole site in seconds, often because someone plugged both ends of a cable into the same switch; see [[Time to Live]] and [[Cascading Failure]].

Radia Perlman designed the algorithm in 1985 at Digital Equipment Corporation. Switches exchange small messages and proceed in three steps:

1. **Elect a root.** Every switch has an identifier, and the one with the lowest becomes the root of the tree; see [[Leader Election]].
2. **Find paths to it.** Each switch determines its cheapest path to the root, where link cost reflects speed, and the port on that path becomes its root port; see [[Dijkstra's Algorithm]].
3. **Block the rest.** On each network segment, only the switch closest to the root forwards traffic. Every other port that would complete a loop is put in a blocking state, listening but not forwarding.

The result is a spanning tree: every switch reachable by exactly one path; see [[Minimum Spanning Tree]] and [[Graph theory]]. When a link or switch fails, the messages stop arriving, the switches notice, and blocked ports reopen to restore connectivity; see [[Failure Detection]].

The original protocol was cautious, taking 30 to 50 seconds to reconverge after a change,. Rapid Spanning Tree, standardized in 2001, brought this down to seconds. Its basic limit remains: blocked links carry no traffic, so redundancy costs idle capacity.

Perlman summarized the algorithm in a poem, "Algorhyme," a parody of Joyce Kilmer's "Trees" that begins "I think that I shall never see / a graph more lovely than a tree" and ends with a tree "so packets can reach every LAN."

Large data centers have largely moved away from STP, connecting switches with routing protocols that use every path at once and spread traffic across them, or with centrally computed topologies; see [[IP Routing]] and [[Software-Defined Networking]]. Spanning tree still runs by default in most office and campus switches, mostly as a safeguard against cabling mistakes.

## See also
- [[Token Ring]]
- [[Network Partition]]
- [[Network Topology]]
