---
aliases:
  - Fast userspace mutex
tags:
  - systems
summary: The Linux primitive that makes locks cheap by handling the uncontended case entirely in user space and asking the kernel for help only when a thread actually has to wait, the foundation under most thread libraries.
---
A **futex**, short for fast userspace mutex, is a Linux kernel feature for building locks and other synchronization tools. Its central idea is that most of the time, nobody is waiting. When a thread takes a lock that's free, it shouldn't need the operating system at all. Only when a thread must actually wait, or must wake a waiter, does it call into the kernel.

The problem it solved was cost. Earlier lock implementations often made a system call on every lock and unlock, even when there was no competition; see [[System Call]]. A system call is far slower than an ordinary instruction, and locks are taken constantly in multithreaded programs.

A futex is just an integer in memory shared between threads. The usual pattern looks like this:

1. **Fast path.** A thread tries to change the integer from unlocked to locked with a single atomic instruction; see [[Compare-and-swap]]. If that succeeds, it holds the lock, and no kernel involvement happened.
2. **Slow path.** If the lock is held, the thread marks it as contended and asks the kernel to put it to sleep, on the condition that the integer still has the expected value. The check prevents a race where the lock is released between looking and sleeping; see [[Race Condition]].
3. **Release.** The holder unlocks with an atomic operation and only asks the kernel to wake someone if the integer shows that a waiter exists.

The kernel side is small. It keeps a hash table of wait queues keyed by the integer's address, so threads waiting on different futexes don't interfere; see [[Hash Table]]. It knows nothing about what the integer means. Futexes are a building block, not a lock.

Futexes were added to Linux in 2002, described by Hubertus Franke, Rusty Russell, and Matthew Kirkwood. They underlie the standard thread library's mutexes, condition variables, and semaphores; see [[Mutex]]. A widely read paper by Ulrich Drepper, titled Futexes Are Tricky, showed how easy it is to build subtly wrong locks on top of them, which is why application code almost never uses them directly.

Implementations often combine a futex with brief spinning. Spinning wastes processor time but avoids the cost of sleeping and waking if the lock will be released within a few microseconds.

Extensions followed. Priority-inheritance futexes help with a waiting high-priority thread stuck behind a low-priority one. Robust futexes let the kernel release locks held by a thread that died. In 2021 Linux added a call to wait on several futexes at once, driven by compatibility layers that run Windows games, since Windows programs often wait on many objects at a time; see [[Emulation]].

## See also
- [[Thread Pool]]
- [[CPU Scheduler]]
