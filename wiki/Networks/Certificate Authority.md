---
aliases:
  - CA
  - Certificate
  - X.509
  - Public key infrastructure
  - PKI
  - Let's Encrypt
  - Certificate Transparency
tags:
  - networks
summary: An organization trusted to vouch that a public key belongs to a domain or entity, the root of trust behind every HTTPS padlock.
---
A **certificate authority (CA)** is an organization that issues digital certificates: signed statements that a particular public key belongs to a particular name, such as a domain. When a browser connects to a site over [[Transport Layer Security]], the server presents its certificate. The browser checks that it was signed by a CA it trusts, that it covers the right domain, and that it hasn't expired. If all checks pass, the browser accepts the server's public key as genuine, which closes the gap [[Public-Key Cryptography]] leaves open: a key alone proves possession, not identity.

Trust is arranged as a chain. Operating systems and browsers ship a *root store* of a hundred or so root CA certificates. Roots rarely sign site certificates directly. They sign *intermediate* certificates, kept online, which sign the certificates sites use. A browser walks the chain from the site up to a root it trusts. This whole arrangement is called the public key infrastructure (PKI), and the certificate format is X.509.

The system's weakness is that any trusted CA can issue a certificate for any domain. A single compromised or careless CA undermines everyone. That has happened: DigiNotar was hacked in 2011, and fraudulent certificates for Google were used to spy on users in Iran. The company went bankrupt within weeks after browsers removed its root. Several responses followed:

- **Certificate Transparency.** Since 2018, browsers require certificates to be logged in public, append-only logs before they are trusted, so domain owners can spot certificates they never requested.
- **Root store policy.** Browser vendors audit CAs and remove ones that misissue, as several large CAs have learned.
- **CAA records.** A [[Domain Name System]] record lets a domain declare which CAs may issue for it.

How a CA checks that you control a domain is called *domain validation*: you prove control by placing a file on the site or a record in DNS. **Let's Encrypt**, launched in 2015 by a nonprofit, issues these certificates free and fully automatically through the ACME protocol. It changed the web: HTTPS went from a minority of page loads to the large majority within a few years, and certificate lifetimes have kept shrinking since, from years to 90 days and soon fewer, because short-lived certificates limit the damage from stolen keys and broken revocation. Automation became a requirement rather than a convenience, the same shift [[Continuous Deployment]] made for releases.

The same model appears elsewhere: [[Code Signing]] certificates for software, device certificates in an [[eSIM]], and the STIR/SHAKEN certificates behind [[Caller ID Authentication]].

## See also
- [[GNU Privacy Guard]]
- [[DNS Cache Poisoning]]
- [[Mutual TLS]]
- [[Top-Level Domain]]
- [[Build Provenance]]
- [[Heartbleed]]
- [[HTTP Strict Transport Security]]
- [[Certificate Revocation]]
