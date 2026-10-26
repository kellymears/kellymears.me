---
aliases:
  - PSI
  - Resource pressure
  - /proc/pressure
tags:
  - systems
summary: A kernel metric for how much time work spent waiting on CPU, memory, or I/O, which measures contention directly where utilization figures only hint at it.
---
**Pressure stall information** (PSI) is a Linux kernel metric for the share of time tasks spent *stalled* waiting on a resource: CPU, memory, or I/O. It appears in `/proc/pressure/{cpu,memory,io}` and per [[Control Groups|cgroup]], as running averages over 10, 60, and 300 seconds.

Each resource reports two lines:

- **some**: the share of time at least one task was stalled on that resource. Some work was being delayed.
- **full**: the share of time *all* non-idle tasks were stalled at once. No useful work was happening at all.

PSI exists because the traditional figures answer the wrong question. CPU utilization says how busy a resource is, not whether anyone is waiting for it, and 100% busy with nobody waiting is a well-used machine, not a problem. Load average mixes CPU and I/O waiters into one number, lags by minutes, and never says which resource is short. Free memory says almost nothing on a system where unused RAM holds the [[Page Cache]] by design. PSI measures the thing that actually hurts, lost time, per resource. A memory "some" figure climbing while free memory looks fine is how [[Swap]] thrashing shows itself before anything is killed.

That makes PSI a good trigger. Userspace [[Out-of-Memory Killer|OOM daemons]] act on sustained memory pressure instead of waiting for the kernel's last resort, and services can shed load or apply [[Backpressure]] when their own cgroup's pressure rises. It is a signal of saturation rather than activity, which is what alerting should be built on.

Like any single metric, it needs cross-checking. The I/O figure counts time tasks spend in certain kinds of wait, which does not always correspond to device work: a reading can be high on a machine whose disks show no throughput at all. Before acting on a surprising number, confirm it against something independent, such as per-device throughput, per-process stall states, or whether anything actually feels slow. A metric that disagrees with every other piece of evidence is evidence about the metric; see [[Ground Truth]].

## See also
- [[Resource Starvation]]
- [[Load Average]]
- [[CPU Scheduler]]
- [[Observability]]
- [[Instrumentation]]
