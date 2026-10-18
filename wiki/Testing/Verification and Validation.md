---
aliases:
  - V&V
  - Verification
  - Validation
  - V-Model
tags:
  - testing
summary: The distinction between checking that software meets its specification and checking that the specification meets the real need, often put as building the product right versus building the right product.
---
**Verification and validation** are two different questions about a system, often run together under the label V&V. Software engineer Barry Boehm summarized the difference in 1979:

- **Verification:** are we building the product right? Does the system meet its specification?
- **Validation:** are we building the right product? Does the specification, and the system built from it, meet the actual need?

A system can pass one and fail the other. Software that perfectly implements a misunderstood requirement is verified but not valid. A prototype that delights users but crashes on edge cases is roughly valid but not verified.

Verification checks the system against something written down: a specification, a design, a contract, or a set of expected outputs. Most testing is verification:

- **Tests.** A [[Unit Test]] or integration test compares behavior to expected results, which requires a [[Test Oracle]] to say what's correct.
- **Types and contracts.** A [[Type System]] and [[Design by Contract]] verify properties automatically.
- **Proof.** [[Formal Verification]] proves a system meets a formal specification for all inputs.
- **Review.** Inspections and [[Code Review]] check work against standards and design.

Validation checks the system against reality: the users, their goals, and the environment. It's harder to automate, because the reference is in people's heads:

- **Acceptance.** [[Acceptance Testing]] with real stakeholders checks that the system solves their problem.
- **Use.** [[Usability Testing]] and [[Dogfooding]] reveal whether people can and will actually use it.
- **Exploration.** Exploratory testing finds behavior nobody thought to specify.
- **Early feedback.** Prototypes and [[Behavior-Driven Development]] conversations validate requirements before much is built.

The **V-Model**, a development model from the 1980s and 1990s, pairs each design stage on the left side of a V with a testing stage on the right: unit tests verify detailed design, integration tests verify architecture, system tests verify requirements, and acceptance tests validate against user needs. Iterative methods replaced its rigid sequence, but the pairing remains a useful map of what each kind of test is checking.

The distinction matters because teams tend to over-invest in verification. It is measurable: test counts and [[Code Coverage]] rise steadily, and green builds feel like progress. Validation is uncertain and often uncomfortable, since it may reveal that weeks of correct work solved the wrong problem. Treating test metrics as the goal is [[Goodhart's Law]] in action. A suite that verifies the wrong specification gives perfect confidence in the wrong thing.

High-stakes fields formalize V&V. Aerospace, medical devices, and nuclear systems require independent verification and validation by teams separate from the developers, because builders share the same blind spots as their specification. In software generally, bringing users in early, a validation version of [[Shift-Left Testing]], catches the most expensive mistakes: the ones in the requirements themselves.

## See also
- [[Pentium FDIV Bug]]
- [[Post Office Horizon Scandal]]
