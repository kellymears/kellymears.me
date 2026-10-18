---
aliases:
  - Channels
  - Go channels
  - Goroutines and channels
  - Process calculus
tags:
  - computation
summary: Tony Hoare's model of concurrency as independent processes that share nothing and coordinate only by passing messages over channels, the design behind Go's goroutines.
---
**Communicating Sequential Processes** (CSP) is a model of concurrency in which independent processes share no memory and interact only by sending messages over *channels*. Tony Hoare introduced it in a 1978 paper and developed it into a full mathematical theory, a *process calculus*, in a 1985 book. Its most visible descendant is Go, whose slogan states the idea: "Don't communicate by sharing memory; share memory by communicating."

Each process is ordinary sequential code. The concurrency lives entirely in the channels between processes. In Hoare's original model, communication is a *rendezvous*: a send blocks until a receiver is ready, and a receive blocks until a sender is ready, so the two processes meet at that point and the value passes directly between them. That synchronization is the whole mechanism. Two processes exchanging a value also learn something about each other's progress, which replaces most uses of locks.

A few constructs make the model practical:

- **Buffered channels** let a sender run ahead by a fixed number of messages, behaving like a [[Ring Buffer]] between the two sides. A full buffer blocks the sender, which gives natural [[Backpressure]].
- **Select** waits on several channels at once and proceeds with whichever is ready first. It is how a process handles a message, a timeout, or a cancellation signal together.
- **Closing a channel** signals that no more values are coming, so receivers can finish cleanly.

Pipelines fall out naturally. A chain of processes, each reading from one channel and writing to the next, is the concurrent version of a [[Unix Pipeline]].

CSP is often compared with the [[Actor Model]], which also shares nothing and passes messages. The differences are in the plumbing. Actors have identities and mailboxes, and sends are asynchronous, so an actor fires a message and moves on. CSP processes are anonymous, the channels have identities instead, and communication is synchronous by default. Actors suit distributed systems where messages may be lost; CSP suits coordination inside one program.

Removing shared memory removes data races, the class of bug behind most [[Race Condition|race conditions]], but not every concurrency hazard. Processes waiting on each other in a cycle still produce [[Deadlock]], and Go's runtime detects the simple case where every goroutine is blocked. Because CSP is a formal calculus, designs can be checked mechanically: model checkers explore every interleaving of a system's processes to prove the absence of deadlock, an application of [[Formal Verification]] used in safety-critical hardware and software.

Lightweight implementations are what made the model widespread. Goroutines are a kind of [[Coroutine]] scheduled by the runtime across a few operating system threads, so a program can run hundreds of thousands of them, where [[Concurrency and Parallelism|concurrency]] built on threads alone would collapse.

## See also
- [[Actor Model]]
- [[Event Loop]]
- [[Message Queue]]
- [[Lambda Calculus]]
- [[Semaphore]]
