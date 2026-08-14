---
aliases:
  - Permissive open source license
  - MIT-style license
tags:
  - delivery
summary: A licence family that imposes little beyond attribution and a warranty disclaimer.
---
**Permissive license** describes a family of open licences — MIT, BSD, Apache 2.0, ISC — that impose almost no conditions beyond preserving a copyright notice and disclaiming warranty. Anyone can use, modify, redistribute, and relicense the work, including folding it into proprietary software that ships no source at all. Apache 2.0 asks for a little more: propagate any NOTICE file, mark changed files, and accept an express patent grant that terminates for anyone bringing a patent suit over the software. Those patent provisions, rather than any general tightening, are why corporate legal review tends to prefer it to MIT.

That looseness is why permissive terms dominate library ecosystems distributed through a [[Package Manager]]: a company embedding a dependency in a commercial product need not worry about triggering a [[Copyleft]] obligation, so permissive packages are adopted faster and more widely. The cost falls on the maintainer, not the user — nothing obliges anyone who profits to contribute improvements back or preserve visible [[Provenance]] once code is folded into something proprietary.

That asymmetry also drives relicensing, which is open only to a maintainer who wrote everything or holds rights to every contribution through a contributor licence agreement or copyright assignment; otherwise the old terms bind the parts someone else wrote. Where the condition is met the change runs forward only, leaving published versions under terms now formally [[Deprecation|deprecated]], and it is often bundled with a major [[Semantic Versioning]] bump so the boundary is unambiguous in [[Version Control]] history.

Recent years have produced source-available licences that publish code without meeting the Open Source Definition, by two unrelated mechanisms. The Business Source License prohibits production use by default, relaxed by an optional Additional Use Grant the licensor writes, and converts automatically to a GPL-compatible open source licence at a Change Date no more than four years out. The Server Side Public License restricts no field of use at all; it is copyleft taken to an extreme, its §13 requiring anyone who offers the software as a service to release source for the whole service stack. OSI objected under OSD 6 and OSD 9, "License Must Not Restrict Other Software", and never formally ruled — MongoDB withdrew the submission in 2019. Either way, auditing terms belongs in [[Code Review]] and [[Supply Chain Security]] rather than being assumed from visibility alone.

## See also
- [[Copyleft]]
- [[Supply Chain Security]]
- [[Package Manager]]
- [[Semantic Versioning]]
