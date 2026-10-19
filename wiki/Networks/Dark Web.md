---
aliases:
  - Darknet
  - Darknet market
tags:
  - networks
summary: Websites reachable only through anonymity networks such as Tor, which hide both visitors and the servers themselves, used for illegal markets, but also for whistleblowing, journalism, and evading censorship.
---
The **dark web** is the set of websites reachable only through anonymity networks, most commonly Tor, which conceal where a site is hosted as well as who is visiting it. Ordinary browsers can't open these addresses; a visitor needs software that routes traffic through the network; see [[Onion Routing]].

The term is often confused with the **deep web**, which means any content that search engines don't index: email inboxes, bank accounts, pages behind logins, and database results. The deep web is enormous and mostly mundane; see [[Web Crawler]]. The dark web is a small part of it, defined by how its sites are reached.

Tor's **onion services** make the dark web possible. A site publishes an address derived from its cryptographic key, and visitors connect through circuits of relays that meet at a rendezvous point, so neither side learns the other's network location; see [[Public-Key Cryptography]]. Because the address is the key, a visitor who has the correct address can be sure it reaches the site that holds the key, without relying on certificate authorities; see [[Certificate Authority]].

The dark web became notorious through markets. Silk Road, launched in 2011, sold drugs using cryptocurrency payments, escrow, and seller ratings, borrowing the trust mechanisms of mainstream e-commerce; see [[Blockchain]]. Its founder, Ross Ulbricht, was arrested in 2013 and sentenced to life in prison, and was pardoned in 2025. Successor markets rose and fell. In 2017, coordinated operations took down AlphaBay, and Dutch police secretly ran another large market, Hansa, for about a month to gather evidence on its users before closing it; see [[Honeypot]]. Stolen data, from credit cards to leaked databases, is traded on such forums; see [[Data Breach]]. Ransomware groups publish victims' files on dark web leak sites to pressure them into paying.

The same properties serve legitimate uses. News organizations run onion versions of their sites so readers in censoring countries can reach them; see [[Internet Censorship]]. Secure tip lines let sources submit documents to journalists without revealing themselves. Facebook launched an onion address in 2014. Security researchers and law enforcement monitor dark web forums for signs of attacks.

Anonymity cuts both ways for users. Scams are common, markets have often disappeared with customers' deposits, and investigators have identified users through operational mistakes rather than by breaking the network. Studies of Tor's traffic have found that onion services account for only a small fraction of it; most Tor users simply browse the ordinary web more privately; see [[Virtual Private Network]].

Public fear of the dark web often outruns its actual size, and coverage has repeatedly cast it as a hidden underworld vastly larger than it is; see [[Moral Panic]].

## See also
- [[Steganography]]
- [[Sybil Attack]]
- [[Computer Virus]]
- [[Ransomware]]
- [[Mix Network]]
