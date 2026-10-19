---
aliases:
  - Pipelining
  - Pipeline stall
  - Superscalar
tags:
  - systems
summary: Overlapping the stages of many instructions like an assembly line, so a processor finishes about one per clock tick instead of one per several, and the hazards and stalls that come from instructions depending on each other.
---
**Instruction pipelining** speeds up a processor by overlapping the work of several instructions, the way an assembly line overlaps the building of several cars. Executing one instruction takes several steps. A classic design splits them into five stages: fetch the instruction from memory, decode it, execute the operation, access memory if needed, and write the result back to a register. Without a pipeline, the processor finishes one instruction before starting the next. With one, while instruction one is executing, instruction two is being decoded and instruction three fetched.

The payoff is throughput. Each instruction still takes five steps, but in the ideal case one instruction completes every clock tick, roughly five times as many as before. Shorter stages also allow a faster clock; see [[Clock Signal]]. Laundry is the usual analogy: start the second load washing while the first is in the dryer. Pipelining in some form dates to the IBM Stretch of 1961, and every modern processor relies on it; see [[Von Neumann Architecture]].

The ideal rarely holds, because instructions depend on each other. These conflicts are called **hazards**:

- **Data hazards.** An instruction needs a result that an earlier one hasn't finished computing. Hardware can forward the result directly between stages, but sometimes the pipeline must wait, a **stall** or bubble.
- **Control hazards.** At a branch, the processor doesn't yet know which instruction comes next. Waiting wastes cycles, so processors guess, and when the guess is wrong they throw away the work in progress; see [[Speculative Execution]].
- **Structural hazards.** Two instructions need the same piece of hardware in the same cycle.

Compilers help by reordering instructions so that independent work fills the gaps; see [[Compiler]] and [[Instruction Set Architecture]].

Deeper pipelines allow higher clock speeds but make mistakes more expensive. Intel's Pentium 4 used an unusually long pipeline to reach high clock rates, and each wrong branch guess cost many cycles of work. The design ran hot and was abandoned for shorter pipelines that did more per tick; see [[Thermal Throttling]].

Modern processors go well beyond a single pipeline. **Superscalar** designs fetch and issue several instructions per tick to several execution units, and out-of-order execution lets later instructions run ahead of stalled ones as long as the final results appear in program order. A single core may have hundreds of instructions in flight. Other approaches widen each instruction instead, or share one pipeline among two threads to fill its bubbles; see [[SIMD]] and [[Simultaneous Multithreading]].

The same pattern recurs outside processors. Any staged process gains throughput by overlapping work, and its speed is set by the slowest stage; see [[Theory of Constraints]] and [[Deployment Pipeline]].

## See also
- [[Microcode]]
- [[Memory Hierarchy]]
- [[Assembly Language]]
- [[Graphics Pipeline]]
- [[Distributed Training]]
