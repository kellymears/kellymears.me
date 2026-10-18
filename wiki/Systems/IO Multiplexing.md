---
aliases:
  - I/O multiplexing
  - epoll
  - kqueue
  - io_uring
  - Nonblocking I/O
  - C10k problem
tags:
  - systems
summary: Letting one thread wait on thousands of connections at once, the kernel facility under every event loop and high-concurrency server.
---
**I/O multiplexing** lets a single thread wait on many input and output channels at once and act on whichever is ready. Instead of blocking on one socket's `read` while thousands of others sit idle, the program asks the [[Kernel]]: of these [[File Descriptor]]s, which can I use now? It is the mechanism under every [[Event Loop]], from Nginx to Node.js.

The alternative is a thread or [[Process]] per connection. That is simple to write, since each connection's code can block freely, but each thread costs memory for its stack, and switching among thousands costs [[Context Switch]] time. In 1999 Dan Kegel named the **C10k problem**: serving ten thousand concurrent clients on one machine. Hardware could do it; the operating system interfaces could not.

The interfaces evolved in steps:

- **`select`** (4.2BSD, 1983) takes bit sets of descriptors and returns which are ready. Every call passes the full set to the kernel and scans it, so cost grows with the number watched, and the set is capped at 1,024 descriptors on most systems. `poll` removed the cap but kept the scan.
- **`epoll`** (Linux, 2002) and **`kqueue`** (FreeBSD, 2000) keep the interest list inside the kernel. The program registers descriptors once, and each wait returns only the ready ones, so cost depends on activity, not on how many connections are open. These made C10k routine.
- **`io_uring`** (Linux 5.1, 2019, by Jens Axboe) changes the model. epoll is *readiness*-based: it says a socket can be read, and the program then makes the call. io_uring is *completion*-based, like Windows' I/O completion ports: the program submits operations into a shared [[Ring Buffer]] and collects results from another, often without any [[System Call]] per operation.

Readiness has a blind spot. Regular files on disk always report ready, even when a read will block on the device, so epoll does nothing for file I/O. Runtimes such as libuv hand file operations to a thread pool instead, and io_uring's support for real asynchronous file I/O was one of its main motivations.

Each descriptor must be set to *nonblocking* mode, so a call that can't finish returns at once instead of stalling the loop. Notifications come in two styles: level-triggered (repeat while data remains) and edge-triggered (only when the state changes), and edge-triggered code that doesn't drain every byte silently stalls. When many processes wait on one listening socket, a single connection can wake all of them, the [[Thundering Herd]] problem, which `EPOLLEXCLUSIVE` and per-thread sockets address.

Language features sit on top. `async`/`await` and the [[Coroutine]] let code read as if it blocks while the runtime multiplexes underneath, and [[Backpressure]] decides when to stop reading. The model is the one [[Concurrency and Parallelism]] describes: many tasks in flight, one thread doing the work.

## See also
- [[Event Loop]]
- [[File Descriptor]]
- [[Thundering Herd]]
- [[WebSocket]]
