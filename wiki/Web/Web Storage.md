---
aliases:
  - localStorage
  - sessionStorage
  - IndexedDB
  - Storage quota
  - Client-side storage
tags:
  - web
summary: The browser's built-in ways to keep data on the user's device, from the simple string store localStorage to the transactional database IndexedDB, and their limits on size, persistence and security.
---
**Web storage** covers the APIs a page can use to keep data in the browser between page loads without sending it to a server. Unlike an [[HTTP Cookie]], none of it travels with requests. Every store is scoped to an origin, so one site cannot read another's data, a direct application of the [[Same-Origin Policy]].

The main options:

- **localStorage** is a key-value store of strings with no expiry, roughly 5 MB per origin. Its API is synchronous, so a large read or write blocks the main thread, and anything that isn't a string must be serialized to JSON first.
- **sessionStorage** has the same API but is scoped to one tab and cleared when the tab closes. A duplicated tab gets a copy.
- **IndexedDB** is an asynchronous, transactional object database. It stores structured values, including files and binary data, supports a [[Database Index]] on any field, and allows quotas in the hundreds of megabytes or more. Its raw API is awkward, so most code uses a small wrapper library.
- **Cache API** stores request and response pairs. It is the store a [[Service Worker]] uses for offline assets.

When localStorage changes, other tabs on the same origin receive a `storage` event, a simple channel for [[Cross-Tab Communication]].

Storage on the client is less durable than it looks:

- **Eviction.** By default storage is "best effort", and the browser may clear it under disk pressure. A page can request persistent storage, which browsers grant more readily to installed [[Progressive Web App]]s.
- **Expiry by policy.** Safari deletes all script-writable storage for a site after seven days without user interaction, as part of its anti-tracking rules.
- **Unavailability.** Private browsing modes, blocked site data and embedded contexts can make storage empty, read-only or throw on access. Code should wrap every call and work without it, a [[Defensive Default]].
- **Partitioning.** Third-party iframes now get storage keyed by the top-level site, so a widget embedded on two sites sees two separate stores.

Security follows from scope: any script running on the origin can read everything stored there. A single [[Cross-Site Scripting]] hole exposes it all, which is why a session token or [[JSON Web Token]] kept in localStorage is riskier than an `HttpOnly` cookie, which scripts cannot read.

Stored data also outlives the code that wrote it. When an app changes the shape of what it saves, old values linger in users' browsers, a client-side version of [[Schema Drift]]. IndexedDB builds in a version number and an upgrade callback for exactly this, a small [[Database Migration]] system. Apps that treat the local store as the primary copy and sync later, the local-first approach, often reach for a [[Conflict-Free Replicated Data Type]] to merge edits made on different devices.

## See also
- [[Origin Private File System]]
- [[Third-Party Cookie]]
- [[Browser DevTools]]
