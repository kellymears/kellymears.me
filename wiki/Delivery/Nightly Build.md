---
aliases:
  - Daily build
  - Nightly channel
tags:
  - delivery
summary: An automated build of the latest source code made every night, once a central discipline for catching integration problems and now mostly a release channel and a home for tests too slow to run on every change.
---
**A nightly build** is an automated build of a project's latest source code, produced every night. The practice comes from a time when building a large program took hours, so the natural time to do it was overnight, when nobody needed the machines. Developers arrived in the morning to find out whether the previous day's changes had broken anything.

In the 1990s the daily build was promoted as a core discipline for large teams. Microsoft was often cited as an example, and the software writer Steve McConnell described "daily build and smoke test" in a widely read 1996 article: build the whole product every day, then run a quick check that it basically works; see [[Smoke Test]]. A broken build was treated as an urgent problem, and in some teams whoever broke it had to fix it immediately or take on an unpopular chore.

The value came from frequent integration. Changes that compile alone can conflict when combined, and the longer work stays apart, the harder those conflicts are to untangle; see [[Semantic Conflict]]. A nightly build bounded that delay to a day.

Continuous integration pushed the idea further, building and testing on every change instead of once a day; see [[Continuous Integration]]. Faster machines and caching made that feasible; see [[Build Cache]] and [[Build System]]. Nightly builds remain useful for:

- **Slow tests** too long for every change, such as full regression suites, long fuzzing runs, or performance benchmarks; see [[Regression Testing]]. These suites can take hours, so running them once a night is a practical compromise.
- **Builds across many platforms**, which multiply cost; see [[Build Matrix]].
- **Testers and enthusiasts** who want the newest features.

That last use made nightly a release channel. Firefox Nightly is built twice a day from the main development branch, and its users act as early testers. Rust's nightly toolchain allows unstable language features that aren't yet available in stable releases. Chromium and many open source projects publish similar builds. These channels sit at the front of a pipeline that moves through beta toward stable releases; see [[Release Train]] and [[Software Release Life Cycle]].

Nightly users accept breakage in exchange for early access, and they find bugs that internal testing misses, especially on unusual hardware and configurations; see [[Dogfooding]]. Unfinished features are often included but hidden behind switches; see [[Feature Flag]].

For nightly builds to be useful for debugging, each one should be traceable to the exact source it was built from, and ideally rebuildable identically; see [[Reproducible Build]]. When a nightly breaks, comparing it with the previous night's narrows the search to one day of changes; see [[Git Bisect]].

## See also
- [[Release Candidate]]
- [[Deployment Pipeline]]
