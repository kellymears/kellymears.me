---
aliases:
  - TCO
  - Tail Call Elimination
tags:
  - computation
summary: Reusing a function's stack frame for a call in tail position so recursion runs in constant stack space.
---
**Tail Call Optimization** is a compiler or interpreter's decision to reuse the current stack frame when a function call is the very last thing a function does — a "tail call" — instead of pushing a new frame on top. Because nothing happens after the call returns, the calling frame has nothing left to do, so it can be discarded before the callee even starts, turning what looks like recursion into a loop at the machine level.

The payoff is unbounded recursion depth in constant stack space, which matters for anything written as a recursive walk over an accumulator: summing a list tail-recursively, or the state transitions of a [[Finite State Machine]] written as mutually recursive functions. Without TCO, the same code blows the stack past a few thousand frames; with it, the recursion is indistinguishable in resource use from a hand-written `while` loop.

The catch is that TCO is a property of a specific call site, not of recursion in general — a call is only a tail call if its result is returned immediately with no further work (no `+ 1`, no `try/finally`, nothing after it in the caller). Scheme mandates TCO in its spec, so it's part of correctness there, not merely an optimization; JavaScript specified it (proper tail calls in ES2015) but almost no engine ships it, so relying on it in JS code is a portability trap. Python deliberately omits it, on the reasoning that stack traces are more valuable for debugging than the small class of programs that need infinite tail recursion — Guido van Rossum has written about this trade-off directly.

The general workaround where TCO isn't guaranteed is manual: rewrite the recursive function to build up an explicit accumulator and trampoline it through an outer loop, or convert to iteration outright. This is also why "just make it tail-recursive" is language-dependent advice — it fixes stack growth only where the runtime actually performs the elimination.

## See also
- [[Recursion]]
- [[Compiler]]
- [[Interpreter]]
- [[Finite State Machine]]
- [[Closure]]
