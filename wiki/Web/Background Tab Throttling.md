---
aliases:
  - Timer throttling
  - Page Visibility API
  - visibilitychange
  - Page Lifecycle
  - Tab freezing
tags:
  - web
summary: Browsers deliberately slow, freeze, or discard pages that are not visible, so code that assumes it keeps running in the background will be wrong.
---
**Background tab throttling** is the set of measures browsers take to stop invisible pages from using CPU and battery. A page in a hidden tab, a minimized window, or sometimes just a covered window does not get the same treatment as the one being looked at. Each step is more aggressive than the last:

- **Rendering stops.** [[requestAnimationFrame]] callbacks pause, so animations and anything waiting on a frame stall.
- **Timers are clamped.** `setTimeout` and `setInterval` fire at most about once a second.
- **Intensive throttling.** After several minutes hidden, chained timers can be held to roughly once a minute.
- **Freezing.** The page's task queues stop entirely. Nothing runs until the tab is shown again.
- **Discarding.** Under memory pressure the tab is unloaded altogether and reloaded from its URL when revisited, with all in-memory state gone.

Exemptions exist (a page playing audio, an active WebRTC call), and the exact thresholds differ between browsers and versions. The safe assumption is that **a hidden page may get no CPU at all**.

The bugs this causes follow a pattern: code that measures time by counting ticks, polling loops that silently stop, heartbeats that lapse so the server decides the client is gone, and a [[WebSocket]] that dropped while the page was frozen and never reconnects. They show up as [[Heisenbug|heisenbugs]]: never during development, where the tab is always in front, and constantly for users who leave tabs open all day.

The robust patterns treat visibility as an event to handle rather than a condition to wish away:

- **Listen to `visibilitychange`** (and the Page Lifecycle `freeze`/`resume` events). Pause work when the page is hidden, then on return **re-sync from the source of truth** rather than assuming nothing changed.
- **Compute from wall-clock time**, never from callback counts.
- **Persist state that matters** before the page can be frozen or discarded. `pagehide` is the last reliable moment; `unload` is not.
- **Move true background work elsewhere**: a [[Service Worker]] for push and sync, or the server for anything that must finish regardless. A long-running job shouldn't depend on a tab staying open.

[[Cross-Tab Communication]] has the same issue: a message posted to a frozen tab is not processed until it wakes, so the receiver has to tolerate arriving late.

## See also
- [[Tabs]]
- [[Event Loop]]
- [[Web Worker]]
- [[WebSocket]]
- [[Silent Failure]]
- [[Progressive Web App]]
- [[Back-Forward Cache]]
- [[Long Polling]]
