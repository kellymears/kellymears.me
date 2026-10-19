---
aliases:
  - Whois
  - Cybersquatting
  - Domain registration
tags:
  - networks
summary: A company accredited to sell and manage domain names on behalf of their owners, part of a layered system of registries and registrars overseen by ICANN, with recurring disputes over ownership records, trademarks, and hijacked names.
---
A **domain registrar** is a company that sells domain names and records who holds them. Someone who wants a name like example.com buys it, really a renewable lease, through a registrar, which submits the registration to the registry running that top-level domain; see [[Top-Level Domain]].

The system is layered. A **registry** operates each top-level domain, maintaining its database of names and publishing the records that point each name to its name servers; Verisign runs .com. **Registrars**, accredited by ICANN, sell to the public and handle billing, renewals, and transfers. The **registrant** holds the name. Their choice of name servers then determines where the domain leads; see [[Domain Name System]].

It wasn't always competitive. In the early 1990s, a single contractor, Network Solutions, registered .com, .net, and .org names under a US government agreement, and began charging for them in 1995. A shared registration system opened the market to competing registrars in 1999, shortly after ICANN was created to oversee the process. Prices dropped, and hundreds of registrars now compete, while registries keep wholesale prices regulated or negotiated with ICANN.

**Whois** is the public lookup service for registration records, originally listing each domain's owner, address, and contacts. Spammers harvested it, and privacy services that substitute their own details became common. When the European Union's data protection rules took effect in 2018, registrars redacted most personal information from public records, which pleased privacy advocates and frustrated security researchers and trademark lawyers; see [[GDPR]].

Names are valuable, which invites abuse. **Cybersquatting** is registering a name matching someone else's trademark to sell it back or exploit its traffic. In 1999, ICANN adopted a dispute policy letting trademark holders reclaim such names through arbitration, and the United States passed a law against it. Registering misspellings of popular names catches mistyped addresses; lookalike names support fraud; see [[Phishing]]. Registrars are also a target: attackers who talk their way into a domain owner's account can redirect a site and its email; see [[Multi-Factor Authentication]]. Registrar locks block unauthorized transfers.

Expiration creates its own market. Names whose owners fail to renew are snapped up within seconds of becoming available, sometimes for the traffic and search reputation they still carry; see [[Search Engine Optimization]]. When an organization lets a domain lapse, old links may start serving someone else's content; see [[Link Rot]]. Lapsed domains used for email are worse, since a new owner can receive messages meant for the old, including password resets.

Registrars matter to security beyond names. Certificate authorities verify control of a domain before issuing certificates, so whoever controls registration controls much of a site's trust; see [[Certificate Authority]]. Email authentication records are also published through the domain; see [[Email Authentication]].

## See also
- [[URL]]
- [[DNS Cache Poisoning]]
- [[Doxing]]
