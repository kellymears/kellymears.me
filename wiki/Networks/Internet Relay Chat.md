---
aliases:
  - IRC
  - Netsplit
tags:
  - networks
summary: The text chat protocol from 1988 built from linked servers and channels, home to early open-source communities, whose design, conventions, and failures shaped every chat app since.
---
**Internet Relay Chat** (IRC) is a text chat protocol created by Jarkko Oikarinen in Finland in 1988. Users connect to a server, join **channels** named with a hash sign, like `#linux`, and talk in real time with everyone else in the channel. It was the main place for live conversation on the internet through the 1990s and the home of early open-source communities for decades.

The protocol is plain text over a [[Network Socket]]: commands like `JOIN #channel` and `PRIVMSG #channel :hello`, simple enough to type by hand. That made writing clients and bots easy, and bots became part of the culture, keeping channels open, logging conversations, running games, and announcing code commits; see [[Webhook]].

Servers link into **networks** shaped like a tree, passing every message along the links so all users of a network share channels; see [[Minimum Spanning Tree]]. A tree has no redundant paths, so when a link between two servers broke, the network split in two, and each half saw everyone on the other side quit at once. This **netsplit** was a regular event. When the halves rejoined, conflicting channel states had to be reconciled, and people exploited splits to take control of channels; see [[Network Partition]].

There was no central account system in early IRC. Nicknames belonged to whoever was using them, so services bots were added later to register names and channels. Operators had broad powers, and channel management, kicks, bans, op status, became a social system of its own; see [[Federation]].

IRC was also a target. Because users' IP addresses were visible, rivals attacked each other's connections with floods, and early botnets were controlled through IRC channels; see [[Denial-of-Service Attack]].

Notable moments:

- **News.** During the 1991 Gulf War and the Soviet coup attempt that year, people relayed live reports over IRC, an early sign of the internet as a news medium.
- **Open source.** Projects coordinated on IRC networks like Freenode for decades; see [[Commons-Based Peer Production]].
- **The Freenode collapse.** In 2021, a change of control at Freenode, then the largest network for open-source projects, led its volunteer staff to resign and start a replacement, Libera.Chat, and most projects moved within weeks, a demonstration of how communities hold the real value of a network; see [[Network Effect]].

IRC conventions passed into later chat apps: channels with hash names, `/me` actions, mentions that highlight a name, and away messages. Slack's channels and bot integrations are often described as IRC with history and search. What IRC lacked, persistent history when you're offline, file sharing, and identity, became the selling points of its successors, while IRC's openness, anyone can run a server or write a client, is what those successors gave up; see [[Enshittification]].

## See also
- [[Peer-to-Peer]]
- [[MQTT]]
