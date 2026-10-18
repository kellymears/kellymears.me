---
aliases:
  - Circular buffer
  - Circular queue
  - Bounded buffer
  - Cyclic buffer
tags:
  - computation
summary: A fixed-size array treated as a loop, with read and write positions chasing each other around it, the standard way to pass a stream of data between a producer and a consumer.
---
A **ring buffer** is a fixed-size array used as if its end joined back to its start. A writer adds items at a *head* position and a reader removes them from a *tail* position, and when either reaches the end of the array it wraps to the beginning. Nothing is ever shifted or reallocated. The two positions chase each other around the ring, and the distance between them is the amount of data waiting.

This makes a ring buffer a queue with fixed memory and constant-time operations, which is exactly what streaming data needs. It is one of the most common structures in systems code:

- **Audio.** Sound cards play from a ring of samples that the application keeps topped up. If the application falls behind and the reader catches the writer, the result is an audible glitch, a buffer underrun.
- **Hardware queues.** Network cards and storage controllers exchange packets and requests with the [[Kernel]] through rings in shared memory, so the device and the processor can work without waiting on each other. Modern Linux I/O interfaces extend the same idea to applications.
- **Logs.** The kernel's message buffer and many embedded systems keep the most recent log lines in a ring, overwriting the oldest. A flight recorder works the same way: it always holds the last stretch of data before a failure.
- **Input.** Keyboard and serial port drivers buffer bytes between an [[Interrupt]] handler and the code that reads them.

A design question every ring buffer must answer is what happens when it is full. One option is to overwrite the oldest data, right for logs and live telemetry, where recent matters most. The other is to make the writer wait or fail, right when every item matters, which is a form of [[Backpressure]]. Choosing the second with a large buffer can also hide trouble: oversized network buffers create the queueing delay called bufferbloat, discussed under [[Congestion Control]].

A subtler problem is telling full from empty, since in both cases the head and tail are equal. Implementations keep a separate count, leave one slot permanently unused, or let the positions count up forever and wrap them only when indexing. Sizes are often powers of two so wrapping is a cheap bit mask rather than a division, and free-running counters must be wide enough to avoid [[Integer Overflow]] causing trouble.

With exactly one producer and one consumer, a ring buffer can be made [[Lock-Free Data Structure|lock-free]] using little more than careful ordering of memory writes, since each side updates only its own position. That property makes it the standard channel between threads in low-latency systems. Its contiguous array also gives good [[Locality of Reference]], unlike a queue built from a [[Linked List]].

## See also
- [[Text Buffer]]
- [[Communicating Sequential Processes]]
- [[Semaphore]]
- [[Time Series Database]]
- [[IO Multiplexing]]
