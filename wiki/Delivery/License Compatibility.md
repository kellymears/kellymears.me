---
aliases:
  - GPL compatibility
  - License incompatibility
tags:
  - delivery
summary: Whether code under two different licenses can legally be combined into one distributed work, a one-way relation that lets permissive code flow into copyleft projects but not the reverse, and that has kept some major codebases permanently apart.
---
**License compatibility** is the question of whether code under different licenses can be combined in one program and distributed. Two licenses are compatible if someone can obey both at once in the combined work. If one license requires something the other forbids, the code can't legally ship together.

Compatibility is usually one-way. A short permissive license like MIT asks only for attribution, so MIT code can be folded into a project under the GNU General Public License: the combined work is distributed under the GPL, and the MIT notice is kept; see [[Permissive License]]. The reverse doesn't work. GPL code can't go into an MIT-licensed or proprietary product, because the GPL requires the whole combined work to be offered under the GPL's terms; see [[Copyleft]]. So code tends to flow from permissive projects into copyleft ones and not back.

Two copyleft licenses are often incompatible with each other, since each insists the whole be under its own terms. Versions matter as well. The Apache License 2.0 includes patent termination terms that the Free Software Foundation considers additional restrictions under GPL version 2, so Apache code can be combined with GPLv3 code but not with code licensed GPLv2 only. The Linux kernel is GPLv2 only, which keeps it from absorbing GPLv3 code. The ZFS file system, released under Sun's CDDL, has never been merged into the Linux kernel because most lawyers who have looked believe the two licenses conflict; see [[Free Software]].

That kind of deadlock is hard to fix after the fact. Relicensing a project requires permission from every copyright holder, which for a long-running open project can mean thousands of contributors, some unreachable. Projects that relicensed successfully have spent years tracking down contributors and rewriting code from those they couldn't find. That's one reason some projects require contributors to sign agreements granting relicensing rights, while others prefer a lighter certification; see [[Developer Certificate of Origin]].

Several practices make compatibility easier. **Dual licensing**, offering code under two licenses at the recipient's choice, is common: much of the Rust ecosystem uses "MIT or Apache 2.0" for broad compatibility. Standard short identifiers from the **SPDX** project let tools read license declarations reliably and detect conflicting combinations automatically; see [[Software Bill of Materials]] and [[Supply Chain Security]]. And the Open Source Initiative discourages new licenses that duplicate existing ones, since each new license multiplies the pairs to analyze; see [[Open Source Definition]].

Compatibility questions surface most through dependencies. A single copyleft package pulled in deep in a dependency tree can change what a company may distribute, which is why license scanning has become part of release checks; see [[Package Manager]], [[Dependency Hell]] and [[Vendoring]].

## See also
- [[Software Fork]]
- [[Lockfile]]
- [[Open Source Foundation]]
- [[Clean Room Design]]
- [[Software Patent]]
