---
aliases:
  - namespaces
tags:
  - systems
summary: The kernel feature that gives a process its own private view of a global resource — the foundation containers are built from.
---
**Linux namespaces** partition a kernel resource so that a process sees its own private instance of it instead of the one true global copy. There are separate namespace types for process IDs, network interfaces, mount points, hostnames, user/group IDs, and inter-process communication objects, and a process can be placed in any combination of them independently.

A PID namespace is the clearest example: inside it, the first process a container starts is PID 1, able to see only itself and its own descendants, while the host still sees that same process under its real, much larger PID. A mount namespace gives a process its own filesystem tree, so mounting something inside it never affects anything outside. Combine a handful of namespace types and you get the isolation illusion that [[Containerization|containers]] run on — a process that believes it has the whole machine to itself.

Namespaces isolate what a process can *see*; they say nothing about what it can *use*. A namespaced process can still consume unlimited CPU or memory unless something else constrains it — that's the job of [[Control Groups]], the companion kernel feature that containers combine with namespaces to get both isolation and resource limits.

Namespaces are also not a security boundary on their own. The kernel underneath is shared, and a bug in a syscall a namespaced process can still reach is a path out of the container — the reason container runtimes layer seccomp filters and capability drops on top rather than trusting namespaces alone.

## See also
- [[Control Groups]]
- [[Containerization]]
- [[Chroot]]
- [[Least Privilege]]

## Related
- [[Process]]
