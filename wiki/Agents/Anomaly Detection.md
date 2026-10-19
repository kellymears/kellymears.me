---
aliases:
  - Outlier detection
  - Novelty detection
  - Isolation forest
tags:
  - agents
summary: Finding the rare data points that don't fit the usual pattern, used for fraud, intrusions, and failing machines, where the hard part is usually not spotting oddities but drowning in false alarms.
---
**Anomaly detection** is finding the observations that don't fit the usual pattern: the fraudulent card charge, the server suddenly sending traffic to a new country, the bearing that starts to vibrate before it fails. Anomalies are rare and usually unlabeled, since nobody knows in advance what the next fraud will look like, so most methods learn what normal looks like and flag departures from it; see [[Unsupervised learning]].

The simplest approach is statistical: flag any value more than three standard deviations from the average; see [[Standard deviation]]. That breaks in two common ways. Extreme values inflate the average and spread they are measured against, hiding themselves, so robust versions measure from the median instead. And many real quantities, such as transaction sizes, have long tails where extreme values are normal; see [[Outlier]].

Machine learning methods handle many variables at once:

- **Distance and density** methods flag points far from their neighbors or outside any cluster; see [[K-Means Clustering]].
- **Isolation forests**, introduced in 2008, split the data on random features at random thresholds. Anomalies are few and different, so they get isolated in fewer splits than normal points; see [[Decision Tree]].
- **Reconstruction** methods train a model to compress and rebuild normal data, and inputs it rebuilds badly are suspicious; see [[Autoencoder]].
- **One-class models** draw a boundary around the training data and flag what falls outside; see [[Support Vector Machine]].

The harder problem is arithmetic. If one transaction in ten thousand is fraud, a detector that's 99 percent accurate on normal transactions still flags a hundred legitimate ones for every real case; see [[Base Rate Fallacy]]. Analysts handed hundreds of false alarms start ignoring them, including the real one; see [[Alarm fatigue]]. Moving the threshold trades missed anomalies for noise, and neither side is free; see [[False positive]].

Normal also moves. Traffic grows, seasons change, a product launch reshapes behavior, and yesterday's model flags today's ordinary activity; see [[Concept drift]]. Adversaries adapt too. Fraudsters probe a system with small transactions to learn what passes, and attackers inside a network move slowly so their traffic blends into the baseline.

Two related tasks are worth separating. **Outlier detection** looks for oddities within a dataset that may already contain them. **Novelty detection** trains on clean data and asks whether new data looks different.

In software operations, anomaly detection on metrics is a standard feature of monitoring tools, alerting on unusual latency or error rates instead of fixed thresholds; see [[Observability]]. A detector learns only from the past, so its blind spot everywhere is the event unlike anything in its history; see [[Black Swan]]. Good systems route what they flag to a person who can judge it.

## See also
- [[Control Chart]]
- [[Naive Bayes]]
