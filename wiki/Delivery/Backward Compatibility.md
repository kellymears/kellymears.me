---
aliases:
  - Backwards compatibility
  - Breaking change
  - Breaking changes
  - Forward compatibility
  - Don't break userspace
tags:
  - delivery
summary: Keeping new versions working with old code, data, and clients, the extreme lengths platforms go to preserve it, and the accumulated cost of never being allowed to change.
---
**Backward compatibility** means a new version of a system still works with things built for older versions: old programs, old files, old clients, old configuration. A **breaking change** is one that does not. **Forward compatibility** is the reverse: an old version tolerating input produced by a newer one, typically by ignoring what it does not understand.

Compatibility is a promise to people you cannot see. Once software has users, other code depends on its behavior, often behavior nobody intended to promise. [[Hyrum's Law]] states that with enough users, every observable behavior will be depended on by somebody, so even bug fixes can break someone.

Some platforms treat compatibility as nearly sacred:

- **Windows.** Raymond Chen has described Windows 95 detecting the game SimCity, which used memory after freeing it, and running the memory allocator in a special mode so the game would not crash.
- **Linux.** Linus Torvalds' rule is "we do not break userspace": a kernel change that breaks a working program is a kernel bug, whatever the program did wrong.
- **The web.** Browsers cannot break existing sites. In 2018 a proposed JavaScript array method named `flatten` broke old sites using the MooTools library, so it was renamed `flat`, a controversy nicknamed SmooshGate. New features arrive gradually, filled in with a [[Polyfill]] for older browsers.

Techniques that make compatibility manageable:

- **Additive change.** Add new fields, endpoints, and options instead of changing existing ones. Old clients ignore what they do not know.
- **Tolerant readers.** Accept and ignore unknown fields, in the spirit of [[Postel's Law]]. Serialization formats such as Protocol Buffers, covered under [[Remote Procedure Call]], are designed around numbered fields for exactly this.
- **[[Expand and Contract]].** Introduce the new form alongside the old, migrate users, then remove the old. This is how [[Database Migration]] work avoids downtime, and how [[Zero-Downtime Deployment]] copes with old and new code running at once.
- **Versioning.** [[Semantic Versioning]] signals breaking changes with a major version, and APIs can run old and new versions side by side.
- **[[Deprecation]].** Announce removals well in advance, with warnings, so dependents have time to move.

Compatibility has real costs. Old behavior must be kept, tested, and reasoned about forever, and the accumulated cruft becomes [[Technical Debt]] that slows every change. Some projects make breaking changes on a regular schedule and support the old version for a while through a [[Long-Term Support]] line. Python's move from version 2 to 3 broke once and took over a decade.

The right balance depends on who pays. A library with a few users can break freely; an operating system or a web standard cannot. Large rewrites often avoid breaking anything at once by using the [[Strangler Fig Pattern]], replacing a system piece by piece behind a stable interface.

## See also
- [[Universal Serial Bus]]
- [[Calendar Versioning]]
- [[PCI Express]]
