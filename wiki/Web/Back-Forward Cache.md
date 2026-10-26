---
aliases:
  - bfcache
  - Back/forward cache
  - pageshow
  - pagehide
tags:
  - web
summary: Browsers keeping a whole page frozen in memory when you navigate away, so pressing Back restores it instantly, unless something on the page makes it ineligible.
---
The **back-forward cache**, or bfcache, keeps a complete snapshot of a page in memory when the user navigates away, including its rendered layout, its scroll position, and its paused JavaScript state. Pressing Back or Forward restores the page instantly from memory instead of reloading it from the network. Firefox and Safari have had it for many years; Chrome shipped it across desktop and Android in 2021.

It matters because back and forward are among the most common navigations. Google has reported that roughly one in ten navigations on desktop and one in five on mobile are history navigations. A cache hit makes them effectively free. Such restores count as near-instant loads for [[Core Web Vitals]], so eligibility improves measured performance directly.

This cache is different from [[HTTP Caching]]. The HTTP cache stores responses, which still need to be parsed and executed; bfcache stores the living page itself, frozen mid-flight. Timers stop, promises pause, and the page resumes exactly where it was.

Pages can be **ineligible**, and the browser then falls back to a normal load. Common blockers:

- **unload handlers.** Code listening for the `unload` event assumes the page is destroyed when left, so browsers historically refused to cache such pages. The event is being deprecated, and `pagehide` replaces it.
- **Open connections.** An open [[WebSocket]] or in-progress transactions in IndexedDB, described under [[Web Storage]], can block caching or get the page evicted.
- **Cache-Control: no-store.** Pages served with this header, common on logged-in pages, were long excluded, though browsers have begun relaxing this when it is safe.
- **Opener references.** A page holding a live reference to another window may be excluded.

Developer tools list a page's blockers.

Restoration needs handling too. The `pageshow` event fires with `persisted` set to true when a page comes back from the cache, a cue to refresh anything that may be stale, the [[Cache Invalidation]] problem in miniature:

- **Session state.** If the user logged out in another tab, the restored page still shows them logged in. Cross-tab messages, described under [[Cross-Tab Communication]], can catch this.
- **Live data.** Prices, stock levels, and notifications may be out of date and need refetching.
- **Analytics.** A restored page doesn't reload, so page view tracking must listen for `pageshow`, or restored visits go uncounted.

Related lifecycle events let a page be frozen and resumed while still open, as described under [[Background Tab Throttling]]. A [[Single-Page Application]] faces a similar challenge with its own history handling, which is why restoring scroll position and state on Back is a classic weakness of client-side routing. Combined with speculative prerendering of likely next pages, covered under [[Preload and Prefetch]], bfcache aims at the same goal from opposite directions: navigation that feels instant in both directions.

## See also
- [[HTTP Caching]]
- [[Core Web Vitals]]
- [[View Transitions]]
