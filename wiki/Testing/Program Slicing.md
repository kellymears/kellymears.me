---
aliases:
  - Slicing
  - Dynamic slicing
  - Backward slice
tags:
  - testing
summary: Cutting a program down to just the statements that could affect a chosen value at a chosen point, a formalization of what programmers already do in their heads when they debug.
---
**Program slicing** reduces a program to the subset of its statements that could affect the value of a chosen variable at a chosen point, called the slicing criterion. Everything else is removed. The result, a **slice**, is usually much smaller than the program and still computes the same value for that variable.

Mark Weiser introduced slicing in his 1979 dissertation after observing experienced programmers debugging. When a value came out wrong, they ignored most of the code and traced backward through only the statements that could have influenced it. Weiser formalized that mental process so a tool could do it.

A slice follows two kinds of dependence:

- **Data dependence.** A statement uses a value that an earlier statement assigned.
- **Control dependence.** A statement runs only if some condition holds, so the condition affects it.

Following these dependences backward from the criterion gives a **backward slice**: everything that could have caused this value. Following them forward gives a **forward slice**: everything this statement could influence, which helps estimate the impact of a change; see [[Test Impact Analysis]].

There are two main flavors:

- **Static slicing** considers every possible execution. It's safe but often large, because it must assume any path might run and any pointer might alias.
- **Dynamic slicing**, introduced by Bogdan Korel and Janusz Laski in 1988, considers one actual run with its specific input. The slice includes only statements that really executed and really influenced the value, which makes it far more precise for debugging a particular failure.

Computing perfectly precise static slices is impossible in general, since deciding which statements can actually affect a value would solve the [[Halting Problem]]. Practical tools approximate, trading precision for speed; see [[Abstract Interpretation]].

Slicing shows up in many tools under other names. Debugging tools that answer "why does this variable have this value?" are computing dynamic slices; the Whyline, built by Andrew Ko in 2004, let users ask exactly that question and see the chain of causes; see [[Debugger]]. Security tools that track whether untrusted input can reach a dangerous call are computing a forward slice from the input; see [[Static Analysis]]. Bundlers that drop code no output depends on perform a related analysis; see [[Tree Shaking]].

Slicing pairs well with other debugging strategies. Ranking statements by how often they run in failing tests narrows suspicion, and slicing then filters to the statements that could have mattered; see [[Spectrum-Based Fault Localization]]. Shrinking the input while preserving the failure reduces what the slice must explain; see [[Delta Debugging]] and [[Minimal Reproducible Example]].

It also helps when untangling old code. Extracting one computation from a long function is easier when a slice shows exactly which lines it needs; see [[Refactoring]] and [[Characterization Test]].

## See also
- [[Scientific Debugging]]
- [[Symbolic Execution]]
