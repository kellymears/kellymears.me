---
aliases:
  - HSTS
  - HSTS preload
  - Strict-Transport-Security
  - SSL stripping
  - Mixed content
tags:
  - web
summary: A response header telling browsers to use only HTTPS for a site from then on, closing the gap that lets an attacker downgrade the first insecure request.
---
**HTTP Strict Transport Security**, or HSTS, is a response header that tells a browser to connect to a site only over HTTPS for a set period. Once a browser has seen `Strict-Transport-Security: max-age=31536000`, it rewrites every future `http://` link to that site as `https://` before sending anything, and refuses to let the user click through certificate errors. Standardized as RFC 6797 in 2012, it closes a gap that ordinary redirects leave open.

The gap is the first insecure request. A user who types a bare domain, or follows an old `http://` link, sends an unencrypted request, and the server answers with a redirect to HTTPS, as described under [[HTTP Status Code]]. Anyone on the network path, such as a hostile Wi-Fi hotspot, can intercept that first request and never let the redirect happen. Moxie Marlinspike demonstrated this in 2009 with *sslstrip*, which kept victims on plain HTTP while the attacker talked HTTPS to the real site, quietly reading passwords and cookies. [[Transport Layer Security]] protects only connections that actually use it.

The header has three parts:

- **max-age.** How long, in seconds, the browser should remember the rule. A year is typical.
- **includeSubDomains.** Applies the rule to every subdomain, which also stops attackers from planting cookies through an insecure subdomain.
- **preload.** Signals consent to inclusion in the browsers' built-in list.

The **preload list** handles the very first visit. Browsers ship with a list of domains that are HTTPS-only before any request is made, maintained at hstspreload.org and compiled into Chrome, Firefox, Safari, and Edge. Google went further and preloaded entire top-level domains it operates, including `.dev` and `.app`, so every site under them must use HTTPS; local test sites using `.dev` broke in 2017.

HSTS is hard to undo. A browser that has cached the rule enforces it until it expires, so a site that drops HTTPS strands its returning visitors, and removal from the preload list takes months to reach browsers. The usual advice is to start with a short max-age, confirm every subdomain serves valid certificates from a trusted [[Certificate Authority]], and lengthen it gradually, the same caution that applies to long-lived [[HTTP Caching]].

Related protections fill in around it. Browsers block or upgrade **mixed content**, insecure scripts and images on secure pages, and the [[Content Security Policy]] directive `upgrade-insecure-requests` rewrites them automatically. Cookies marked `Secure`, described under [[HTTP Cookie]], are never sent over plain HTTP. Free certificates from Let's Encrypt, launched in 2015 and 2016, removed the cost barrier, and browsers increasingly try HTTPS first and warn before loading plain HTTP pages at all.

HSTS doesn't protect against a compromised server, a fraudulent certificate, or [[Domain Name System]] attacks; it only ensures no network attacker can talk the browser out of HTTPS.

## See also
- [[Man-in-the-Middle Attack]]
- [[HTTP Cookie]]
- [[Certificate Authority]]
- [[Same-Origin Policy]]
