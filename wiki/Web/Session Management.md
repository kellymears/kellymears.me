---
aliases:
  - Session ID
  - Session cookie
  - Session fixation
  - Session hijacking
  - Remember me
tags:
  - web
summary: How a website remembers that a visitor has signed in across otherwise unrelated requests, usually with a random identifier in a cookie, and the attacks that target that identifier.
---
**Session management** is how a website remembers who a visitor is between requests. HTTP is stateless: each request arrives on its own, with no built-in memory of the last one; see [[Hypertext Transfer Protocol]]. After someone signs in, something must accompany every later request to say "this is still the same person." That something is the session.

The classic design is a **session ID**: a long random value the server generates at sign-in, stores alongside the user's details, and sends to the browser in a cookie. The browser returns it with every request, and the server looks it up. Everything depends on the value being unguessable, so it should come from a cryptographically secure random source, with at least 128 bits of randomness; see [[Pseudorandom Number Generator]]. The cookie should be marked so scripts can't read it, sent only over encrypted connections, and withheld from cross-site requests; see [[HTTP Cookie]].

Sessions can live in two places:

- **Server-side.** The ID points to a record in a database or fast store; see [[Key-Value Store]]. Logging someone out is instant: delete the record.
- **Client-side.** The session data itself travels in a signed token, so no lookup is needed; see [[JSON Web Token]]. It scales easily but can't be revoked before it expires without rebuilding a server-side list.

Sessions need a lifecycle. An **idle timeout** ends a session after inactivity, an **absolute timeout** ends it after a fixed span regardless, and logout must invalidate it on the server, not just delete the browser's cookie. "Log out of all devices" requires the server to know every session a user holds. A **remember me** option usually issues a separate long-lived token that can create fresh sessions, rather than stretching the session itself.

The main attacks target the identifier:

- **Session hijacking.** An attacker who obtains a valid ID becomes the user. IDs have been stolen by injected scripts and, before encryption was universal, by eavesdropping on shared networks. A 2010 browser extension called Firesheep made that one click on public Wi-Fi, which helped push major sites to HTTPS everywhere; see [[Cross-Site Scripting]], [[Transport Layer Security]], and [[HTTP Strict Transport Security]].
- **Session fixation.** An attacker plants a known ID in the victim's browser before they sign in, then uses it afterward. The defense is to issue a new ID at every sign-in.
- **Riding the session.** Because browsers attach cookies automatically, another site can trigger actions using the victim's session; see [[Cross-Site Request Forgery]].

Behind a [[Load Balancer]], requests from one user can reach different servers, so sessions either live in a shared store or the balancer pins each user to one server, called sticky sessions.

Passwords, passkeys, and single sign-on establish identity once; the session carries it from then on; see [[Passkey]] and [[Single Sign-On]].

## See also
- [[Multi-Factor Authentication]]
- [[Referrer Policy]]
- [[Middleware]]
