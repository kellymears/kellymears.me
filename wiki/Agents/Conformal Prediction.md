---
aliases:
  - Prediction set
  - Split conformal prediction
tags:
  - agents
summary: A statistical method that wraps any predictive model and outputs a set or range of answers guaranteed to contain the truth at a chosen rate, assuming only that new data resembles the data used to calibrate it.
---
**Conformal prediction** is a statistical method that turns any predictive model's output into a set of possible answers, or a range of values, that contains the true answer at a rate the user chooses, such as 90% of the time. Its appeal is that the guarantee holds regardless of how good or bad the underlying model is, and without assumptions about the data's distribution; see [[Supervised Learning]].

Most models give a single answer and perhaps a confidence score, and those scores are often poorly calibrated: a model saying 95% may be right far less often; see [[Calibration]]. Conformal prediction sidesteps the model's own confidence. It measures how the model actually performs on held-out data and builds its sets from that.

The common version, **split conformal prediction**, works in three steps. First, set aside a calibration set of labeled examples the model wasn't trained on; see [[Train-Test Split]]. Second, compute a score for each calibration example measuring how wrong or unusual the model's prediction was, such as one minus the probability the model gave the correct label. Third, find the score threshold that 90% of calibration examples fall below. For a new input, the prediction set includes every candidate answer whose score would fall under that threshold.

The resulting sets adapt to difficulty. For an easy input, only one label clears the threshold; for an ambiguous one, the set grows to include several; for a regression problem, the interval widens. A large set is useful information in itself: it says the model isn't sure, and a system can defer to a person; see [[Human in the Loop]].

The ideas were developed by Vladimir Vovk, Alexander Gammerman, and Glenn Shafer, starting in the late 1990s, and gained wide use in machine learning in the 2020s.

The guarantee has important fine print. It requires that calibration and new data be exchangeable, roughly that they come from the same process in no particular order. When the data changes, as it does in most deployments, coverage can quietly drop; see [[Distribution Shift]]. The guarantee is also on average across inputs, not for each individual: a model can meet 90% overall while doing much worse on a minority subgroup; see [[Algorithmic Bias]]. Variants address both problems, at some cost.

Conformal prediction is being applied to language models, for example to return a set of candidate answers likely to include a correct one, or to decide when a model should abstain rather than risk a fabricated answer; see [[Hallucination]].

The idea resembles a confidence interval but differs in what it covers: a confidence interval brackets an unknown parameter, while a conformal set brackets the next observation; see [[Confidence Interval]] and [[Bootstrap Resampling]].

## See also
- [[Brier Score]]
- [[Superforecasting]]
