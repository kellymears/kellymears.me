---
aliases:
  - Evals
  - Behavioral evaluation
tags:
  - agents
summary: A repeatable test suite for model behavior, since prompts and tool descriptions cannot be type-checked.
---
An **evaluation harness** is a test suite for a system built on a [[Large Language Model]]. It exists because the parts of such a system that most affect behavior — the [[System Prompt]], tool descriptions, schema field text — are prose, and no compiler, linter, or unit test can tell you whether an edit to them helped.

An eval defines scenarios (an input situation and an intent), runs the system, and asserts on what happened. The most valuable assertions are usually about *routing* — which tool was called, whether anything was called at all — because that is where prompt changes show up. A behavior change frequently appears as an empty list of tool calls rather than as anything visibly wrong in the reply text.

Designing a scenario well is harder than it looks. An ask that brushes a policy rule forks: one run complies, the next declines, and both are correct — so the recording measures policy, not routing. A stubbed backend that lets a create succeed while the corresponding read returns nothing teaches the model its write failed, and it writes again; now the recording measures the stub. Before recording, ask what *else* the scenario could legitimately be measuring.

Live evaluation costs money and time, which is why most harnesses replay; see [[Record and Replay Testing]].

## See also
- [[LLM-as-Judge]]
- [[Fingerprint]]
- [[Nondeterminism]]
- [[Prompt Engineering]]
- [[Guardrail]]

## Related
- [[Tool Use]]
- [[Test Double]]
