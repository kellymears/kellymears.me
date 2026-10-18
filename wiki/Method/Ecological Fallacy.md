---
aliases:
  - Ecological inference
tags:
  - method
summary: The mistake of inferring something about individuals from statistics about the groups they belong to, since a pattern that holds across places or populations can be absent or reversed within them.
---
The **ecological fallacy** is inferring something about individuals from data about the groups they belong to. A correlation that holds across countries, states, or neighborhoods need not hold for the people inside them, and can even run the other way. The name comes from "ecological" correlations, a term for correlations between group averages, and the sociologist William Robinson's 1950 paper that showed how badly they mislead.

Robinson's example used the 1930 US census. Across states, the share of immigrants correlated positively with literacy: states with more immigrants had higher literacy rates. Yet among individuals, immigrants were less likely to be literate than native-born Americans. The group pattern arose because immigrants settled in northern industrial states that already had high literacy. Reading the state-level correlation as a fact about immigrants got the sign backwards.

Other examples:

- **Elections.** A district with many wealthy voters votes for one party, but that doesn't mean wealthy voters within it do. In the United States, richer states lean Democratic, while richer individuals within states lean Republican, a split Andrew Gelman documented in *Red State, Blue State* (2008).
- **Health.** Countries that eat more fat had more heart disease in mid-century comparisons, which says little about whether a given person's diet causes their disease, since national wealth, smoking, and record-keeping also differ between countries; see [[Confounding]].
- **Places and averages.** A neighborhood's average income can describe almost nobody in it, if it contains a few very rich and many poor households.

The fallacy is closely related to [[Simpson's Paradox]], in which a trend in each subgroup reverses when the groups are combined. Both arise because the composition of groups differs, so what holds in aggregate depends on who is in which group. The reverse error also exists: assuming that a pattern among individuals must appear for groups, or generalizing from a few individuals to a whole population; see [[Selection Bias]].

Group-level data is still useful. Some questions really are about groups, such as whether a state's policy changes its overall rates. The fallacy is only in moving from the aggregate to the individual without data on individuals. Statisticians have developed methods for estimating individual-level patterns from aggregates, used for instance in voting-rights cases, but they rest on strong assumptions.

The same logic applies to software and product metrics. A feature used more in teams that also retain better doesn't show that any individual who uses it stays longer; see [[Correlation and Causation]]. Averages over dashboards can hide opposite trends in different groups of users, which is why breaking a metric down by group, before drawing conclusions about people, is a basic habit of careful analysis.

## See also
- [[Berkson's Paradox]]
- [[Map and Territory]]
- [[Logical Fallacy]]
- [[Census]]
