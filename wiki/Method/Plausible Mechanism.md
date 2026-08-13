---
aliases:
  - Unearned explanation
  - Because X
tags:
  - method
summary: A causal explanation that was inferred rather than tested, and reads as more rigorous for being specific.
---
A **plausible mechanism** is an explanation of *why* something happens that was never verified — offered because an explanation is the natural shape of an answer, and a specific one sounds more authoritative than "I don't know".

The trap is structural rather than careless. Saying "the compiler requires this cast because the inferred type lacks the property" feels like rigour; saying "the compiler requires this and I have not established why" feels like weakness. But only the second is honest before the ten-second experiment — delete the cast, run the type checker — has been run.

Two things make the failure mode worse than it looks. First, unearned causal claims land mostly in *explanatory* artifacts: code comments, docblocks, review comments, change descriptions. Nothing executes against prose, so a wrong mechanism in a source file passes every gate and inherits the credibility of the gates it passed. Second, a merged change description becomes the permanent record — see [[Provenance]].

The rule that survives: before writing "because X", run something that would tell you if X were false. If you cannot, write what you observed and say the cause is not established. When a reviewer asks *why*, that question is the trigger to go find out, not permission to guess more precisely.

## See also
- [[Falsifiability]]
- [[Exhaustive Claim]]
- [[Ground Truth]]
- [[Code Comment]]
- [[Hallucination]]
- [[Code Review]]
- [[Adversarial Review]]

## Related
- [[Naming]]
- [[Chesterton's Fence]]
