---
aliases:
  - JSON mode
  - Object generation
tags:
  - agents
summary: Constraining a model to emit data conforming to a declared schema rather than free text.
---
**Structured output** is the practice of requiring a model's response to conform to a declared schema — typically expressed as [[JSON Schema]] — so the result can be consumed by code without parsing prose. It underlies both [[Tool Use]] and any pipeline that needs machine-readable results.

The important subtlety is that *not every part of a schema is enforced the same way*. Providers commonly compile the schema into a grammar that constrains generation, but only for the parts a grammar can express: object shape, property names, types, enumerations, required-versus-optional. Constraints like minimum length, maximum length, item counts, and regular-expression patterns are typically stripped out of the grammar and appended to the field's description as prose. The model is then merely *asked* to respect them, while the client library still validates the reply against the full schema — so a bound set close to the length actually wanted produces intermittent hard failures.

Two consequences follow. Put the intended target in the description and keep any hard limit far away as a runaway backstop, per [[Anchoring Effect]]. And treat anything the grammar cannot express — custom refinements, cross-field rules — as runtime validation only, invisible to the model, which means the failure message is the only channel that teaches it what is legal.

## See also
- [[Constrained Decoding]]
- [[Schema Validation]]
- [[Prompt Engineering]]
- [[Nondeterminism]]
- [[Large Language Model]]

## Related
- [[Token]]
- [[Model Routing]]
