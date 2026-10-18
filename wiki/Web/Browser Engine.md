---
aliases:
  - Rendering engine
  - Blink
  - WebKit
  - Gecko
  - Browser monoculture
tags:
  - web
summary: The software inside a browser that turns HTML, CSS, and JavaScript into pixels, why only three remain, and what that concentration means for the web.
---
A **browser engine** is the core of a web browser: the code that parses HTML and CSS, builds the [[Document Object Model]], computes layout, paints pixels, and runs JavaScript through a paired JavaScript engine. The browser around it supplies the tabs, address bar, bookmarks, and settings. Many browsers share an engine and differ only in that outer shell.

Three engines remain in wide use:

- **Blink**, used by Chrome, Edge, Opera, Brave, Vivaldi, and many others, with the V8 JavaScript engine. Google forked it from WebKit in 2013.
- **WebKit**, used by Safari, with JavaScriptCore. Apple began it in 2001 as a fork of KDE's KHTML engine.
- **Gecko**, used by Firefox, with SpiderMonkey, descended from the Netscape codebase Mozilla took over in 1998.

The list used to be longer. Opera abandoned its own Presto engine for Blink in 2013, and Microsoft retired its EdgeHTML engine in 2020, rebuilding Edge on Chromium. Building a new engine from scratch is now one of the largest projects in software, since the web platform spans thousands of specifications. A few independent efforts continue, notably Ladybird, begun in 2022, and Servo, Mozilla's former research engine written in Rust.

The engines' architecture has converged. Chrome launched in 2008 with one operating-system [[Process]] per tab, so a crash in one page didn't take down the rest. After the [[Speculative Execution]] attacks of 2018, browsers moved to *site isolation*, putting each site, including cross-site [[Iframe]]s, in its own sandboxed process so a compromised page can't read another's memory. Rendering is split across threads, with a [[Compositor]] that can scroll and animate while the main thread is busy, which is why some animations stay smooth through a [[Long Task]] and others don't.

Engine concentration matters for the web as a whole. Web standards require independent implementations, and when one engine holds most of the market, its behavior becomes the de facto standard. Sites get tested only there, and its bugs become features others must copy. The precedent is Internet Explorer 6, which held about 90% of the market in the early 2000s; Microsoft largely stopped developing it, and the web stagnated for years. Blink-based browsers now hold a similar majority, which keeps the independence of WebKit and Gecko a recurring concern in [[Web Standards]] debates.

Platform rules also shape the field. On iOS, Apple required every browser to use WebKit until the European Union's Digital Markets Act forced it to allow other engines there in 2024. In practice, Safari's engine therefore set the limits of what web apps could do on iPhones, from [[Progressive Web App]] features to push notifications.

Differences between engines are why developers rely on [[Progressive Enhancement]] and a [[Polyfill]] for missing features, and why compatibility tables are a standard reference.

## See also
- [[Cross-Browser Testing]]
- [[Quirks Mode]]
- [[Browser Extension]]
- [[Encrypted Media Extensions]]
- [[Seccomp]]
