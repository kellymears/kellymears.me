---
aliases:
  - Grammar-constrained generation
  - Compiled grammar
tags:
  - agents
summary: Restricting a model's next-token choices to those a formal grammar permits.
---
**Constrained decoding** forces a model's output to conform to a formal grammar by masking, at each step, the tokens that could not continue a valid string. It is what makes [[Structured Output]] reliable rather than hopeful: the model cannot emit malformed JSON because malformed continuations are not available to it.

The grammar has to be compiled from the schema, and that compilation has real costs and real limits — which show up as production constraints rather than theory.

**Cost is driven by breadth, not size.** A flat enumeration with dozens of members is cheap; a discriminated union of a dozen object types is expensive, because the compiler pays per alternative. Trimming fields inside a union member does not help; removing a member does.

**Optional properties are budgeted.** Providers impose ceilings on the number of optional parameters in a schema, and a nested union that inlines the same alternatives twice pays twice. Adding one optional field to a leaf can push a whole phase over the limit, and the failure is a rejection before inference — fast, total, and unrelated-looking.

**Compilation itself can time out** on large schemas, sometimes for schemas that are byte-identical to ones that compile fine, depending on how they were constructed.

The practical rule: measure the compiled schema, not the source. See [[JSON Schema]].

## See also
- [[Structured Output]]
- [[Schema Validation]]
- [[Model Routing]]
- [[Token]]
- [[Prompt Engineering]]
- [[Guardrail]]

## Related
- [[Tool Use]]
- [[Large Language Model]]
