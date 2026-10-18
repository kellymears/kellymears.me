---
aliases:
  - Uniform Resource Locator
  - URI
  - Query string
  - Percent-encoding
tags:
  - web
summary: The address format that names every resource on the web, its parts from scheme to fragment, and why parsing one correctly is harder and more security-relevant than it looks.
---
A **URL** (Uniform Resource Locator) is the address of a resource on the web. It packs several decisions into one string: which protocol to use, which machine to ask, and what to ask it for. Tim Berners-Lee's design for the [[World Wide Web]] needed a way to point at any document on any server, and the URL is that pointer.

Take `https://example.com:8443/docs/guide?lang=en#install`. Its parts:

- **Scheme.** `https` names the protocol; see [[Hypertext Transfer Protocol]]. Others include `mailto`, `file`, and `data`.
- **Host.** `example.com` is looked up through the [[Domain Name System]] to find a machine.
- **Port.** `8443` picks a service on that machine; see [[Port]]. Each scheme has a default, 443 for `https`, so it's usually omitted.
- **Path.** `/docs/guide` names a resource on the server. It looks like a [[Filesystem]] path, and early servers mapped it straight to files, but a modern server can route it anywhere.
- **Query string.** `?lang=en` passes key-value parameters, often to filter or search.
- **Fragment.** `#install` points within the page. The browser never sends it to the server, which is why early single-page apps used it for routing; see [[Single-Page Application]].

The scheme, host, and port together form the *origin*, the unit of trust for the [[Same-Origin Policy]].

URLs are restricted to a small set of ASCII characters. Anything else, such as spaces, `&` inside a value, or non-English text, is **percent-encoded** as bytes in hexadecimal, so a space becomes `%20` and `é` becomes `%C3%A9`, its UTF-8 bytes; see [[Character Encoding]]. Non-ASCII domain names use a separate scheme called Punycode, which allows lookalike-character spoofing, such as a Cyrillic `а` standing in for a Latin `a`.

**URI** is the broader term for any identifier with this syntax, including names that don't say where to fetch anything. In practice the words are used interchangeably.

Parsing is harder than it looks. The original specification (RFC 3986) and the WHATWG URL Standard that browsers follow disagree on edge cases such as backslashes, extra slashes, and embedded credentials. When a server-side validator and the code that actually fetches a URL parse it differently, attackers can slip past allow-lists, a common route to open redirects and requests to internal services. The safe pattern is to parse once with a standard library and check the parsed host, never the raw string.

URLs are also an interface. People read them, share them, and bookmark them, so a URL is a promise that the resource will stay there. Breaking that promise is [[Link Rot]]. Clean, stable, readable paths help both users and search engines; see [[Search Engine Optimization]]. Encoding application state in the URL, such as filters and the current page, makes views shareable and keeps the back button working.

## See also
- [[HTTP Status Code]]
- [[Fetch API]]
- [[Web Crawler]]
- [[Wayfinding]]
