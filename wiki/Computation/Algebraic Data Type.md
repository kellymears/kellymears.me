---
aliases:
  - ADT
  - Sum type
  - Tagged union
  - Discriminated union
  - Option type
  - Result type
tags:
  - computation
summary: Types built by combining other types with "and" and "or," which let a compiler check that every case is handled and make invalid states impossible to represent.
---
An **algebraic data type** is a type built by combining other types in two ways:

- **Product types** combine values with "and." A point has an x *and* a y. Records, structs, and tuples are product types. The number of possible values is the product of the parts: a pair of two booleans has 2 × 2 = 4 values.
- **Sum types** combine alternatives with "or." A shape is a circle *or* a rectangle *or* a triangle, each carrying its own data. The number of possible values is the sum of the alternatives. Sum types are also called *tagged unions* or *discriminated unions*, because each value carries a tag saying which alternative it is.

The "algebra" is literal: types add and multiply. The idea came from functional languages, starting with Hope and ML in the 1970s, and is central to Haskell, OCaml, and F#. It has since spread to Rust, Swift, Kotlin, Scala, and TypeScript, whose unions of object types with a shared literal field work the same way.

Sum types pair naturally with [[Pattern Matching]]. Code that handles a shape matches on its tag and gets the right data for each case, and the [[Compiler]] checks that every alternative is covered. Adding a new kind of shape then produces errors at every place that doesn't handle it yet, turning a forgotten case from a runtime bug into a compile-time error.

Two sum types are especially common:

- **Option**, or Maybe: either some value or none. It replaces null, which Tony Hoare, who introduced null references in 1965, later called his "billion-dollar mistake." With an option type, the possibility of absence is visible in the type, and the compiler insists it be handled.
- **Result**, or Either: either a success value or an error. It makes failure an ordinary return value instead of an exception, so callers can't silently ignore it. Chaining operations over options and results is a classic use of a [[Monad]].

A widely quoted design principle is to **make illegal states unrepresentable**. A connection modeled as a record with a status string, an optional socket, and an optional error allows nonsense combinations, such as "connected" with an error and no socket. Modeled as a sum type, with Disconnected, Connecting, Connected carrying a socket, and Failed carrying an error, those combinations can't be written at all. This is a type-level version of a [[Finite State Machine]], with each state carrying only the data that makes sense in it.

Recursive sum types describe trees: an expression is a number, *or* a sum of two expressions, *or* a product of two expressions. This is how compilers represent an [[Abstract Syntax Tree]], and functions over such types are naturally written with [[Recursion]].

## See also
- [[Generics]]
- [[Exception Handling]]
- [[Typestate]]
- [[Curry-Howard Correspondence]]
- [[Null]]
- [[Dynamic Dispatch]]
- [[TypeScript]]
