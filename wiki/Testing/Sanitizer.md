---
aliases:
  - Sanitizers
  - AddressSanitizer
  - ASan
  - ThreadSanitizer
  - TSan
  - UndefinedBehaviorSanitizer
  - UBSan
  - Undefined behavior
tags:
  - testing
summary: Compiler-inserted runtime checks that catch memory errors, data races, and undefined behavior at the moment they happen, instead of when they finally corrupt something.
---
A **sanitizer** is a set of runtime checks that a [[Compiler]] adds to a program to catch whole classes of bugs as they happen. In languages like C and C++, many mistakes don't fail immediately. Reading past the end of an array, using memory after it's freed, or overflowing a signed integer is *undefined behavior*: the language makes no promise about what happens, and the program often carries on with corrupted data, crashing much later somewhere unrelated or never crashing at all. That is a [[Silent Failure]] of the worst kind. Sanitizers turn these into immediate, clearly reported errors.

The main sanitizers, built into the Clang and GCC compilers:

- **AddressSanitizer (ASan).** Released by Konstantin Serebryany and colleagues at Google in 2012. It surrounds each allocation with *redzones* of poisoned memory and keeps *shadow memory* recording which bytes are valid, so every load and store can be checked. It catches buffer overflows, use-after-free, and double frees, typically at about twice the normal running time.
- **ThreadSanitizer (TSan).** Tracks which memory accesses are ordered by locks and other synchronization and reports two threads touching the same data without it, the definition of a data race and a common cause of a [[Race Condition]]. It catches races that occurred in the run even when the timing happened to work out.
- **UndefinedBehaviorSanitizer (UBSan).** Checks for [[Integer Overflow]] on signed types, invalid shifts, misaligned pointers, and similar errors, with low overhead.

Sanitizers check only code that runs, so they are most useful paired with something that runs a lot of code. The classic pairing is [[Fuzzing]]: a fuzzer generates millions of inputs and the sanitizer detects the moment one causes a memory error, giving the fuzzer a precise [[Test Oracle]]. Projects such as OSS-Fuzz run this combination continuously on open-source software and have reported tens of thousands of bugs.

The approach complements [[Static Analysis]], which examines code without running it and can reason about paths that tests never reach, but reports more false alarms. A sanitizer report, by contrast, describes something that actually happened, with a stack trace for the bad access and for where the memory was allocated and freed.

Older tools such as Valgrind find similar memory errors without recompiling, by running the program on a simulated processor, but at 10 to 50 times the cost. Sanitizers are fast enough to run the full test suite under them in [[Continuous Integration]], which is common practice for C and C++ projects. The overhead is still too high for most production builds, and sanitizers change timing, so a [[Heisenbug]] may vanish under them. Languages with memory safety by design, such as Rust, rule out most of these bugs at compile time, and their tooling uses sanitizers mainly for code marked unsafe.

## See also
- [[Fuzzing]]
- [[Instrumentation]]
- [[Race Condition]]
- [[Static Analysis]]
- [[Core Dump]]
