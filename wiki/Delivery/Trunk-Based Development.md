---
aliases:
  - Trunk based
tags:
  - delivery
summary: Everyone integrating into one shared branch continuously, with short-lived feature branches.
---
**Trunk-based development** is the practice of integrating all work into a single shared branch frequently — at most a day or two of divergence — rather than maintaining long-lived parallel branches. Feature branches exist but are short.

Its argument is about the cost of divergence. Merge difficulty grows superlinearly with how long two lines of work have been apart, and the difficult part is rarely textual: two branches can each be correct and combine into something broken, with no conflict anywhere. See [[Semantic Conflict]]. Short branches keep the integration problem small enough to be uninteresting.

Working this way requires the ability to merge unfinished work safely, which is what [[Feature Flag]]s provide: the code ships to the shared branch and stays inert until switched on. That is a real capability to build, and it is what makes "merge daily" compatible with "release when ready".

It also requires the shared branch to stay green, which makes [[Continuous Integration]] non-optional rather than a nicety, and puts weight on fast feedback. A branch that takes an hour to validate cannot be integrated several times a day.

The practice scales down well — it is close to what a single developer naturally does — and scales up only with genuine investment in flags, testing, and deployment automation.

## See also
- [[Branching Model]]
- [[Continuous Integration]]
- [[Feature Flag]]
- [[Merge Train]]
- [[Squash Merge]]

## Related
- [[Pull Request]]
- [[Three-Way Merge]]
- [[Documentation Rot]]
