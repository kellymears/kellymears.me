---
aliases:
  - Code rot
  - Software entropy
  - Dependency rot
tags:
  - delivery
summary: The way software that nobody changes still stops working over time, because the operating systems, libraries, services and assumptions around it keep moving, and the gradual decay of code quality that comes from changing it without care.
---
**Software rot** is the gradual decay of working software. Code doesn't wear out the way a machine part does, since the same bytes run the same way forever. Yet programs left untouched for a few years routinely fail to build, fail to run, or quietly produce wrong results. The code stayed still and everything around it moved.

Two different processes share the name. The first is **environmental rot**, sometimes called dormant rot. Software depends on an operating system, libraries, compilers, network services, file formats and certificates, and each of these changes on its own schedule. A library drops a function; a web API is retired; a security certificate expires; a language version stops being supported; see [[Dependency Hell]]. A project that pinned exact versions may still build, but only against old components with known vulnerabilities; see [[Lockfile]]. Some rot comes from time itself, such as programs that assumed two-digit years; see [[Y2K]].

The second is **active rot**: decay that comes from changing code without care. Each quick fix that ignores the design adds a little inconsistency. Over years the structure erodes until changes become slow and risky; see [[Technical Debt]]. Meir Lehman's studies of long-lived systems described this as a law, that a program's complexity increases as it evolves unless work is done to reduce it; see [[Lehman's Laws of Software Evolution]]. The book The Pragmatic Programmer popularized the term **software entropy** and tied it to the broken windows idea: one visible sign of neglect invites more; see [[Broken Windows Theory]].

Rot is distinct from resource exhaustion in a long-running process, where a program degrades over hours because memory leaks or counters creep; see [[Software Aging]]. Rot is measured in months and years, across rebuilds.

Defenses against environmental rot are mostly about exercising the code. A project that's built and tested regularly, even when nothing has changed, discovers breakage as soon as it happens, while the cause is small; see [[Continuous Integration]]. Builds that record exactly what went into them can be reconstructed later; see [[Reproducible Build]]. Fewer dependencies means fewer things that can move.

Defenses against active rot are continuous small improvements rather than occasional rescues; see [[Refactoring]]. When a codebase has rotted badly, teams are tempted to start over, which often goes worse than expected; see [[Big Rewrite]].

The same decay affects things around code. Documentation drifts from what the program does, and links in it break; see [[Documentation Rot]]. For software that must survive decades, preservation becomes its own discipline; see [[Digital Preservation]]. Emulators and archived toolchains can keep old software running long after its original platform is gone.

## See also
- [[Software Heritage]]
- [[Engineering Ladder]]
