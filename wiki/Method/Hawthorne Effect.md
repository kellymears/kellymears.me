---
aliases:
  - Observer-expectancy effect
  - Reactivity bias
tags:
  - method
summary: The tendency for people to change their behavior because they know they are being watched, named for 1920s factory studies whose own findings turned out to be shakier than the effect they named.
---
The **Hawthorne effect** is the change in people's behavior caused by knowing they are being observed or studied. Workers watched by researchers may work harder, patients in a trial may take their medicine more carefully, and teams tracked on a dashboard may change what they do. Any of these can be mistaken for the effect of whatever was being tested.

The name comes from studies at the Western Electric Hawthorne Works near Chicago between 1924 and 1932. In the best-known experiments, researchers raised and lowered the lighting in a workroom to see how it affected productivity. Output reportedly rose almost regardless of the change, even when the lights were dimmed, and later writers concluded that the attention itself, not the light, had made the difference. The term was coined in 1953.

The original evidence is weaker than the legend. Later reanalyses of the surviving data found that the lighting studies were never properly published, that productivity changes were small and better explained by other factors, such as seasonal patterns and the replacement of two workers mid-study, and that the clean story was largely built afterward. Reviews of later studies find that observation effects are real but variable: sometimes large, often small, and dependent on what people believe the observer wants.

The broader principle holds up well. Related effects include:

- **Observer-expectancy effects.** Researchers who know what they hope to find can influence subjects without intending to, through tone or small cues. The horse Clever Hans appeared to do arithmetic but was reading his trainer's unconscious signals.
- **Demand characteristics.** Participants guess the hypothesis and act to confirm or defy it.
- **Placebo effects.** Expecting treatment changes outcomes; see [[Placebo Effect]].

Methods have been built around these. [[Randomized Controlled Trial]]s give control groups equal attention, so the effect appears in both groups and cancels out, and blinding hides from participants and researchers who received what. Usability researchers know that people in a lab try harder and blame themselves less than they would at home; see [[Usability Testing]].

In software and management, the effect appears whenever measurement changes behavior. Tracking lines of code or tickets closed changes what people produce, often for the worse, a close relative of [[Goodhart's Law]]. Adding logging or a debugger can change timing enough to hide a bug; see [[Heisenbug]]. A/B tests sometimes show early gains that fade as novelty wears off; see [[AB Testing]].

The practical lesson is to assume observation has some effect and to design around it: compare against equally observed controls, measure over long enough periods for novelty to fade, and prefer data collected passively; see [[Confounding]] and [[Observability]].

## See also
- [[Obedience to Authority]]
- [[Cobra Effect]]
- [[Self-Fulfilling Prophecy]]
- [[Natural Experiment]]
- [[Panopticon]]
- [[Observational Study]]
- [[Playtesting]]
