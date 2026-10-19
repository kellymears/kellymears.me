---
aliases:
  - SPA
  - Client-side routing
  - History API
  - Multi-page application
  - MPA
tags:
  - web
summary: A web app that loads one HTML page and then rewrites it with JavaScript as the user navigates, trading a slower, heavier first load for app-like transitions afterwards.
---
A **single-page application** (SPA) loads one HTML document, then handles every later navigation in JavaScript: it fetches data, renders the new view into the existing page and updates the address bar without a full page load. The traditional alternative, now called a *multi-page application* (MPA), asks the server for a new document on every click.

Gmail (2004) and Google Maps (2005) showed what in-page updates could do, and the term AJAX, coined in 2005, named the technique. Frameworks followed: Backbone, then Angular, React and Vue made client-side rendering the default way to build web apps through the 2010s.

**Client-side routing** makes it work. Early SPAs kept their state after a `#` in the URL, since changing the fragment never reloads the page. The History API (`pushState`, standardized with HTML5) let apps change the real path instead, so URLs look normal and can be bookmarked and shared. The router must then reproduce what the browser used to do for free.

The model's costs come from moving the browser's job into application code:

- **Slow first load.** Nothing appears until the JavaScript downloads, parses and runs, which hurts [[Core Web Vitals]]. Large [[Bundler]] output makes it worse, which is why [[Code Splitting]] by route became standard.
- **Broken basics.** Back and forward buttons, scroll restoration, the loading indicator and opening links in new tabs all have to be reimplemented, and are often done badly.
- **Accessibility.** A screen reader announces a new page load but not a DOM swap. Each route change needs deliberate [[Focus Management]] and an announcement.
- **Crawlers.** Content rendered only in JavaScript is indexed late or not at all, a problem for [[Search Engine Optimization]].
- **Long sessions.** A tab that stays open for days accumulates listeners and caches, so a [[Memory Leak]] that a page load would have cleared keeps growing.

In return, navigation after the first load can be instant. Shared layout stays mounted, state survives between views, and techniques like [[Optimistic UI]] and prefetching make the app feel local.

The pendulum has since swung back toward the server. [[Server-Side Rendering]] with [[Hydration]] sends real HTML first and adds the SPA behavior after. [[Islands Architecture]] hydrates only the interactive parts, and [[React Server Components]] move rendering back across the client-server boundary. Meanwhile browsers have closed the gap for MPAs: [[View Transitions]] animate between full page loads, and the back/forward cache restores pages instantly. Many sites now use a hybrid, rendering documents on the server and navigating like an SPA, built on [[Progressive Enhancement]]. The label now describes a spectrum more than a category.

## See also
- [[Deep Linking]]
- [[Back-Forward Cache]]
