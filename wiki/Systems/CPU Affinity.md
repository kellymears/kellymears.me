---
aliases:
  - Processor affinity
  - CPU pinning
  - Core pinning
  - taskset
  - Hybrid CPU architecture
  - P-cores and E-cores
tags:
  - systems
summary: Restricting which cores a thread may run on, which matters most on processors whose cores are not all alike.
---
**CPU affinity** is the set of cores a thread or [[Process]] is allowed to run on. By default it is all of them, and the [[CPU Scheduler]] moves threads freely between cores to balance load. Setting affinity (`taskset`, `sched_setaffinity`, or a [[Control Groups|cgroup]]'s `cpuset`) restricts that freedom, either to keep a thread somewhere specific or to keep other work away from it.

Pinning helps in a few situations:

- **Cache locality.** A thread that migrates leaves its warm caches behind. Keeping it on one core, or on cores sharing a cache, avoids paying to refill them.
- **Isolation.** Reserving cores for latency-sensitive work (an audio thread, a game, a packet-processing loop) and moving everything else off them reduces interference more reliably than priority alone. [[Hypervisor|Hypervisors]] pin virtual CPUs to physical cores for the same reason.
- **Memory locality.** On multi-socket (NUMA) machines, a thread is faster on the socket closest to its memory.

Affinity matters most on **heterogeneous processors**, where cores are not interchangeable. ARM's big.LITTLE designs, and Intel's hybrid chips since Alder Lake, pair fast performance cores (P-cores) with smaller, slower efficiency cores (E-cores). On the Intel parts, P-cores also run two hardware threads each and E-cores run one, so logical CPU numbers don't map evenly onto physical cores. A thread that lands on an E-core at the wrong moment runs at a fraction of the speed, and for a game that shows up as an uneven [[Frame Pacing]] spike rather than a lower average. The hardware provides hints to the scheduler about which threads belong where, but that support varies by operating system and kernel version. A common manual arrangement is to pin the foreground application to P-cores and confine background services and system [[Daemon|daemons]] to E-cores.

The costs are real. A pinned thread can't escape a busy core, so badly chosen affinity produces [[Resource Starvation]] on one core while others sit idle. Affinity is inherited by child processes, so a restriction applied to a launcher quietly applies to everything it starts. And because a manual pinning scheme encodes one machine's topology, it is configuration that does not port, and it has to be undone when the work is done. Tools that apply it temporarily, and revert only what they changed, follow the same principle as [[Idempotence|idempotent]] setup scripts.

## See also
- [[CPU Scheduler]]
- [[Control Groups]]
- [[Concurrency and Parallelism]]
- [[Frame Pacing]]
- [[Resource Starvation]]
- [[Process]]
