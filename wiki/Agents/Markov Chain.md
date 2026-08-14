---
aliases:
  - Markov process
  - N-gram model
tags:
  - agents
summary: A process whose next state depends only on the present state, and the basis of pre-neural text generation.
---
A **Markov chain** is a stochastic process in which the distribution over the next state depends only on the current state, not on how that state was reached. That restriction is the **Markov property**, and it lets the whole process be described by a transition matrix. Andrey Markov introduced it around 1906 and demonstrated it on the vowel and consonant sequence of a Russian verse novel, to show that dependent events could still obey statistical laws.

Applied to text, the state is the last *n−1* words or characters and the model is an **n-gram**: count every continuation in a corpus, then sample one. This was the pre-neural chatbot. It powered decades of generated-text toys, early predictive keyboards, and Claude Shannon's 1948 approximations to English, which already displayed the whole phenomenon.

The order tradeoff is the instructive part. Low order produces novel but nonsensical strings. Raising it makes output more fluent, but corpus sparsity bites immediately: most long contexts occur exactly once, so a high-order model has one legal continuation and reproduces its source verbatim. Smoothing and backoff schemes interpolate between orders, managing the problem rather than solving it.

The result is text that is locally fluent and globally incoherent. Each transition is well formed because it was observed; nothing survives beyond the window, so no referent, claim or intention is tracked across sentences. Attention changed exactly this — a [[Large Language Model]] can condition on any earlier [[Token]] within its [[Context Window]], which is why agreement holds over long spans. What did not change is the shape: sampling one token at a time from a conditional distribution is the same operation, worth remembering when explaining [[Hallucination]] or [[Nondeterminism]]. Fluency is cheap; coherence is the part that needs structure.

## See also
- [[Large Language Model]]
- [[Seeded Randomness]]
- [[Procedural Generation]]
- [[Automatic Speech Recognition]]
- [[Mechanistic Interpretability]]
