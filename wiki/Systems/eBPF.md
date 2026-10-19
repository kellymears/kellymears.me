---
aliases:
  - BPF
  - Berkeley Packet Filter
  - Extended BPF
  - bpftrace
  - XDP
tags:
  - systems
summary: Small verified programs loaded into the running Linux kernel to trace, filter, or change its behavior safely, without kernel modules or reboots.
---
**eBPF** lets users load small programs into the running Linux [[Kernel]] and attach them to events: a function being called, a packet arriving, a [[System Call]] being made, a process being scheduled. The programs run inside the kernel at near-native speed, yet cannot crash it, because a verifier checks every program before it is allowed to run. It made the kernel programmable without writing kernel modules or rebooting.

It grew out of the **Berkeley Packet Filter**, designed by Steven McCanne and Van Jacobson in 1992 so that tools like tcpdump could filter packets in the kernel instead of copying every packet to user space. In 2014, Alexei Starovoitov extended it into a general-purpose virtual machine with more registers, maps for storing data, and many new attachment points. The original is now called classic BPF.

The safety model is what makes eBPF practical. Before a program loads, the verifier simulates every path through it and rejects anything that could loop forever, read out of bounds, or follow an invalid pointer. Accepted programs are compiled to machine code. This gives kernel speed with something like the sandboxing of [[WebAssembly]] in a browser, though verifier bugs have occasionally been exploitable, which is why most distributions restrict eBPF to privileged users.

Programs share data with user space through *maps*, kernel-resident key-value structures such as hash tables, arrays, and ring buffers.

Main uses:

- **Tracing and [[Observability]].** Tools such as bcc and bpftrace attach to kernel and application functions to measure latency, count events, or capture stacks, on production systems with negligible overhead. Brendan Gregg's tools made this the standard way to answer "what is the kernel doing?" It is a powerful form of [[Instrumentation]] and [[Profiling]] that needs no code changes.
- **Networking.** XDP runs programs on packets as they arrive at the network driver, before the kernel's networking stack, so they can be dropped or redirected at millions per second. Facebook's Katran [[Load Balancing]] system and many defenses against a [[Denial-of-Service Attack]] use it. Cilium implements container networking and [[Firewall]] rules with eBPF instead of iptables.
- **Security.** Tools such as Falco watch system calls for suspicious behavior, and eBPF programs can enforce policy, as an alternative to seccomp filters, which are themselves built on classic BPF.
- **Scheduling.** Since Linux 6.12 in 2024, sched_ext lets an entire [[CPU Scheduler]] be written as an eBPF program and swapped at runtime, so schedulers tuned for gaming or servers can be tried without rebuilding the kernel.

eBPF is not limited to Linux any more. Microsoft has an implementation for Windows, and the instruction set was published as an IETF standard in 2024. It also works well with [[Control Groups]], attaching programs per container to account for or limit their resource use.

## See also
- [[Seccomp]]
- [[Service Mesh]]
- [[Read-Copy-Update]]
- [[Live Patching]]
