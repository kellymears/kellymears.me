---
aliases:
  - Inversion of control
  - IoC
  - DI container
  - Constructor injection
tags:
  - testing
summary: Passing a component the things it depends on instead of letting it build them itself, which decouples code and makes it easy to substitute fakes in tests.
---
**Dependency injection** means giving a component the objects it depends on from outside, instead of having it create or look them up itself. A class that sends email takes a mail client as a constructor argument, rather than constructing one internally. The idea sounds trivial but has large effects on testability.

Compare two versions of an order service. In the first, the service creates its own database connection and payment gateway inside its methods. To test it, you need a real database and a real payment provider, or you must reach in and patch internals. In the second, the service receives a database and a payment gateway as arguments. A test can pass in a [[Test Double]], such as an in-memory database and a fake gateway that records charges, and check the service's logic in milliseconds with no network.

The broader principle is **inversion of control**: instead of a component controlling how its collaborators are created, something outside decides and supplies them. Martin Fowler named dependency injection in 2004 to describe the specific technique that frameworks of the time were using. Common forms include:

- **Constructor injection.** Dependencies are passed when the object is created. This is the most common and makes required dependencies explicit.
- **Parameter injection.** Dependencies are passed to the specific function that needs them.
- **Setter injection.** Dependencies are set after creation, flexible but easy to forget.

In large applications, wiring everything by hand can become tedious, and **DI containers** automate it: you register what implements each interface, and the container builds the object graph. Many developers prefer plain manual wiring in a single place at startup, sometimes called the composition root, because containers can make it hard to see what depends on what.

The benefits come from decoupling:

- **Testability.** Fakes replace slow or nondeterministic dependencies, such as networks, clocks, and randomness. A [[Fake Clock]] is injected time. This supports [[Test Isolation]] and fast [[Unit Test]] suites.
- **Flexibility.** Swapping a storage backend or a payment provider means changing the wiring, not the code that uses it.
- **Explicit dependencies.** A constructor's parameters list everything a component needs, making hidden coupling visible.

It has costs. Over-injected code passes many tiny interfaces around and becomes hard to follow. Heavy mocking can test the wiring instead of behavior, a [[Test Smell]] discussed under [[Solitary and Sociable Tests]]. The [[Humble Object]] pattern and functional core, imperative shell offer an alternative: move logic into [[Pure Function]] code that needs no injection, and keep side effects in a thin outer layer.

Dependency injection is also a [[Seam]], in Michael Feathers's sense: a place where behavior can be changed without editing the code, which is how legacy code gets brought under test with a [[Characterization Test]].

## See also
- [[Test-Driven Development]]
- [[Leaky Abstraction]]
- [[Environment Variable]]
- [[Refactoring]]
