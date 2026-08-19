---
aliases:
  - DoH
tags:
  - networks
summary: DNS over HTTPS wraps DNS lookups in encrypted HTTPS requests, hiding query contents from anyone but the resolver.
---
**DNS over HTTPS** encrypts DNS queries by sending them as ordinary HTTPS requests rather than as plaintext UDP packets, so a network observer between a client and its resolver sees an encrypted connection to some server rather than the literal hostname being looked up. Classic [[Domain Name System]] queries are plaintext by design — trivially readable, and trivially spoofable, by anything sitting on the path, which is exactly the property DoH removes.

The privacy argument is straightforward: every domain a device resolves is a fairly complete proxy for its browsing history, and an ISP, a coffee-shop Wi-Fi operator, or anyone else on the local network can read that history for free from unencrypted DNS traffic even when every actual page load happens over HTTPS. Wrapping the query in HTTPS closes that specific leak — though it doesn't hide *that* a DNS-over-HTTPS connection is happening, and traffic analysis on packet timing and size can still leak clues.

DoH is also politically loaded in a way plain protocol changes rarely are, because it changes *who* gets to see and filter DNS queries. Historically your ISP's or your network administrator's resolver saw every lookup and could block or log it; DoH is usually configured browser-side, pointed at a resolver of the browser vendor's or user's choosing, which route around network-level DNS filtering (parental controls, corporate policy, national censorship) — a genuine privacy win for individuals that is simultaneously a headache for administrators who relied on DNS visibility as a control point. **DoT** (DNS over TLS) solves the same encryption problem on its own dedicated port instead of disguising itself as regular HTTPS traffic, which makes it easier to identify and block but avoids conflating DNS with generic web traffic.

## See also
- [[Domain Name System]]
- [[Content Delivery Network]]
- [[Zero Trust Network]]
- [[QUIC]]
