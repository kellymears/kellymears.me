---
aliases:
  - Torrent
  - Magnet link
  - Swarm
tags:
  - networks
summary: A peer-to-peer file-sharing protocol from 2001 in which everyone downloading a file also uploads pieces of it to others, so popular files get faster as more people want them, and its legitimate and pirate uses.
---
**BitTorrent** is a peer-to-peer protocol for distributing files, created by Bram Cohen in 2001. Its key idea is that everyone downloading a file also uploads the pieces they already have to others. A popular file therefore gets *more* available as demand grows, the reverse of a single server, which slows down as more people ask for it; see [[Peer-to-Peer]].

How it works:

- **Pieces.** A file is split into many pieces, typically a few hundred kilobytes each. A small metadata file, the **torrent**, lists each piece's cryptographic hash, so anyone can verify each piece independently and reject corrupted or tampered data; see [[Hash Function]] and [[Merkle Tree]].
- **The swarm.** Everyone sharing a particular torrent forms a **swarm**. Peers that have the whole file and stay to upload are seeders; the rest are downloading and uploading at once.
- **Finding peers.** Originally, a server called a tracker kept a list of peers in each swarm. Later clients added a [[Distributed Hash Table]] so peers can find each other without any central server, and a **magnet link** names a torrent by its hash alone, with the metadata fetched from peers.
- **Rarest first.** Peers request the pieces fewest others have, so no piece becomes scarce and the swarm survives even after the original seeder leaves.
- **Tit for tat.** Each peer uploads mainly to the peers giving it the best download rates, while occasionally trying a random new peer. This rewards cooperation and limits freeloading, a working application of repeated-game strategy; see [[Prisoner's Dilemma]] and [[Free Rider Problem]].

At its peak, BitTorrent carried a large share of all internet traffic. Much of that was unauthorized sharing of films, music, and software, and rights holders responded with lawsuits against individual downloaders and takedowns of tracker sites. Streaming services later cut piracy by making legal access easier.

Its legitimate uses are substantial: distributing Linux installation images, game updates and patches, scientific datasets, and archives; companies have used it to push software to thousands of servers at once, avoiding a bottleneck at the source; see [[Content Delivery Network]] and [[Bandwidth]].

It also affected networks around it. Many connections uploading continuously could crowd out other traffic, and some internet providers secretly interfered with BitTorrent connections, which became an early case in the [[Net Neutrality]] debate. Newer versions used a UDP-based transport designed to back off when the network is busy, an early form of the ideas in modern [[Congestion Control]]; see [[TCP and UDP]].

Torrents also tend to decay: once the last seeder leaves, a swarm can stall with pieces missing; see [[Link Rot]] and [[Digital Preservation]].

The design has influenced later systems that distribute data by content hash rather than location, such as content-addressed storage networks; see [[Gossip Protocol]].

## See also
- [[Napster]]
