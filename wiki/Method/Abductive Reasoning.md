---
aliases:
  - Inference to the best explanation
  - Deductive reasoning
  - Inductive reasoning
  - Problem of induction
tags:
  - method
summary: Reasoning from a surprising observation to the hypothesis that would best explain it, the third mode beside deduction and induction, and the everyday logic of diagnosis, detective work, and debugging.
---
**Abductive reasoning** goes from an observation to the hypothesis that would best explain it. It is one of three basic modes of inference, and the one people use most when working out what is going on.

- **Deduction** applies general rules to reach conclusions that must be true if the premises are: all servers in this pool run the new version; this is one of them; so it runs the new version.
- **Induction** generalizes from cases to a rule that is probably true: every deploy that touched this file broke the build, so the next one probably will.
- **Abduction** reasons from an effect back to a likely cause: the build broke right after a change to this file, and a bad change there would explain it, so the change is a good suspect.

The philosopher Charles Sanders Peirce named it and gave its form: a surprising fact is observed; if some hypothesis were true, the fact would be a matter of course; so there is reason to suspect the hypothesis is true. The conclusion is a guess worth testing, not a proof. Fictional detectives who claim to use deduction are mostly doing abduction.

Induction has its own famous difficulty. David Hume argued in 1739 that no number of observed cases logically guarantees the next, since any justification of induction relies on induction. Europeans had seen only white swans until Dutch explorers found black ones in Australia in 1697; see [[Black Swan]]. Karl Popper's response was that science advances by testing hypotheses against attempts to refute them; see [[Falsifiability]]. In machine learning, training a model on examples is induction, and fitting the examples too closely is its characteristic failure; see [[Supervised Learning]] and [[Overfitting]].

Abduction is the everyday logic of:

- **Diagnosis**, from symptoms to the condition most likely to cause them.
- **Debugging**, from a failure to the defect that would produce it, then a test to confirm; see [[Scientific Debugging]] and [[Root Cause Analysis]].
- **Incident response**, from alerts and logs to a story of what happened; see [[Observability]].

What makes one explanation "best" is a mix of criteria: it explains more of the evidence, it needs fewer extra assumptions, it fits a known mechanism, and it was likely to begin with; see [[Occam's Razor]], [[Plausible Mechanism]], and [[Bayes' Theorem]].

Its risks follow from its speed. Once a plausible story forms, people seek evidence that fits it and stop considering alternatives; see [[Confirmation Bias]]. A pattern found after the fact can look like an explanation without being one; see [[Texas Sharpshooter Fallacy]]. The defense is to hold several hypotheses, look for the observation that would tell them apart, and test before acting.

## See also
- [[Narrative Fallacy]]
- [[No Free Lunch Theorem]]
- [[Scientific Method]]
