---
aliases:
  - LLM
tags:
  - agents
summary: A neural network trained to predict text, used as a general-purpose instruction-following system.
---
A **large language model** is a neural network trained on very large text corpora to predict continuations of a sequence. The training objective is narrow — what comes next — but at sufficient scale the resulting system can follow instructions, write and analyse code, summarise, translate, and hold a conversation.

Three properties drive nearly all practical design around them.

**They are probabilistic.** The same input can produce different outputs. This is not a defect to be engineered away but a property to be designed for; see [[Nondeterminism]].

**They have a bounded working memory.** Everything the model can consider must fit in its [[Context Window]], measured in [[Token]]s. Deciding what goes in there is most of the engineering.

**They produce fluent text regardless of whether they know the answer.** A confident, well-formed, wrong answer costs the same to generate as a right one; see [[Hallucination]].

Models are typically offered in tiers trading capability against cost and latency, which makes [[Model Routing]] a real architectural decision. Around the model sit the mechanisms that make it useful in a system: a [[System Prompt]] establishing role and rules, [[Tool Use]] for reaching the outside world, [[Structured Output]] for machine-readable results, and an [[Evaluation Harness]] for knowing whether a change helped.

## See also
- [[Prompt]]
- [[Agentic Loop]]
- [[Token Budget]]
- [[Guardrail]]
