---
aliases:
  - Cookie
  - Cookies
  - Set-Cookie
  - SameSite
  - HttpOnly
tags:
  - web
summary: A small piece of state a server asks the browser to store and send back on later requests, governed by attributes that decide exactly where it goes.
---
An **HTTP cookie** is a small name–value pair a server sets with a `Set-Cookie` response header, which the browser then attaches to later requests that match the cookie's scope. Cookies are how stateless HTTP carries sessions: the server issues an identifier once, and the browser sends it back automatically.

That "automatically" is the source of both their convenience and their danger, and the attributes exist to narrow it:

- **`Domain`.** Omitted, the cookie is *host-only* and goes to exactly the host that set it. Set, it goes to that domain *and every subdomain*. A host-only cookie set by `app.example.com` is not visible on `tenant.app.example.com`, a frequent source of "logged in here but not there" bugs in [[Multi-Tenancy|multi-tenant]] apps on subdomains. A leading dot (`.example.com`) is ignored in the header today, but some programmatic interfaces, including browser automation protocols, still use it as the marker for a domain cookie versus a host-only one. Leaving it out there quietly creates a cookie that never matches.
- **`Path`** narrows by URL path. It is not a security boundary.
- **`Secure`** restricts the cookie to HTTPS. **`HttpOnly`** hides it from JavaScript, so a [[Cross-Site Scripting]] bug cannot read the session token.
- **`SameSite`** controls whether the cookie is sent on requests initiated by *other* sites. `Strict` never, `Lax` (now the default) only on top-level navigations, `None` always (which requires `Secure`). It is the main modern defense against [[Cross-Site Request Forgery]].
- **Prefixes.** A name beginning `__Host-` is accepted only if it is `Secure`, host-only, and `Path=/`, so a compromised subdomain cannot overwrite it.

Most cookie failures are silent. A cookie with an invalid domain, a missing `Secure` on a `SameSite=None` cookie, or a size over the ~4 KB limit is simply dropped, with no error in the page, only a console warning if anyone is looking. The symptom is a redirect to login or a 401 several steps later. When authentication "randomly" fails on one host, the first check is the stored cookie in the browser's storage panel: its domain, path, and flags.

Cookies compete with bearer tokens such as a [[JSON Web Token]] in a header. Header tokens aren't sent automatically, so they are immune to CSRF, but they have to be stored somewhere JavaScript can read, which exposes them to XSS. The trade-off sits between the two attack classes.

## See also
- [[Session Management]]
- [[Same-Origin Policy]]
- [[Third-Party Cookie]]
- [[OAuth]]
- [[Passkey]]
- [[Packet Capture]]
- [[Cookie Consent]]
- [[Web Storage]]
- [[Hypertext Transfer Protocol]]
- [[HTTP Strict Transport Security]]
- [[Clickjacking]]
