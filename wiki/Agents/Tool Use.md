---
aliases:
  - Function calling
  - Tools
tags:
  - agents
summary: Giving a model a set of callable functions so it can act on the world rather than only describe it.
---
**Tool use** — also called function calling — is the mechanism by which a [[Large Language Model]] invokes external code. The host declares a set of tools, each with a name, a description, and an input schema; the model may emit a structured call instead of prose; the host executes it and returns the result as a new turn. Repeating this is the [[Agentic Loop]].

The tool *definition* is the model's entire understanding of the capability. Its description is not documentation for humans who happen to be reading — it is the prompt that decides whether the tool gets used correctly, and it is where routing and disambiguation guidance belongs. Because it ships with the implementation it cannot drift, which is why a separate written catalog of tools is a liability; see [[Documentation Rot]].

Several practical constraints repeat. Input schemas are typically validated by the framework that presents the tools, so code paths that invoke a tool's implementation directly bypass that validation entirely — a security argument resting on "the schema constrains this value" holds only for the routed path. Descriptions of every field are worth requiring mechanically, since a model that must guess a shape will guess. And the *set* of tools offered is itself context: more tools means more [[Token]]s and more opportunity to pick wrong.

## See also
- [[Structured Output]]
- [[JSON Schema]]
- [[Schema Validation]]
- [[Model Context Protocol]]
- [[Guardrail]]
- [[Fingerprint]]
