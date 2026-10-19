---
aliases:
  - Reproducible builds
  - Hermetic build
  - Trusting trust
tags:
  - delivery
summary: A build that produces bit-for-bit identical output from the same source, so anyone can verify that a published binary really came from the code it claims to.
---
A build is **reproducible** if anyone who builds the same source code, with the same declared tools and dependencies, gets bit-for-bit identical output. That property lets independent parties verify that a binary distributed by a project actually came from its published source. If two builders produce the same [[Hash Function]] digest, nothing was slipped in along the way.

The underlying threat was laid out by Ken Thompson in his 1984 Turing Award lecture, "Reflections on Trusting Trust". He described a compiler modified to insert a backdoor into the login program, and to insert the same modification into any new compiler it compiled, so the backdoor survived even after the source code was cleaned. Reading source isn't enough if the build step can't be trusted. Real attacks followed the same logic. In the 2020 SolarWinds compromise, attackers modified the build system, so signed, legitimate-looking updates carried a backdoor that wasn't in the source repository. In 2024 a backdoor in the xz compression library was hidden partly in release tarballs that differed from the project's Git history. Reproducible builds make discrepancies like these detectable, which is why they are central to [[Supply Chain Security]].

Most builds are not reproducible by default, because many small things leak into the output:

- **Timestamps.** Compilers and archivers embed the build time. The `SOURCE_DATE_EPOCH` [[Environment Variable]], a standard from the Reproducible Builds project, tells tools to use a fixed date instead.
- **File order.** Directory listings come back in filesystem order, which varies between machines.
- **Paths and environment.** The build directory, username, locale, and time zone end up in debug info and generated files.
- **Randomness and parallelism.** Hash table iteration order, random identifiers, and parallel compilation can all vary between runs unless seeded or ordered (see [[Determinism]]).
- **Unpinned dependencies.** Fetching "the latest" version of anything changes the inputs. A [[Lockfile]] fixes them.

The Reproducible Builds project, which grew out of work in Debian starting around 2013, has pushed fixes into thousands of upstream tools, and most Debian packages now build reproducibly. Some build systems aim for *hermetic* builds, where every input is declared and nothing else is visible. Bazel sandboxes each action, and Nix and Guix build each package in isolation from inputs identified by hash, so the same inputs always produce the same result. Guix has gone further toward a fully bootstrapped system built from a tiny auditable seed.

Reproducibility pays off beyond security. Identical outputs can be [[Build Cache|cached]] and shared between machines, which speeds up [[Continuous Integration]] and large [[Monorepo]] builds. A build that can be recreated exactly makes old bugs debuggable. It also supports the "build once" rule of a [[Deployment Pipeline]] and the [[Provenance]] claims in a [[Software Bill of Materials]], and pairs naturally with [[Code Signing]] and [[Immutable Infrastructure]].

## See also
- [[Nightly Build]]
- [[Build Provenance]]
