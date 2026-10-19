---
aliases:
  - PWA
  - Web app manifest
  - Installable web app
  - Add to home screen
tags:
  - web
summary: A website that can be installed like a native app, launched from the home screen in its own window and used offline, built from a manifest, a service worker and HTTPS.
---
A **progressive web app** (PWA) is a website built so it can be installed and behave like a native app: an icon on the home screen or dock, its own window without browser chrome, offline support, and on most platforms push notifications. Alex Russell and Frances Berriman coined the term in 2015. "Progressive" refers to [[Progressive Enhancement]]: the site works as an ordinary web page everywhere, and gains app features where the browser supports them.

Three pieces make a site installable:

- **HTTPS.** Powerful features are restricted to secure contexts, so the site must be served over Transport Layer Security.
- **A web app manifest.** A JSON file names the app and lists its icons, theme color, start URL and display mode, such as `standalone` for a window with no address bar.
- **A [[Service Worker]].** A script that sits between the page and the network, so the app can load from cache when offline and receive push messages while closed.

The idea is older than the name. When the iPhone launched in 2007, Apple's plan for third-party software was web apps saved to the home screen. The App Store arrived the next year, and native apps took over.

The case for a PWA:

- **One codebase** for every platform, rather than separate iOS, Android and desktop apps.
- **No store review.** Updates ship the moment they deploy, though the service worker's cache makes [[Cache Invalidation]] a real concern, and a stale worker can pin users to an old version.
- **Links.** Every screen has a URL, so content can be shared and found by search engines.
- **Size.** A PWA often weighs a fraction of its native equivalent, which matters on slow networks and cheap phones.

The limits come from the platforms. Browser vendors decide which device APIs the web gets, and support is uneven. Safari on iOS added web push only in 2023, and only for apps added to the home screen. In 2024 Apple announced it would drop home-screen web apps in the EU to comply with the Digital Markets Act, then reversed after objections. Background work is also constrained: mobile systems suspend web apps aggressively, and [[Background Tab Throttling]] applies on desktop. Discoverability is weaker without a store listing, so some developers wrap a PWA for the stores anyway.

Building one well means planning for the network being absent. Assets come from the cache, data lives in [[Web Storage]] such as IndexedDB, and edits made offline queue up and sync later. Pairing that with an [[Single-Page Application|app shell]] that loads instantly from cache gives the near-instant start that makes an installed web app feel native.

## See also
- [[Web Storage]]
- [[Progressive Enhancement]]
- [[HTTP Caching]]
- [[Favicon]]
- [[Deep Linking]]
