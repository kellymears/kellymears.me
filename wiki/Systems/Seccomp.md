---
aliases:
  - Seccomp-BPF
  - System call filtering
  - Syscall filter
tags:
  - systems
summary: A Linux feature that lets a process restrict which system calls it can make, so that a compromised program can't reach most of the kernel, used by browsers, containers, and service managers.
---
**Seccomp** (secure computing mode) is a Linux feature that lets a process restrict which [[System Call]]s it may make. Everything a program does outside its own memory, opening files, starting processes, talking to the network, goes through system calls into the [[Kernel]]. If a program is compromised, the attacker gets whatever the program can ask the kernel for. Seccomp shrinks that list.

It arrived in 2005 in a strict form that allowed only four calls: read and write on already open files, exit, and return from a signal handler. That was enough for a pure computation fed through a pipe and almost nothing else. The useful version came in 2012: **seccomp-BPF**, where the process installs a small filter program written in the same bytecode the kernel uses for packet filtering; see [[eBPF]]. The kernel runs the filter on every system call, inspecting its number and arguments, and decides what happens:

- **Allow** the call.
- **Return an error**, so the program sees a failure it can handle.
- **Kill** the process or thread at once.
- **Trap** or **notify**, handing the decision to a signal handler or a supervising process.
- **Log** the call and allow it, useful while working out what a program needs.

Two properties make it safe. A filter, once installed, can't be removed or loosened, only tightened further, and it passes on to every child process. And installing one doesn't require special privileges, as long as the process promises it will never gain more, so a program can sandbox itself.

Its most visible users:

- **Browsers.** Chrome and Firefox run each website's rendering in a separate process with a tight filter, so a bug in the engine that parses untrusted pages can't open files or start programs; see [[Browser Engine]] and [[Swiss cheese model]].
- **Containers.** Container runtimes apply a default profile blocking around fifty calls, including those for loading kernel modules and rebooting; see [[Containerization]].
- **Service managers.** A [[Systemd]] unit can list the groups of calls a service may use, and refuse everything else.

The hard part is building the list. Programs make system calls through libraries, the C library may switch to newer calls in an update, and a rarely used code path may make a call nobody saw during testing, so filters that are too tight cause sudden crashes in production. Tracing tools that record a program's calls help, but coverage is never complete; see [[Code Coverage]]. Allowlists are safer than denylists, since a new kernel adds new calls a denylist doesn't know about.

Seccomp is one layer. It limits which kernel entry points are reachable; [[Linux Capabilities]] limit privileged operations, [[Linux Namespaces]] limit what a process can see, and [[Mandatory Access Control]] limits what it can touch.

## See also
- [[Resource Limit]]
- [[Agent Sandbox]]
- [[Memory Safety]]
- [[MicroVM]]
