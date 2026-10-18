---
aliases:
  - Sociable test
  - Solitary test
  - London school
  - Chicago school
  - Mockist testing
  - Classicist testing
tags:
  - testing
summary: The long-running split over whether a unit test should replace every collaborator with a double or let real objects work together, and what each choice costs.
---
**Solitary and sociable tests** name the two answers to one question about the [[Unit Test]]: when the code under test calls other code, should the test use the real thing or a stand-in? Jay Fields coined the terms; Martin Fowler popularized them. The split is also known by two schools.

- **Solitary tests**, favored by the *London school* or *mockists*, isolate the unit completely. Every collaborator is replaced with a [[Test Double]], usually a mock, and the test checks that the unit sent the right messages to them. The style grew from London's extreme programming community in the early 2000s and the book *Growing Object-Oriented Software, Guided by Tests*.
- **Sociable tests**, favored by the *Chicago* or *Detroit school*, also called *classicists*, let the unit use its real collaborators and check the resulting state. Doubles appear only for things that are slow, nondeterministic, or outside the process: the network, the clock, a payment provider. This is the style of Kent Beck's original [[Test-Driven Development]].

Each buys something and pays for it.

Solitary tests pinpoint failures, since only one unit is ever real, and they stay fast regardless of how deep the dependency graph goes. They also drive design from the outside in: writing the mock first means deciding what a collaborator's interface should be before it exists. But they couple tests to implementation. A test that asserts "the service called `repository.save` once" breaks when the code is refactored to batch saves, even though the behavior is unchanged. Heavy mocking is a recognized [[Test Smell]], and a suite of mocks can pass while the real pieces don't fit together, because each mock encodes an assumption nobody verified. [[Contract Testing]] exists partly to check those assumptions.

Sociable tests survive refactoring, because they check outcomes rather than calls, and they exercise real interactions, so wiring mistakes surface. They catch more with less test code. The costs: one broken class can fail dozens of tests at once, making the cause harder to find, and setup grows as real objects need real dependencies, which [[Test Data Builder|builders]] and [[Test Fixture|fixtures]] manage.

In practice most teams blend them. A common rule is to mock across architectural boundaries you own the interface to, and use real objects inside them; another is to never mock types you don't own. The [[Humble Object]] pattern reduces the question by pushing logic into code that needs no doubles at all, and [[Pure Function|pure functions]] need none by definition.

The debate also shapes what "unit" means. To a mockist it is a class; to a classicist it is a behavior, which may span several classes. Much disagreement about the [[Test Pyramid]] and the line between unit and [[Integration Test|integration tests]] comes down to this choice.

## See also
- [[Dependency Injection]]
- [[Humble Object]]
- [[Mutation Testing]]
- [[Characterization Test]]
