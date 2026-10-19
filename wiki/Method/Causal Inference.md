---
aliases:
  - Counterfactual
  - Potential outcomes
  - Causal diagram
  - Difference in differences
tags:
  - method
summary: The work of determining whether and how much one thing causes another, built on comparing what happened with what would have happened otherwise, an outcome that can never be observed directly.
---
**Causal inference** is the work of determining whether, and by how much, one thing causes another, as opposed to merely accompanying it; see [[Correlation and Causation]]. Whether a drug helps or a policy reduced crime are causal questions.

The modern framing rests on the **counterfactual**. The effect of a treatment on a person is the difference between what happened to them and what would have happened to them without it. Only one of those outcomes can ever be observed, a gap sometimes called the fundamental problem of causal inference. The **potential outcomes** framework, developed by Jerzy Neyman for agricultural experiments in the 1920s and extended by Donald Rubin to observational data in the 1970s, makes the gap explicit. Individual effects are unknowable, but average effects across a group can be estimated if the treated and untreated groups are comparable.

Random assignment makes them comparable by design. Because chance decides who is treated, the groups differ on average only in the treatment, so the difference in outcomes estimates its effect; see [[Randomized Controlled Trial]] and [[AB Testing]]. Most questions can't be randomized, for ethical, practical or historical reasons, and must be answered from an [[Observational Study]] in which people chose, or were chosen for, the treatment. There the main threat is a common cause of both treatment and outcome; see [[Confounding]] and [[Selection Bias]].

Judea Pearl's **causal diagrams** draw the assumed causal structure as arrows between variables, forming a [[Directed acyclic graph]]. Rules applied to the diagram tell an analyst which variables to adjust for and, which to leave alone. Adjusting for a variable that is itself caused by both the treatment and the outcome can create a spurious association rather than remove one. Related graphs underlie probabilistic models of evidence; see [[Bayesian Network]]. Diagrams also explain why a pooled correlation can reverse inside subgroups; see [[Simpson's Paradox]].

Economists have built a toolkit of designs that exploit quirks of circumstance; see [[Natural Experiment]]. **Difference in differences** compares the change over time in a group affected by a policy with the change in a similar group that wasn't, as in a well-known 1990s study of fast-food employment in New Jersey and Pennsylvania after New Jersey raised its minimum wage. Instrumental variables use something that shifts the treatment but affects the outcome only through it. Regression discontinuity compares cases just above and just below an arbitrary cutoff, such as a test score threshold for a scholarship.

Where none of these designs is available, epidemiology falls back on weighing several lines of evidence together, such as strength, consistency, timing and a plausible mechanism; see [[Bradford Hill Criteria]]. Each method trades one set of untestable assumptions for another. The honest output is an estimate together with the assumptions it depends on, stated plainly.

## See also
- [[Shapley Values]]
- [[Scientific Method]]
- [[Counterfactual Thinking]]
- [[Activation Patching]]
