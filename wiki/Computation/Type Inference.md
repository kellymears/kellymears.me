---
aliases:
  - Type Deduction
tags:
  - computation
summary: A compiler deriving a value's type from how it's used, so a programmer doesn't have to write it down.
---
**Type Inference** is a compiler's ability to determine an expression's type from context — its literal form, the functions applied to it, how its result is used — without an explicit type annotation. `let x = 5` in a statically typed inferred language like Rust or Haskell needs no `: number`; the compiler sees the literal, assigns `i32` (or generalizes it, in Haskell's case, to whatever numeric type the rest of the program constrains it to be).

The classical algorithm is Hindley-Milner, which infers the most general type consistent with a program's constraints by walking the syntax tree, generating type variables for unknowns, and unifying them against each use — two uses of the same variable in incompatible ways produce a type error even though nobody wrote a type anywhere. This is why ML-family languages (OCaml, Haskell, F#) can be almost entirely unannotated and still be fully statically typed: the annotations are optional documentation, not a requirement for soundness.

Inference is easy to conflate with dynamic typing or [[Duck Typing]], but the two are opposites on the axis that matters: an inferred type is still checked at compile time and still rejects a mismatched program before it runs, it's only the *spelling* of the type that's optional, not the checking of it. TypeScript's `let x = 5; x = "hi"` is a compile error via inference the same way an explicitly annotated `let x: number` would be.

The trade-off inference introduces is an error message pointing to where a constraint was violated rather than where the mismatched value was introduced, since inference propagates constraints forward from every use site — a single wrong argument several calls upstream can surface as a confusing type error deep inside unrelated code, which is the usual complaint leveled at Haskell's compiler.

## See also
- [[Pattern Matching]]
- [[Duck Typing]]
- [[Compiler]]
- [[Schema Validation]]
