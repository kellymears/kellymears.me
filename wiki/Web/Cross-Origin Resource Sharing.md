---
aliases:
  - CORS
tags:
  - web
summary: The mechanism by which a server opts in to letting scripts on other origins read its responses.
---
**Cross-Origin Resource Sharing** is the set of HTTP headers that let a server relax the [[Same-Origin Policy]] for specific other origins, on a response-by-response basis. Without it, a script running on `a.com` that fetches from `b.com` gets the request sent — the browser doesn't block the network call itself — but the browser withholds the *response* from the calling script unless `b.com`'s headers say that origin may read it. CORS is opt-in from the server's side; the default, with no headers at all, is deny.

The header doing the work is `Access-Control-Allow-Origin`, echoing back an allowed origin (or `*` for anyone, which only works for requests carrying no credentials). For anything beyond a plain GET with simple headers — a `PUT`, a custom header, a `Content-Type` of `application/json` — the browser first sends a *preflight*: an `OPTIONS` request asking the server which methods and headers it permits, before sending the real request at all. This is why adding a custom header to an API call can silently double every request's round trips, and why a server that only handles the endpoints it expects, and never `OPTIONS`, breaks cross-origin callers in a way that's invisible from same-origin testing.

CORS is routinely confused with [[Content Security Policy]] because both gate cross-origin behavior, but they answer opposite questions: CORS is the *server* declaring who may read its responses; CSP is the *page* declaring which origins it trusts to load resources from. A tight CSP does nothing to stop another site from trying to fetch your API — that's CORS's job, and it's enforced by the browser reading *your* server's headers, not the caller's.

## See also
- [[Same-Origin Policy]]
- [[Content Security Policy]]
- [[HTTP Caching]]
- [[OAuth]]

## Related
- [[Cross-Site Scripting]]
