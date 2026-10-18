---
aliases:
  - Assurance case
  - Goal Structuring Notation
tags:
  - testing
summary: A structured written argument, backed by evidence, that a system is acceptably safe for a specific use, which shifts the burden onto the builder to show safety rather than onto the regulator to find danger.
---
A **safety case** is a structured argument, supported by evidence, that a system is acceptably safe to operate in a particular context. Instead of following a fixed rulebook, the people responsible for a system must explain why they believe it is safe, show the evidence for each claim, and let independent reviewers challenge it. Safety cases are required for offshore oil platforms, nuclear plants, railways, military aircraft, and increasingly cars.

The approach grew out of disasters. After the Piper Alpha oil platform exploded in the North Sea in 1988, killing 167 people, the inquiry led by Lord Cullen concluded that prescriptive regulations had let operators treat compliance as the same thing as safety. The UK began requiring operators to write and maintain their own safety cases. The principle is a shift in the [[Burden of Proof]]: the operator must demonstrate safety, rather than the regulator having to find danger.

A safety case has three parts:

1. **Claims.** Statements about the system, such as "the braking system cannot fail silently."
2. **Arguments.** Reasoning that explains why the evidence supports each claim, broken into smaller claims until each can be checked directly.
3. **Evidence.** Test results, analyses, inspection records, and proofs; see [[Verification and Validation]], [[Fault Tree Analysis]], [[Failure Mode and Effects Analysis]], and [[Formal Verification]].

**Goal Structuring Notation** (GSN), developed at the University of York in the 1990s, draws this as a diagram of goals, strategies, and evidence, making gaps in the argument easier to see. Standards that require safety cases include ISO 26262 for road vehicles, which asks for evidence such as [[Modified Condition Decision Coverage]], and UL 4600 for autonomous vehicles.

The main danger is that a safety case becomes paperwork. The 2009 review by Charles Haddon-Cave of the loss of a Nimrod RAF aircraft in Afghanistan, in which 14 people died, found that its safety case had been produced as a box-ticking exercise, assuming the aircraft was safe and gathering material to confirm it. Haddon-Cave argued that safety cases had become "an end in themselves"; see [[Confirmation Bias]] and [[Goodhart's Law]].

Good practice responds by seeking out what would defeat the argument. Reviewers ask what evidence would show a claim false, and some methods attach explicit counterarguments, called defeaters, to each claim; see [[Adversarial Review]] and [[Falsifiability]]. A case must also be kept current as the system changes, or it describes a system that no longer exists; see [[Normalization of Deviance]].

The idea is now being applied to AI. Some developers and researchers propose safety cases arguing that a model can't cause specified harms, backed by capability evaluations and red-team results; see [[Evaluation Harness]]. How such arguments can be made convincing for systems that are hard to inspect remains an open question.

## See also
- [[Requirements Traceability]]
- [[Checklist]]
- [[Audit Log]]
