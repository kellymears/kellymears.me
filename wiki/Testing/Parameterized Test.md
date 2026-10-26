---
aliases:
  - Parametrized test
  - Table-driven test
  - Table-driven tests
  - Data-driven test
tags:
  - testing
summary: Running one test body against a table of inputs and expected outputs, so each case is a single readable row and each failure is reported on its own.
---
A **parameterized test** runs the same test logic against many sets of inputs and expected outputs. Instead of writing ten nearly identical tests for a date parser, you write one test body and a table of ten rows, each with an input string and the date it should produce. The test framework runs the body once per row and reports each case separately.

Most frameworks support it directly. JUnit 5 has parameterized tests fed from value lists, CSV, or methods. pytest has a parametrize decorator, and Jest and Vitest offer each-style tables. In Go, **table-driven tests** are the community idiom: a slice of anonymous structs holding name, input, and expected output, looped over with a subtest per entry.

The benefits come from separating cases from logic:

- **Readability.** Each case is one row, so the whole behavior of a function is visible as a table, close to how a specification would state it. Cases chosen with Boundary Value Analysis, such as zero, one, the maximum, and one past it, sit side by side.
- **Cheap additions.** A new case, such as a bug report reproduced, is one more row, which makes [[Regression Testing]] habits easy to keep.
- **Separate reporting.** A good framework names each case, so a failure says which row broke instead of halting at the first failing assertion inside a loop. Hand-written loops over cases lose this, which is one reason to use the framework's feature.

Naming matters. Rows with descriptive names, such as "leap day in a non-leap year," turn the test report into documentation. Rows identified only by index make failures hard to interpret.

The pattern has limits, and stretching it produces a test smell:

- **Conditional logic in the body.** If the test body branches on which case it is running, with flags like "expect error" toggling different assertions, the cases are really different tests sharing a name.
- **Wide tables.** Rows with eight columns, half of them irrelevant to each case, hide what each case is about. A [[Test Data Builder]] or separate tests often read better.
- **Computed expectations.** Expected values derived by the same logic as the code under test check nothing.

Parameterized tests sit on a spectrum. At one end is a single example, an ordinary [[Unit Test]]. In the middle is a hand-picked table. At the other end, [[Property-Based Testing]] generates hundreds of inputs and checks a general rule rather than specific outputs. Pairwise Testing picks rows systematically when inputs combine, and [[Golden File Testing]] suits cases whose expected output is too large for a table cell.

[[Mutation Testing]] can confirm the table is strong enough to notice small changes in the code.

## See also
- [[Property-Based Testing]]
- [[Unit Test]]
- [[Assertion]]
