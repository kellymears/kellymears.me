---
aliases:
  - Failure detector
  - Heartbeat
  - Health check
  - Phi accrual failure detector
  - SWIM protocol
  - Failover
tags:
  - networks
summary: How the nodes of a distributed system decide that a peer has died, using heartbeats and timeouts, when a crashed node and a slow one look exactly the same from outside.
---
**Failure detection** is how a distributed system decides that one of its members has died, so that its work can move elsewhere. The difficulty is fundamental: over a network, a crashed node, a slow node and a lost message all look the same, because no reply arrives. Fischer, Lynch and Paterson proved in 1985 that in a fully asynchronous system no algorithm can always tell them apart. Every practical detector guesses, and must choose which wrong guess is worse.

The basic tool is the **heartbeat**: each node sends a periodic "I'm alive" message, or answers periodic pings, and peers declare it dead after a timeout with no response. The timeout sets the trade-off:

- **Too short**, and a brief pause, such as a garbage-collection stall, a busy network or a [[Tail Latency]] spike, gets a healthy node declared dead. It may then flap between alive and dead, triggering repeated, pointless failovers.
- **Too long**, and real failures go unnoticed, with requests sent to a dead node for the whole interval.

Better detectors adapt instead of using a fixed timeout:

- **Phi accrual detectors** (2004) track the distribution of past heartbeat arrival times and output a level of suspicion rather than a yes or no. Cassandra and Akka use this approach.
- **SWIM** (2002) has each member ping a random peer each round. If no reply comes, it asks a few other members to ping that peer too, so one bad network path doesn't condemn a healthy node. Membership changes then spread by [[Gossip Protocol]], keeping per-node load constant.

Infrastructure uses simpler **health checks**. A [[Load Balancing|load balancer]] polls an endpoint on each backend and stops sending traffic to those that fail. Container orchestrators separate *liveness* (restart this process) from *readiness* (don't route traffic yet). Locally, an [[Init System]] such as [[Systemd]] can run a watchdog that restarts a service when it stops checking in.

A false positive does more damage than a slow detection. If a leader is wrongly declared dead while still running, the cluster elects a new one and two nodes believe they are in charge, the split-brain case covered in [[Network Partition]]. [[Leader Election]] systems guard against this with leases that expire and fencing tokens that let storage reject the stale leader's writes. A [[Quorum]] requirement ensures only one side of a partition can act.

Detection also interacts with load. Declaring a node dead shifts its traffic onto the survivors, which can overload them in turn, a cascading failure, and if many clients reconnect at once they create a [[Thundering Herd]]. A [[Circuit Breaker]] applies the same idea per caller: after enough failures, it stops calling a dependency and checks back later. [[Chaos Engineering]] tests failover by killing nodes deliberately.

## See also
- [[Internet Control Message Protocol]]
- [[N-Version Programming]]
- [[Two Generals Problem]]
- [[Rolling Deployment]]
