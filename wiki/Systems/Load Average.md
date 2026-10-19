---
aliases:
  - Load averages
  - System load
  - uptime
tags:
  - systems
summary: The three numbers in uptime and top, what Linux actually counts in them, and why they are a rough smoke alarm rather than a measure of how busy a machine is.
---
The **load average** is the set of three numbers printed by `uptime`, `top`, and many monitoring dashboards, such as `2.15 1.80 1.42`. They are averages of system load over roughly the last 1, 5, and 15 minutes. Reading the three together shows a trend: a high first number and low last number means load is rising, the reverse means it is falling.

On traditional Unix, load counts processes that are running or waiting to run. A load of 4 on a 4-core machine means every core is busy with nothing waiting; 8 means, on average, four processes are queued for a core. So the number only makes sense relative to core count, and a load of 10 is idle for a 64-core server and overwhelming for a laptop.

Linux counts something different. Since a 1993 change, it also includes processes in *uninterruptible sleep*, the D state, usually waiting on disk I/O or certain kernel locks. A machine with idle CPUs but processes stuck waiting on a slow network filesystem can report a load of 50. Brendan Gregg traced the history in 2017: the change was made so that load would reflect demand for disk as well as CPU. The result is that Linux load is a blend of CPU and I/O pressure that cannot be separated from the number alone.

The averages are also not simple averages. Each is an exponentially damped moving average updated every five seconds, so recent samples count most and old ones fade gradually. The "1-minute" average still reflects some activity from several minutes earlier.

Common misreadings:

- **High load means high CPU use.** Not on Linux; check whether processes are running or blocked. `top` shows CPU states, and `vmstat` separates runnable from blocked processes.
- **Load above core count means trouble.** Briefly, it is normal. Sustained, with rising latency, it matters.
- **Low load means healthy.** A single-threaded process can be stuck at 100 percent of one core on a 32-core machine and barely move the load.

Better signals now exist. [[Pressure Stall Information]] reports what fraction of time tasks were stalled waiting for CPU, memory, or I/O, separately, which answers the question load averages were trying to answer. Application metrics such as request latency, and [[Tail Latency]] in particular, say what users feel.

Load averages remain useful as a quick smoke alarm. A glance at `uptime` when a machine feels slow says whether the system is under pressure at all and whether it is getting worse. They also catch runaway situations quickly: a fork bomb, a memory leak driving heavy [[Swap]] use, or a storm of stuck I/O. The next step is always to find out which resource is saturated, using Profiling and per-resource tools.

## See also
- [[CPU Scheduler]]
