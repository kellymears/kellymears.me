---
aliases:
  - Algorithmic fairness
  - Machine learning bias
  - Fairness in machine learning
tags:
  - agents
summary: Systematic unfairness in automated decisions, usually inherited from biased data, proxies, or feedback loops rather than written in by anyone, and the proof that common definitions of fairness can't all be satisfied at once.
---
**Algorithmic bias** is systematic unfairness in the outputs of an automated system, where people in some groups are treated worse than others in ways that aren't justified. It rarely comes from anyone writing prejudice into code. Models learn patterns from historical data, and history contains discrimination, uneven measurement, and missing people; see [[Supervised Learning]].

Common sources:

- **Biased labels.** A hiring model trained on past hiring decisions learns whatever those decisions rewarded. Amazon scrapped an experimental résumé screener after it learned to penalize applications mentioning women's colleges and clubs, reflecting a mostly male history of technical hires.
- **Unrepresentative data.** The 2018 Gender Shades study by Joy Buolamwini and Timnit Gebru found that commercial face-analysis systems misclassified the gender of darker-skinned women at rates up to about 35 percent, versus under 1 percent for lighter-skinned men, largely because their training data skewed toward the latter; see [[Selection Bias]].
- **Proxies.** Removing a protected attribute doesn't remove its effect, because other features such as postal code, name, or purchase history correlate with it; see [[Confounding]].
- **Feedback loops.** A model that sends police where past arrests occurred generates more arrests there, which then confirms the model; see [[Feedback Loop]] and [[Self-Fulfilling Prophecy]].
- **Associations in language.** Word embeddings trained on large text collections absorb stereotypes, placing some occupations closer to one gender; see [[Embedding]].

The most debated case is COMPAS, a tool used in US courts to estimate the risk that a defendant will reoffend. A 2016 ProPublica investigation found that among defendants who did not reoffend, Black defendants were nearly twice as likely as white defendants to have been labeled high risk. The tool's maker replied that its scores meant the same thing for both groups: a given score predicted about the same reoffense rate regardless of race; see [[Calibration]].

Both claims could be true at once, and researchers soon proved why. When the underlying rates differ between groups, no imperfect predictor can be equally calibrated for both and also have equal false positive and false negative rates for both. Fairness has several reasonable mathematical definitions that are mutually incompatible, so choosing one is a value judgment, not a technical fix; see [[Precision and Recall]] and [[Base Rate Fallacy]].

Responses work at several levels. Datasets can be audited and documented, models tested across subgroups before deployment, and decisions explained and appealed; see [[Explainable AI]] and [[ImageNet]]. Some fixes are about whether a model should be used at all, since a well-calibrated score still inherits whatever the target measures. Arrest rates measure policing as well as crime; see [[Goodhart's Law]].

Human reviewers aren't a complete safeguard either, since people tend to defer to automated scores, letting the bias pass through looking objective; see [[Automation Bias]].

## See also
- [[Conformal Prediction]]
- [[Data Labeling]]
