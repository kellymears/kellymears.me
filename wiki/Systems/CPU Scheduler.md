---
aliases:
  - Process scheduler
  - Scheduler
  - EEVDF
  - CFS
  - sched_ext
tags:
  - systems
summary: The part of the kernel that decides which runnable thread gets each CPU core next, and for how long, trading throughput against latency.
---
The **CPU scheduler** is the part of the operating system kernel that decides which runnable thread runs on each core next and for how long. A machine typically has far more runnable threads than cores, so the scheduler is constantly choosing, and its policy decides whether the machine feels responsive under load or merely stays busy.

The core tension is **throughput versus latency**. Long time slices and few switches maximize total work, because every context switch costs cache warmth and bookkeeping. Short slices and eager preemption minimize how long an interactive thread waits after it becomes runnable, such as one woken by a keypress, a network packet, or a display refresh. No single policy wins both. Different workloads want different points on the curve: a build server wants throughput, while a game or an audio pipeline wants every frame's thread to run *now*, since a slow frame is a visible stutter (see [[Frame Pacing]]).

Linux's history shows how the trade-offs have moved:

- **CFS** (Completely Fair Scheduler, 2007) tracked each thread's accumulated runtime and always ran the one that had had the least, weighted by its `nice` value. It was fair, but latency-sensitive work needed heuristics on top.
- **EEVDF** (2023) replaced it with *virtual deadlines*, so a thread that sleeps often and runs briefly gets scheduled sooner without special cases.
- **sched_ext** (2024) lets a scheduler be loaded at runtime as an eBPF program. That made scheduling policy something users can swap per workload, for example a scheduler that prioritizes threads on the critical path of frame delivery while gaming, without rebuilding the kernel.

Scheduling also interacts with everything around it. [[Control Groups|cgroup]] CPU weights decide how groups share time before the scheduler picks threads within a group. [[CPU Affinity]] restricts which cores a thread may use. A **priority inversion**, where a high-priority thread waits on a lock held by a low-priority one that never gets scheduled, can defeat any policy and is a classic source of [[Heisenbug|heisenbugs]].

The general principle is the one behind every [[Event Loop]]: whoever holds the processor decides how responsive everything else is, and a fair share is not always the right one.

## See also
- [[CPU Affinity]]
- [[Concurrency and Parallelism]]
- [[Control Groups]]
- [[Event Loop]]
- [[Resource Starvation]]
- [[Pressure Stall Information]]
- [[Race Condition]]
- [[Attention Residue]]
- [[Dynamic Voltage and Frequency Scaling]]
- [[Kernel]]
