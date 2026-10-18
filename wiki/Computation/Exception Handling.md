---
aliases:
  - Exception
  - Exceptions
  - Try-catch
  - Checked exception
  - Errors as values
tags:
  - computation
summary: Signaling errors by unwinding the call stack to a handler, how it compares with returning errors as values, and the habits that make either approach work.
---
**Exception handling** is a way of dealing with errors in which code that hits a problem *throws* an exception, abandoning normal execution, and control jumps up the [[Call Stack]] to the nearest enclosing *handler* that catches it. Functions in between are skipped entirely, with cleanup code run along the way. Lisp dialects pioneered the mechanism in the 1960s and 1970s, and C++, Java, Python, C#, and JavaScript made it mainstream.

The main benefit is separation. Without exceptions, every call must check for failure and pass errors up by hand, as in C, where forgetting a single check lets an error pass silently. With exceptions, the main path reads cleanly, errors can't be ignored by accident, and handling lives where something can actually be done about it, often several layers up.

The costs are real:

- **Invisible control flow.** Any call might throw, and nothing in the code shows which. Reasoning about what state remains after a failure halfway through a function is hard.
- **Catch-all handlers.** Catching every exception and logging it, or worse ignoring it, hides bugs. The opposite of [[Fail Fast]].
- **Cleanup.** Resources must be released when an exception passes through. Languages provide `finally` blocks, `with` statements, or destructors that run as the stack unwinds, the RAII idea from [[Ownership and Borrowing]].
- **Performance.** Throwing is usually slow, so exceptions suit rare failures, not routine outcomes like "not found."

Java's **checked exceptions** tried to make errors visible by requiring methods to declare what they throw. In practice, programmers often wrapped or swallowed them to satisfy the compiler, and later languages mostly dropped the idea.

The main alternative treats **errors as values**. A function returns either a result or an error, and the caller must deal with both. Go returns an error alongside the result; Rust and functional languages use a result type, an [[Algebraic Data Type]] that holds success or failure, with [[Pattern Matching]] to unpack it and compact syntax to pass errors up. Errors become visible in function signatures and in the code, at the cost of more ceremony. A [[Monad]] can chain these computations so the error path stays short. Rust and Go still keep a *panic* for unrecoverable bugs, much like an exception that's rarely caught.

Whichever mechanism a language uses, the same habits help:

- **Distinguish bugs from expected failures.** A missing file is a normal outcome to handle; a broken invariant is a bug that should crash; see [[Assertion]].
- **Handle errors where there's context** to do something useful, not at every level.
- **Preserve the cause** when wrapping one error in another, so the original stack trace survives for [[Logging]] and debugging.

A related trap is returning [[Null]] to signal failure, which defers the error to whoever eventually uses the value.

## See also
- [[Crash Reporting]]
- [[Coroutine]]
- [[Design by Contract]]
