---
aliases:
  - Unit tests
tags:
  - testing
summary: A fast, isolated test of one unit of behaviour with its collaborators replaced.
---
A **unit test** exercises a small piece of behaviour in isolation, with anything slow or external replaced by a [[Test Double]]. Its virtues are speed and precision: thousands run in seconds, and a failure names a narrow location.

The perennial argument is about what counts as a unit. Taken as "one function", the result is a suite bound to internal structure, which breaks on every refactor and prevents the change it was supposed to protect. Taken as "one behaviour, at whatever boundary is stable", the suite survives implementation changes and stays useful. The second reading is the one that ages well.

Unit tests are best suited to pure logic: reducers, adapters, parsers, calculations, anything whose inputs and outputs are values. They are poorly suited to anything whose correctness depends on a real environment — layout, focus, styling, browser behaviour — where the double diverges from reality and the test passes while the product is broken.

There is also an environmental cost worth knowing about. A unit test that imports a user-interface module drags that module into the unit environment, which can distort coverage measurement for files nobody touched. Importing a value from the package that owns it, rather than through a component barrel, avoids the whole class of problem. See [[Code Coverage]] and [[Tree Shaking]].

## See also
- [[Integration Test]]
- [[Test Double]]
- [[Test-Driven Development]]
- [[Component Story]]

## Related
- [[Test Fixture]]
- [[Regression]]
- [[Module Graph]]
