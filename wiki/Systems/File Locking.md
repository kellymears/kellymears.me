---
aliases:
  - Advisory lock
  - Flock
tags:
  - systems
summary: Mechanisms that let processes claim exclusive or shared access to a file so that concurrent writers don't corrupt it, mostly advisory on Unix-like systems and riddled with historical quirks and network filesystem pitfalls.
---
**File locking** lets a process claim access to a file so that others don't modify it at the same time. Without coordination, two programs writing the same file can interleave their changes and corrupt it, or one can read a half-written state; see [[Race Condition]]. A lock serializes access: one writer at a time, or many readers but no writers.

Unix-like systems mostly use **advisory locks**. The kernel records who holds a lock, but nothing stops a program that never asks from reading or writing anyway. Locking works only if every program touching the file cooperates. Windows, by contrast, enforces locks by default: a file opened without sharing permission can't be opened, renamed, or deleted by others, which is why Windows sometimes refuses to delete a file that's in use; see [[POSIX]].

Unix has two main interfaces, with different histories. **flock**, from BSD, locks a whole file and is tied to the open file itself; see [[File Descriptor]]. The POSIX interface, through fcntl, can lock byte ranges, letting a database lock individual records, but carries a notorious flaw: locks belong to the process, and closing any descriptor for the file releases all of that process's locks on it, even ones taken through a different descriptor. A library that opens and closes the file briefly can silently drop the application's locks. Linux added a fixed variant, open file description locks, in 2014.

Locks are commonly used for simple mutual exclusion. Scheduled jobs often take a lock on a file before running, so a slow run isn't joined by a second copy; see [[Cron]]. Background services write a file holding their process ID and lock it, so a second instance can tell one is already running; see [[Daemon]]. This kind of lock file is distinct from the lockfiles package managers use to pin dependency versions; see [[Lockfile]].

Locks have the usual hazards. Two processes each waiting for a lock the other holds wait forever, though the kernel detects some cycles in POSIX locks; see [[Deadlock]]. Checking that a file is unlocked and then acting is itself a race; see [[Time-of-Check to Time-of-Use]]. Many programs avoid locking entirely by writing to a temporary file and renaming it into place, which readers see atomically; see [[Atomic File Write]].

Network filesystems are the classic trouble spot. Locks must be coordinated over the network, implementations have historically been unreliable, and a client that crashes may leave locks held. SQLite's documentation warns that its locking can fail on network filesystems and corrupt databases; see [[SQLite]]. Systems that need locks across machines use dedicated services instead; see [[Distributed Lock]].

Databases offer alternatives: lock pessimistically before changing, or optimistically detect conflicts afterward; see [[Pessimistic Locking]] and [[Optimistic Locking]].

## See also
- [[Inode]]
- [[Futex]]
