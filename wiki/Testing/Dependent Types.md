---
aliases:
  - Dependent type
  - Refinement type
  - Liquid Haskell
tags:
  - testing
summary: Types that can mention ordinary values, such as a list whose type records its length, letting a compiler check precise properties of a program and blurring the line between writing code and proving it correct.
---
**Dependent types** are types that can depend on values. An ordinary type system can say that a value is a list of numbers; a dependent type can say it's a list of exactly five numbers, or a number between 0 and the length of some particular list. Because types can express such precise properties, a program that type-checks can carry proofs that it never indexes out of bounds, never divides by zero, or that a sorting function really sorts.

A standard example is a vector type that records its length. Appending a vector of length 3 to one of length 4 gives a type of length 7, and the compiler checks the arithmetic. A function that takes the first element accepts only vectors of length at least 1, so calling it on an empty one is a type error rather than a crash; see [[Null]] and [[Boundary Value Analysis]].

The idea goes back to the logician Per Martin-Löf's type theory of the 1970s. Its deeper meaning comes from a correspondence noticed earlier: types can be read as logical statements and programs as proofs of them. A function of type "for every list, a sorted list with the same elements" is a proof that every list can be sorted. Dependent types make the correspondence powerful enough for real mathematics; see [[Lambda Calculus]] and [[Formal Verification]].

Languages built on this include Agda, Idris, and Lean, and the Rocq proof assistant, formerly Coq. Mathematicians have used Lean and Rocq to check major results, and CompCert, a C compiler verified in Rocq, has been shown not to miscompile code; see [[Compiler]]. A random program generator that found bugs in nearly every other C compiler found none in CompCert's verified parts.

The costs are real. Type checking can require running code, so a checker must make sure that code terminates; most such languages reject functions they can't prove finish, and a few programs that would finish get rejected too; see [[Halting Problem]]. Programmers often have to write proofs explicitly, which can take far more effort than the code itself. [[Type Inference]] mostly breaks down.

**Refinement types** offer a lighter version. They attach logical conditions to ordinary types, such as "an integer greater than 0," and hand the proof obligations to an automated solver; see [[Symbolic Execution]]. Liquid Haskell and F* work this way, and they catch many bugs with much less effort than full dependent types.

Mainstream languages have adopted pieces. [[TypeScript]] can compute types from literal values, [[Generics]] in several languages accept constant numbers, and pattern-matching checks let the compiler narrow a type after a test; see [[Pattern Matching]] and [[Typestate]]. Each step moves some checks from tests and [[Design by Contract]] into the [[Type System]].

## See also
- [[Covariance and Contravariance]]
