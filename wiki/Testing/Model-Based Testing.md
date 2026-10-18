---
aliases:
  - Model based testing
  - State machine testing
  - State transition testing
  - Stateful property testing
tags:
  - testing
summary: Writing a simplified model of how a system should behave, usually as a state machine, and generating test sequences from it, so the model serves as both test generator and oracle.
---
**Model-based testing** generates tests from a model of how a system should behave, instead of writing each test by hand. The model is a simplified description, most often a [[Finite State Machine]] listing the states a system can be in, the actions available in each, and the expected result of each action. A tool walks the model to produce sequences of actions, runs them against the real system, and compares what happens with what the model predicts.

The model does two jobs at once. It generates inputs, sequences that a human tester might never think to try, and it acts as the [[Test Oracle]], saying what the correct outcome should be at every step. That second job is what makes the approach powerful: a fuzzer can generate inputs, but without an oracle it can only detect crashes.

A shopping cart illustrates it. The model tracks a simple list of items. Actions are add, remove, apply coupon, and check out. After every action, the real cart's contents and total must match the model's. The tool generates thousands of sequences: add then remove then remove again, apply a coupon to an empty cart, check out twice. Bugs that depend on a particular order of operations, the kind ordinary example-based tests miss, surface quickly.

Coverage is measured on the model:

- **State coverage.** Has every state been visited?
- **Transition coverage.** Has every action been taken from every state where it is allowed? This parallels [[Branch Coverage]] for code.

Tests can also be drawn by likelihood rather than coverage. *Statistical usage testing* weights transitions by how often real users take them, a [[Markov Chain]] over the model, so the most common paths get the most testing.

The functional programming world arrived at the same idea as **stateful [[Property-Based Testing]]**. John Hughes and colleagues used QuickCheck's state machine testing on industrial systems, including automotive software and databases, finding bugs that required specific sequences of a dozen or more steps. When a failure appears, the tool shrinks the sequence to the shortest one that still fails, using the same idea as [[Delta Debugging]].

Model-based testing differs from [[Formal Verification]]. Model checking explores a model exhaustively to prove properties about the model itself. Model-based testing uses a model to check an implementation, by sampling rather than proof. [[Deterministic Simulation Testing]] applies a related approach to whole distributed systems.

The main costs are building the model and keeping it right. A model that is as complex as the system is just a second implementation, with its own bugs; the art is abstracting away everything except the behavior under test. Models also suffer *state explosion*, where combinations multiply beyond what any tool can cover, so practical models stay small and focused.

## See also
- [[Finite State Machine]]
- [[Property-Based Testing]]
- [[Test Oracle]]
- [[Fuzzing]]
- [[Decision Table Testing]]
