---
aliases:
  - Thread of execution
  - Kernel thread
tags:
  - systems
summary: Running several threads of execution inside one process, sharing its memory, so a program can use many cores or keep working while it waits, at the price of races, locks, and bugs that appear only under load.
---
**Multithreading** is running several threads of execution inside a single process. Each thread has its own instruction pointer, registers, and stack, but all of them share the process's memory, open files, and other resources. That sharing is the point: threads can cooperate on the same data without copying it, and they're cheaper to create and switch between than whole processes; see [[Process]].

Programs use threads for two different reasons, often confused. One is parallelism: splitting work across several processor cores so it finishes sooner. The other is concurrency: keeping a program responsive while some tasks wait, so a user interface doesn't freeze during a download; see [[Concurrency and Parallelism]]. A single-core machine can run threads concurrently, switching between them many times a second, but only multiple cores run them truly in parallel.

The operating system usually manages threads directly. In Linux, a thread is essentially a process that happens to share its address space with others, and the scheduler treats both alike; see [[CPU Scheduler]]. POSIX standardized a threading interface, pthreads, in 1995, and Linux's modern implementation arrived in the early 2000s. Processors themselves blur the picture further by running two hardware threads per core; see [[Simultaneous Multithreading]].

Shared memory brings the hard part. When two threads read and update the same value without coordination, the result depends on timing, and updates can be lost; see [[Race Condition]]. The usual defense is a lock that lets only one thread into a critical section at a time. Locks bring their own failures: threads that each hold a lock the other needs wait forever; see [[Deadlock]]. Alternatives use atomic instructions to avoid locks altogether, which is fast but notoriously subtle; see [[Lock-Free Data Structure]].

Even reading shared data is tricky. Compilers and processors reorder memory operations for speed, so one thread can see another's writes in a surprising order unless the program uses the right barriers; see [[Memory Model]]. Bugs of this kind often vanish under a debugger and reappear in production under heavy load; see [[Heisenbug]].

Many systems limit threads to avoid these problems. JavaScript runs on a single thread with an event loop and offers separate workers that communicate by passing messages; see [[Event Loop]] and [[Web Worker]]. CPython long used a global interpreter lock that let only one thread run Python code at a time; a build without it became available experimentally in 2024. Languages with lightweight tasks multiplex many of them onto a few operating system threads; see [[Coroutine]].

More threads aren't always faster. Any part of a program that must run sequentially caps the speedup, and contention for shared locks or caches can make extra threads slow everything down; see [[Amdahl's Law]].

## See also
- [[Fork and Exec]]
- [[Futex]]
