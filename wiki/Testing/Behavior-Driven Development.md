---
aliases:
  - BDD
  - Given-When-Then
  - Gherkin
  - Acceptance test
  - Specification by example
tags:
  - testing
summary: Describing software behavior as concrete examples written in a shared, plain-language format, so developers, testers, and business people agree on what to build before it is built.
---
**Behavior-driven development (BDD)** is a way of specifying software through concrete examples of its behavior, written in language everyone involved can read. Dan North developed it in the mid-2000s while coaching teams in [[Test-Driven Development]]. He noticed that people struggled with where to start and what to test, and that the word "test" itself misled them. Calling tests *behaviors* and naming them as sentences, such as "should reject an expired card," turned out to make the purpose clearer.

The best-known feature is the **Given-When-Then** format:

- **Given** some starting context: a customer has a balance of $100.
- **When** an event occurs: they withdraw $30.
- **Then** an outcome follows: the balance is $70, and a receipt is issued.

The structure mirrors the arrange, act, assert pattern of a good [[Unit Test]], and it is useful even without any tooling. Written in the Gherkin syntax, scenarios can be executed by tools such as Cucumber (2008), which match each line to a "step definition" in code. The scenario becomes an automated *acceptance test* as well as a specification. The related idea of *specification by example* captures the core insight: abstract requirements hide disagreements, and concrete examples expose them. "Users can withdraw money" sounds settled until someone asks what happens when the balance is $20.

The conversations are the main benefit. BDD encourages a short session before work starts, often called "three amigos," in which a developer, a tester, and someone representing the business work through examples together. Edge cases and misunderstandings surface while they are cheap to fix. Writing in shared, [[Plain Language]] also counters the [[Curse of Knowledge]], since a scenario that only its author understands has failed at its job. Names matter as much here as anywhere (see [[Naming]]).

BDD has well-known failure modes:

- **Tooling without conversation.** Teams adopt Cucumber but write scenarios alone, after the code, in technical language nobody else reads. That keeps the cost and loses the benefit, a [[Cargo Cult]] version of the practice.
- **Step-definition sprawl.** Hundreds of slightly different steps map onto glue code that becomes its own maintenance burden.
- **Slow suites.** Scenarios often drive the full application through a browser, making them [[End-to-End Test]] suites with all the slowness and flakiness that implies, an inverted [[Test Pyramid]].

Used well, BDD keeps executable scenarios for the handful of behaviors that matter most to the business, and leaves detailed cases to faster unit and [[Integration Test]] levels.

## See also
- [[Test-Driven Development]]
- [[End-to-End Test]]
- [[Test Fixture]]
- [[Exploratory Testing]]
- [[Acceptance Testing]]
- [[Decision Table Testing]]
