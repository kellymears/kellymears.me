---
aliases:
  - Minimal repro
  - Reprex
  - MRE
  - SSCCE
  - Reduced test case
tags:
  - testing
summary: The smallest self-contained program or set of steps that still shows a bug, and why making one is often the moment the bug gets understood.
---
A **minimal reproducible example** is the smallest, self-contained case that still shows a problem. Every line, dependency, and step that can be removed without the bug disappearing has been removed. The name comes from programming help forums, which ask for one before anyone looks at a question, but the idea is older: browser engineers have long called it a *reduced test case*, and Java programmers knew it as an SSCCE, a "short, self-contained, correct example."

It has three properties, and each one does work:

- **Minimal.** Whatever remains is suspect. A hundred lines of application code hide the cause; ten lines point at it.
- **Reproducible.** It fails every time, on any machine. A bug that appears one run in fifty is a [[Flaky Test]] or a [[Heisenbug]] until the conditions that trigger it are pinned down, often by fixing a random seed, a clock, or thread scheduling to get [[Determinism]].
- **Self-contained.** No private database, no credentials, no "it works on my machine." A [[Containerization|container]] or a single file with its dependencies pinned lets a stranger run it.

The process of building one is a debugging method in its own right. You remove a piece and check whether the bug survives. If it does, the piece was irrelevant; if it doesn't, it mattered, and you put it back. This is a manual form of Delta Debugging, which automates the same loop, and of [[Git Bisect]], which runs it over history instead of code. A large share of bug reports never get filed because the reporter, halfway through reducing the case, finds their own mistake. That is the same effect as [[Rubber Duck Debugging]]: making the problem explicit for someone else forces you to check assumptions you'd been skipping.

A minimal example also changes who can help. Maintainers of popular projects get far more reports than they can investigate, and a report that takes a minute to run is answered before one that needs an afternoon of setup. Compiler and browser teams accept reductions as the expected format, and fuzzers such as those in Fuzzing shrink their crashing inputs automatically before reporting them, the way [[Property-Based Testing]] shrinks a failing case.

Once the bug is fixed, the example has a second life. It becomes a [[Regression Testing|regression test]], already small, fast, and isolated, which is exactly what a good unit test looks like.

The main trap is reducing too far. Sometimes the bug only appears in combination: two libraries together, a particular data size, a [[Race Condition]] that needs real load. If the small case stops failing, the last thing removed was part of the cause, and that is itself the finding.

## See also
- [[Test Isolation]]
