---
aliases:
  - Parametric polymorphism
  - Generic programming
  - Type parameter
  - Type parameters
  - Monomorphization
tags:
  - computation
summary: Writing code once over a type variable so it works for any type, how languages implement it by erasure or by copying, and what constraints on type parameters buy.
---
**Generics** let code be written once and used with many types. A generic list is a list of *some* type `T`, and the same code serves as a list of numbers, strings, or users, with the compiler checking that a list of numbers never receives a string. The formal name is **parametric polymorphism**: the code is parameterized by a type, and behaves the same whatever type is plugged in.

The idea came from typed functional languages. ML, created by Robin Milner in the 1970s, had it from the start, combined with [[Type Inference]] so programmers rarely wrote types at all. Ada and C++ brought it to mainstream systems programming, C++ through templates in the early 1990s. Java added generics in 2004, C# in 2005, and Go, after a decade of debate, in 2022. Before generics, languages like Java and Go used a universal type such as `Object` or `interface{}`, which works but loses type checking: every value taken out of a collection has to be cast back, and a wrong cast fails at runtime.

Languages implement generics in two main ways:

- **Erasure.** The compiler checks types, then erases them, producing one shared version of the code that works on generic references. Java does this for compatibility with older code, and [[TypeScript]] erases all types when compiling to JavaScript. It keeps binaries small, but the program can't ask at runtime what `T` is.
- **Monomorphization.** The compiler stamps out a separate copy of the code for each concrete type used, as C++ templates and Rust do. Each copy is specialized and fast, with no indirection, but binaries grow and compile times lengthen.

C# and some others mix the two, sharing code for reference types and specializing for value types. The trade-off between code size and speed is the same one [[Dynamic Dispatch]] makes against static dispatch.

Generics become much more useful with **constraints**. A sorting function shouldn't accept any `T`, only types that can be compared. Languages express this with bounded type parameters, Java's `T extends Comparable`, Rust's traits, Haskell's type classes, or Go's interface constraints. Constraints connect generics to [[Polymorphism]] of the ad hoc kind, where behavior differs by type.

Generic code is everywhere once a language has it: containers such as a [[Hash Table]] or [[Binary Heap]], functions like `map` and `filter` from [[Higher-Order Function]] style, and types like `Option<T>` and `Result<T, E>`, which make an [[Algebraic Data Type]] reusable. A [[Monad]] is a pattern defined over a generic type constructor.

Generics have costs. Error messages from heavily templated C++ are notoriously long, and complex constraint systems can become a programming language of their own; C++ templates show accidental [[Turing Completeness]]. [[Duck Typing]] offers the dynamic alternative: skip the type parameters and check behavior at runtime.

## See also
- [[Type System]]
- [[Pattern Matching]]
- [[Metaprogramming]]
- [[Typestate]]
