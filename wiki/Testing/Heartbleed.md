---
aliases:
  - CVE-2014-0160
  - Heartbleed bug
tags:
  - testing
summary: A 2014 flaw in the OpenSSL library that let anyone read chunks of a server's memory, private keys included, by asking for more data than they sent, and that exposed how little support the internet's critical open source code received.
---
**Heartbleed** was a security flaw in OpenSSL, the open source library that handled encrypted connections for a large share of the web's servers. Disclosed in April 2014, it let an attacker read up to 64 kilobytes of a server's memory per request, leaving no trace in normal logs, and repeat it at will. That memory could hold passwords, session cookies, and the server's private key; see [[Transport Layer Security]].

The flaw was in the heartbeat extension, a way for one side of a connection to check that the other is still there. One side sends a payload and states its length; the other echoes the payload back. OpenSSL trusted the stated length. A request that claimed 64 kilobytes while sending one byte got back that byte plus whatever sat next to it in memory. The fix was a single check comparing the claimed length with the real one; see [[Memory Safety]] and [[Defensive Programming]].

The bug was committed on New Year's Eve 2011, shipped in OpenSSL 1.0.1 in March 2012, and sat in plain sight for two years. It was found independently by Neel Mehta of Google's security team and by engineers at Codenomicon, a Finnish company that made security testing tools, which gave it its name, a logo, and a website. It was among the first vulnerabilities to get a brand, and the attention worked: many large sites patched within days.

Any key that might have leaked had to be treated as stolen, so sites had to get new certificates and revoke the old ones, which exposed how poorly revocation worked in practice; see [[Certificate Authority]]. Users were told to change passwords, but only after each site had patched.

The bug became a reference case for several arguments:

- **Testing.** Ordinary tests send well-formed requests. A fuzzer that mutates length fields finds this class of bug quickly, and later fuzzing tools rediscover Heartbleed within minutes; see [[Fuzzing]]. Static analysis tools of the time missed it, and some were updated afterward to catch it; see [[Static Analysis]].
- **Language.** Reading past the end of a buffer can't happen silently in languages that check bounds automatically, which became a standard argument against writing such code in C.
- **Many eyes.** The open source claim that "given enough eyeballs, all bugs are shallow" assumes the eyeballs exist; see [[Linus's Law]]. OpenSSL, used by much of the internet, was then maintained largely by a handful of volunteers and received about $2,000 a year in donations; see [[Open Source Sustainability]] and [[Tragedy of the Commons]].

In response, the Linux Foundation set up the Core Infrastructure Initiative to fund critical open source projects, and OpenBSD developers forked OpenSSL as LibreSSL, removing large amounts of old code; see [[Bus Factor]].

## See also
- [[XZ Utils Backdoor]]
- [[Software Bill of Materials]]
- [[Bug bounty]]
- [[Patch Tuesday]]
