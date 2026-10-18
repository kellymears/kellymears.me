---
aliases:
  - Exec
  - execve
  - vfork
  - posix_spawn
  - Fork bomb
tags:
  - systems
summary: How Unix starts a program in two steps, first copying the running process and then replacing the copy's program, why the gap between the steps made shells simple, and why the design is now criticized.
---
**Fork and exec** is the Unix way of starting a new program, in two separate steps. First the running process calls fork, which creates a near-exact copy of itself, the child, with the same memory, open files, and environment; see [[Process]]. Then the child calls exec, which throws away its program and loads a new one in its place, keeping the same process ID. Most other systems create a process and load its program in one call.

The design dates from early Unix at Bell Labs, borrowed from an earlier Berkeley time-sharing system. Its virtue is the gap between the two steps. In that gap the child, still running the parent's code, can set up its surroundings first:

- **Redirection.** A shell implements "output to a file" by opening the file in the child and moving it onto standard output before exec; see [[File Descriptor]] and [[Shell]].
- **Pipelines.** It connects two children by giving each one end of a pipe; see [[Unix Pipeline]].
- **Environment and privileges.** The child can change directory, set variables, or give up root before running untrusted code; see [[Environment Variable]] and [[Least Privilege]].

None of this needs special process-creation options; ordinary system calls do it.

Copying a whole process sounds expensive, and once it was. Berkeley added **vfork** in 1979, which lent the parent's memory to the child until exec. Today fork marks the memory [[Copy-on-Write]], so pages are duplicated only if one side writes to them, and a fork followed promptly by exec copies almost nothing.

The rest of a process's life follows the same family model. The parent calls wait to collect the child's [[Exit Status]]; a child that has exited but not been waited for lingers as a zombie, and one whose parent dies is adopted by the first process on the system; see [[Zombie Process]] and [[Init System]]. A [[Daemon]] traditionally detached itself by forking twice so that no terminal could claim it.

Critics have grown louder. A 2019 paper from Microsoft Research and academic colleagues, "A fork() in the road," argued that fork no longer fits modern systems:

- **Threads.** Only the calling thread is copied, so locks held by other threads stay locked forever in the child.
- **Memory.** Copying a large process's page tables is slow, and promising memory that copy-on-write might need encourages overcommitment; see [[Virtual Memory]].
- **Security.** The child inherits everything not explicitly closed, including secrets and file descriptors.

The usual alternative, posix_spawn, creates and loads in one call with an explicit list of setup actions. Linux's clone call, fork's more configurable relative, is also how containers start processes in new namespaces; see [[Linux Namespaces]].

A **fork bomb**, a program that forks endlessly, can still freeze a system by exhausting its process table.

## See also
- [[Unix Signal]]
- [[Job Control]]
