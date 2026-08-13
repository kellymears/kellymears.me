---
aliases:
  - Schema
tags:
  - agents
summary: A vocabulary for describing the shape of JSON data, and the lingua franca of model tool interfaces.
---
**JSON Schema** is a specification for describing the structure of JSON documents: what properties an object has, what types they hold, which are required, what values are permitted. It is used for validation, for documentation, and — most relevantly here — as the interchange format in which tools and structured outputs are described to a [[Large Language Model]].

Because it is the format the model actually sees, the compiled schema is the artifact worth inspecting. Source-level schema code and the JSON Schema it produces are not the same thing, and several important properties are only visible in the compiled form: how many optional properties a union really contributes, whether a shared definition was inlined twice rather than referenced, and which constraints survived compilation at all. See [[Constrained Decoding]].

JSON Schema is also expressive enough to state things that no grammar can enforce. Length bounds, numeric ranges, and pattern matching are commonly stripped during compilation and demoted to prose in the field's description. Anything expressed as a custom predicate in a source-level schema library typically vanishes from the compiled output entirely — validated at runtime, invisible to the model.

Descriptions are a first-class part of the schema, not decoration. They are the only place a field can explain itself to the model.

## See also
- [[Schema Validation]]
- [[Structured Output]]
- [[Tool Use]]
- [[Structured Data]]

## Related
- [[Prompt Engineering]]
- [[Token]]
- [[Model Routing]]
