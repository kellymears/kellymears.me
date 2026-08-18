---
aliases:
  - cgroups
tags:
  - systems
summary: The Linux kernel feature that caps and accounts for a process group's CPU, memory, and I/O — the resource-limiting half of a container.
---
**Control groups** (cgroups) are a Linux kernel feature that groups processes together and applies resource limits — CPU shares, memory ceilings, I/O bandwidth, process counts — to the group as a whole. Where [[Linux Namespaces]] control what a process can *see*, cgroups control what it can *use*; together they are the two kernel primitives that [[Containerization|containers]] are built from, and neither one alone is a container.

A memory cgroup with a hard limit will have the kernel's out-of-memory killer target processes inside it specifically when they exceed the cap, rather than letting one runaway process starve the whole machine. A CPU cgroup can cap a group to a fraction of a core even on an otherwise idle system, which is how a container's "2 CPUs" setting is actually enforced rather than merely advertised.

Cgroups v2, the current unified hierarchy, replaced an earlier v1 design where each resource controller (`cpu`, `memory`, `blkio`) mounted its own independent tree, so a process could sit at a different position in the CPU hierarchy than in the memory one. v2 puts every controller on one tree, which is simpler to reason about and is what modern [[Systemd]] and container runtimes assume.

The everyday symptom of a cgroup limit is a process that gets killed with no error message and no stack trace — just gone, restarted, gone again. `dmesg` or the kernel log showing an OOM-kill event against the process's cgroup is usually the first real clue, since the process's own logs never get the chance to record why.

## See also
- [[Linux Namespaces]]
- [[Containerization]]
- [[Systemd]]
- [[Process]]
