---
aliases:
  - Receiver operating characteristic
  - AUC
  - Area under the curve
tags:
  - agents
summary: A graph showing how a classifier trades true alarms against false alarms as its decision threshold slides, born from radar operators in the Second World War, and summarized by the area under it, the chance that a random positive case outscores a random negative one.
---
Most classifiers don't output a yes or no directly. They output a score, such as a probability of spam or of disease, and someone picks a threshold above which the answer counts as yes; see [[Logistic Regression]]. Lower the threshold and you catch more real cases but raise more false alarms. A **receiver operating characteristic curve**, or ROC curve, shows that whole trade-off at once.

The name comes from radar. During the Second World War, operators had to decide whether a blip was an aircraft or noise, and engineers needed a way to describe how well receivers and operators could do it. Signal detection theory, developed from that work, separated two things: how distinguishable the signal is from noise, and how willing the observer is to say yes. Psychologists later used it to study perception, and medicine adopted it for diagnostic tests.

The curve plots the **true positive rate**, the share of actual positives caught, against the **false positive rate**, the share of actual negatives wrongly flagged, for every possible threshold; see [[Sensitivity and Specificity]]. A perfect classifier jumps straight to the top left corner, catching everything with no false alarms. A classifier no better than a coin flip follows the diagonal. Real classifiers bow somewhere between.

The **area under the curve**, or AUC, condenses the curve into one number from 0.5 for chance to 1 for perfect. It has a neat interpretation: the probability that a randomly chosen positive case gets a higher score than a randomly chosen negative one, equivalent to a standard rank-based statistical test. Because it measures ranking, it doesn't depend on any threshold or on whether scores are well calibrated; see [[Calibration]].

That's also its weakness. A model can rank well while its probabilities are badly off. And when positives are rare, as in fraud detection or screening for an uncommon disease, a tiny false positive rate can still mean false alarms outnumber real cases many times over; see [[Base Rate Fallacy]] and [[Anomaly Detection]]. The ROC curve hides this, because its rates are computed within each class separately. A precision-recall curve, which plots how many flagged cases are real against how many real cases are flagged, exposes it and is usually preferred for imbalanced problems; see [[Precision and Recall]].

Choosing a point on the curve is a judgment about costs, not a statistical question. A spam filter may prefer to let some junk through rather than lose real mail, while a cancer screen accepts many false alarms to miss few cases; see [[Email Spam]]. Curves should be drawn on held-out data, with uncertainty shown when samples are small; see [[Train-Test Split]] and [[Statistical Significance]].

## See also
- [[Naive Bayes]]
- [[Evaluation Harness]]
- [[Wake Word]]
