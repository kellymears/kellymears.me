---
aliases:
  - DST
  - Simulation testing
  - Deterministic simulation
tags:
  - testing
summary: Running a whole distributed system inside a deterministic simulator with fake time, network, and disks, injecting faults, so any bug found can be replayed exactly from a seed.
---
**Deterministic simulation testing** runs an entire distributed system, with many nodes, networks, disks, and clocks, inside a single deterministic simulation. Every source of nondeterminism is replaced by a simulated version driven by one seeded random number generator. The simulator injects faults aggressively: dropped and reordered messages, network partitions, crashed nodes, full and corrupted disks, and clocks that jump. Because everything flows from the seed, any failure can be reproduced exactly by rerunning the same seed.

Distributed systems are notoriously hard to test conventionally. Bugs depend on rare interleavings of events across machines, and a test that fails once may never fail again. That is the [[Heisenbug]] and [[Flaky Test]] problem at its worst. A [[Race Condition]] between a leader election and a disk write may need a precise sequence of a dozen events that happens once a year in production and never in a test environment.

The approach was made famous by FoundationDB, a distributed database whose team built the simulator before the database itself, around 2010. The real database code runs inside the simulator, with interfaces to the network, disk, and time swapped for simulated ones. Because simulated time doesn't wait, the system can be pushed through years of simulated operation in hours. FoundationDB became known for its reliability. When Apple acquired the company, it adopted the database for internal use. Later projects followed, including TigerBeetle, a financial database whose simulator is a central part of its development, and Antithesis, founded by former FoundationDB engineers, which runs ordinary software inside a deterministic [[Hypervisor]] to bring the approach to systems not designed for it.

The requirements are strict. All concurrency must go through the simulator's scheduler, often a single-threaded [[Event Loop]]. All randomness must come from the seed (see [[Seeded Randomness]]), and every source of time, I/O, and thread scheduling must be controllable. Retrofitting this onto an existing codebase is hard, which is why it works best designed in from the start. See [[Determinism]].

It combines ideas from several techniques. Like [[Fuzzing]] and [[Property-Based Testing]], it explores huge numbers of random scenarios and checks invariants. Like [[Chaos Engineering]], it injects real-world faults, but in simulation rather than production, and reproducibly. Every failure arrives as a perfect [[Reproducible Case]]. It complements [[Formal Verification]], which can prove a design correct, while simulation tests the actual implementation. Systems built around a [[Consensus Algorithm]] have been its most common target.

## See also
- [[Flaky Test]]
- [[Seeded Randomness]]
