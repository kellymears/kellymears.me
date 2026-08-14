---
aliases:
  - CORS
  - Cross-origin
tags:
  - web
summary: The browser rule isolating documents by scheme, host, and port, and the mechanisms for relaxing it.
---
The **same-origin policy** is the browser's fundamental isolation rule: a document may not read data from another *origin*, where an origin is the triple of scheme, host, and port. It is what stops a page from reading your mail in another tab.

Because real applications legitimately span origins, several mechanisms relax it. **CORS** lets a server opt in to being read by named origins. **Cookies** have their own rules, keyed on domain rather than origin, so a cookie set for a parent domain is sent to subdomains — but scheme and port still matter for the origin check, which is why a subdomain can receive a cookie and still be refused. **CSRF protections** exist because cookies are sent automatically, so an authenticated state-changing request can be triggered from an unrelated page; the standard defense is a token the attacker cannot read, which is precisely why it fails when a request arrives from an origin not on the allowlist.

The recurring practical symptom is asymmetric: read requests succeed while writes fail with an authorization error, because reads pass the cookie check and writes hit the origin check. The cause is usually that the application is being driven at a URL that is *not* the one it was configured with — a bare hostname where a subdomain was expected, or the wrong port.

## See also
- [[Domain Name System]]
- [[Least Privilege]]
- [[Port]]
- [[Multi-Tenancy]]

## Related
- [[Virtual Private Network]]
- [[eSIM]]
- [[Secret Management]]
- [[Caller ID Authentication]]
