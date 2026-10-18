---
aliases:
  - DNS spoofing
  - Kaminsky attack
  - DNSSEC
tags:
  - networks
summary: Tricking a DNS resolver into caching a false answer, so everyone using it is sent to an attacker's server, the 2008 attack that forced an emergency fix across the internet, and the signing system meant to end it.
---
**DNS cache poisoning** is an attack that tricks a DNS resolver into storing a false answer, so that everyone who uses that resolver is sent to the wrong address for a name. Instead of reaching their bank, users reach a server the attacker controls, with the right domain still in the address bar.

It exploits how DNS lookups work; see [[Domain Name System]]. A resolver, usually run by an internet provider, answers lookups on behalf of many users. When it doesn't have a name cached, it asks other servers, receives an answer, and caches it for the record's [[Time to Live]]. The queries and answers travel over UDP, which has no connection or handshake; see [[TCP and UDP]]. A resolver accepts an answer if it arrives from the right address, matches the question, and carries the same 16-bit transaction ID the resolver chose. An attacker who can't see the query can still flood the resolver with forged answers, guessing IDs, hoping one arrives before the real reply.

For years this was considered hard, since a resolver only asked about a name once per TTL, giving attackers few chances. In 2008, the security researcher Dan Kaminsky found a way around that: ask the resolver about many made-up subdomains, each of which forces a fresh query, and in each forged answer include extra information claiming a new server is in charge of the whole domain. Attackers could get unlimited tries and take over an entire domain in seconds.

Kaminsky reported it privately, and in an unusual effort, vendors of nearly all DNS software coordinated a simultaneous patch in July 2008. The fix randomized the source [[Port]] of each query as well as the ID, multiplying the guessing space by tens of thousands; see [[Seeded Randomness]]. That made attacks much harder without fixing the root cause: answers aren't authenticated. Later research found ways to infer the random port anyway, through side effects of how systems handle network errors.

The real fix is **DNSSEC**, which signs DNS records cryptographically, so a resolver can check that an answer came from the domain's owner, following a chain of signatures from the root zone down; see [[Public-Key Cryptography]] and [[Certificate Authority]]. It was designed in the 1990s and the root was signed in 2010, but adoption is still partial: signing is complex, mistakes take whole domains offline, and many resolvers don't validate.

In practice, other layers limit the damage. HTTPS means a poisoned address leads to a site without a valid certificate, which browsers block; see [[Transport Layer Security]] and [[HTTP Strict Transport Security]]. Encrypted DNS between users and their resolver prevents tampering along that path; see [[DNS over HTTPS]] and [[Man-in-the-Middle Attack]].

The attack is a lesson in trusting unauthenticated answers; see [[Zero Trust Network]].

## See also
- [[Border Gateway Protocol]]
- [[Penetration Testing]]
