---
aliases:
  - Core dumps
  - Crash dump
  - Minidump
  - Segmentation fault
  - Segfault
  - Post-mortem debugging
tags:
  - systems
summary: A snapshot of a crashed program's memory saved for later inspection, how to get one, how to read one, and why it can leak secrets.
---
A **core dump** is a file containing a snapshot of a process's memory and registers at the moment it crashed. Loaded into a [[Debugger]] alongside the original program, it lets someone inspect the crash after the fact: which function was running, what the [[Call Stack]] looked like, and what values variables held. The name comes from magnetic core memory, the main memory of 1950s and 1960s computers, whose contents were printed out after a failure.

On Unix, certain signals end a process with a core dump by default. The best known is SIGSEGV, the **segmentation fault**, raised when a program touches memory it is not allowed to, such as following a null or dangling pointer. SIGABRT, sent when a program calls `abort()` after a failed [[Assertion]], also dumps core, as do SIGBUS, SIGILL, and SIGFPE. Shells report such deaths with an [[Exit Status]] of 128 plus the signal number, often adding "(core dumped)".

Whether a dump is actually written depends on configuration:

- **Size limit.** The `ulimit -c` setting is zero by default on many systems, which disables dumps entirely.
- **Destination.** The kernel's `core_pattern` setting decides where dumps go. On [[Systemd]] systems, it pipes them to systemd-coredump, which stores them compressed, and `coredumpctl` lists crashes and opens one in a debugger.
- **Permissions.** Programs that change privileges, such as setuid binaries, do not dump by default.

Reading a dump requires the exact binary that crashed and its debug symbols, which map addresses back to function names and source lines.

Core dumps are valuable because many crashes cannot be reproduced. A [[Heisenbug]] that appears once a week in production, or a [[Race Condition]] that depends on timing, may never happen under a debugger. A dump captures the state at the moment it mattered, turning an unreproducible failure into something that can be studied at leisure.

Variants exist for different scales:

- **Minidumps.** Windows and crash reporters such as Crashpad save only the stacks and a little memory, a few hundred kilobytes, so they can be uploaded automatically from users' machines and grouped by crash signature.
- **Kernel crash dumps.** When the [[Kernel]] itself panics, Linux's kdump boots a small spare kernel that saves the old one's memory for analysis.
- **Language runtimes.** Managed runtimes produce heap dumps for analyzing a [[Memory Leak]] and thread dumps for diagnosing a [[Deadlock]], without a crash.

Dumps carry a serious privacy and security risk. A full dump contains everything the process held in memory: passwords, session tokens, encryption keys, and user data. Dumps must be stored and shared as carefully as the secrets themselves, which is part of [[Secret Management]].

A [[Sanitizer]] catches many of the memory errors behind segmentation faults during testing, before they become crashes that need a dump at all.

## See also
- [[Unix Signal]]
- [[Kernel Panic]]
- [[Crash Reporting]]
