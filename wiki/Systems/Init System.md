---
aliases:
  - PID 1
tags:
  - systems
summary: The first userspace process a kernel starts, and the ancestor of every other process on the machine.
---
An **init system** is the first process the kernel launches after boot, conventionally given process ID 1. Every other process on the machine is its descendant, directly or through reparenting when a parent dies. Its two irreducible jobs are starting the rest of userspace and reaping orphaned processes — nothing else can do either, because nothing else exists yet when it starts, and by default only PID 1 inherits a process whose parent has exited (Linux's subreaper flag lets a process claim that role for its own subtree, which is how container inits work).

The classic Unix init, `sysvinit`, ran numbered shell scripts in sequence, organized by runlevel 0 through 6 — halt, single-user, multi-user, and reboot. It was simple and legible but strictly serial: each script waited for the last, so boot time scaled with the number of services regardless of how many CPUs sat idle. It also had no native concept of a service depending on another beyond script ordering by filename.

Modern init systems — [[Systemd]] on most Linux distributions, launchd on macOS — instead describe services as unit declarations with explicit dependencies, and start independent ones in parallel. This trades the transparency of a shell script anyone can read top to bottom for faster boots and features like automatic restart, socket activation, and resource limits per service.

Whichever init a system runs, it remains the process that must never crash: its exit brings down the kernel with it, since there is no parent left to notice and no supervisor above PID 1.

## See also
- [[Systemd]]
- [[Daemon]]
- [[Process]]
- [[Chroot]]

## Related
- [[Rolling Release]]
