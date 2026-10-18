---
aliases:
  - Black-box testing
  - White-box testing
  - Gray-box testing
  - Glass-box testing
tags:
  - testing
summary: The two basic stances a tester can take toward a system, judging it only by its inputs and outputs or designing tests from knowledge of its code, and the gray-box mix most real testing uses.
---
**Black-box testing** treats a system as opaque. The tester knows what it should do, from a specification, documentation, or user expectations, and checks inputs against outputs without looking at how the code works. **White-box testing**, also called glass-box or clear-box testing, designs tests from the code itself: its branches, loops, data flows, and error paths.

The distinction is about where test ideas come from, not about which tools are used. A unit test can be black-box if it checks a function only against its documented contract, and an end-to-end test can be white-box if it was written to drive a particular code path.

**Black-box techniques** work from the specification:

- **Equivalence partitioning and boundary values.** Split inputs into classes that should behave alike, then test the edges between them; see [[Boundary Value Analysis]].
- **Decision tables.** Enumerate combinations of conditions and their expected outcomes; see [[Decision Table Testing]].
- **State transitions.** Model the system as states and events and test the paths; see [[Model-Based Testing]].
- **Combinations.** Cover every pair of parameter values rather than every combination.
- **Exploration.** Learn the system while testing it, guided by risk and curiosity; see [[Exploratory Testing]].

**White-box techniques** work from the structure:

- **Coverage criteria.** Make sure every statement, branch, or condition outcome is exercised; see [[Code Coverage]], [[Branch Coverage]], and [[Modified Condition Decision Coverage]].
- **Path analysis.** The number of independent paths through a function bounds the tests needed to exercise them.
- **Analysis tools.** Explore paths automatically by solving the conditions that lead to them; see [[Symbolic Execution]] and [[Static Analysis]].

Each stance has characteristic blind spots. Black-box tests can't tell which parts of the code they never reached, so a branch that only runs on a leap day may go untested. White-box tests can't find missing features: if the code never handles a case the specification requires, there's no branch to cover. White-box tests also tend to share the author's assumptions, since they're written by reading the very code they check.

**Gray-box testing** combines them, and describes most practical testing. A tester who knows the database schema, the caching layer, or which service a request touches can design black-box tests that target likely weak points. Coverage-guided fuzzing is a gray-box technique: it generates inputs blindly but uses code coverage to decide which ones are worth mutating; see [[Fuzzing]].

The distinction also maps onto independence. Separate testing teams and users in acceptance testing see the system as a black box and bring different expectations, catching misunderstandings that developers can't; see [[Acceptance Testing]] and [[Verification and Validation]]. Security testing comes in both forms, from external attacks on a running system to source code review; see [[Penetration Testing]].

## See also
- [[Test Oracle]]
- [[Risk-Based Testing]]
