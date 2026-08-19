---
aliases:
  - OAuth 2.0
tags:
  - web
summary: A protocol for granting one application limited access to a user's data on another, without handing over the user's password.
---
**OAuth** is a protocol for delegated authorization: it lets a user grant one application access to their data on another — a calendar app reading a user's Google Calendar, a resume builder reading their LinkedIn profile — without that user ever typing their password into the requesting app. The requesting app gets a scoped, revocable token instead of a credential, which is the entire point.

The flow that matters, the authorization code grant, runs through a redirect: the app sends the user to the provider's own login page, the user authenticates there and approves specific scopes, the provider redirects back with a short-lived code, and the app exchanges that code (server-to-server, with its own client secret) for an access token. The user's password never touches the requesting app's servers at any point in that sequence — a deliberate design, not an incidental one, since the whole protocol exists to avoid password sharing between services.

A precise and commonly blurred point: OAuth is an **authorization** protocol — it answers "what is this app allowed to do" — not an **authentication** protocol — "who is this user." Using a raw OAuth access token to decide who's logged in is a category error that OpenID Connect exists to fix, layering an identity token (a [[JSON Web Token]] containing the user's identity claims) on top of the same OAuth flow. "Login with Google" is OpenID Connect, not bare OAuth, even though it rides the same redirect dance.

The access token itself is usually opaque to the client and short-lived, paired with a longer-lived refresh token the app can exchange for new access tokens without asking the user to log in again — which is what lets "stay logged in" coexist with tokens that expire in an hour.

## See also
- [[JSON Web Token]]
- [[Same-Origin Policy]]
- [[Cross-Origin Resource Sharing]]
- [[Content Security Policy]]

## Related
- [[Cross-Site Scripting]]
