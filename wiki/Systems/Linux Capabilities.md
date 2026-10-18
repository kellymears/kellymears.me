---
aliases:
  - Capabilities
  - POSIX capabilities
  - CAP_SYS_ADMIN
tags:
  - systems
summary: Splitting the all-or-nothing power of root into about forty separate privileges, so a program can bind a low port or set the clock without being able to do everything else.
---
**Linux capabilities** divide the powers of the root user into about forty separate privileges that can be granted one at a time. Traditionally a Unix process either ran as root and could do anything, or ran as an ordinary user and was checked against [[File Permissions]] for everything; see [[Superuser]]. Capabilities replace that single switch with a set of narrower ones.

Some examples:

- **CAP_NET_BIND_SERVICE** lets a program listen on a [[Port]] below 1024, historically reserved for root. A web server needs this and little else.
- **CAP_SYS_TIME** allows setting the system clock, which is all a time daemon needs; see [[Network Time Protocol]].
- **CAP_NET_RAW** allows crafting raw network packets, which `ping` uses.
- **CAP_KILL** bypasses the ownership check when sending signals; see [[Unix Signal]].
- **CAP_SYS_ADMIN** covers mounting filesystems, many device operations, and a long tail of other things. It is so broad that it's often called "the new root."

The point is [[Least Privilege]]. Before capabilities, `ping` was a setuid-root program: anyone running it briefly had full root powers, and any bug in it could become privilege escalation, turning a small flaw into control of the whole machine. With capabilities, the same binary gets only the power to send raw packets.

Each process carries several sets: what it may use (**permitted**), what's active right now (**effective**), what passes to programs it starts (**inheritable** and **ambient**), and an upper limit nothing can exceed (the **bounding** set). A program can drop capabilities once it no longer needs them, for example binding a port at startup and then giving up the right to bind more. Executables can carry capabilities as filesystem attributes, so they gain those powers when run without being setuid.

Capabilities underpin container security. A container's "root" user runs with a reduced capability set by default, so it can manage its own files but can't load kernel modules or change the host's clock; see [[Containerization]] and [[Linux Namespaces]]. The common advice to drop all capabilities and add back only what a service needs follows directly. Service managers expose the same controls, letting a unit file run a daemon with just the capabilities it names; see [[Systemd]].

They aren't a complete sandbox. Several capabilities can be turned into full root by a determined attacker: one that writes arbitrary files or loads code into the [[Kernel]] can escalate to everything. CAP_SYS_ADMIN grew so broad because new privileged features were added under it rather than given their own capability, a familiar pattern of [[Technical Debt]]. Capabilities are usually combined with system-call filtering and mandatory access control; see [[Seccomp]] and [[Mandatory Access Control]].

## See also
- [[Agent Sandbox]]
- [[Zero Trust Network]]
