---
aliases:
  - Gradual typing
  - Type erasure
  - Type annotations
tags:
  - web
summary: Microsoft's typed superset of JavaScript, whose types are checked at build time and erased at runtime, and the deliberate trade-offs that made it the default for large web codebases.
---
**TypeScript** is JavaScript with static types. Microsoft released it in 2012, led by Anders Hejlsberg, the designer of C#. Any valid JavaScript is valid TypeScript, and a compiler checks the added type annotations, then strips them out to produce plain JavaScript. The types exist only at build time.

That design, **type erasure**, set TypeScript's character. It adds no runtime and can be adopted one file at a time. Existing libraries get types through declaration files, many of them written by the community in the DefinitelyTyped repository. Because types vanish at runtime, data arriving from outside, such as an API response or a form, isn't checked by them at all, which is why runtime [[Schema Validation]] libraries are common alongside it.

Its type system is shaped to fit how JavaScript is actually written:

- **Structural typing.** Two types are compatible if their shapes match, regardless of their names, the static counterpart of [[Duck Typing]].
- **Gradual typing.** The `any` type turns checking off for a value, so a codebase can move from untyped to strict at its own pace.
- **Inference and narrowing.** Most local types are inferred, as in [[Type Inference]], and the checker follows control flow, so inside `if (typeof x === "string")` it knows `x` is a string.
- **Unions and literal types.** Discriminated unions model the algebraic data type, letting the checker confirm every case is handled. Conditional and mapped types compute new types from old ones, a type language expressive enough to reach Turing Completeness.

TypeScript is **deliberately unsound**. Its designers listed soundness as an explicit non-goal, choosing convenience and compatibility over guarantees. In practice it catches most mistakes a test would, typos, missing properties, wrong arguments, at the moment of typing, and makes [[Static Analysis]] such as rename-across-project reliable. Its real product is arguably the editor's language service, behind autocomplete and navigation even for plain JavaScript.

Flow, Facebook's competing checker, launched in 2014 and lost the ecosystem. By the 2020s most major frameworks and libraries were written in TypeScript, and it ranked among the most used languages on GitHub.

Two developments are changing how it runs. Node.js began stripping types natively in 2024 and 2025, running `.ts` files directly by erasing annotations without checking them. And in 2025 Microsoft announced a port of the compiler from TypeScript to Go, reporting about tenfold faster type checking for large projects. A TC39 proposal would let JavaScript engines ignore type syntax directly.

The build step usually belongs to the [[Bundler]] or a fast transpiler that strips types without checking them, while the full checker runs separately in the editor and in continuous integration. Source Maps connect the output back to the typed source.

## See also
- [[JavaScript]]
- [[Generics]]
