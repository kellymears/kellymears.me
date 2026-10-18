---
aliases:
  - Confidence intervals
  - Margin of error
  - Error bars
tags:
  - method
summary: A range around an estimate that conveys how precisely it was measured, more informative than a yes-or-no significance verdict, and easy to misread as a statement of probability about the true value.
---
A **confidence interval** is a range of plausible values for something being estimated, reported alongside the estimate itself. A poll that finds 52% support "with a margin of error of plus or minus 3 points" is reporting a confidence interval from 49% to 55%. The width says how precisely the data pins the answer down.

Formally, a 95% confidence interval comes from a procedure that, if the study were repeated many times, would produce intervals containing the true value 95% of the time. The subtlety matters: any single interval either contains the true value or doesn't. Saying "there's a 95% chance the true value is in this interval" is a common misreading, though a forgivable one; a Bayesian *credible interval* does mean that, given a prior; see [[Bayes' Theorem]].

Why intervals beat significance verdicts alone:

- **They show size and uncertainty together.** "Conversion rose 2%, interval 0.1% to 3.9%" says the effect is real but possibly tiny. "Rose 2%, interval −5% to 9%" says the study can't tell; see [[Effect Size]].
- **They make non-results honest.** A wide interval spanning zero means "we don't know," not "no effect," which a bare non-significant result invites people to conclude; see [[Statistical Power]].
- **They contain the significance test.** A 95% interval that excludes zero corresponds to significance at 0.05; see [[Statistical Significance]].

Width shrinks with the square root of the sample size. Halving the margin of error takes four times as many observations, which is why precise estimates get expensive quickly.

Common mistakes:

- **Reading overlap as no difference.** Two groups' intervals can overlap somewhat even when the difference between them is significant. Comparing groups needs an interval for the difference itself.
- **Ignoring what the interval doesn't cover.** A poll's margin of error covers random sampling only. It says nothing about biased samples, unrepresentative respondents, or badly worded questions, which often matter more; see [[Selection Bias]].
- **Unlabeled error bars.** Charts draw bars for standard deviation, standard error, or a confidence interval, which differ greatly in width. Without a label, readers can't tell which; see [[Data Visualization]].

Intervals carry over to engineering. Reporting a [[Benchmark]] as one number hides run-to-run noise; an interval reveals whether a "2% speedup" is real or within the variation between runs. Estimates of effort benefit from the same idea: a range with a stated confidence is more honest than a single date; see [[Planning Fallacy]] and [[Fermi Estimation]].

Most people are badly calibrated with their own intervals. Asked for 90% ranges on trivia questions, they capture the true answer far less than 90% of the time, a classic finding about overconfidence; see [[Calibration]].

## See also
- [[Scatter Plot]]
- [[Box Plot]]
- [[Law of Large Numbers]]
- [[Cone of Uncertainty]]
- [[Fault Seeding]]
