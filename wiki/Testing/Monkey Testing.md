---
aliases:
  - Random testing
  - Monkey test
  - UI exerciser
tags:
  - testing
summary: Testing an application by bombarding it with random input, taps, clicks, keystrokes, and gestures, to find crashes and hangs that scripted tests never think to trigger.
---
**Monkey testing** throws random input at a program, usually through its user interface, to see what breaks. The name evokes a monkey at a keyboard: random taps, clicks, swipes, keystrokes, and gestures, with no idea what the application does. Its goal isn't to check that features work, but to find crashes, hangs, and errors under input no one planned for.

The technique dates back at least to 1983, when Steve Capps wrote a program called *Monkey* for the original Macintosh. The team wanted to see how the software held up under constant use, and Monkey fed random mouse and keyboard events into the system for hours. Android ships a modern descendant, the UI/Application Exerciser Monkey, which sends a stream of pseudorandom events to an app from the command line.

Monkey testing comes in degrees:

- **Dumb monkeys** know nothing about the application. They tap anywhere and type anything. They're cheap and surprisingly good at finding crashes, but waste most of their effort on input the app ignores.
- **Smart monkeys** know something about the interface: where the buttons are, which screens exist, what input fields expect. They reach deeper into an application, approaching [[Model-Based Testing]].
- **Gremlins** and **chaos monkeys** extend the idea beyond input, randomly breaking parts of a running system; see [[Chaos Engineering]].

Monkey testing is related to [[Fuzzing]], which also generates random or mutated input. Fuzzers usually target a program's parsers and APIs, and modern ones use code coverage to steer toward new behavior. Monkey testing usually targets the interface and relies on volume. Both rely on the same simple [[Test Oracle]]: anything that crashes, hangs, or trips an internal check is a bug, whatever the input; see [[Assertion]] and [[Sanitizer]].

Random testing has well-known strengths and weaknesses:

- **It finds surprises.** Monkeys try sequences no tester would, such as pressing back during a transition or tapping five buttons at once, which often reveal [[Race Condition]] bugs.
- **It's shallow.** Reaching a screen behind a login or a long workflow by chance is unlikely, so deep features get little coverage.
- **It's hard to reproduce.** A crash after 40,000 random events is useless unless the run can be repeated. Good tools take a seed and log every event, so the run can be replayed and the failing sequence shortened; see [[Pseudorandom Number Generator]] and [[Delta Debugging]].

Monkey testing works best alongside structured tests rather than instead of them. Run against every build, it acts as a cheap stability check, catching crashes before users find them; see [[Crash Reporting]]. In web apps, libraries such as gremlins.js unleash random clicks and form input on a page, often catching unhandled errors and layouts that collapse under odd input; see [[Exploratory Testing]] for the human version of wandering off the scripted path.

## See also
- [[Property-Based Testing]]
- [[Smoke Test]]
- [[Heisenbug]]
