---
aliases:
  - Unvalidated redirect
  - Open redirector
tags:
  - web
summary: A page that forwards visitors to whatever address a URL parameter names, letting attackers borrow a trusted domain to launch phishing or steal sign-in tokens, and the narrow ways to fix it.
---
An **open redirect** is a page that sends visitors on to any address supplied in the request, without checking where. A site might have a link like /login?next=/settings so that after signing in, the user lands back where they started. If the code honors any value of next, an attacker can write a link to the real site that ends somewhere else entirely.

On its own an open redirect harms nothing on the server, which is why it is often dismissed. Its danger is that it lends the trusted site's reputation to whoever controls the destination:

- **[[Phishing]].** A link that begins with a bank's real domain passes the habit of checking the address, survives email filters that judge links by domain, and then bounces the victim to a fake login page.
- **Stealing sign-in tokens.** Sign-in protocols return codes or tokens to a registered address. If a provider checks only that the return address is on the right domain, and that domain contains an open redirect, the token can be forwarded on to the attacker; see [[OAuth]] and [[Single Sign-On]]. Several real account-takeover bugs have been chained this way.
- **Script injection.** If the redirect target can be a javascript: address rather than a web address, following it runs the attacker's code in the site's context; see [[Cross-Site Scripting]].
- **Reaching internal services.** A server that fetches URLs and follows redirects can be bounced from an allowed address to a forbidden one; see [[Server-Side Request Forgery]].

The redirect is usually an HTTP 302 or 303 response naming the destination; see [[HTTP Status Code]].

Fixes, from most to least robust:

- **Don't take a destination at all.** Store the return location on the server, or accept only an ID that maps to a fixed list of pages.
- **Allow only relative paths** on the same site, checked carefully.
- **Use an allow-list** of exact permitted hosts.
- **Show an interstitial** ("you are leaving this site") for unavoidable outbound links.

Checking is harder than it looks. Validators that test whether a value "starts with a slash" are fooled by //evil.example, which browsers treat as a different host, or by a backslash that browsers silently convert to a slash. Others check that the destination "contains" the right domain and accept example.com.evil.example. The safest checks parse the value with the same [[URL]] parser the browser will use and compare the resulting host exactly.

"Unvalidated redirects and forwards" appeared on the influential OWASP Top Ten list of web risks in 2010 and 2013. Bug bounty programs still argue over severity: many rate an open redirect alone as low, but pay well when it is chained into one of the attacks above.

## See also
- [[Canonical URL]]
- [[Internationalized Domain Name]]
- [[Referrer Policy]]
- [[Deep Linking]]
