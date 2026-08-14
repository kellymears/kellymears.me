---
aliases:
  - Runtime validation
  - Parsing not validating
tags:
  - agents
summary: Checking data against a declared shape at runtime, and using the result as the typed value.
---
**Schema validation** is checking incoming data against a declared structure before trusting it. In typed languages the modern idiom is *parse, don't validate*: rather than asserting that an unknown value has a type, run it through a parser that returns a typed value or fails. The type then rests on an actual check rather than a claim.

That distinction matters because the alternative — a type assertion — is a promise the compiler accepts and never verifies. A cast asserting that a value conforms is exactly as strong as the author's belief, which is to say not at all. Where a value is already typed and merely needs re-expressing as the schema's type, running it through the parser is both safer and clearer than casting: the parser accepts unknown input by design, so no cast is needed, and permissive object schemas pass unrecognized fields through unchanged.

Two operational notes. A guard claiming a value is both `A` and `B`, backed by a check for only `B`, is unsound — it asserts the unchecked half. And where schemas grow large, keeping them in a dedicated module rather than inline keeps the module's actual exports readable.

Validation is the natural boundary for a system taking model output; see [[Structured Output]].

## See also
- [[JSON Schema]]
- [[Structured Output]]
- [[Fail Fast]]
- [[Schema Drift]]
- [[Constrained Decoding]]
- [[Tool Use]]
- [[Unreachable Code]]

## Related
- [[Prompt Engineering]]
- [[Large Language Model]]
