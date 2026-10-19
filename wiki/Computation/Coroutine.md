---
aliases:
  - Coroutines
  - Generator
  - Generators
  - Async/await
  - Cooperative multitasking
  - Green thread
tags:
  - computation
summary: A function that can pause partway through and later resume where it left off, the mechanism behind generators, async/await, and lightweight concurrency.
---
A **coroutine** is a function that can suspend itself partway through and later resume exactly where it left off, with its local variables intact. An ordinary function, once called, runs to completion and returns once. A coroutine can pause many times, handing control back to its caller, and pick up again when asked.

Melvin Conway coined the term in 1958 while designing a compiler, where it let the lexer and parser hand data back and forth as equals instead of one calling the other. The idea was long confined to a few languages, then spread widely in the 2000s and 2010s in two main forms.

**Generators** produce a sequence of values one at a time. Each `yield` hands a value to the caller and pauses until the next one is requested. A generator can describe an infinite sequence, such as all prime numbers, because it only computes what is asked for, a form of [[Lazy Evaluation]]. Python, JavaScript, and C# all have them.

**Async/await** uses the same mechanism for waiting. An `async` function pauses at each `await` until a network request, timer, or file read finishes, and the runtime runs other work meanwhile. The code reads top to bottom like ordinary sequential code, without nested callbacks. In JavaScript the [[Event Loop]] resumes each paused function when its result arrives. C# introduced async/await in 2012, and Python, JavaScript, Rust, Swift, and Kotlin followed.

Coroutines are a form of **cooperative multitasking**: each one decides when to yield, unlike operating system threads, which a [[CPU Scheduler]] can interrupt at any moment. This makes them cheap, since switching between them is little more than a function call, so a program can run hundreds of thousands at once where threads would exhaust memory. It also makes reasoning easier, because code between pause points can't be interrupted. The cost is that a coroutine that never yields, such as one stuck in a long computation, blocks every other coroutine on the same thread.

Variants include **green threads**, scheduled by a language runtime rather than the operating system. Go's goroutines and the virtual threads added to Java in 2023 look like ordinary blocking code but are multiplexed onto a small number of real threads. They sit between coroutines and threads on the spectrum described under [[Concurrency and Parallelism]].

Under the hood, compilers usually turn each coroutine into a [[Finite State Machine]] whose states are the pause points, storing local variables in an object that outlives each call, much like a [[Closure]].

Coroutines also underpin streaming. A generator that yields chunks as they're produced is a natural way to build a [[Streaming Response]], and pausing until a consumer is ready provides [[Backpressure]] for free.

## See also
- [[IO Multiplexing]]
- [[Communicating Sequential Processes]]
- [[Promise]]
- [[Continuation]]
- [[Structured Programming]]
- [[Thread Pool]]
- [[Fetch API]]
