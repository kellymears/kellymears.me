---
aliases:
  - Bayes' rule
  - Bayesian reasoning
  - Bayesian updating
  - Prior probability
  - Posterior probability
  - Conditional probability
tags:
  - method
summary: The rule for updating a belief in light of new evidence, combining how likely something was beforehand with how much more likely the evidence is if it's true.
---
**Bayes' theorem** says how to update a belief when new evidence arrives. In words: how much you should believe something after seeing evidence depends on how much you believed it before, multiplied by how much more likely that evidence is if the belief is true than if it's false. Thomas Bayes worked out a special case in the 1740s, published after his death, and Pierre-Simon Laplace developed the general form.

Written as an equation, `P(H|E) = P(E|H) × P(H) / P(E)`. Each part has a name:

- **The prior**, `P(H)`, is how likely the hypothesis was before the evidence.
- **The likelihood**, `P(E|H)`, is how likely the evidence would be if the hypothesis were true.
- **The posterior**, `P(H|E)`, is the updated belief.
- **The evidence**, `P(E)`, normalizes the result, counting every way the evidence could have appeared.

The classic example is a medical test. A disease affects 1 in 1,000 people, and a test catches 99% of cases with a 5% false positive rate. Someone tests positive. Most people, including many doctors in studies, guess they probably have it. Bayes says the chance is under 2%: of 1,000 people tested, about one true case tests positive, while about fifty healthy people do too. The prior, the rarity of the disease, overwhelms the test's accuracy. Ignoring it is the [[Base Rate Fallacy]], and the test's two error rates are its [[Sensitivity and Specificity]].

Several habits of good reasoning follow from the theorem:

- **Evidence is relative.** What matters is how much more likely the evidence is under one explanation than another. Evidence that fits every explanation equally, such as a symptom common to many conditions, should barely move belief.
- **Extraordinary claims need extraordinary evidence.** A low prior needs a strong likelihood ratio to overcome.
- **Update in steps.** Today's posterior becomes tomorrow's prior, so belief shifts gradually as evidence accumulates rather than flipping.
- **Never certainty.** A prior of exactly zero or one can't be updated by any evidence, which is why careful reasoners avoid absolute confidence.

The theorem resolves puzzles that feel paradoxical, such as the [[Monty Hall Problem]], where the host's choice is evidence that changes the odds. It underlies spam filters, medical diagnosis, search and rescue planning, and much of machine learning, where training can be seen as updating a model's beliefs about the world. [[Predictive Processing]] proposes that the brain itself works roughly this way.

Bayesian statistics, which treats probabilities as degrees of belief, contrasts with the frequentist approach behind significance testing, whose misuse drives the [[Replication Crisis]] and [[P-Hacking]]. The two schools often agree in practice, but the Bayesian framing makes the role of prior plausibility explicit, much as a [[Plausible Mechanism]] makes a surprising claim more believable.

## See also
- [[Occam's Razor]]
- [[Falsifiability]]
- [[Correlation and Causation]]
- [[Fermi Estimation]]
- [[Calibration]]
- [[Statistical Significance]]
