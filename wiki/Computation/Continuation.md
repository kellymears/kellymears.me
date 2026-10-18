---
aliases:
  - Continuation-passing style
  - CPS
  - call/cc
  - Delimited continuation
tags:
  - computation
summary: The rest of a computation, made into a value a program can hold and call, a single idea that explains exceptions, generators, async code, and backtracking.
---
A **continuation** is "the rest of the computation" from some point in a program: everything that will happen next, with the current result. When evaluating `1 + f(x)`, the continuation of the call to `f` is "take the result, add one, and carry on from there." Every running program has continuations implicitly, held in its [[Call Stack]]. Some languages make them explicit values that code can store, pass around, and invoke.

**Continuation-passing style** (CPS) is a way of writing code in which functions never return. Instead, each function takes an extra argument, a function to call with its result. So "compute f(x), then add one" becomes "compute f(x), and when done, call this function that adds one." Every intermediate result is named and every step's successor is explicit.

CPS sounds awkward for people but suits compilers. Many functional language compilers convert programs to CPS internally, because it makes control flow, evaluation order, and every intermediate value explicit; see [[Compiler]] and [[Lambda Calculus]]. Since CPS calls never return, it also depends on [[Tail Call Optimization]] to avoid growing the stack.

Programmers have met CPS anyway. Early asynchronous JavaScript, with callbacks nested inside callbacks, was CPS written by hand, and its deep nesting earned the name "callback hell." [[Promise]]s and **async/await** were introduced largely to let people write ordinary-looking code that the language turns into continuations behind the scenes; see [[Event Loop]].

Scheme made continuations first-class with `call/cc` ("call with current continuation"), which hands a function the continuation of the current point as a value. Calling that value later jumps back to that point, as if the original call had just returned. From this one primitive, many control structures can be built:

- **Exceptions**, by jumping to an outer continuation; see [[Exception Handling]].
- **Generators and coroutines**, by swapping continuations between two routines; see [[Coroutine]].
- **Backtracking**, by saving a continuation at each choice point and resuming it to try another option; see [[Backtracking]].
- **Cooperative threads**, by keeping a queue of continuations and switching among them.

Unrestricted continuations are powerful but hard to reason about and costly to implement. **Delimited continuations** capture only part of the rest of the computation, up to a marked boundary, and are easier to use. They are the basis of **algebraic effects**, adopted in OCaml 5 and some research languages, which let code pause, hand control to a handler, and resume, a structured generalization of exceptions and async/await.

Continuations have also been used for web applications, letting a server keep "where the user was" in a multi-step form as a saved continuation rather than reconstructing state from each request.

Underneath, the idea connects to [[Monad]]s: the continuation monad can express any other monad's behavior, which is one sign of how general the concept is.

## See also
- [[Closure]]
- [[Higher-Order Function]]
- [[Recursion]]
- [[Structured Programming]]
