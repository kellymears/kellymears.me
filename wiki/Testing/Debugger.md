---
aliases:
  - Debuggers
  - Breakpoint
  - Watchpoint
  - Step debugging
  - Time-travel debugging
  - Reverse debugging
  - Printf debugging
tags:
  - testing
summary: A tool that pauses a running program so its state can be inspected and its execution stepped through, and the alternatives programmers reach for when pausing isn't possible.
---
A **debugger** lets a programmer pause a running program, inspect its state, and control its execution step by step. Instead of guessing from output what happened, one can stop at a chosen line and look at every variable, the call stack, and memory as they are at that moment.

The core features have been stable for decades:

- **Breakpoints.** Pause when execution reaches a line. *Conditional breakpoints* pause only when an expression is true, such as on the thousandth iteration or when a value turns negative.
- **Stepping.** Run one line at a time, either stepping into a function call or over it, or step out to the caller.
- **Inspection.** Read variables, evaluate expressions, and walk up the call stack to see how execution got here.
- **Watchpoints.** Pause when a particular memory location changes, which finds out who is modifying a value without knowing where to look.

Debuggers work with help from the [[Compiler]] or [[Interpreter]], which records *debug symbols* mapping machine instructions back to source lines and variable names. Native debuggers such as GDB and LLDB attach to a [[Process]] using operating system facilities, and can also load a *core dump*, a snapshot of memory saved when a program crashed. Browsers and language runtimes include their own debuggers.

**Time-travel debugging** removes the need to stop at exactly the right moment. Tools such as rr, released by Mozilla in 2014, record a run and then replay it with the same results every time, so the programmer can step *backward* from a crash to the moment a value went wrong. Replay also tames intermittent failures, since a recorded failing run fails the same way on every replay, the same idea that [[Record and Replay Testing]] applies to network traffic.

Debuggers have limits. Pausing a program changes its timing, so a [[Race Condition]] may disappear while one is watching, the defining trait of a [[Heisenbug]]. Production systems usually can't be paused, and distributed systems spread one request across many machines. In those settings, programmers fall back on logs and traces, the territory of [[Observability]].

The oldest technique is still the most common: **printf debugging**, adding print statements to show values as the program runs. It's crude but works everywhere, leaves a record of the whole run instead of one moment, and doesn't disturb timing as much as pausing does. Turning a recurring print into a permanent [[Assertion]] keeps the knowledge.

A debugger answers "what is the state?" but not "what should it be?", and most debugging is spent on the second question. Narrowing the problem to a [[Reproducible Case]], explaining it aloud as in [[Rubber Duck Debugging]], and finding when it started with [[Git Bisect]] often do more than stepping through code line by line.

## See also
- [[Heisenbug]]
- [[Record and Replay Testing]]
- [[Rubber Duck Debugging]]
- [[Reproducible Case]]
