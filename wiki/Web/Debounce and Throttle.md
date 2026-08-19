---
aliases:
  - Debouncing
  - Throttling
tags:
  - web
summary: Two opposite strategies for limiting how often a handler runs against a rapid stream of events.
---
**Debounce and Throttle** both limit how often a function runs in response to a rapid-fire event — a keystroke, a scroll, a resize — but they trade off in opposite directions. **Debounce** waits for a pause: it delays the call until events *stop* arriving for a set interval, and each new event resets the timer. Type five characters quickly into a search box wired to a debounced autocomplete request, and only one request fires, after the last keystroke plus the delay — not five. It's the right tool when only the *final* state matters and intermediate ones are noise.

**Throttle** does the opposite: it guarantees at most one call per fixed interval, regardless of how many events arrive in between, firing on a steady cadence for as long as events keep coming. A scroll handler updating a progress bar wants throttling, not debouncing — the user needs to see the bar move *during* the scroll, not only once it stops; debouncing that handler would make the bar sit frozen until the user finished scrolling entirely.

The failure mode for each is predictable once you know which one you picked wrong. A debounced scroll handler feels laggy and unresponsive, firing only after motion stops. A throttled search-as-you-type feels chattery, firing a request on every interval tick while the user is mid-word, wasting requests on states nobody needed. Neither is a general-purpose fix for "too many events" — the choice is a statement about which events in the stream are the ones that matter.

Both exist to protect the same resource a naive [[Optimistic UI]] update or [[WebSocket]] send would otherwise hammer: a network request, a re-render, or any handler whose cost scales with call count rather than with the final result.

## See also
- [[Optimistic UI]]
- [[WebSocket]]
- [[Performance Budget]]

## Related
- [[Web Worker]]
