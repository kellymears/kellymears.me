---
aliases:
  - Federated protocol
  - ActivityPub
  - Fediverse
  - Defederation
tags:
  - networks
summary: Many independently run servers that interoperate through a shared protocol, so users on different servers can still talk to each other, a middle path between one central platform and pure peer-to-peer.
---
**Federation** is a way of building a network service from many independently operated servers that talk to each other through a shared protocol. Each server hosts its own users, and users on different servers can still communicate. No single company runs the whole thing.

Email is the oldest and largest example. Someone with an address at one provider can write to anyone at any other, because every mail server speaks the same protocol; see [[Simple Mail Transfer Protocol]]. Phone networks work similarly: different carriers, one interconnected system. Later federated systems include chat protocols and social networks. ActivityPub, a W3C standard from 2018, lets social servers exchange posts, follows, and replies; the network of servers using it is called the fediverse.

Federation sits between two other designs:

- **Centralized platforms.** One organization runs every server, sets every rule, and owns every account. Simple to use and to build features for, but users depend entirely on one company's decisions; see [[Enshittification]].
- **Pure [[Peer-to-Peer]].** Every user's device is a node, with no servers at all. Maximally independent, but hard to make reliable when devices go offline, and hard to moderate.

Federated servers are always online, can moderate their own communities, and still connect to the wider network.

How it works: each user has an address that includes their server, such as `@name@server.example`, just as an email address includes a domain; see [[Domain Name System]]. When someone follows a remote user, their server subscribes to that user's server, which pushes new posts over HTTP; see [[Webhook]]. Servers keep copies of remote content, so the network tolerates some servers being down; see [[Eventual Consistency]].

Strengths:

- **Local control.** Each server sets its own rules and moderation. A community can run a server matching its norms.
- **Exit.** If a server's operator behaves badly, users can move to another without leaving the network.
- **Resilience.** No single company's failure or policy change takes the whole network down.

Problems:

- **Moderation across borders.** A server can block, or *defederate* from, another server whose content it rejects. That's powerful but blunt, and spam and abuse travel across the network easily.
- **Identity is tied to a server.** If a server shuts down, its users' addresses go with it. Moving accounts is possible but often loses history.
- **Cost falls on volunteers.** Small servers pay for storage and bandwidth to cache content from the whole network.
- **Recentralization.** Users gather on a few large servers for convenience, and those servers gain outsized influence, as large providers have done with email; see [[Network Effect]].

The underlying idea is interoperability through an open protocol rather than through one owner, the same principle that let the [[World Wide Web]] grow without a central gatekeeper.

## See also
- [[Instant Messaging]]
- [[Napster]]
- [[Distributed Hash Table]]
- [[Data Portability]]
- [[Internet Relay Chat]]
- [[SMS]]
