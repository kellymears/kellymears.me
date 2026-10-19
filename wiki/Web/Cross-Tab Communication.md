---
aliases:
  - BroadcastChannel
  - Cross-tab sync
  - Multi-tab synchronization
  - Web Locks
tags:
  - web
summary: Keeping several open tabs of the same app consistent, best done by broadcasting small notifications and letting each tab re-read the truth.
---
**Cross-tab communication** is how several open tabs or windows of the same site tell each other that something changed. Users open the same app in several tabs constantly. Without coordination, an edit in one tab leaves the others showing stale data, and two tabs can make conflicting changes, each unaware of the other.

The browser offers a few same-origin channels (see [[Same-Origin Policy]]):

- **`BroadcastChannel`**: a named pub/sub channel. Any tab can post a message, and every other tab subscribed to the name receives it. It is the simplest and most direct option.
- **The `storage` event**: fires in *other* tabs when `localStorage` changes. Older and cruder, but universally supported.
- **`SharedWorker`**: one worker shared by all tabs, able to hold a single connection or state on their behalf.
- **Web Locks** (`navigator.locks`): a named mutex across tabs, which is how a group of tabs performs [[Leader Election]] so that only one holds the [[WebSocket]] or runs the poller.

The design lesson is to **broadcast a notification, not the data**. A message saying "conversation 42 changed" is better than one carrying the new contents, for several reasons. Messages are not persisted, so a tab opened a second later never sees them. A [[Background Tab Throttling|frozen tab]] processes them late, possibly out of order. Two tabs can broadcast conflicting payloads. A notification that only *wakes* the receiver, which then re-fetches from the server, avoids all of these: whatever the receiver reads is current, and duplicates are harmless because re-reading is [[Idempotence|idempotent]]. The same reasoning lies behind "thin" [[Webhook|webhooks]] that carry an ID and expect the receiver to call back.

A notification channel is an optimization, not a guarantee. It makes the common case instant. A slow poll, or a re-sync on `visibilitychange`, covers the cases where the message never arrived, which the channel by design cannot report. The result is [[Eventual Consistency]] within one browser: tabs converge quickly in the usual case and eventually in every case.

It also helps to identify *who* made a change. A tab receiving its own broadcast should ignore it, and a UI that offers "stop" or "undo" for an action should check whether the viewer is the one who started it, not merely whether it is running.

## See also
- [[Iframe]]
- [[Local-First Software]]
- [[Tabs]]
- [[Origin Private File System]]
- [[Optimistic UI]]
- [[Service Worker]]
- [[Message Queue]]
- [[Web Storage]]
