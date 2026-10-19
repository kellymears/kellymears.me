---
aliases:
  - CI matrix
  - Matrix build
  - Test matrix
tags:
  - delivery
summary: Running the same build and tests across every combination of operating system, language version, and configuration a project supports, and the cost of letting those combinations multiply.
---
A **build matrix** runs the same [[Continuous Integration]] job across several combinations of environment: operating systems, language or runtime versions, database versions, compiler flags, or dependency sets. A library that supports three operating systems and four language versions has twelve cells in its matrix, and each one is a separate build.

Most CI systems describe this declaratively. Instead of writing twelve jobs, a project lists the values for each axis, and the system expands them into every combination. Typical features let a project:

- **Include** extra combinations that the cross product misses, such as one special configuration on one platform.
- **Exclude** combinations that make no sense or aren't supported.
- **Allow failure** for experimental cells, such as an upcoming language version, so they report without blocking.
- **Fail fast**, cancelling the rest of the matrix as soon as one cell fails, saving time at the cost of less information.

The matrix exists because code that works in one environment can fail in another. Path separators differ across operating systems, newer language versions deprecate behavior, older ones lack features, and a minimum supported dependency version may not have the function the code just started calling. The matrix turns "we support these versions" from a claim into something checked on every change; see [[Backward Compatibility]].

The problem is that matrices grow multiplicatively. Adding one axis with three values triples the number of builds. Four axes with four values each make 256 cells, a [[Combinatorial explosion]] that burns CI minutes, slows feedback, and multiplies the chances of hitting a [[Flaky Test]]. Teams manage the growth in several ways:

- **Test the edges.** Run the oldest and newest supported versions and skip the middle, betting that failures cluster at the ends; see [[Boundary Value Analysis]].
- **Cover pairs, not every combination.** Most failures involve one or two factors, so a set of cells that covers every pair of values catches most problems with far fewer builds; see [[Pairwise Testing]].
- **Split by frequency.** Run a small core matrix on every [[Pull Request]] and the full matrix nightly or before release.
- **Run in parallel.** Cells are independent, so they spread across machines; see [[Test Parallelization]].
- **Cache.** Shared dependency and build caches keep each cell from starting cold; see [[Build Cache]].

A matrix also documents support. Its axes are the project's real compatibility promise, and dropping an old version from the matrix is effectively a decision to stop supporting it; see [[Long-Term Support]] and [[Semantic Versioning]].

Browser testing faces the same problem across browsers, versions, and devices, and is often handled with the same mix of edge coverage and pairwise selection.

## See also
- [[Version Manager]]
- [[Cross-Compilation]]
- [[Dependency Hell]]
- [[Nightly Build]]
