---
aliases:
  - Minimal reproduction
  - Repro
tags:
  - method
summary: The smallest set of steps that reliably produces a fault, and the unit of real debugging.
---
A **reproducible case** is a minimal, reliable procedure that produces a fault on demand. It is the fundamental unit of debugging, because everything else — bisecting, diagnosing, verifying the fix — depends on being able to trigger the behavior at will.

Building one is often most of the work. The steps that matter are usually to fix the environment (a clean database, a restarted server, a known input) and then to *remove* everything that does not change the outcome. What remains is both the diagnosis and, frequently, the test.

A differential repro is the strongest form: two builds identical except for one variable, each producing a different observable. It converts "something in this upgrade broke fonts" into "this version emits the preload tags and that one does not", which is a fact rather than a theory. See [[Ground Truth]].

Two habits keep repros honest. Write the reproduction *before* the fix, so you have seen the red — see [[Falsifiability]]. And distinguish a genuine repro from an intermittent one: a fault that appears once and clears on retry is a [[Flaky Test]] until proven otherwise, and reasoning about the code from a single occurrence usually wastes the afternoon.

## See also
- [[Root Cause Analysis]]
- [[Determinism]]
- [[Race Condition]]
- [[Regression]]
- [[Observability]]

## Related
- [[Vacuous Truth]]
- [[Truncation Bias]]
