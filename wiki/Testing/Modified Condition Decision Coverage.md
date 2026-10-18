---
aliases:
  - MC/DC
  - Condition coverage
  - Decision coverage
tags:
  - testing
summary: A strict coverage criterion, required for the most critical aviation software, that demands each condition in a decision be shown to independently change its outcome.
---
**Modified condition/decision coverage**, or **MC/DC**, is a coverage criterion stricter than branch coverage. It requires tests showing that every individual condition in a decision independently affects the decision's outcome. DO-178C, the standard for certifying airborne software, requires it for code whose failure could cause a crash.

The criterion makes sense against weaker ones. Consider a decision like `if (armed && altitudeOk && !override)`:

- **Statement coverage** only requires that the line runs.
- **Decision coverage**, essentially [[Branch Coverage]], requires the whole expression to be both true and false at least once. Two tests can do that while never showing that `altitudeOk` matters at all.
- **Condition coverage** requires each condition to be true and false at least once, but not that the decision's outcome follows. It's possible to flip every condition without ever flipping the result.
- **Multiple condition coverage** requires every combination of conditions. With *n* conditions that's 2^n tests, which explodes quickly; see [[Combinatorial explosion]].

MC/DC sits between the last two. For each condition, there must be a pair of tests that differ only in that condition and produce different outcomes. For *n* conditions, MC/DC usually needs only about *n* + 1 tests, so it grows linearly rather than exponentially.

In the example, four tests suffice: one where all three conditions allow the action, and three more that each flip a single condition and block it. If any condition can't be flipped alone to change the result, it's either redundant or masked by others, a sign of a logic error or dead code; see [[Unreachable Code]].

The motivation is that complex boolean logic is where subtle errors hide. A condition written with `||` instead of `&&`, a missing negation, or an incorrectly grouped expression can survive weaker coverage. MC/DC forces tests that would detect each of these, overlapping with what [[Mutation Testing]] checks by deliberately altering operators.

Short-circuit evaluation complicates the picture: in many languages, later conditions aren't evaluated once the result is known, so the "same except one condition" pairs must account for what actually executes. Tools that measure MC/DC instrument the compiled code to track each condition separately; see [[Instrumentation]].

MC/DC has costs and critics. It takes a lot of effort, and results depend on how code is written: splitting one complex decision into nested `if` statements changes what's required. Coverage also says nothing about whether the expected outcomes are right; see [[Test Oracle]] and [[Code Coverage]].

Outside aviation and automotive safety standards it's rare, but its idea is useful anywhere: for an important condition, write a test that shows what happens when only that condition changes; see [[Decision Table Testing]] and [[Boundary Value Analysis]]. For the highest assurance, aviation and others are increasingly adding mathematical proof; see [[Formal Verification]].

## See also
- [[Black-Box and White-Box Testing]]
- [[Cyclomatic Complexity]]
- [[Coverage Gate]]
