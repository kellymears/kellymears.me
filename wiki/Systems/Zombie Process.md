---
aliases:
  - Orphan process
  - Reaping
  - SIGCHLD
tags:
  - systems
summary: A process that has finished but still holds a slot in the process table because its parent hasn't collected its exit status, and why every Unix system needs something to reap the dead.
---
A **zombie process** is a process that has finished running but still has an entry in the system's process table, because its parent hasn't yet asked how it ended. It uses no memory or CPU. All that remains is a process ID and an exit code, waiting to be collected; see [[Process]] and [[Exit Status]].

The design follows from how Unix creates processes. A parent starts a child, and the child's exit status is the only way the parent learns whether it succeeded. The [[Kernel]] can't throw that status away the moment the child exits, since the parent might ask for it later. So it keeps a small record and sends the parent a **SIGCHLD** signal; see [[Unix Signal]]. When the parent calls one of the `wait` family of [[System Call]]s, it receives the status and the record is freed. That collection is called **reaping**.

A zombie exists in the window between the child exiting and the parent reaping it. Brief zombies are normal. They show up in process listings marked `Z` or `<defunct>`, and can't be killed, since there is nothing left running to receive a signal. The only fix is to make the parent reap them, or to make the parent go away.

**Orphans** are the reverse case: the parent exits first and the child keeps running. The kernel reassigns orphans to process 1, the [[Init System]], whose job includes reaping anything handed to it. This is how a [[Daemon]] traditionally detached from the terminal that launched it: fork, let the parent exit, and continue as an orphan.

Zombies become a problem when a long-running parent forgets to reap. Each holds a process ID, and IDs are a finite pool, so thousands of zombies can eventually stop the system from starting new processes, a kind of [[Resource Starvation]]. The usual causes:

- **No SIGCHLD handler.** A server that spawns helpers but never calls `wait` accumulates one zombie per child.
- **Containers without an init.** In a container, the first process launched becomes process 1. Most applications weren't written to reap orphans, so zombies pile up. Tiny init programs such as tini exist only to do this job; see [[Containerization]] and [[Linux Namespaces]].
- **Blocked parents.** A parent stuck on a slow lock or I/O can't reap until it's free; see [[Deadlock]].

Handling SIGCHLD has its own trap: several children can exit before the handler runs, and their signals merge into one, so a handler must loop until no exited children remain.

The pattern of keeping a tombstone until someone acknowledges it shows up elsewhere, as in the deleted-record markers of [[Soft Delete]] and log-structured storage; see [[Log-Structured Merge Tree]].

## See also
- [[Unix Pipeline]]
- [[Fork and Exec]]
