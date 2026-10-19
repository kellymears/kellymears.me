---
aliases:
  - Clinical trial registration
  - Outcome switching
tags:
  - method
summary: Publicly recording a study's hypotheses, outcomes, and analysis plan before collecting or examining the data, so that confirmatory results can be told apart from patterns found after the fact.
---
**Pre-registration** means writing down, publicly and with a timestamp, what a study will measure and how it will analyze the results before the data comes in. The record typically lists the hypotheses, the primary outcome, the sample size, the rules for excluding data, and the statistical tests. Afterward, anyone can compare the published paper with the plan.

The problem it addresses is flexibility. A researcher with a dataset faces many reasonable choices: which outcome to emphasize, which participants to exclude, which variables to adjust for, when to stop collecting. Each choice can be defended on its own, but trying several and reporting the one that worked inflates the chance of a false positive far beyond what the reported statistics suggest; see [[Garden of forking paths]], [[P-Hacking]], and [[Statistical Significance]]. Fixing the choices in advance removes that freedom for the tests that matter.

Medicine got there first. Trial registries existed earlier, but in 2004 a group of leading medical journal editors announced that they would publish only trials registered before enrolling patients, and United States law later required registration and results reporting for many trials; see [[Randomized Controlled Trial]]. The rules aimed at two distortions:

- **Unpublished trials.** Studies with disappointing results tended to vanish, skewing the visible evidence; see [[Publication Bias]].
- **Outcome switching.** A trial that missed its main outcome could report a secondary one as if it had been the point all along.

The effect can be striking. One 2015 analysis of large heart and lung trials funded by a United States agency found that a majority of trials published before mandatory registration reported a benefit, and only a small minority afterward.

Psychology and the social sciences adopted the practice in response to failed replications; see [[Replication Crisis]]. A stronger version has journals review the plan and commit to publishing the results whatever they show, so the decision can't depend on the outcome.

Pre-registration doesn't forbid exploration. Researchers can still analyze data in ways they didn't plan, as long as they label those analyses exploratory. The distinction matters because a pattern found by searching needs a fresh test before it counts as confirmed; see [[Overfitting]] and [[Train-Test Split]].

Critics note that plans are often vague, deviations go unreported, and reviewers rarely check the registration against the paper. Some fields, such as those analyzing existing datasets, find the format awkward, since the data has often been seen before any plan exists.

The underlying idea is older than any registry. A claim made before the evidence arrives can be wrong, which is what gives it value; see [[Falsifiability]]. Committing in advance also protects against reinterpreting results to fit what you now believe you expected; see [[Hindsight Bias]].

## See also
- [[Operationalization]]
- [[Meta-Analysis]]
- [[Sensitivity Analysis]]
- [[Scientific Method]]
