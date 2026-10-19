---
aliases:
  - Ulimit
  - Rlimit
tags:
  - systems
summary: Per-process caps that a Unix-like kernel enforces on resources such as open files, stack size, CPU time, and core dump size, with a soft limit a process may raise and a hard ceiling only a privileged user can lift.
---
A **resource limit** is a cap that a Unix-like kernel enforces on how much of some resource a single process may use: open files, processes, stack size, CPU time, memory, the size of core dumps. Limits are set through the setrlimit system call and inspected with getrlimit, and most people meet them through the shell's ulimit command; see [[Process]].

Each limit has two values. The **soft limit** is what the kernel actually enforces. The **hard limit** is a ceiling: an ordinary process may raise its soft limit up to the hard limit, or lower the hard limit, but only a privileged process can raise it; see [[Superuser]]. That lets administrators set firm boundaries while letting programs adjust within them.

Limits are inherited. A child process starts with its parent's limits, so a limit set in a login shell applies to everything launched from it; see [[Fork and Exec]]. That's also why ulimit must be built into the shell rather than being a separate program: a separate program could only change its own limits, which would vanish when it exited.

The most common encounter is the open-files limit. Many systems default to a soft limit of 1,024 file descriptors per process, plenty for most programs but not for a busy server holding thousands of connections, which then fails with errors about too many open files; see [[File Descriptor]]. Raising it is usually safe, since the default dates from an era of far smaller machines. Service managers let each service set its own limits, and raising this one is a routine step in deploying databases and web servers; see [[Systemd]].

Other limits guard against runaway programs. A cap on processes per user contains a fork bomb, which multiplies until the system can't start anything else. The stack size limit, commonly 8 megabytes on Linux, decides how deep recursion can go before the program crashes; see [[Call Stack]]. Setting the core dump limit to zero, a frequent default, means crashed programs leave no dump behind, which surprises developers trying to debug them; see [[Core Dump]].

Resource limits are old and coarse. They apply per process, so a program that spreads work across many processes can evade a per-process memory cap, and memory limits interact awkwardly with virtual memory; see [[Virtual Memory]]. Linux added control groups, which limit and account for resources across whole groups of processes, and containers rely on them; see [[Control Groups]] and [[Containerization]]. When memory runs out regardless, the kernel's last resort is to kill something; see [[Out-of-Memory Killer]].

The underlying idea, giving each tenant a bounded share so one can't starve the others, recurs across computing; see [[Resource Starvation]] and [[Multi-Tenancy]].

## See also
- [[Process Priority]]
- [[Rate Limiting]]
