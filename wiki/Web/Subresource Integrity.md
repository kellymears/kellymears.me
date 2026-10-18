---
aliases:
  - SRI
  - Integrity attribute
tags:
  - web
summary: Pinning a script or stylesheet loaded from another server to a cryptographic hash, so the browser refuses to run it if the file has been changed.
---
**Subresource integrity** lets a page specify exactly which file it expects when loading a script or stylesheet from somewhere else. The page adds an `integrity` attribute containing a cryptographic hash of the file, such as `sha384-` followed by the encoded digest. The browser downloads the file, computes its hash, and refuses to use it if the two don't match. It became a W3C recommendation in 2016.

The problem it solves is trust in third-party hosts. Sites routinely load libraries from a [[Content Delivery Network]] or a vendor's server, and any script a page loads runs with full access to the page: it can read forms, steal session data, and rewrite content. If that server is compromised, every site loading from it is compromised too. With an integrity hash, a tampered file simply fails to load. It is the browser-side counterpart of the hashes recorded in a [[Lockfile]], and part of [[Supply Chain Security]] on the web.

Using it has some requirements:

- **Exact versions.** The hash identifies one specific file, so the URL must point at an immutable, versioned file. A URL like "latest" that changes over time breaks the check on every update.
- **CORS.** Cross-origin resources need the `crossorigin` attribute and a server that sends [[Cross-Origin Resource Sharing]] headers, since otherwise the browser cannot inspect an opaque response to hash it.
- **Strong hashes.** SHA-256, SHA-384, or SHA-512, from the [[Hash Function]] family, with several allowed at once during transitions.

Two incidents show both its value and its limits. In 2018, attackers modified a script on British Airways' own servers to skim payment details from about 400,000 customers, a Magecart attack; the UK regulator fined the airline £20 million. SRI on that script would have blocked the change, though attackers on that server could also have edited the hash. In 2024, the domain behind polyfill.io, a widely embedded service, changed owners and began injecting malicious code into over 100,000 sites. SRI could not have helped: the service deliberately generated different code per browser, so no fixed hash was possible. A dynamic [[Polyfill]] bundle cannot be pinned.

SRI only covers what the page loads directly. A script that then fetches further code, or imports other modules, is not covered by the original hash, although import maps gained integrity entries for [[ES Modules]]. A [[Content Security Policy]] can complement it by restricting which origins scripts may come from at all, and CSP can itself use hashes to allow specific inline scripts, a defense against [[Cross-Site Scripting]].

Often simpler still is self-hosting third-party files, versioned and hashed by your own build. Content addressing, as in a [[Merkle Tree]], is the general principle: name data by what it is, not where it lives, and any change becomes detectable.

## See also
- [[Third-Party Script]]
- [[Content Security Policy]]
- [[Hash Function]]
- [[Content Delivery Network]]
