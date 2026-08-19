---
aliases:
  - Single-threaded event loop
tags:
  - computation
summary: A single-threaded runtime's mechanism for pulling the next callback off a queue once the call stack is empty.
---
**Event Loop** is the mechanism a single-threaded runtime uses to handle asynchronous work: a queue of pending callbacks, and a loop that pulls the next one off and runs it to completion whenever the call stack is empty. Node.js and every browser's JavaScript engine run this way — `setTimeout(fn, 0)` doesn't run `fn` immediately, it schedules `fn` onto the queue, and the loop won't get to it until the currently executing code finishes and the stack empties out.

The consequence that trips people up is that "asynchronous" in this model does not mean "concurrent" in the sense of running at the same time — JavaScript's event loop is single-threaded, so exactly one callback runs at any instant, and a long-running synchronous callback blocks the entire loop, freezing timers, network callbacks, and UI rendering until it returns. This is why a genuinely CPU-heavy task (image processing, a large sort) has to be moved off the main thread entirely — a [[Web Worker]], a `worker_threads` instance — rather than just wrapped in a `Promise`, since a promise only reschedules *when* work runs, not *where*.

Node's event loop has distinct phases (timers, pending callbacks, poll, check, close) that determine ordering precisely: a `setImmediate` and a `setTimeout(fn, 0)` can fire in either order depending on which phase the loop is in when they're scheduled, which is the kind of ordering subtlety that only matters once, in a debugging session, and is otherwise safely ignorable.

The event loop is one specific answer to the concurrency-without-threads problem; the [[Actor Model]] is another, structuring concurrency around isolated units of state exchanging messages rather than a shared queue and a single thread of control. Both avoid the shared-mutable-state hazards of true multithreading, from different directions.

## See also
- [[Actor Model]]
- [[Process]]
- [[Concurrency and Parallelism]]
- [[Race Condition]]
