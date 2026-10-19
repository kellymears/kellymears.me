---
aliases:
  - Prerendering
  - Prerender
tags:
  - web
summary: A browser feature that lets a page declare which links to fetch or fully render in the background before the user clicks, so the next page appears instantly, at the cost of work that may be wasted.
---
**Speculation rules** let a page tell the browser which other pages are likely to be visited next, so it can fetch or fully render them in advance. When the user does click, a prerendered page appears almost instantly, because it was already built in an invisible tab.

The rules are written as JSON in a script element. A page can list specific addresses or describe groups of links by pattern or by CSS selector, and choose between two actions:

- **Prefetch** downloads the next page's HTML, so navigation skips the network wait.
- **Prerender** goes further, loading the page's subresources, running its scripts, and laying it out, so activation is close to free.

An **eagerness** setting controls timing. The most aggressive levels speculate as soon as the rules are seen; moderate waits until the pointer rests on a link; conservative waits until the user presses down, buying only the fraction of a second between press and release; see [[Information Scent]].

The idea has history. Browsers once accepted a single prerender hint in a link element, which Chrome later replaced with a lighter fetch-only version that didn't run scripts. The current rules shipped in Chromium-based browsers around 2022 and 2023. They complement the older hints, which deal with single resources rather than whole navigations; see [[Preload and Prefetch]].

Speculation is a bet. Like a processor that runs instructions before knowing whether they're needed, the browser spends resources now in the hope of saving time later; see [[Speculative Execution]]. A wrong guess wastes bandwidth, battery, and server capacity, which matters on metered connections; see [[Bandwidth]]. Browsers therefore cap how many pages can be prerendered at once and skip speculation when the device is saving data or memory is short.

Prerendering also runs a page's code before anyone sees it, which exposes careless assumptions:

- **Analytics** may count a view that never happens; scripts can check a prerendering flag and wait for activation; see [[Web Analytics]].
- **Side effects.** A link that changes state when fetched, such as a logout link, could fire on speculation. HTTP's rule that GET requests should be safe is what makes speculation possible at all; see [[Hypertext Transfer Protocol]].
- **Stale state.** A page rendered ten seconds early may show outdated data.

The feature competes with the single-page application's original promise. Client-side routing made navigations fast by never loading a new document; prerendering makes loading a new document fast instead, and pairs with cross-document transitions so separate pages can feel like one app; see [[Single-Page Application]] and [[View Transitions]]. The back-forward cache handles the reverse direction, keeping pages ready for going back; see [[Back-Forward Cache]].

## See also
- [[Core Web Vitals]]
- [[Response Time Limits]]
