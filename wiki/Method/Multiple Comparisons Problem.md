---
aliases:
  - Multiple comparisons
  - Multiple testing
  - Bonferroni correction
  - False discovery rate
  - Garden of forking paths
tags:
  - method
summary: The more questions you test, the more likely some will look significant by chance alone, so a finding plucked from many tests needs a stricter threshold or an independent check.
---
The **multiple comparisons problem** is that testing many hypotheses at once makes false positives almost certain. A test at the usual 5 percent threshold has a one-in-twenty chance of flagging a difference that isn't there. Run twenty independent tests on pure noise and the odds that at least one comes out "significant" are about 64 percent; run a hundred and it's nearly guaranteed; see [[Statistical Significance]].

The problem is easiest to see in a well-known comic in which scientists test whether jelly beans cause acne. The overall test finds nothing, so they test each of twenty colors separately, and green comes out significant. The headline announces that green jelly beans cause acne. Nothing went wrong in any single test; the error was in reporting one result picked from twenty.

It turns up in many forms:

- **Subgroups.** A treatment that failed overall "works" for women over sixty, or for patients enrolled on Tuesdays. With enough subgroups, one always shines.
- **Many outcomes.** A study measures thirty things and reports the one that moved.
- **Genomics and imaging.** Testing a million genetic variants or a hundred thousand brain voxels guarantees thousands of chance hits. A famous 2009 poster found apparent brain activity in a dead salmon shown photographs, to make the point.
- **Dashboards.** Product teams watching dozens of metrics in an experiment will see some move by chance; see [[AB Testing]].

Statisticians Andrew Gelman and Eric Loken called a subtler version the **garden of forking paths**. Even a researcher who runs only one test may have chosen it after seeing the data, among many reasonable choices of which outcome, which controls, and which outliers to drop. The comparisons were never run, but they were available, and the choice was guided by the data; see [[P-Hacking]] and [[Texas Sharpshooter Fallacy]].

Corrections:

- **Bonferroni correction.** Divide the threshold by the number of tests, so twenty tests each need p below 0.0025. Simple and strict, it can miss real effects; see [[Statistical Power]].
- **False discovery rate.** Methods such as Benjamini–Hochberg (1995) control the expected share of false positives among the findings rather than the chance of any, a better fit for large screens.
- **Preregistration.** Declaring the primary outcome and analysis in advance removes the forking paths; see [[Replication Crisis]].
- **Holdout data.** Treat what was found in one dataset as a hypothesis, and test it on fresh data; see [[Overfitting]].

The problem is a cousin of the base rate issue in diagnostic testing. When true effects are rare among the things tested, most positives are false, however accurate each test is; see [[Base Rate Fallacy]]. A finding is only as surprising as the number of places someone looked for it, which physicists call the look-elsewhere effect.

## See also
- [[Publication Bias]]
- [[Survivorship Bias]]
