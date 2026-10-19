---
aliases:
  - Cookie banner
  - ePrivacy Directive
  - Consent management platform
  - Do Not Track
  - Global Privacy Control
tags:
  - web
summary: The banners asking permission to use cookies, required by European law for anything beyond what a site strictly needs, widely designed to steer people into accepting, and the browser signals meant to replace them.
---
**Cookie consent** banners ask visitors for permission before a website stores or reads tracking data on their device. They appear because of European law, and they became the most visible, and most resented, effect of web privacy regulation.

The requirement comes from the EU's ePrivacy Directive. Its 2009 revision, often called the "cookie law," required consent before storing or accessing information on a user's device, unless strictly necessary for a service the user asked for; see [[HTTP Cookie]] and [[Web Storage]]. Enforcement was weak until the GDPR took effect in 2018 and defined valid consent: freely given, specific, informed, and unambiguous, and as easy to withdraw as to give; see [[Personal Data]].

What needs consent and what doesn't:

- **Exempt.** Cookies essential to what the user asked for, such as keeping someone signed in or remembering a shopping cart; see [[Session Management]].
- **Requires consent.** Advertising and cross-site tracking, most analytics, and embedded social media; see [[Third-Party Cookie]] and [[Third-Party Script]]. The rule covers any technique for identifying a device, not only cookies, so fingerprinting needs consent too; see [[Browser Fingerprinting]].

Most sites use a **consent management platform**, a third-party script that shows the banner, records choices, and tells other scripts what they may do. The advertising industry's shared framework for passing consent between companies was itself ruled to violate the GDPR by Belgium's data protection authority in 2022.

Many banners are built to produce "yes." "Accept all" is one bright button; refusing requires opening settings and unticking dozens of "partners." A 2020 study of popular consent platforms on British websites found only about one in ten met minimal legal requirements. Regulators have pushed back. The EU's top court ruled in 2019 that pre-ticked boxes aren't consent, and in 2022 France's regulator fined Google €150 million and Facebook €60 million for making refusal harder than acceptance; see [[Dark Pattern]] and [[Choice Architecture]].

The result is a wall of interruptions that people dismiss by reflex, which defeats the idea of informed choice; see [[Banner Blindness]] and [[Habituation]]. Some publishers now offer "consent or pay": accept tracking or buy a subscription.

Browser signals were meant to make the question once rather than everywhere. **Do Not Track**, a header proposed around 2009, failed because honoring it was voluntary and almost nobody did; Safari removed it in 2019. **Global Privacy Control**, launched in 2020, sends a similar signal but carries legal force under California privacy law, and some regulators argue it should count as refusal.

The simplest compliant banner is none: a site that sets only essential cookies and uses analytics without personal identifiers needs no permission at all. The banners mostly measure how much tracking a site does.

## See also
- [[Focus Indicator]]
- [[Paywall]]
- [[Data Broker]]
- [[Pop-up Ad]]
