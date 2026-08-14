---
aliases:
  - Survivor bias
tags:
  - method
summary: Drawing conclusions from a sample already filtered by success.
---
**Survivorship bias** is the error of reasoning from a sample that has been filtered by whatever process you are trying to study, so that the failures are missing from the data before you ever look at it. The conclusions look sound because the evidence is real — it is simply evidence about the survivors, not about the population that produced them.

The canonical case is Abraham Wald's wartime work on Allied bombers. In the standard telling, engineers wanted to reinforce the areas of returning aircraft most peppered with bullet holes, and Wald argued the opposite: those planes had survived hits there, so the pattern showed where a plane could be shot and still make it home. The panels worth armouring were the ones with no holes recorded on any returning aircraft, because a hit there meant the plane never returned to be counted. The [[Ground Truth]] was never in the sample — it was in the gap.

The confrontation itself is a later reconstruction. Wald's 1943 memoranda present a statistical method for estimating the vulnerability of an aircraft's parts from the damage survivors carried; they name no particular aircraft type and stage no argument against obtuse officers. The reasoning is his, the scene is not, and the version that survived retelling is the one with a villain in it — the bias at work on the history of the bias.

The general move Wald's analysis teaches is to ask what is missing from a dataset before asking what the data says, since a filtered sample is not a smaller version of the true population but a different, biased one. A postmortem built only from incidents that paged someone has the same shape: it describes what got noticed, not what went wrong. The same blind spot appears wherever [[Instrumentation]] only records the cases that reach it, which is one reason [[Streetlight Effect]] and survivorship bias so often compound each other, and why a specific case of it, [[Selection Bias]], deserves separate treatment for the ways sampling itself can be non-random.

## See also
- [[Truncation Bias]]
- [[Fermi Estimation]]
- [[Observability]]
- [[Root Cause Analysis]]
- [[Sensitivity and Specificity]]
