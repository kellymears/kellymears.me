---
aliases:
  - Test case minimization
  - Test case reduction
  - Shrinking
  - ddmin
  - C-Reduce
tags:
  - testing
summary: Automatically cutting a failing input or change down to the smallest piece that still triggers the failure, so a person only has to understand what matters.
---
**Delta debugging** is a family of algorithms that shrink a failing test case automatically. Given an input that triggers a bug, such as a 50,000-line program that crashes a compiler or a long sequence of clicks, it repeatedly removes parts and checks whether the failure still happens. What survives is a small input in which every remaining part is needed to reproduce the bug.

Andreas Zeller introduced the idea in 1999 in a paper titled "Yesterday, my program worked. Today, it does not. Why?", which applied it to the set of changes between a working and a broken version. With Ralf Hildebrandt he published the general *ddmin* algorithm in 2002. It works like a careful [[Binary Search]] over pieces of the input:

- **Split** the input into chunks and try each chunk alone, and each complement (the input minus one chunk).
- **Keep** any smaller version that still fails, and start again from it.
- **Refine** by splitting into smaller chunks when nothing at the current size can be removed.

The result is *1-minimal*: removing any single remaining piece makes the failure disappear. It isn't necessarily the smallest possible input, but in practice it is usually small enough to read.

The algorithm needs only a test that answers "does it still fail?" That question has to be precise. If the check just looks for any crash, reduction can wander from the original bug to a different one, a problem known as *slippage*. Good checks match the specific error message or stack location. A [[Flaky Test]] or a [[Heisenbug]] makes reduction unreliable, since a passing run might be a false negative.

Delta debugging shows up under several names:

- **Shrinking** in [[Property-Based Testing]]. When a generated input fails, tools such as QuickCheck and Hypothesis shrink it toward the simplest counterexample before reporting it, turning a random list of 300 numbers into one like `[0, -1]`.
- **Fuzz crash minimization.** [[Fuzzing]] produces failing inputs full of random noise, and fuzzers ship minimizers that strip them down before anyone looks.
- **Compiler bug reduction.** C-Reduce, released by John Regehr's group in 2012, cuts crashing programs down to a few lines. Bugs found by [[Differential Testing]] of compilers are routinely reduced this way before being reported.
- **Change isolation.** Narrowing a set of changes to the one that broke something is the same idea applied to history, and [[Git Bisect]] is its simplest form.

The payoff is the same one a [[Reproducible Case]] provides by hand. A minimal failing input points almost directly at the cause, and it makes a good regression test, since it is small, fast, and clearly about one thing.

## See also
- [[Spectrum-Based Fault Localization]]
- [[Program Slicing]]
- [[Fuzzing]]
- [[Git Bisect]]
- [[Divide and Conquer]]
- [[Minimal Reproducible Example]]
- [[Scientific Debugging]]
