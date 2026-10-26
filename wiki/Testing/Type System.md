---
aliases:
  - Type systems
  - Static typing
  - Dynamic typing
  - Type checking
  - Type safety
  - Type checker
tags:
  - testing
summary: The rules a language uses to classify values and reject operations that don't fit, checked before the program runs or as it runs, and the cheapest form of verification most programmers use every day.
---
A **type system** is a set of rules that assigns a *type*, such as integer, string, or list of users, to each value and expression in a program, and rejects operations that don't make sense for those types. Adding a number to a date, calling a method that doesn't exist, or passing a string where a function expects a list are type errors. A type system is a lightweight proof: if the system is sound, every program that passes the checker is guaranteed free of a whole class of bugs.

The main divide is when checking happens:

- **Static typing** checks before the program runs, usually in the [[Compiler]]. Java, C#, Rust, Go, Haskell, and [[TypeScript]] are statically typed. Errors appear in the editor rather than in production.
- **Dynamic typing** checks as the program runs, attaching types to values instead of variables. Python, Ruby, and JavaScript are dynamically typed, and rely on [[Duck Typing]]: if an object has the method you call, it works.

Static types do several jobs at once:

- **Catch errors early.** Mistyped field names, missing cases, and wrong arguments fail at compile time.
- **Document intent.** A function signature says what goes in and what comes out, and unlike a comment it can't drift from the code.
- **Make invalid states unrepresentable.** With an algebraic data type, a request can be modeled as loading, failed, or succeeded, with no way to be both failed and succeeded. Option types replace [[Null]], removing the most common crash in many languages.

Types and tests overlap but aren't substitutes. A type checker proves properties for every possible input, but only simple properties: that a value is a number, not that it's the right number. A [[Unit Test]] checks rich properties, but only for the inputs someone wrote down. Teams with strong types typically need fewer tests for plumbing and can focus on behavior, while dynamic languages often lean on more tests, plus [[Static Analysis]] linters, for the same confidence.

Type checking has limits rooted in computation itself. Because of the halting problem, any checker that always terminates must reject some correct programs or accept some incorrect ones. Practical systems choose to be conservative, then offer escape hatches like casts and `any`, which reintroduce the risks they bypass. Types also stop at the program's edges: data from a network request or a file is untyped until checked, which is why [[Schema Validation]] at boundaries matters.

The research frontier pushes types closer to full proofs. [[Type Inference]] removes the need to write most annotations. Dependent types can express "a list of length n" or "a sorted array," blurring into Formal Verification. Gradual typing lets a codebase add types incrementally, which is how many JavaScript and Python projects adopt them.

## See also
- [[PHP]]
- [[JavaScript]]
