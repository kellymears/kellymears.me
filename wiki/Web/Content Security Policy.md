---
aliases:
  - CSP
tags:
  - web
summary: An HTTP header that tells the browser which sources of script, style, and other content a page is allowed to load.
---
**Content Security Policy** is an HTTP response header (`Content-Security-Policy`) that lets a page declare, in advance, which origins it trusts for scripts, styles, images, fonts, and other resources. The browser enforces the list; anything not on it — an inline script an attacker managed to inject, a `<script src>` pointing at a domain that isn't allowlisted — simply fails to execute or load, regardless of how it got into the page's HTML.

Its primary target is [[Cross-Site Scripting]]: even if an attacker successfully injects markup into a page — through an unescaped comment field, a URL parameter reflected into the DOM — a strict CSP means the injected `<script>` tag never runs, because its source isn't on the allowlist and, under a strict policy, inline scripts are blocked outright regardless of source. This is defense in depth: CSP doesn't fix the underlying injection vulnerability, it limits what an attacker can do once they've found one.

The directive that does the real work is `script-src`, and the strongest configurations avoid `'unsafe-inline'` and `'unsafe-eval'` entirely, instead using a per-request nonce or hash that legitimate inline scripts carry and injected ones can't guess. A policy that includes `'unsafe-inline'` for convenience gives up most of the protection, since that's exactly what lets an injected inline script run too.

CSP composes with, but is distinct from, [[Cross-Origin Resource Sharing]]: CORS governs whether *your* page's script can read a response from *another* origin; CSP governs which origins your page is permitted to load resources *from* at all. A page can have a tight CSP and a permissive CORS setup, or the reverse — they answer different questions about trust.

## See also
- [[Cross-Site Scripting]]
- [[Cross-Origin Resource Sharing]]
- [[Same-Origin Policy]]
- [[HTTP Caching]]

## Related
- [[JSON Web Token]]
