---
aliases:
  - OCSP
  - Certificate revocation list
tags:
  - networks
summary: Canceling a security certificate before it expires, for instance after its private key leaks, a problem the web has never solved well and is increasingly answering by making certificates expire quickly instead.
---
**Certificate revocation** cancels a certificate before its expiry date. A certificate binds a domain name to a public key, signed by a certificate authority. If the matching private key is stolen, or the certificate was issued in error, anyone holding a copy can keep impersonating the site until the certificate expires, unless browsers learn it should no longer be trusted; see [[Certificate Authority]] and [[Public-Key Cryptography]].

Getting that news to every browser in time has proved one of the web's most stubborn problems.

The first mechanism was the **certificate revocation list**, or CRL: each authority publishes a signed list of the serial numbers it has revoked, and clients download it. Lists grew large, clients cached them for days, and checking one during a connection added delay.

The **Online Certificate Status Protocol**, OCSP, published in 1999, asked the authority about one certificate at a time. It created new problems:

- **Privacy.** Each query told the authority which site the user was visiting.
- **Latency.** Each new connection waited on a request to a third server; see [[Transport Layer Security]].
- **Soft failure.** If the authority didn't answer, browsers proceeded anyway, since failing would break sites whenever the authority had an outage. An attacker able to intercept traffic could simply block the check, which made it nearly useless against exactly the threat it was meant to stop; see [[Man-in-the-Middle Attack]].

**OCSP stapling** let the website fetch a signed, time-limited status from the authority and attach it to the handshake, fixing the privacy and latency problems. It required server operators to enable it, and many didn't.

Browsers increasingly took the job over themselves. Chrome ships a curated list of important revocations with its updates. Firefox developed a scheme that compresses the revocation status of every publicly logged certificate into a compact structure built from cascading Bloom filters, pushed to browsers daily; see [[Bloom Filter]].

The 2014 Heartbleed bug forced a stress test. It exposed private keys on vast numbers of servers, and the resulting wave of revocations swelled lists and showed how many sites never revoked at all; see [[Heartbleed]].

The industry's current answer is to shrink the window instead. If certificates last only weeks, a compromised one soon expires on its own. Free automated issuance made short lifetimes practical, and browser makers and authorities agreed in 2025 to cut maximum lifetimes in stages to under fifty days by the end of the decade. Let's Encrypt, the largest authority by volume, also announced that it would end OCSP and rely on revocation lists, citing privacy; see [[Time to Live]].

The general lesson applies beyond certificates: once a credential is out in the world, taking it back is much harder than letting it expire; see [[JSON Web Token]].

## See also
- [[Code Signing]]
- [[Mutual TLS]]
