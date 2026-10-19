---
aliases:
  - Third-party scripts
  - Tag manager
  - Tracking pixel
  - Magecart
tags:
  - web
summary: Code a site loads from other companies for analytics, ads, chat, and testing, which runs with the page's full privileges and is a leading cause of slow and compromised sites.
---
A **third-party script** is JavaScript a site loads from someone else's server: analytics, advertising, tag managers, chat widgets, A/B testing tools, consent banners, embedded maps, and social buttons. They are nearly universal. The HTTP Archive's annual Web Almanac finds that well over 90% of pages load at least one third-party resource, and many load dozens.

The core problem is privilege. A script included with a plain `<script>` tag runs in the page's own origin with the same power as the site's code. It can read and change the [[Document Object Model]], capture every keystroke in a form, read any [[HTTP Cookie]] not marked `HttpOnly`, and send data anywhere. The [[Same-Origin Policy]] doesn't help, because the script runs *inside* the origin. Including one means trusting the vendor, its security, and everyone who can change what its server sends.

That trust has failed repeatedly:

- **Magecart attacks** inject card-skimming code into checkout pages. In 2018, Ticketmaster was breached through a compromised third-party chat widget on its payment pages, and British Airways lost hundreds of thousands of customers' card details when attackers altered a script on its site.
- **The polyfill.io incident** (2024): the domain behind a popular [[Polyfill]] service changed owners, and its script began redirecting visitors of more than 100,000 sites to malicious pages.

These are [[Supply Chain Security]] failures delivered at runtime, and they bypass every code review of the site itself.

Performance suffers too. Third-party scripts compete for the main thread, often load more scripts in turn, and are a leading cause of the [[Long Task]] that delays response to input, hurting [[Core Web Vitals]]. A tag manager makes it worse in a particular way: it lets marketing teams add scripts without a deploy, so the page's real contents drift away from what engineering tested.

Defenses work in layers:

- **Subresource Integrity** pins a script to a known hash, but works only for fixed versions, not for vendors that update their code in place.
- **Content Security Policy** restricts which origins may load scripts and receive data.
- **Self-hosting** a reviewed copy removes the live dependency.
- **Isolation** puts the widget in a sandboxed [[Iframe]] or moves the work into a [[Web Worker]], as the Partytown library does.
- **Facades** show a static placeholder and load the real widget only when someone clicks, a form of [[Lazy Loading]].
- **Auditing** each script's cost and purpose, and deleting the ones nobody uses.

Privacy is the other cost. Trackers follow people across sites using third-party cookies and fingerprinting, which drove laws such as the GDPR described under [[Personal Data]], and browser defenses: Safari and Firefox block third-party cookies by default.

## See also
- [[Subresource Integrity]]
- [[Referrer Policy]]
- [[Programmatic Advertising]]
- [[Browser Extension]]
