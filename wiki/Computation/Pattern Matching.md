---
aliases:
  - Destructuring
tags:
  - computation
summary: Testing a value against a shape and binding its parts to names in one step, instead of inspecting it field by field.
---
**Pattern Matching** checks a value against one of several shapes and, on a match, binds the parts of that shape to names — combining a conditional and a destructuring assignment into a single construct. Rust's `match Option<T> { Some(x) => ..., None => ... }` or Haskell's equations defined directly on constructors (`length [] = 0; length (_:xs) = 1 + length xs`) replace what would otherwise be a chain of `if`/`isSome`/unwrap calls with a form the compiler can check for completeness.

That last part is the real payoff over an `if`/`else` chain doing the same job by hand: an exhaustiveness checker can prove every case of a sum type is handled and refuse to compile if one is missing, catching the "forgot the new variant" bug at compile time rather than at a runtime `null` dereference. This is why pattern matching and algebraic data types (the `enum`/discriminated-union style, as opposed to [[Duck Typing]]) show up together — the checker needs the type to have a closed, known set of shapes to check against.

Structural destructuring — `const { name, address: { city } } = user` in JavaScript, or a tuple pattern `let (a, b) = pair` — is pattern matching's simplest case: a single always-true pattern used purely to unpack, with no branching. Guard clauses extend a pattern with an extra boolean condition (`Some(x) if x > 0 => ...`), letting a match express "this shape, and also this predicate" without falling back to a nested `if` inside the match arm.

The failure mode is a match that looks exhaustive but isn't, in a language without a checker for it — JavaScript's `switch` has no exhaustiveness guarantee, so a case silently falls through to nothing (or a bug-prone default) if a new variant is added later and a switch elsewhere is forgotten to be updated.

## See also
- [[Type Inference]]
- [[Currying]]
- [[Duck Typing]]
- [[Finite State Machine]]
