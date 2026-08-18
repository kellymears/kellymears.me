---
aliases:
  - Integration testing
tags:
  - testing
summary: A test exercising several components together, through real interfaces rather than doubles.
---
An **integration test** exercises multiple parts of a system together — usually through their real interfaces, with real data structures and sometimes a real database or browser. It trades speed and precision for the thing unit tests structurally cannot provide: evidence that the pieces actually fit.

The case for weighting toward integration is that most defects live *between* components rather than inside them. A pair of components can each be perfectly tested and disagree about whose responsibility something is, and no unit test can see the gap. It also gives more freedom to refactor: the test is bound to observable behavior rather than internal structure.

The costs are real. Integration tests are slower, they fail for environmental reasons more often, and a failure points at a region rather than a line — so diagnosis takes longer.

The pragmatic position that most teams converge on: integration tests for anything crossing a boundary or depending on real environment behavior, unit tests for pure logic with many cases, and as few end-to-end tests as will do — those being the slowest and most fragile of all, but the only ones that can prove the whole thing works.

## See also
- [[Unit Test]]
- [[Component Story]]
- [[Headless Browser]]
- [[Test Fixture]]
- [[Test-Driven Development]]

## Related
- [[Visual Regression Testing]]
- [[Test Double]]
- [[Responsive Breakpoint]]
- [[Code Coverage]]
- [[Contract Testing]]
