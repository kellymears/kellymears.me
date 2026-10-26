---
aliases:
  - big.LITTLE
  - Performance core
  - Efficiency core
  - P-core
  - E-core
  - P-cores and E-cores
tags:
  - systems
summary: Processors that mix large fast cores with small efficient ones on one chip, first in phones and now in laptops and desktops, which saves power and adds throughput but hands the operating system a hard scheduling problem.
---
A **hybrid CPU architecture** puts two or more kinds of cores on one processor: large **performance cores** built for speed on a single task, and small **efficiency cores** built for low power and for many tasks at once. The operating system must decide which work runs where.

The idea started in phones. ARM introduced big.LITTLE in 2011, pairing fast and slow cores that ran the same instructions, so a phone could idle and check mail on tiny cores and switch to large ones only for demanding moments. Apple brought the design to laptops with the M1 in 2020, and Intel to mainstream desktops with Alder Lake in 2021, using the names P-cores and E-cores.

The motivation is physics. Power rises much faster than performance as a core is pushed harder, because higher clock speeds need higher voltage and power grows with voltage squared; see [[Dynamic Voltage and Frequency Scaling]]. A big core running flat out wastes energy on background work, and a small core can do that work for a fraction of the power. Small cores also take far less chip area, so several of them can deliver more total throughput than one big core in the same space, as long as the work divides; see [[Concurrency and Parallelism]].

The difficulty is scheduling. A traditional [[CPU Scheduler]] assumes all cores are equal, so it might put a game's main thread on a slow core and a background indexer on a fast one. Hybrid systems need hints:

- **Hardware feedback.** Intel's Thread Director watches what each thread is doing and reports to the operating system which kind of core would suit it.
- **Quality-of-service labels.** On Apple's systems, applications mark work as user-interactive or background, and the scheduler maps that to core types.
- **Pinning.** Users and tools can restrict a program to particular cores; see [[CPU Affinity]].

Mixed cores caused other surprises:

- **Instruction sets.** A thread can migrate between core types at any moment, so both must support exactly the same instructions. Intel disabled the AVX-512 vector instructions on Alder Lake's P-cores because its E-cores lacked them.
- **Copy protection.** At launch, an anti-piracy system used by many games mistook the E-cores for a second computer, refusing to run until patched.
- **Benchmarks.** Results depend on where a test happens to land, so measurements vary more than on uniform chips.

On Intel's early hybrid desktop chips, only P-cores support Simultaneous Multithreading, so core count, thread count, and speed no longer line up in a simple way. Heat adds another layer, since sustained load on large cores triggers Thermal Throttling, one more reason to keep background work on the small ones.

## See also
- [[Computer Cooling]]
