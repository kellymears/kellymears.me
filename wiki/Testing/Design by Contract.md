---
aliases:
  - Precondition
  - Postcondition
  - Class invariant
  - Contract programming
  - Invariant
tags:
  - testing
summary: Specifying what each function requires and guarantees, as checkable preconditions, postconditions, and invariants, so a violation says exactly whose bug it is.
---
**Design by contract** treats each function or class as a party to a contract. The caller must satisfy certain conditions, and in return the function guarantees certain results. Bertrand Meyer developed the approach in the mid-1980s and built it into his language Eiffel, drawing on Tony Hoare's logic of program correctness. A contract has three parts:

- **Preconditions** are what must be true when the function is called, such as "the list is not empty" or "the amount is positive." They are the caller's obligation.
- **Postconditions** are what the function guarantees on return, if the preconditions held, such as "the result is sorted" or "the balance decreased by exactly the amount."
- **Invariants** are properties of an object that hold between every public operation, such as "the balance is never negative" or "the cached count matches the number of items."

The main payoff is assigning blame. When a precondition fails, the caller has a bug. When a postcondition or invariant fails, the function has a bug. Debugging starts in the right place instead of somewhere downstream where corrupted data finally caused a crash. Checking contracts at runtime is a form of [[Fail Fast]]: an [[Assertion]] at the boundary stops the program at the first broken promise.

Contracts also document intent precisely. A signature says a function takes an integer. A contract says which integers, and what happens to them. That gives other tools something to check against. [[Static Analysis]] tools can try to prove contracts hold, [[Formal Verification]] proves them outright, and [[Property-Based Testing]] can use postconditions and invariants directly as the properties to test across random inputs.

Few mainstream languages build contracts in. Eiffel, Ada, D, and Racket do. Elsewhere the idea appears piecemeal: assertions, validation at API boundaries with [[Schema Validation]] or a [[JSON Schema]], and types that make invalid states unrepresentable, so a precondition becomes a type the compiler enforces. [[Immutability]] helps by ensuring an invariant established at construction can't be broken later.

Design by contract takes a deliberate stance against defensive programming everywhere. If a function's precondition says the input is valid, the function needn't check again, which puts the responsibility in one place. That contrasts with [[Postel's Law]], which advises being liberal in what you accept. Contracts favor strictness, at least within a codebase.

Contracts between functions are different from [[Contract Testing]], which checks that separate services agree on the shape of their API, though the idea of a mutual, checkable agreement is the same.

## See also
- [[Data Contract]]
- [[Type System]]
- [[Verification and Validation]]
- [[Polymorphism]]
- [[Database Constraint]]
