---
aliases:
  - MITM
  - Man-in-the-middle
  - On-path attack
  - ARP spoofing
  - Evil twin
  - Certificate pinning
tags:
  - networks
summary: An attack in which someone secretly sits between two parties, reading or altering what they send, and why authentication, not just encryption, is the defense.
---
A **man-in-the-middle attack**, also called an *on-path attack*, is one where an attacker places themselves between two parties who believe they are talking directly to each other. The attacker relays messages in both directions, so the conversation seems normal, while reading everything and changing whatever they like. It works against any protocol where the two ends can't prove who they are to each other.

Getting into the middle is the first step, and networks offer many ways:

- **On the local network.** *ARP spoofing* answers [[Ethernet]] address queries with the attacker's own machine, so traffic for the router flows through them first.
- **Over wireless.** An *evil twin* is a fake [[Wi-Fi]] access point with the same name as a real one, such as a café's, which nearby devices may join automatically.
- **Through naming.** Poisoning the [[Domain Name System]] sends a victim to the attacker's server under the right name.
- **Through routing.** Hijacking [[Border Gateway Protocol]] announcements can pull another network's traffic through an attacker at internet scale.
- **By position.** Anyone already on the path, such as a compromised router, a hostile provider, or a government at a border, is in the middle without any trick at all.

Encryption alone is not the defense. If two parties agree a key with [[Public-Key Cryptography]] but never check whose key they received, the attacker simply runs two encrypted conversations, one with each side. That's the classic weakness of an unauthenticated Diffie-Hellman exchange. The real defense is **authentication**: checking that the key belongs to who it claims to.

[[Transport Layer Security]] does this with certificates. The server proves its identity with a certificate signed by a [[Certificate Authority]] the browser trusts, and an attacker without that certificate's private key can't impersonate the site. The remaining gap is the first plain HTTP request, which [[HTTP Strict Transport Security]] closes by telling browsers to use HTTPS only. Apps that talk to their own servers sometimes go further with **certificate pinning**, accepting only a specific key, so even a wrongly issued certificate fails. SSH uses trust on first use instead, remembering a server's key and warning loudly if it ever changes.

The middle isn't always hostile. Corporate networks and antivirus products install their own root certificate and decrypt traffic deliberately to inspect it, and a [[Reverse Proxy]] terminates TLS on a server's behalf. Both are structurally the same as the attack, with consent, and both weaken the end-to-end guarantee that the [[End-to-End Principle]] argues for. Encrypting DNS lookups and assuming the network is hostile, as in a [[Zero Trust Network]], remove more of the places an attacker can stand.

## See also
- [[Wiretapping]]
- [[Encrypted Client Hello]]
- [[Certificate Revocation]]
- [[Near-Field Communication]]
