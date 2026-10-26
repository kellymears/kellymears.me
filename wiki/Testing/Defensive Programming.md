---
aliases:
  - Defensive coding
  - Offensive programming
tags:
  - testing
summary: Writing code that anticipates misuse and bad input, checking assumptions and handling the unexpected rather than trusting callers, along with the debate over when defense should give way to failing loudly.
---
**Defensive programming** is the practice of writing code that keeps working, or fails safely, when things go wrong: callers pass bad arguments, files are missing, networks drop, data is malformed, or other code has bugs. The defensive programmer doesn't assume the rest of the world will behave. Like defensive driving, it means expecting others to make mistakes.

Common defensive habits include:

- **Validating input** at boundaries, especially anything from users, files, or networks. Untrusted input that reaches a database query or a web page unchecked becomes [[SQL Injection]] or [[Cross-Site Scripting]].
- **Checking return values and errors** instead of assuming success.
- **Guarding against nulls** and missing values.
- **Handling every case**, including a default branch for states that "can't happen."
- **Using safe operations**, such as bounds-checked access and overflow-checked arithmetic.
- **Copying inputs** so callers can't change data after it's been validated.
- **Setting timeouts** on anything that waits.

The approach has a real cost when overdone. Code drowns in checks, and the important logic gets hard to see. Worse, defensive code can hide bugs: a function that quietly returns an empty list when given garbage lets the error travel far from its source, surfacing later as a confusing symptom; see [[Silent Failure]]. Catching every exception and logging it can keep a broken system limping along with corrupt state.

That's the argument for **offensive programming**, a term for the opposite reflex inside a system's own code. Where a condition indicates a bug rather than bad input, the code should fail immediately and loudly, so the bug is found and fixed; see [[Fail Fast]] and [[Assertion]]. Erlang's "let it crash" philosophy goes further: rather than defending against every fault, isolate components and restart failed ones.

The usual resolution is to distinguish **boundaries** from **internals**:

- At trust boundaries, where data enters from outside, validate thoroughly and handle bad input gracefully with clear errors.
- Inside the system, state assumptions explicitly as contracts and assertions, and treat violations as bugs; see [[Design by Contract]].
- Parse data into well-typed structures once at the boundary, so internal code can't receive invalid values at all; see [[Type System]].

A related principle, [[Postel's Law]], being liberal in what you accept, was once considered good defensive practice for protocols. Experience showed that tolerating malformed input encourages more of it and makes behavior hard to predict, so modern guidance favors strictness.

Defensive code needs testing too. The branches for bad input and failures are often the least exercised code in a program, and the most likely to be wrong when they finally run.

## See also
- [[Graceful degradation]]
- [[Fail-Safe]]
