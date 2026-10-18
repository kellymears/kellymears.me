---
aliases:
  - Session-based testing
  - Test charter
  - Bug bash
tags:
  - testing
summary: Testing in which a person designs and runs tests simultaneously, learning the system as they go and following whatever looks suspicious.
---
**Exploratory testing** is testing done by a thinking person who designs, runs, and learns from tests at the same time, rather than following a script written in advance. Cem Kaner named it in 1984. The tester explores the software the way a curious, skeptical user might, forms a hunch about what could go wrong, tries it, and lets each result shape the next attempt. Automated tests confirm what someone already thought to check. Exploratory testing finds what nobody thought to check.

It is not random clicking. Good exploratory testing is structured with **charters** and **time boxes**. A charter is a short mission, such as "explore the checkout flow with expired payment methods to find error-handling problems." A session is a fixed block, often 60 to 90 minutes, after which the tester writes notes on what was covered, what was found, and what still looks risky. James and Jon Bach formalized this as *session-based test management*, making exploratory work visible and reviewable.

Testers carry heuristics for where to look:

- **Boundaries.** Zero, one, many. Empty fields, maximum lengths, and dates at month and year boundaries.
- **Interruptions.** Back button, refresh, double-click, lost connection, two tabs open on the same record.
- **Inputs nobody expects.** Emoji, right-to-left text, pasted rich text, and other [[Character Encoding]] edge cases.
- **States and sequences.** Doing things in an unusual order, or undoing halfway. Many bugs live in the transitions of the [[Finite State Machine]] the software implicitly is.
- **Personas.** A keyboard-only user, a screen reader user, a slow network, an impatient expert. Exploration through [[Keyboard Navigation]] and assistive technology finds [[Accessibility]] failures automated checkers miss.

Exploratory testing is strongest early in a feature's life and right after major changes, when risks are unknown. Its findings feed automation. A bug discovered by exploration should become a regression test, so the same thing is never found by hand twice. A **bug bash**, in which a whole team explores a release together for an hour, spreads the same idea across many perspectives.

It complements rather than competes with [[Fuzzing]], which explores input space at machine speed without judgment, and [[Property-Based Testing]], which explores within stated rules. People bring something neither has: a sense of what would confuse or annoy a real user, which no assertion can encode.

## See also
- [[Black-Box and White-Box Testing]]
- [[Bug Triage]]
- [[End-to-End Test]]
- [[Monkey Testing]]
- [[Risk-Based Testing]]
- [[Fault Seeding]]
- [[Rubber Duck Debugging]]
- [[Usability Testing]]
- [[Dogfooding]]
