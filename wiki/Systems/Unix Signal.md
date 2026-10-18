---
aliases:
  - Signal
  - Signals
  - SIGTERM
  - SIGKILL
  - SIGINT
  - Graceful shutdown
tags:
  - systems
summary: Asynchronous notifications the kernel delivers to a process, used to ask it to stop, reload, or report a fault, and the source of most graceful-shutdown logic.
---
A **signal** is a small asynchronous notification that the operating system delivers to a [[Process]]. It interrupts whatever the process is doing and either runs a handler function the program registered or triggers a default action, often terminating the process. They're one of the oldest forms of inter-process communication in Unix.

Common signals:

- **SIGINT** (2): interrupt, sent when you press Ctrl+C in a terminal.
- **SIGTERM** (15): a polite request to terminate. It's the default for the `kill` command and what service managers send first when stopping a service.
- **SIGKILL** (9): terminate immediately. It can't be caught, blocked, or ignored; the [[Kernel]] simply removes the process.
- **SIGHUP** (1): originally "the terminal hung up," now commonly used to tell a [[Daemon]] to reload its configuration.
- **SIGSEGV** (11): segmentation fault, sent when a program accesses memory it isn't allowed to.
- **SIGSTOP** and **SIGCONT**: pause and resume, which is how Ctrl+Z and job control work in a [[Shell]].

The difference between SIGTERM and SIGKILL matters in practice. SIGTERM gives a program the chance to shut down cleanly: finish in-flight requests, flush buffers, and release locks. SIGKILL gives it none, so data in memory is lost and files may be left half-written. The standard pattern, used by [[Systemd]], container runtimes, and orchestrators, is to send SIGTERM, wait a grace period such as 10 or 30 seconds, and send SIGKILL only if the process is still running. The kernel's [[Out-of-Memory Killer]] uses SIGKILL directly, which is why its victims never log anything.

**Graceful shutdown** is built on this. A well-behaved server catches SIGTERM, stops accepting new connections, finishes current ones, and exits. Without it, every deployment drops requests in flight, which undermines [[Zero-Downtime Deployment]].

Signal handlers are tricky. A signal can arrive at any instruction, including in the middle of a function that was modifying shared data, so a handler that calls the same function can corrupt state, a form of [[Race Condition]]. Only a short list of functions is safe to call from a handler. The usual advice is to do almost nothing in the handler itself: set a flag or write a byte to a pipe, and let the main loop notice and act. Linux's `signalfd` turns signals into readable events on a [[File Descriptor]], fitting them neatly into an [[Event Loop]].

Signals also explain some confusing behavior. In a container, the main process runs as PID 1, which the kernel treats specially: signals without a handler are ignored rather than triggering the default action, so a program that never registered for SIGTERM won't stop until it is killed. Small init programs exist to fix this, playing the role an [[Init System]] plays on a full machine.

## See also
- [[Syslog]]
- [[Job Control]]
- [[Inter-Process Communication]]
- [[POSIX]]
