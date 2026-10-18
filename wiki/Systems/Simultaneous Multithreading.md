---
aliases:
  - Hyper-Threading
  - SMT
  - Logical processor
tags:
  - systems
summary: Running two hardware threads on one physical core so that one can use the execution units while the other waits on memory, at the cost of contention and shared-state leaks.
---
**Simultaneous multithreading** (SMT) lets one physical CPU core run two or more instruction streams at the same time. The operating system sees each stream as a separate *logical processor*, so a chip with 8 cores and SMT appears as 16 CPUs. Intel's name for it is **Hyper-Threading**, introduced in 2002 on the Pentium 4 and Xeon.

It works because a modern core is usually underused. It has many execution units and can issue several instructions per cycle, but a single thread often can't supply them: it waits on a cache miss, or a mispredicted branch forces [[Speculative Execution]] to throw work away. SMT duplicates the small per-thread state, registers and program counter, and shares everything else, so when one thread stalls the other fills the idle slots. Switching costs nothing, unlike an operating-system [[Context Switch]].

The gain depends heavily on the workload:

- **Memory-bound, branchy code** such as compilers, databases, and web servers gains the most, often 20 to 30%, because there are many stalls to fill.
- **Compute-bound, tuned code** such as dense numerical kernels may gain nothing or slow down, because both threads compete for the same units and the same caches. A logical processor is never a whole core.
- **Latency-sensitive work** such as games and audio can suffer when a sibling thread steals resources at the wrong moment, which is why some users disable SMT or reserve whole cores with [[CPU Affinity]].

The [[CPU Scheduler]] has to know which logical CPUs are siblings. With two busy threads and two idle cores, putting them on separate cores is far better than sharing one, and Linux's scheduler tracks this topology explicitly. Tools that report utilization can also mislead: a core showing two logical CPUs at 50% may be closer to full than it looks. That affects how [[Load Average]] and capacity planning are read.

Sharing a core also shares its internals, and that has a security cost. Since 2018, a series of side-channel attacks, including PortSmash and the microarchitectural data sampling family, have used SMT to leak data between threads on the same core. OpenBSD disabled SMT by default in 2018, and cloud providers avoid putting different customers' virtual CPUs on sibling threads, since a [[Hypervisor]] can't otherwise guarantee isolation.

Designs keep shifting. IBM's POWER processors run eight threads per core. Intel left SMT out of the efficiency cores in its hybrid designs, and dropped it from some 2024 desktop and laptop chips altogether, preferring more cores and lower power per thread, a trade-off tied to [[Dynamic Voltage and Frequency Scaling]] and [[Thermal Throttling]] limits.

## See also
- [[CPU Affinity]]
- [[CPU Scheduler]]
- [[Concurrency and Parallelism]]
- [[Silicon Binning]]
