---
aliases:
  - Remote cache
  - Incremental build
  - Build caching
tags:
  - delivery
summary: Reusing the outputs of build and test steps whose inputs haven't changed, keyed by a hash of those inputs, so large codebases build in minutes instead of hours.
---
A **build cache** stores the outputs of build steps, such as compiled files, bundles, and test results, so they can be reused instead of recomputed. Before running a step, the build system computes a key from everything that step depends on: the source files, the compiler version, flags, environment, and the outputs of earlier steps. If the cache already has an entry for that key, the stored output is used, and the step is skipped.

The key is usually a [[Hash Function]] of all the inputs, so identical inputs always produce the same key and any change produces a different one. This is content addressing, the same idea behind a Merkle Tree: steps are identified by what goes into them, not by file timestamps or names.

Caching comes in layers:

- **Incremental builds.** The oldest form. `make`, introduced in 1976, compares file modification times and rebuilds only targets older than their inputs. Timestamps are fragile, though: switching branches, restoring files, or clock differences can trigger needless rebuilds or, worse, skip needed ones.
- **Local content caches.** Modern tools hash inputs instead, so returning to a previous state reuses earlier outputs instantly.
- **Remote caches.** Shared across a whole team and its [[Continuous Integration]] machines. When one machine builds something, every other machine with the same inputs downloads the result instead of rebuilding. In a large [[Monorepo]] it can cut most of the build time.

The whole scheme depends on correctness. If a step's output depends on something not included in its key, such as an undeclared file, an [[Environment Variable]], the current time, or the network, the cache can return a stale result that doesn't match what a fresh build would produce. Build systems that run each step in a sandbox with only declared inputs visible avoid them, and this is the same discipline a Reproducible Build requires. Steps that aren't reproducible also defeat caching, since their output differs on every run. See [[Determinism]].

Dependency graphs decide what to rebuild after a change. Only the changed steps and everything downstream of them need to run, found by walking the same structure a topological sort orders, and test results can be cached the same way, which overlaps with [[Test Impact Analysis]]. Cache invalidation is famously hard in general (see [[Cache Invalidation]]), but content-keyed build caches sidestep most of it: entries never need to be invalidated, because a change produces a new key rather than updating an old entry.

A cache shared across machines is also a trust boundary. Anyone who can write to it can inject outputs that every other machine will use, so remote caches need access controls, and they belong in any review of [[Supply Chain Security]].

## See also
- [[Git LFS]]
- [[File Watching]]
- [[Shallow Clone]]
