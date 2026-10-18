---
aliases:
  - Model calibration
  - Confidence calibration
  - Calibrated confidence
  - Expected calibration error
tags:
  - agents
summary: Whether a model's stated confidence matches how often it is actually right, why modern models are often overconfident, and why calibration matters for knowing when to trust them.
---
A model is **calibrated** when its confidence matches its accuracy. Of all the predictions it makes with 80 percent confidence, about 80 percent should turn out right. A weather forecaster who says "70 percent chance of rain" on many days is well calibrated if it rains on about 70 percent of them. Calibration is separate from accuracy: a model can be highly accurate and badly calibrated, or mediocre and perfectly calibrated, honestly reporting its uncertainty.

It's measured with a reliability diagram. Group predictions by stated confidence, such as all those between 70 and 80 percent, and plot each group's actual accuracy. A calibrated model's points lie on the diagonal. The **expected calibration error** averages the gaps. The Brier score, from weather forecasting, scores probabilistic predictions by both calibration and sharpness.

Calibration matters whenever decisions depend on confidence. A medical model that says 95 percent should mean it; an automated system needs to know when to defer to a person; see [[Human in the Loop]]. Ensembles and routing systems weigh models by their confidence; see [[Model Routing]]. Without calibration, confidence scores are decorative.

Modern neural networks tend to be **overconfident**. A 2017 study found that deeper networks, though more accurate, were more overconfident than older, smaller ones, partly because training keeps pushing predicted probabilities toward certainty to lower the loss. A simple fix, *temperature scaling*, divides the model's raw scores by a constant before [[Softmax]], tuned on held-out data so confidences match accuracy; see [[Train-Test Split]].

Language models raise their own questions:

- **Token probabilities.** A pretrained [[Large Language Model]] is often well calibrated at the level of next-token probabilities, because [[Pretraining]] directly rewards accurate probabilities. Training afterward to be helpful and agreeable, as in [[Reinforcement Learning from Human Feedback]], tends to degrade that calibration.
- **Stated confidence.** When asked how sure it is, a model's verbal answer ("I'm fairly confident") may not track its actual accuracy. Models can state falsehoods fluently and confidently; see [[Hallucination]]. Training models to say "I don't know" when uncertain is an active area of work.
- **Consistency as a signal.** Sampling the same question several times and checking agreement is a practical uncertainty estimate: answers that vary across samples are less likely to be right; see [[Temperature Sampling]].

People need calibration too. Forecasting research found that most people are overconfident, and that calibration improves with practice and feedback, by keeping score of predictions. The same habit applies to trusting machines: users who over-trust confident systems fall into [[Automation Bias]], and a system that admits uncertainty can be more useful than one that's always sure.

Calibration also shifts with data. A model calibrated on its training distribution can become overconfident when inputs change, precisely when caution matters most; see [[Distribution Shift]].

## See also
- [[Precision and Recall]]
- [[ELIZA Effect]]
- [[Wisdom of the Crowd]]
- [[Confidence Interval]]
