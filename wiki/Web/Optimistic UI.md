---
aliases:
  - Optimistic Updates
tags:
  - web
summary: Updating the UI as if a server request has already succeeded, before the server has actually responded.
---
**Optimistic UI** updates what the user sees immediately, on the assumption that a pending server request will succeed, rather than waiting for the response before showing any change. Liking a post, checking off a to-do, sending a chat message: the UI flips to the new state the instant the user acts, the request goes out in the background, and only if it fails does the UI revert and surface an error. The bet is that most requests succeed, so most of the time the app feels instantaneous instead of waiting on a round trip the user doesn't actually need to see.

The part that's easy to skip and expensive to skip is the *failure path*: an optimistic update with no rollback isn't optimistic, it's just wrong — the UI silently drifts from server truth the first time a request fails, and nothing ever corrects it. A real implementation keeps the previous state around specifically to restore it, and needs a way to surface the failure without being jarring, since the whole point was a smooth experience.

Concurrency compounds this: if a second optimistic update starts before the first one's request resolves, a naive rollback can restore state from *before* the second update, discarding it along with the first update's failure. Libraries built around this pattern (React Query, SWR, Apollo's cache) handle it by keying rollback to the specific mutation, not to "whatever the UI showed before," which is the detail that separates a correct implementation from one that merely looks correct in the happy path.

It's a close cousin of client-side prediction in networked games — same bet, same rollback requirement — and it depends on the same reversibility guarantee that makes [[Rollback]] viable at the deployment layer: an action is only safe to assume before it's confirmed if undoing that assumption is actually possible.

## See also
- [[Debounce and Throttle]]
- [[WebSocket]]
- [[Rollback]]
- [[Cache Invalidation]]

## Related
- [[Virtual DOM]]
