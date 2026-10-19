---
aliases:
  - Confounder
  - Confounding variable
  - Lurking variable
tags:
  - method
summary: A hidden third factor that drives both the supposed cause and the supposed effect, creating a correlation that looks causal, and the main reason observational data so often misleads.
---
**Confounding** happens when a third factor, a *confounder*, influences both a suspected cause and its supposed effect, making them move together even though one doesn't cause the other. It's the most common reason a correlation turns out not to mean causation; see [[Correlation and Causation]].

The classic example: ice cream sales and drowning deaths rise and fall together. Ice cream doesn't cause drowning. Hot weather causes both. Temperature is the confounder. Remove its influence, by comparing only days of similar temperature, and the link between ice cream and drowning disappears.

Real cases are less obvious:

- **Hormone replacement therapy.** Observational studies in the 1980s and 1990s found women taking it had less heart disease. A large [[Randomized Controlled Trial]] in 2002 found it slightly *increased* risk. Women who chose the therapy tended to be wealthier and healthier to begin with.
- **Moderate drinking.** Studies long found moderate drinkers healthier than non-drinkers. Part of the explanation: the "non-drinker" group included people who'd quit because they were already ill.
- **Engineering metrics.** Teams that write more tests may ship fewer bugs, but experienced teams may do both. Services with more alerts may have more outages, because the troubled ones got the alerts added.

Confounders also create [[Simpson's Paradox]], where a trend in every subgroup reverses when the groups are combined, because a confounder determines who ends up in each group.

Ways to deal with confounding:

- **Randomization.** Assigning the treatment by chance breaks any link between it and pre-existing differences, measured or not. This is why randomized trials and [[AB Testing]] are the strongest evidence.
- **Adjustment.** Statistically controlling for known confounders, such as age or income. This handles only confounders that were measured, and measured accurately.
- **Natural experiments.** Finding situations where something close to random, such as a lottery or an arbitrary cutoff, decided who got the treatment.
- **Causal diagrams.** Drawing what causes what makes explicit which variables to adjust for. Adjusting for the wrong variable, such as something the treatment itself causes, can introduce bias rather than remove it.

Confounding is related to [[Selection Bias]], where how subjects enter a study creates a spurious pattern, and to reverse causation, where the effect drives the cause, as when sick people stop exercising and exercise then appears to protect health. All three produce the same symptom: a real correlation with a misleading story attached.

A useful habit when shown a correlation is to ask what else differs between the groups. Usually a [[Plausible Mechanism]] for a confounder is easier to find than one for the claimed cause.

## See also
- [[Red Herring]]
- [[Survivorship Bias]]
- [[Linear Regression]]
- [[Berkson's Paradox]]
- [[Natural Experiment]]
- [[Ecological Fallacy]]
- [[Algorithmic Bias]]
- [[Observational Study]]
- [[Bradford Hill Criteria]]
