---
aliases:
  - SPF
  - DKIM
  - DMARC
  - Sender Policy Framework
  - DomainKeys Identified Mail
  - Email spoofing
tags:
  - networks
summary: The three DNS-published standards, SPF, DKIM and DMARC, that let a receiving mail server check whether a message really came from the domain it claims.
---
**Email authentication** refers to the standards that let a receiving server check whether a message really comes from the domain it claims. The original mail protocol, SMTP (1982), has no such check. Any server can claim any sender, the way anyone can write any return address on an envelope. Three standards, all published through the [[Domain Name System]], gradually closed the gap.

- **SPF** (Sender Policy Framework) lets a domain publish a DNS record listing the servers allowed to send its mail. The receiver checks the connecting server's IP address against that list. SPF checks the hidden *envelope* sender, not the From address people see, and it breaks when mail is forwarded, because the forwarder's IP isn't on the original domain's list.
- **DKIM** (DomainKeys Identified Mail, 2007) has the sending server sign selected headers and the body with a private key. The matching public key sits in DNS, so any receiver can verify that the message came from a holder of the key and wasn't altered in transit. It uses [[Public-Key Cryptography]] and a [[Hash Function]] of the content, and it survives plain forwarding. A mailing list that adds a footer or rewrites the subject breaks the signature.
- **DMARC** (2012) ties the other two to the visible From address. A message passes only if SPF or DKIM succeeds *and* the authenticated domain matches the From domain, a requirement called alignment. The domain owner publishes a policy telling receivers what to do with failures: `none` (just report), `quarantine` (send to spam) or `reject`. Receivers send aggregate reports showing who sends as the domain.

Deployment was slow for years because a strict policy can bounce legitimate mail from forgotten senders such as billing systems and newsletter services. The usual path is to start at `none`, read the reports, fix each legitimate source, then move to `quarantine` and `reject`. In 2024 Gmail and Yahoo began requiring SPF, DKIM and DMARC from bulk senders, which made adoption effectively mandatory.

These checks confirm that a message came from the domain it names. They do not show the domain is honest. A phisher can register `examp1e.com` and pass every check, and a compromised real account sends authenticated mail. A [[Confidence Trick]] by email still works if the victim doesn't read the domain closely.

Email's history is a cautionary example of [[Postel's Law]]. Being liberal in what you accept made early email interoperable and made spoofing trivial, and closing that hole took decades of add-on standards. The telephone network faced the same problem with spoofed caller ID, and [[Caller ID Authentication]] followed a similar path: cryptographic signatures, policy and gradual enforcement. Both added proof of [[Provenance]] to a system designed without it.

## See also
- [[Domain Name System]]
- [[Public-Key Cryptography]]
- [[Caller ID Authentication]]
- [[Postel's Law]]
- [[Simple Mail Transfer Protocol]]
- [[Federation]]
