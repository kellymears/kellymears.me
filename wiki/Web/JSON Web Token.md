---
aliases:
  - JWT
tags:
  - web
summary: A signed, self-contained token that carries claims a server can verify without a database lookup.
---
**JSON Web Token** is a compact, signed data structure — three base64url segments joined by dots: a header, a payload of claims, and a signature — that a server can verify cryptographically without looking anything up in a database. That's its entire value proposition: a session ID is a pointer that means nothing until you look it up; a JWT is self-contained, carrying the claims (user ID, roles, expiry) directly, verifiable by anyone holding the signing key or, for asymmetric signatures, the public key alone.

That self-containedness is also its sharpest edge. Because a valid JWT is trusted on the signature alone, revoking one before its stated expiry is genuinely hard — there's no session store to delete a row from. Systems that need real-time revocation (someone's access must end *now*, not when the token expires) end up building a denylist or a short-token-plus-refresh-token scheme anyway, which quietly reintroduces the server-side state JWTs were meant to avoid. Keeping expiry windows short is the usual mitigation, not a fix.

The other recurring failure is trusting the token's own unverified header. Early JWT libraries let the `alg` field in the header claim `none` or switch algorithms, and code that read the algorithm from the token instead of hardcoding what it expected could be tricked into skipping verification entirely. The fix is mundane and non-optional: a verifier must dictate the algorithm itself and never take it from the token being verified.

JWTs commonly carry [[OAuth]] and OpenID Connect identity claims, and get passed as a bearer token in an `Authorization` header — a choice with a real tradeoff: an `HttpOnly` cookie is the one storage a [[Cross-Site Scripting]] payload *cannot* read (its weakness is CSRF, since the browser attaches it automatically), while a bearer token sent from JavaScript must live somewhere script-accessible like `localStorage` or memory, where any XSS can exfiltrate it.

## See also
- [[OAuth]]
- [[Cross-Site Scripting]]
- [[Same-Origin Policy]]
- [[Content Security Policy]]

## Related
- [[Cache Invalidation]]
