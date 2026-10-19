---
aliases:
  - Systematic review
  - Forest plot
  - Funnel plot
tags:
  - method
summary: Combining the results of many studies on the same question into one weighted estimate, which can settle questions no single study could, and can also launder the flaws of the studies it pools.
---
A **meta-analysis** combines the results of many studies of the same question into a single overall estimate. Where individual studies are small and disagree, pooling them can reveal an effect none could detect alone, or show that an apparent effect was noise.

The method has roots in early twentieth-century statistics, but the name came from the psychologist Gene Glass in 1976, who pooled hundreds of studies of psychotherapy to settle an argument about whether it worked. Medicine adopted it widely from the 1980s, and the Cochrane Collaboration, founded in 1993, built a global practice of reviewing treatment evidence this way. Meta-analyses of well-run trials now sit near the top of most hierarchies of medical evidence; see [[Randomized Controlled Trial]].

The process starts with a **systematic review**: a search, defined in advance, for every study meeting set criteria, so the reviewers can't pick the ones that agree with them; see [[Confirmation Bias]]. Each study's result is then converted to a common scale, usually an effect size with its uncertainty; see [[Effect Size]]. The pooled estimate weights each study by its precision, so large careful studies count for more than small ones.

The standard picture is a **forest plot**: one row per study, each a point estimate with a horizontal line for its [[Confidence Interval]], and a diamond at the bottom for the pooled result. When the lines scatter widely around the diamond, the studies disagree more than chance explains, and that disagreement, called heterogeneity, is itself a finding, suggesting the effect differs between populations or methods.

Meta-analysis has known weaknesses:

- **Publication bias.** Studies with positive results get published more often, so a review of the published record overstates effects; see [[Publication Bias]]. A **funnel plot**, which graphs each study's effect against its size, can reveal the problem: small studies should scatter evenly around the true value, and a lopsided funnel suggests missing negative results.
- **Garbage in, garbage out.** Pooling many flawed studies yields a precise estimate of the flaw. Bias common to all of them, from poor blinding or flexible analysis, does not average out; see [[P-Hacking]].
- **Apples and oranges.** Studies that differ in population, dose, or measure may not be estimating the same thing, so averaging them can be meaningless.
- **Small-study effects.** Small trials often show bigger effects than large ones, through chance and selective reporting, and can dominate when they outnumber large ones.

The [[Replication Crisis]] sharpened these concerns: several meta-analyses that seemed to establish psychology findings were contradicted by later large, preregistered replications. Meta-analysis is still the best tool for summarizing a literature, as long as its result is read as a summary of the studies rather than of the world; see [[Map and Territory]].

## See also
- [[Statistical Power]]
- [[Pre-registration]]
- [[Observational Study]]
- [[Relative Risk]]
- [[Bradford Hill Criteria]]
- [[Peer Review]]
