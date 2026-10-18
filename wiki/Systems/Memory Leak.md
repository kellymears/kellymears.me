---
aliases:
  - Leak
  - Memory growth
  - Space leak
tags:
  - systems
summary: Memory that a program keeps holding after it stops needing it, which grows slowly enough to be missed and accumulates until something gives.
---
A **memory leak** is memory a program keeps holding after it no longer needs it. In languages with manual memory management the classic form is an allocation never freed. In garbage-collected languages, leaks are still common, just different in shape: [[Garbage Collection]] frees what is *unreachable*, and a leak is memory that stays reachable by accident.

The usual garbage-collected leaks share a pattern: something long-lived holds a reference to something that should have been short-lived.

- **Unbounded caches and memo tables** with no eviction policy, the failure [[Memoization]] and the [[Least Recently Used Cache]] notes both warn about.
- **Listeners and subscriptions** registered and never removed, each keeping its handler and everything that handler references alive.
- **[[Closure|Closures]]** capturing a large object when they only needed one field of it.
- **Global registries and maps** keyed by IDs that are added and never deleted.
- **Retained history**: undo stacks, logs, and request traces kept in memory "for debugging".

A leak is a slope, not an event, and that makes it hard to see. A process using 2 GB is not obviously leaking. A process that used 400 MB at startup and grows 50 MB an hour regardless of load is. Diagnosis compares states over time: heap snapshots taken minutes apart and diffed by object type, or a plot of resident memory against uptime. A single snapshot shows what is large, not what is growing. The growth also lands somewhere unhelpful. The leaking program may be fine while the [[Out-of-Memory Killer]] takes something else, or the excess quietly moves into [[Swap]] and shows up only as a machine that gets slower with uptime.

Leaks in code you can't fix, such as a driver, a vendor library, or a long-running desktop app, are handled operationally: pin to a version without the leak, cap the process with a [[Control Groups|cgroup]] limit, or restart it on a schedule. Scheduled restarts are a legitimate tool rather than an admission of defeat. They are how much long-lived software stays healthy, and they work as a bridge until the [[Root Cause Analysis]] finishes.

## See also
- [[Ownership and Borrowing]]
- [[Memory Allocator]]
- [[Virtual Memory]]
- [[Linked List]]
- [[Dynamic Random-Access Memory]]
- [[Observability]]
- [[Heisenbug]]
- [[Load Testing]]
