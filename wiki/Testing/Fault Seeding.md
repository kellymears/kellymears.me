---
aliases:
  - Error seeding
  - Defect seeding
  - Capture-recapture
tags:
  - testing
summary: Planting known bugs in a program before testing and using the fraction found to estimate how many real bugs remain, borrowing the mark-and-recapture method ecologists use to count fish in a lake.
---
**Fault seeding** is the practice of deliberately planting known defects in software before it's tested or reviewed, then using how many of them were found to estimate how many real defects remain. Harlan Mills proposed it at IBM in the early 1970s, borrowing the logic of ecology.

Ecologists estimate the number of fish in a lake by catching some, marking them, and releasing them. Later they catch another batch and count how many carry marks. If 20 percent of the second catch is marked, the marked fish are presumed to be 20 percent of the whole population.

Seeding applies the same reasoning to bugs. Suppose 20 faults are seeded and testing turns up 15 of them, along with 30 real ones. Testing found three-quarters of the seeded faults, so it's assumed to have found about three-quarters of the real ones too, which puts the real total near 40 and leaves about 10 still hidden. The estimate comes with wide error bars when the numbers are small; see [[Confidence Interval]] and [[Fermi Estimation]].

The whole method rests on one assumption: that seeded faults are as hard to find as real ones. They rarely are. Planted bugs tend to be simple and local, written by someone who knows where they are, while real defects hide in misunderstood requirements, missing code, and interactions between components. If seeded faults are easier, the estimate is too optimistic; see [[Selection Bias]]. Testers who know seeding is happening may also hunt for planted bugs rather than real ones; see [[Goodhart's Law]].

A related method needs no planting. If two inspectors review the same document independently, the overlap between their findings estimates the total, just as two separate catches of fish would. A large overlap suggests few defects remain unfound; a small one suggests many. Researchers applied this capture-recapture approach to inspections in the 1990s; see [[Software Inspection]].

Seeding's most successful descendant inverts its purpose. Instead of estimating remaining bugs, [[Mutation Testing]] plants thousands of small automated faults to measure how good the test suite is: a test suite that lets mutants survive has blind spots. Line coverage says whether code ran; seeded faults say whether a test would notice it being wrong; see [[Code Coverage]] and [[Test Oracle]].

The idea appears well beyond software. Security teams send simulated phishing emails and airport screeners are tested with planted contraband to measure detection rates; see [[Penetration Testing]]. Mapmakers have long added fictitious streets to catch copying. Injecting faults into a running system to check that monitoring catches them is the operational cousin; see [[Chaos Engineering]] and [[Synthetic Monitoring]].

Seeding also explains a common worry. A bug bash that finds nothing doesn't prove quality if no one knows whether the testers could find a planted bug; see [[Exploratory Testing]].

## See also
- [[Pesticide Paradox]]
- [[Galaxy Note 7 Recall]]
- [[Phishing]]
