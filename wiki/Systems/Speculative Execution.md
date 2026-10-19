---
aliases:
  - Spectre
  - Branch prediction
  - Out-of-order execution
  - Side-channel attack
tags:
  - systems
summary: How processors run ahead of the program by guessing which way branches will go, and how the traces those guesses leave in the cache became the Spectre and Meltdown vulnerabilities.
---
**Speculative execution** is a processor guessing what the program will do next and doing it before it knows the guess is right. If the guess was right, the work is already done. If it was wrong, the results are thrown away and execution restarts on the correct path. Modern CPUs depend on it for most of their speed.

The reason is pipelining. A modern core works on a couple of hundred instructions at once, at different stages, and executes them **out of order**, running any instruction whose inputs are ready instead of waiting for earlier ones stalled on memory. Robert Tomasulo's algorithm for the IBM System/360 Model 91 (1967) introduced the idea. A conditional branch threatens all of this, because until the condition is computed the processor doesn't know which instructions come next. Stopping to wait would leave the pipeline empty for dozens of cycles at every `if`.

So the core uses **branch prediction**. A predictor records the history of each branch and guesses, and modern predictors are right well over 95% of the time on typical code. A misprediction costs roughly 15 to 20 cycles of discarded work. This is why sorting data can make a loop over it several times faster: the branch becomes predictable. It also explains why hot loops written to avoid branches entirely can outrun simpler code.

The design assumed that discarded work left no trace. In January 2018, researchers including Jann Horn of Google's Project Zero and Paul Kocher showed that it does. Speculatively executed instructions are rolled back, but the cache lines they loaded stay loaded. An attacker can time later memory accesses to find which lines are cached, a classic **side-channel attack** that reads a secret indirectly through its effect on timing. [[Locality of Reference]] becomes a leak.

Two families were announced together:

- **Meltdown** let user programs on most Intel processors read kernel memory, because the permission check came after the speculative load. The fix, kernel page-table isolation, unmaps the [[Kernel]] while user code runs, making every [[System Call]] and [[Context Switch]] dearer, with the [[Translation Lookaside Buffer]] taking much of the cost.
- **Spectre** trains the branch predictor so that a victim program speculatively reads its own secrets. It affects nearly every high-performance CPU and can't be fixed in one place. Mitigations include [[Microcode]] updates, compiler techniques such as Google's retpoline, coarser timers in browsers, and process-per-site isolation.

Variants have kept appearing, many involving [[Simultaneous Multithreading]], where two threads share a core's internals. The lesson is structural: performance features that share hardware state between security domains leak information through timing, so isolation has to cover microarchitectural state, not just memory permissions. [[Hypervisor]] vendors and cloud providers now treat it that way.

## See also
- [[Instruction Pipelining]]
- [[Cross-Origin Isolation]]
- [[Protection Ring]]
- [[Traffic Analysis]]
- [[Timing Attack]]
- [[Data Deduplication]]
