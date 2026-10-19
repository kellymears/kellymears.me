---
aliases:
  - Spin lock
  - Busy waiting
  - Ticket lock
tags:
  - systems
summary: A lock where a waiting thread loops checking it instead of sleeping, faster than a context switch for very short waits, wasteful for longer ones, and everywhere inside operating-system kernels.
---
A **spinlock** is a lock where a thread that finds it taken keeps checking in a tight loop, or "spins," until it becomes free, instead of going to sleep. Ordinary locks put the waiting thread to sleep and wake it later, which costs a [[Context Switch]] and a trip through the [[CPU Scheduler]], typically microseconds. If the lock will be released sooner than that, spinning is faster. If not, the waiting thread burns a whole processor core doing nothing useful.

The simplest spinlock uses one atomic instruction that sets a flag and returns its old value in a single step; a thread owns the lock when the old value was clear. Processors guarantee such instructions behave atomically even when several cores race; see [[Lock-Free Data Structure]] and [[Memory Model]].

Spinlocks are everywhere inside operating-system kernels. Code that handles hardware events can't sleep, because there may be no thread context to put to sleep and wake later, so it must spin; see [[Interrupt]]. A kernel thread holding a spinlock must not be paused partway, or other cores could spin for a long time, so it usually disables preemption until it's done; see [[Kernel]].

The naive version scales badly. Every spinning core keeps writing to the same memory location, and the hardware must bounce ownership of that memory between their caches on every attempt, flooding the interconnect; see [[Cache Coherence]]. Improvements came in stages:

- **Test and test-and-set.** Spin on an ordinary read, which can be served from each core's own cache, and try the atomic write only when the lock looks free.
- **Ticket locks.** Each waiter takes a number, like at a deli counter, and the lock serves numbers in order. Linux adopted them in 2008 so no waiter could starve; see [[Resource Starvation]].
- **Queue locks.** Each waiter spins on its own memory location and the releasing thread taps the next one, keeping traffic local. John Mellor-Crummey and Michael Scott described the classic version in 1991.

Processors provide a pause instruction for spin loops, which saves power and frees resources for a second thread sharing the core; see [[Simultaneous Multithreading]].

Virtual machines create a nasty failure. If the hypervisor pauses the virtual processor holding a lock, the others spin for their whole time slice waiting for a thread that isn't running; see [[Hypervisor]]. Paravirtualized spinlocks let a guest tell the hypervisor to wake it later instead.

Real-time systems avoid spinning because it makes delays unpredictable; Linux's real-time configuration, merged into the mainline kernel in 2024, turns most spinlocks into sleeping locks; see [[Real-Time Operating System]]. Most ordinary locks now combine both approaches, spinning briefly before sleeping.

## See also
- [[Read-Copy-Update]]
- [[Peterson's Algorithm]]
- [[Memory Allocator]]
- [[Futex]]
