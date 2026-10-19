---
aliases:
  - Worker pool
  - Work stealing
  - Executor
tags:
  - systems
summary: A fixed set of threads kept alive to run many short tasks from a queue, avoiding the cost of creating a thread per task and capping concurrency, with sizing rules and failure modes that shape how servers and runtimes behave under load.
---
A **thread pool** is a group of worker threads created once and reused to run many small tasks. Code with work to do submits a task to a queue instead of starting a thread, and whichever worker is free takes the next task, runs it and comes back for another; see [[Multithreading]] and [[Message Queue]].

Pools solve two problems. Creating and destroying an operating-system thread costs memory for its stack and time in the kernel, which adds up when tasks take only microseconds. And unlimited threads are dangerous. A server that starts one thread per request can be pushed into thousands of threads under load, spending its time on switching and memory until it collapses; see [[Context Switch]] and [[C10k problem]]. A pool bounds concurrency, so excess work waits in the queue rather than piling onto the processor.

Sizing depends on the work. For tasks bound by computation, about one thread per core keeps every core busy without needless switching; see [[CPU Scheduler]]. Tasks that spend most of their time waiting on disks or networks need more threads, roughly in proportion to how long they wait compared with how long they compute. Many systems therefore keep separate pools for blocking input and output and for computation, so a slow disk can't starve the workers doing arithmetic.

Queues need limits too. An unbounded queue hides overload until memory runs out, while a bounded one forces a decision when it fills: block the submitter, run the task on the caller's own thread, or reject it. Those choices are a form of [[Backpressure]], and they decide whether a system degrades gracefully; see [[Queueing Theory]].

Pools have characteristic failures. If tasks wait for other tasks submitted to the same pool, and every worker is busy waiting, nothing can run, a thread starvation deadlock; see [[Deadlock]]. A task that throws an exception may silently kill its worker or vanish without a trace. State left in thread-local storage by one task can leak into the next one that worker runs.

**Work stealing** improves balance for tasks that spawn subtasks. Each worker keeps its own queue, pushing and popping new subtasks at one end for cache-friendly locality, and when idle it steals from the opposite end of another worker's queue. The Cilk project popularized the approach in the 1990s, and it underlies Java's fork/join framework, Rust's Rayon and Go's scheduler; see [[Divide and Conquer]].

Asynchronous runtimes combine a small pool with an [[Event Loop]], so thousands of waiting tasks share a few threads; see [[Coroutine]]. A database [[Connection Pool]] applies the same pattern to connections instead of threads, for the same reasons.

## See also
- [[Amdahl's Law]]
- [[Process]]
- [[Web Server]]
