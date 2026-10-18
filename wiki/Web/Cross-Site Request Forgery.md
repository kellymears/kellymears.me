---
aliases:
  - CSRF
  - XSRF
  - Session riding
tags:
  - web
summary: Tricking a logged-in user's browser into sending a state-changing request to another site, which works because the browser attaches that site's cookies automatically.
---
**Cross-site request forgery** (CSRF) is an attack in which a page on one site causes the visitor's browser to send a request to another site where the visitor is logged in. The browser attaches the target site's [[HTTP Cookie|cookies]] automatically, so the request arrives authenticated, and if it changes state (transfers money, changes an email address, deletes something) the server carries it out. The attacker never sees the response and doesn't need to. A hidden auto-submitting form is enough.

The [[Same-Origin Policy]] does not stop this. It stops the attacking page from *reading* responses, not from *sending* requests, and HTML forms have always been allowed to post anywhere. [[Cross-Origin Resource Sharing|CORS]] does not stop it either: CORS relaxes the read restriction, while simple form-style requests are sent before any CORS check applies.

Defenses, roughly from newest to oldest:

- **`SameSite` cookies.** A session cookie marked `Lax` or `Strict` is not sent on cross-site subrequests, which removes the attack's premise. Browsers now default to `Lax`, which is why CSRF is much rarer than it was.
- **Fetch metadata.** Browsers send `Sec-Fetch-Site`, so a server can refuse state-changing requests whose value is `cross-site`.
- **Origin checking.** Compare the `Origin` (or `Referer`) header to an allowlist of the site's own origins.
- **Synchronizer tokens.** Embed an unguessable per-session token in every form and require it back. A cross-site page can't read it, so it can't include it.

The allowlist approach has an operational trap. An allowlist computed **once at startup** goes stale the moment the app creates new origins at runtime, as a [[Multi-Tenancy|multi-tenant]] app does when each new tenant gets its own subdomain. Requests from the new origin are rejected as forgeries until the process restarts. The symptom is a 401 or 403 that happens only for brand-new tenants, which looks like an authentication bug. A check that derives allowed origins from the same source of truth the router uses, at request time, avoids it.

Two boundaries are worth knowing. CSRF defenses assume no [[Cross-Site Scripting]]: script running on the site can read any token and send any request, so XSS defeats every CSRF defense. And APIs authenticated by a bearer token in a header, rather than a cookie, are immune by construction, because nothing is attached automatically. That is [[Least Privilege]] for credentials: send them only where they were explicitly meant to go.

## See also
- [[Server-Side Request Forgery]]
- [[Same-Origin Policy]]
- [[Third-Party Cookie]]
- [[Cross-Site Scripting]]
- [[Content Security Policy]]
- [[Defensive Default]]
- [[OAuth]]
- [[Clickjacking]]
- [[Passkey]]
