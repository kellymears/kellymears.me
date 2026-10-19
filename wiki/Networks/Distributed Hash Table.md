---
aliases:
  - DHT
  - Kademlia
  - Chord
  - Mainline DHT
tags:
  - networks
summary: A key-value lookup spread across thousands of peers with no central server, where any node can find any key in a handful of hops, the directory behind trackerless BitTorrent.
---
A **distributed hash table** is a key-value store spread across many computers, with no central server. Each participating node is responsible for a slice of the key space, and any node can find the node holding a given key by asking a small number of others, typically a number of hops that grows with the logarithm of the network size. A million-node network answers a lookup in about twenty steps, even as nodes constantly join and leave.

The design arose after lawsuits shut down Napster's central index, a weakness of early [[Peer-to-Peer]] systems. Several designs appeared in 2001, including Chord, from Ion Stoica and colleagues at MIT, Pastry, and CAN. Kademlia, by Petar Maymounkov and David Mazières in 2002, became the most widely deployed.

The core ideas:

- **Shared ID space.** Nodes and keys get IDs from the same [[Hash Function]], often 160 bits. A key is stored on the nodes whose IDs are closest to it.
- **Distance.** Kademlia measures closeness with XOR: the distance between two IDs is their bitwise exclusive-or, read as a number. It is symmetric, so lookups teach both sides useful contacts.
- **Routing tables.** Each node keeps contacts at exponentially increasing distances: many nearby, a few far away. Each hop of a lookup at least halves the remaining distance, like a [[Binary Search]] across the network.
- **Replication.** Each key is stored on several of the closest nodes, so it survives when some go offline.

The arrangement is close kin to [[Consistent Hashing]], which also maps keys and servers onto a shared space so that membership changes move only a little data. But a database cluster knows all its members, while a DHT node knows only a few of many strangers.

The largest deployment is BitTorrent's Mainline DHT, introduced in 2005, which has millions of concurrent nodes. Given a magnet link containing a file's hash, a client finds other peers sharing that file through the DHT, with no tracker server. IPFS uses a Kademlia DHT to find who holds content-addressed blocks, which are verified with structures such as a [[Merkle Tree]].

Open DHTs face hard problems:

- **Churn.** Nodes come and go constantly, so routing tables need refreshing and data needs re-replicating, relying on [[Failure Detection]] by periodic pings.
- **Sybil attacks.** One attacker can create thousands of fake identities and position them around a target key, then censor or poison it. Defenses tie IDs to IP addresses or require work to create them, though none is complete in an open network, unlike the closed membership assumed by [[Byzantine Fault Tolerance]].
- **Connectivity.** Many home nodes sit behind [[Network Address Translation]] and cannot accept incoming connections without [[NAT Traversal]].

Still, DHTs proved a directory for millions can work with no one in charge.

## See also
- [[Blockchain]]
- [[Dark Web]]
- [[Cuckoo Hashing]]
- [[Napster]]
- [[BitTorrent]]
