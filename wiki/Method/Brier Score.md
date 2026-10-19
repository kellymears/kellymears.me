---
aliases:
  - Proper scoring rule
tags:
  - method
summary: A way to grade probability forecasts by the squared gap between the stated probability and what happened, rewarding forecasters who are both well calibrated and willing to commit, and impossible to game by shading an honest belief.
---
The **Brier score** grades forecasts stated as probabilities. For each prediction, take the probability given, subtract 1 if the event happened or 0 if it didn't, and square the result. Average over all predictions. A perfect forecaster scores 0. Someone who says 50 percent about everything scores 0.25 on yes-or-no questions, and confident wrong answers push the score toward the worst possible value, 1.

Glenn Brier, a meteorologist, proposed it in 1950 for checking weather forecasts. A 70 percent chance of rain can't be right or wrong on one day, but over hundreds of days it can be checked. A forecaster who says 70 percent should see rain on about 70 percent of those days; see [[Calibration]].

The score's most important property is that it's **proper**. A proper scoring rule gives a forecaster the best expected score for reporting what they believe. If you think an event has a 60 percent chance, saying 80 percent to look bold or 50 percent to look safe makes your expected score worse; see [[Expected Value]]. Scoring forecasts simply by whether the more likely outcome happened rewards rounding every belief to 0 or 100, which throws away the information a probability is meant to carry.

The squared error is one of several proper rules. The logarithmic score, the log of the probability assigned to what actually happened, is another, and it punishes confident mistakes far more harshly: a forecaster who said 0 percent about something that occurred gets an infinitely bad score. Machine learning uses the same idea when training classifiers; see [[Loss function]].

The Brier score can be split into parts:

- **Reliability.** How closely stated probabilities match observed frequencies.
- **Resolution.** How much the forecasts vary from case to case, separating likely events from unlikely ones.
- **Uncertainty.** How unpredictable the events are in the first place, which no forecaster controls.

The split explains why calibration alone isn't enough. Someone who always predicts the historical rate of rain is well calibrated and useless, since they never distinguish one day from another; see [[Base Rate Fallacy]].

Forecasting tournaments made the Brier score familiar outside meteorology. Philip Tetlock's research, which found that a small group of careful amateurs could outpredict experts, ranked participants by it; see [[Superforecasting]]. Scores also test whether averaged forecasts beat individuals; see [[Wisdom of the Crowd]].

Scores are only comparable across the same questions. Forecasting easy questions produces good scores without skill, so any metric used to rank people invites choosing the questions strategically; see [[Goodhart's Law]]. A low score on rare events can also hide catastrophic misses on the few that matter; see [[Black Swan]].

A scored record replaces impressions with evidence, countering the habit of remembering hits and forgetting misses; see [[Hindsight Bias]] and [[Bayesian Inference]].

## See also
- [[Confidence Interval]]
- [[Dunning-Kruger Effect]]
- [[Conformal Prediction]]
