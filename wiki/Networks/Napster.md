---
aliases:
  - Napster lawsuit
  - Music piracy
  - File sharing
tags:
  - networks
summary: The 1999 file-sharing service that let millions trade MP3s directly between their computers through one central index, which made it easy to sue out of existence and pushed later peer-to-peer designs toward having no center at all.
---
**Napster** was a file-sharing service, launched in June 1999 by the college student Shawn Fanning, that let people download music directly from each other's computers. At its peak in early 2001 it had tens of millions of users, it was one of the fastest-growing applications the internet had seen, and its legal defeat in 2001 shaped both the music business and the design of peer-to-peer networks; see [[Peer-to-Peer]].

Its design was a hybrid. Users' own computers held the files and sent them directly to each other, but a central set of servers held the index: which songs were on which users' machines and how to reach them. A search went to Napster's servers, and the download went from one user to another. Centralizing the search made it fast and complete, and spreading the transfers meant Napster didn't pay to move the music.

It depended on compression. The MP3 format shrank a song to about a tenth of its size on CD, small enough to download over the connections of the time, and ripping CDs to MP3 was already common among students; see [[Lossy compression]]. Campuses with fast networks became hubs, and Napster traffic grew so heavy that many universities blocked it to keep their networks usable; see [[Bandwidth]].

The record industry sued in December 1999, and the band Metallica filed its own suit in 2000. In 2001 a US federal appeals court held that Napster was liable for its users' copyright infringement, because it knew of the infringement and its central index gave it the ability to control it. Ordered to block copyrighted songs, it couldn't filter reliably, shut down in July 2001, and went bankrupt the next year; its name was later sold.

The central index was the weak point: a single company to sue and a single set of servers to switch off. Successors were designed around that. Gnutella had no central server at all, passing searches between peers; Kazaa promoted some users' machines to act as local indexes; BitTorrent split files into pieces downloaded from many peers at once, and later added an index spread across all participants so downloads no longer needed a central tracker; see [[BitTorrent]] and [[Distributed Hash Table]]. Free riding, downloading without sharing, became a central design problem, which BitTorrent addressed by favoring peers that upload; see [[Free Rider Problem]].

The industry's own response was slow. Lawsuits against individual file sharers followed in 2003, the same year Apple opened a store selling single songs for 99 cents, and subscription streaming eventually replaced both downloading and buying; see [[Adaptive Bitrate Streaming]].

Napster showed how quickly a network can grow when every user adds to its value, and how a centralized component exposes a decentralized system to legal and technical attack; see [[Network Effect]] and [[NAT Traversal]].

## See also
- [[Long tail]]
- [[Federation]]
- [[Sybil Attack]]
