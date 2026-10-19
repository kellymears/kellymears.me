---
aliases:
  - Promises
  - Microtask queue
  - Microtask
  - Callback hell
  - Unhandled rejection
tags:
  - web
summary: JavaScript's object for a value that will arrive later, how it replaced nested callbacks, and the microtask queue that decides when its handlers run.
---
A **promise** is an object standing in for a value that isn't available yet: the result of a network request or a timer. It starts *pending* and settles exactly once, either *fulfilled* with a value or *rejected* with an error. Code attaches handlers with `.then` and `.catch`, or waits for it with `await`, and the handlers run when the promise settles, or right away if it already has.

The idea is older than JavaScript. Computer scientists described *futures* and *promises* in the late 1970s as placeholders for results computed concurrently. JavaScript adopted them from community libraries, and the Promises/A+ specification of 2012 defined interoperable behavior so that any *thenable*, any object with a `then` method, could work with any other. Native promises arrived in ES2015, and `async`/`await` in ES2017 made them read like ordinary sequential code.

Promises solved **callback hell**. Before them, asynchronous JavaScript passed a function to be called on completion, and a sequence of dependent steps nested each callback inside the last, drifting rightward into the "pyramid of doom" with error handling repeated at every level. A promise chain stays flat, and one `.catch` at the end handles a failure anywhere above it. Combinators handle groups: `Promise.all` waits for every promise and fails fast, and `race` takes the first to finish.

When handlers run is set by the **microtask queue**. The [[Event Loop]] runs one task at a time, such as an event handler or a timer callback. After each task, and before the browser renders, it drains every queued microtask, and promise handlers are microtasks. So a resolved promise's `.then` runs before any pending timer or input event, even a timer set for zero milliseconds. The flip side is that code queueing microtasks endlessly starves rendering completely, a [[Long Task]] in disguise.

Several sharp edges remain:

- **Promises are eager.** The work starts when the promise is created, not when someone awaits it. Two separate `await`s in a row run in sequence, so independent requests should start together and be awaited with `Promise.all`, or they form a needless waterfall.
- **No cancellation.** A promise can't be stopped once started. Cancellation is a separate signal, usually an `AbortController` passed alongside the work.
- **Unhandled rejections.** A rejected promise with no handler used to fail silently. Browsers now log it, and Node.js since version 15 crashes the [[Process]] by default, treating it as the bug it usually is.
- **Ordering assumptions.** Async code that assumes one request finishes before another invites a [[Race Condition]], and [[Optimistic UI]] must handle the case where the server answers out of order.

Promises resemble a [[Monad]], since `then` both maps and flattens, though they don't obey the laws strictly: a promise can never contain another promise.

## See also
- [[Iterator]]
- [[Web Worker]]
