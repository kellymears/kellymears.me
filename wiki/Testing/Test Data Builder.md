---
aliases:
  - Object Mother
  - Test factory
  - Test data factory
  - Factory Bot
tags:
  - testing
summary: Helpers that build valid test objects from sensible defaults so each test states only the fields it cares about, and the Object Mother pattern they grew out of.
---
A **test data builder** is a helper that constructs objects for tests from sensible defaults, letting each test override only the fields that matter to it. Instead of filling in all fifteen fields of a customer record, a test writes something like "a customer, but with an expired card," and the builder supplies a valid name, address, and everything else. Nat Pryce described the pattern, and Steve Freeman and Pryce popularized it in *Growing Object-Oriented Software, Guided by Tests* (2009).

The problem it solves is noise. Tests need objects, and real objects have many required fields. If each test constructs them inline, every test is mostly irrelevant setup, the one field that matters is hard to spot, and adding a required field breaks hundreds of tests at once. A builder centralizes the defaults, so the test reads as a statement of what is special about this case.

Its predecessor is the **Object Mother**, named at ThoughtWorks around 2001: a class with factory methods for standard test objects, such as a typical customer or an overdue invoice. Object Mothers tend to bloat into dozens of near-duplicate methods, one per variation, and tests become coupled to shared objects whose details are hidden. That is the *mystery guest* listed under [[Test Smell]], where the meaning of a test depends on data defined somewhere else. Builders keep the variation in the test, where a reader can see it.

Common practices:

- **Valid by default.** A builder with no overrides should produce an object that passes all validation, so tests fail only for the reason they intend.
- **Name the intent.** Methods like "withExpiredCard" or a trait named "admin" read better than raw field values, a small case of good [[Naming]].
- **Return new objects.** Each call builds a fresh instance, often immutable, so tests cannot leak changes into one another, which protects [[Test Isolation]].
- **Build relationships.** Factories can create the related records an object needs, such as an order's customer, for [[Integration Test]] setup against a real database.

Ruby's factory_bot, created at thoughtbot in 2008, popularized declarative factories with traits.

Builders often pull in random values from a fake-data generator to avoid identical names and emails. That helps uniqueness but can make failures unrepeatable and turn a test into a [[Flaky Test]] if a random value hits an edge case. Seeding the generator, or using [[Property-Based Testing]] when variety is the point, keeps failures reproducible. Edge cases worth testing deserve explicit values chosen by [[Boundary Value Analysis]], not luck.

Builders differ from a [[Test Fixture]], which is the whole prepared environment, and from [[Seed Data]], which loads a known dataset into a development or staging database.

## See also
- [[Test Fixture]]
- [[Test Smell]]
- [[Seed Data]]
- [[Unit Test]]
