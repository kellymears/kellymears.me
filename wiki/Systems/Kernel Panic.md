---
aliases:
  - Oops
  - Blue Screen of Death
  - Stop error
tags:
  - systems
summary: The operating system kernel deliberately halting when it detects an error it can't safely recover from, the Unix version of the Blue Screen of Death, and how crash dumps and watchdogs turn it into a fast reboot.
---
A **kernel panic** is the [[Kernel]] halting the whole machine on purpose, because it has detected an internal error it can't safely recover from. Windows calls the same thing a stop error, better known as the **Blue Screen of Death**. Both are the system choosing to stop rather than continue in a state it can no longer trust; see [[Fail Fast]].

The logic is about blast radius. When an ordinary program crashes, the kernel cleans up after it: frees its memory, closes its files, reports its [[Exit Status]]. Nothing outside the program has to be trusted. When the kernel itself finds a corrupted data structure or an impossible condition, there is no one above it to clean up. Carrying on risks writing garbage to disk, corrupting the [[Filesystem]], or leaking one process's data to another. Halting loses whatever was in memory, but it limits the damage to that.

Common causes:

- **Driver bugs.** Device drivers run inside the kernel with full privileges, so one bad pointer can bring down everything. Most Windows blue screens trace to third-party drivers, which is why Microsoft now requires driver signing; see [[Code Signing]] and [[Memory Safety]].
- **Hardware faults.** Failing RAM, an overheated or unstable CPU, or an uncorrectable memory error can surface as panics that look random; see [[Error-Correcting Code]].
- **Boot failures.** If the kernel can't find its root filesystem or start process 1, there is nothing useful left to do; see [[Boot Process]].
- **Deliberate checks.** Code full of assertions panics when one fails, on the theory that a known stop beats unknown corruption.

Linux distinguishes a full panic from an **oops**: an error serious enough to kill the offending process and log a detailed report, but not necessarily fatal to the system. The kernel marks itself "tainted" afterward, since its state is no longer fully trusted, and many servers are configured to escalate any oops into a panic.

What happens next matters more than the panic itself. Systems can be set to reboot automatically after a few seconds, often enforced by a [[Watchdog Timer]] that resets the machine if the kernel stops responding at all. A crash-dump mechanism can boot a small spare kernel that saves the dead kernel's memory to disk for later analysis; see [[Core Dump]] and [[Crash Reporting]].

Panics are also a fleet-scale risk. In July 2024, a faulty content update to a widely deployed security product loaded by a Windows kernel driver crashed about 8.5 million machines at once, grounding flights and closing hospitals. The driver read malformed input it hadn't validated, and machines crashed again on every boot. It became a textbook case for [[Canary Release]]s and for keeping third-party code out of the kernel; see [[Cascading Failure]].

## See also
- [[Syslog]]
- [[Serial Port]]
