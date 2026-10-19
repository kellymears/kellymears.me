---
aliases:
  - Inline frame
  - postMessage
  - Sandboxed iframe
  - Embed
tags:
  - web
summary: A whole web page embedded inside another, the web's main isolation boundary for ads, payments, and widgets, and the messaging and sandboxing rules that govern it.
---
An **iframe**, or inline frame, embeds one web page inside another. Each iframe has its own document, its own JavaScript environment, and its own [[Document Object Model]], displayed in a rectangle of the parent page. Microsoft introduced it in 1996, and HTML 4 standardized it a year later. Nearly every embedded video, map, ad, and payment form is one.

The defining property is isolation. The [[Same-Origin Policy]] applies across the frame boundary: a parent page can't read or script a cross-origin iframe's contents, and the iframe can't reach into the parent. That makes iframes the web's main tool for running code from someone you don't fully trust:

- **Payments.** Card-entry fields from payment providers run in their own iframes, so the merchant's page, and any third-party script on it, never sees the card number.
- **Ads and widgets.** Ad networks serve into iframes so their code can't touch the host page.
- **Embeds.** Video players, maps, and social posts load as complete pages from their own origin.

Because the two sides can't touch each other directly, they talk through **`postMessage`**, which sends a copyable message to another window. Correct use has two rules: the sender names the exact target origin, and the receiver checks the `origin` of every incoming message before acting on it. Skipping the check is a classic vulnerability. The same API connects tabs and workers, as described under [[Cross-Tab Communication]] and [[Web Worker]].

The **`sandbox` attribute**, added in HTML5, restricts an iframe further. An empty sandbox blocks scripts, forms, pop-ups, plugins, and navigation of the top page, and treats the content as a unique origin; tokens such as `allow-scripts` restore individual powers. It applies [[Least Privilege]] to embedded content. The `allow` attribute grants or withholds features such as camera, microphone, and fullscreen.

The trust also runs the other way. A malicious site can frame *your* page invisibly and trick users into clicking its buttons, the attack described under [[Clickjacking]]. Sites defend themselves with the `frame-ancestors` directive of [[Content Security Policy]], or the older `X-Frame-Options` header, to control who may frame them.

Isolation now reaches into the browser's architecture. Since 2018, site isolation in Chromium-based browsers places cross-site iframes in separate operating-system processes, so even a Speculative Execution attack in one frame can't read the other's memory.

Iframes have costs. Each is a full document with its own scripts, styles, and memory, so a page with many embeds is heavy; `loading="lazy"` defers offscreen frames, as described under [[Lazy Loading]]. Sizing an iframe to its content requires the child to report its height by message. Micro-frontend architectures sometimes compose whole applications from iframes, trading those costs for strong separation between teams.

## See also
- [[Single Sign-On]]
- [[Portal]]
- [[Hotlinking]]
