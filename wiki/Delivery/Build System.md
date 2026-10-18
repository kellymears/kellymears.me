---
aliases:
  - Make
  - Makefile
  - Bazel
  - Build graph
tags:
  - delivery
summary: The tool that turns source files into programs by working out what depends on what and rebuilding only what changed, from Make in 1976 to the hermetic, cached systems large codebases rely on.
---
A **build system** turns source code into something that runs: compiled binaries, bundled scripts, container images, generated documentation. Its core job is bookkeeping. It knows which outputs depend on which inputs, runs the steps in a valid order, and, most importantly, rebuilds only what a change actually affects.

Stuart Feldman wrote **Make** at Bell Labs in 1976, reportedly after a colleague wasted a morning debugging a program that hadn't been recompiled after a fix. A Makefile lists targets, the files each depends on, and the command that produces it. Make compares file timestamps: if any input is newer than its output, the output is stale and the command runs again. Make is still everywhere, nearly fifty years later; see [[Lindy Effect]].

Underneath every build system is a **build graph**, a directed acyclic graph of files and steps. Ordering the work is a [[Topological Sort]] of that graph; steps that don't depend on each other can run in parallel across all available cores. A cycle in the graph is an error, since nothing could be built first; see [[Module Graph]] for the same structure inside JavaScript bundlers.

Getting the graph right is the hard part. If a step reads a file the build system doesn't know about, editing that file won't trigger a rebuild, and the output silently goes stale. Developers learn to distrust their builds and run "make clean" to start from scratch, throwing away the time savings. Timestamps are another weak point: switching branches or restoring files can change them without changing contents. Peter Miller's 1997 paper "Recursive Make Considered Harmful" showed that splitting a project into separately built directories hides dependencies between them.

Modern systems tighten this up:

- **Content hashing.** Deciding staleness from a [[Hash Function]] of the inputs rather than timestamps.
- **Hermeticity.** Running each step in a sandbox that can see only its declared inputs, so undeclared dependencies fail loudly; see [[Reproducible Build]].
- **Remote caching.** Since a step's output is determined by its inputs, a result computed on one machine can be reused on any other; see [[Build Cache]] and [[Memoization]].

Bazel, released by Google in 2015 from its internal tool Blaze, and similar systems take this approach. They suit very large codebases where a full rebuild takes hours; see [[Monorepo]]. Their cost is strictness: every dependency must be declared, which many teams find burdensome.

Language ecosystems often bundle their own build tools with dependency resolution, such as Cargo for Rust or Gradle for Java; see [[Package Manager]] and [[Lockfile]]. Build steps feed a [[Deployment Pipeline]] in [[Continuous Integration]], where build speed directly sets how quickly a team learns whether a change works. The final products are stored as versioned outputs; see [[Artifact Repository]].

## See also
- [[Compiler]]
- [[Linker]]
