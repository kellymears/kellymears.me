---
aliases:
  - Traceability matrix
  - Requirements traceability matrix
  - Bidirectional traceability
tags:
  - testing
summary: Keeping explicit links from each requirement to the design, code, and tests that satisfy it and back again, so that nothing required goes untested and nothing built goes unrequired, mandatory in safety-critical software.
---
**Requirements traceability** is the ability to follow each requirement through the work that satisfies it, from its origin, through design and code, to the tests that verify it, and back the other way. The classic artifact is a **traceability matrix**, a table with requirements down one side and the design elements, code modules, and test cases that cover each one across the other.

Traceability runs in both directions, and each direction answers a different question:

- **Forward.** Is every requirement implemented and tested? A requirement with no linked test is a gap; see [[Acceptance Testing]].
- **Backward.** Does every piece of code trace to a requirement? Code that traces to nothing is either undocumented intent or unrequested work, which costs effort and may hide unintended behavior; see [[Feature Creep]].

Orlena Gotel and Anthony Finkelstein distinguished in 1994 between tracing a requirement back to its source, such as the stakeholder or regulation that demanded it, and tracing it forward into the product. Their research found most traceability problems came from the first kind: teams lost track of why a requirement existed, and so couldn't tell whether it could change.

The main practical use is **impact analysis**. When a requirement changes, the links show which design decisions, code, and tests must change with it; see [[Test Impact Analysis]]. When a test fails, the links show which requirement is at risk.

Traceability is mandatory in safety-critical industries. Avionics software standards require it at each level, from system requirements down to object code, combined with demanding structural coverage; see [[Modified Condition Decision Coverage]]. Medical device and automotive standards do the same. Regulators use the trace to check that every hazard identified was addressed and verified; see [[Safety Case]] and [[Verification and Validation]].

The cost is maintenance. A hand-kept matrix in a spreadsheet goes stale the first time someone changes code without updating it, and a stale trace is worse than none because it's trusted. Teams reduce the burden by generating links from existing work: referencing ticket identifiers in commit messages, tagging tests with requirement IDs, and producing the matrix automatically; see [[Commit Message]]. Executable specifications collapse the distance further, since the requirement and its test are the same text; see [[Behavior-Driven Development]].

Lighter development methods tend to treat full traceability as overhead, preferring conversation and working software to documents; see [[Agile Software Development]]. Even there, a lightweight trace of why decisions were made pays off later; see [[Architecture Decision Record]]. Formal reviews often check the trace as one of their steps; see [[Software Inspection]].

A record of who changed what and when is a related but separate requirement in regulated work; see [[Audit Log]].

## See also
- [[Sinking of the Vasa]]
- [[Citicorp Center Engineering Crisis]]
- [[Apollo 13]]
