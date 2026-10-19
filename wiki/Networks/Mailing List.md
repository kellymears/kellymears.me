---
aliases:
  - Listserv
  - Email list
tags:
  - networks
summary: A single email address that relays each message to everyone subscribed, one of the oldest forms of online community, still where much open-source and standards work happens.
---
A **mailing list** is an email address that redistributes every message it receives to a list of subscribers. Replies go back to the list and out to everyone again, so a group can hold a conversation by email. Simpler lists only send outward, as with newsletters and announcements.

Lists appeared on the ARPANET in the 1970s, where researchers used them for both work and hobbies; one of the earliest well-known lists was devoted to science fiction. Managing them was manual: a person kept the list of addresses and edited it by hand; see [[ARPANET]] and [[Simple Mail Transfer Protocol]].

Automation arrived in 1986 with LISTSERV, written for BITNET, an academic network. Subscribers could join or leave by sending commands to the server, and the program's name became a generic term for any mailing list. Free alternatives such as Majordomo and GNU Mailman followed in the 1990s.

Lists became the backbone of collaboration that couldn't happen in one place:

- **Open source.** Linux kernel development runs on mailing lists. Changes are sent as patches in the body of an email and reviewed in reply, a workflow that predates and still coexists with web-based code review; see [[Diff]] and [[Code Review]].
- **Standards.** Internet standards are discussed and refined on open lists, where anyone can participate; see [[Request for Comments]].
- **Communities.** Hobbyist, academic, and support groups gathered on lists alongside discussion forums and newsgroups; see [[Bulletin Board System]] and [[Eternal September]].

Over time lists developed well-known problems:

- **Volume.** Busy lists flood inboxes, so many offer a digest that bundles a day's messages into one.
- **Reply-all storms.** One mistaken reply to a large list prompts others asking to be removed, each sent to everyone, until the server buckles; see [[Cascading Failure]].
- **Spam.** An open list is a broadcast channel for anyone, which is why most require membership or moderation to post; see [[Email Spam]].
- **Silence.** In a large group, everyone assumes someone else will answer a question; see [[Bystander Effect]].

Email authentication complicated matters. A list forwards a message from the author's address through its own servers, which looks exactly like forgery. When large email providers began telling receivers in 2014 to reject unauthenticated mail claiming to be from their domains, list messages from their users started bouncing. Most list software now rewrites the sender to its own address; see [[Email Authentication]].

Lists have been declared obsolete repeatedly, replaced by forums, chat, and social networks. They persist because email is open, archivable, and works with any client, and because a message can sit in an inbox until someone has time for it, unlike a chat thread that scrolls away; see [[Internet Relay Chat]].

## See also
- [[Multicast]]
- [[Internet Forum]]
- [[Debian OpenSSL Bug]]
