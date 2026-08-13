---
aliases:
  - Build tool
tags:
  - web
summary: The tool that resolves an application's modules into the files a browser downloads.
---
A **bundler** takes an application's entry points, follows every import to build a [[Module Graph]], applies transforms, and emits the files a browser will actually load. It is where module resolution, transpilation, [[Tree Shaking]], [[Code Splitting]], asset handling, and minification all happen.

Bundlers are worth understanding because their behaviour is *observable in production but invisible in source*. Two bundlers given the same source can differ in ways that matter:

- **Import ordering.** One may sort a module namespace's keys alphabetically; another preserves source order. Anything downstream that depends on order — a registry, a hash over a list — then differs by build tool rather than by code.
- **Loader support.** A syntax for importing a file as raw text may exist in one and not another, so a working import becomes an unknown-module error when the build tool changes.
- **Chunk grouping.** How aggressively client references are merged into shared chunks decides what a page really downloads.

They also complicate development in a specific way: a development server keeps a cache and reloads when its dependency scan finds something new mid-run. That reload aborts in-flight work, which surfaces as a random test file failing on a slow machine and never reproducing on a fast one. See [[Flaky Test]] and [[Race Condition]].

## See also
- [[Module Graph]]
- [[Code Splitting]]
- [[Determinism]]
- [[Package Manager]]

## Related
- [[Reproducible Case]]
- [[Ground Truth]]
