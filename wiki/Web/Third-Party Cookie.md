---
aliases:
  - Third-party cookies
  - Cross-site tracking
  - Cookie partitioning
tags:
  - web
summary: A cookie set by a domain other than the site you're visiting, the mechanism that let ad networks follow people across the web, and the long, uneven effort by browsers to shut it down.
---
A **third-party cookie** is an [[HTTP Cookie]] belonging to a domain other than the one in the address bar. When a page at `news.example` embeds an image, script, or [[Iframe]] from `ads.tracker`, the browser sends that request with `ads.tracker`'s cookies and accepts new ones from it. The cookie is "third-party" only relative to the page; on its own site it's ordinary.

That made cross-site tracking simple. If the same ad network is embedded on thousands of sites, it sees the same cookie on every one, so it can tie your visit to a news article, a shoe store, and a medical site to a single profile. The tracking pixel, an invisible one-pixel image, exists just to make that request. Advertisers used the profiles for targeting, retargeting, and measuring which ads led to purchases; see [[Third-Party Script]].

The same mechanism serves legitimate features:

- **Single sign-on** across a company's domains.
- **Embedded widgets** such as comment systems, chat, video players, and payment forms that remember you.
- **Federated login**, part of how [[OAuth]] flows worked before alternatives existed.

Browsers moved against tracking unevenly:

- **Safari** introduced Intelligent Tracking Prevention in 2017 and blocked third-party cookies entirely by 2020.
- **Firefox** made Total Cookie Protection its default in 2022, giving each site its own separate cookie jar.
- **Chrome** announced in 2020 that it would phase them out, delayed repeatedly, and in 2024 and 2025 reversed course and kept them, leaving the largest browser as the exception.

The modern approach is **partitioning** rather than blocking. A cookie set by an embedded widget is stored under the pair of the top-level site and the widget's site, so the same widget on two sites sees two unrelated jars. The widget still works, but can't link visits. Cookies with the `Partitioned` attribute opt into this explicitly. A widget that truly needs its unpartitioned cookie, such as a sign-in button, can ask the user through the Storage Access API. Since 2020, cross-site cookies must also be marked `SameSite=None; Secure`, which incidentally helped defend against [[Cross-Site Request Forgery]].

Blocking cookies didn't end tracking; it moved it. Trackers shifted to [[Browser Fingerprinting]], to identifiers passed in URLs, to "first-party" cookies set through subdomains that point at a tracker's servers, and to server-to-server data sharing that browsers can't see.

The cookie banners across the web come from European privacy law requiring consent before setting non-essential cookies; see [[Personal Data]]. Many banners make refusing harder than accepting, a [[Dark Pattern]] regulators have increasingly penalized. Partitioning also applies to other storage, such as [[Web Storage]] and caches, closing side channels the [[Same-Origin Policy]] alone left open.

## See also
- [[Cookie Consent]]
- [[Data Broker]]
- [[Browser Extension]]
- [[Federated Learning]]
- [[Panopticon]]
