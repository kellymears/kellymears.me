---
aliases:
  - Texas sharpshooter
  - Clustering illusion
  - Look-elsewhere effect
tags:
  - method
summary: Finding a cluster in random data after the fact and treating it as meaningful, like firing at a barn and then painting a target around the tightest group of holes.
---
The **Texas sharpshooter fallacy** is drawing a conclusion from a pattern that was picked out only after looking at the data. The name comes from a joke about a man who fires his gun at the side of a barn, then paints a target around the tightest cluster of bullet holes and claims to be a sharpshooter.

The underlying fact is that random data is full of clusters. Scatter dots at random across a map and some areas will get more than their share by chance alone. Look for a pattern after the fact, choose the boundaries that make it look strongest, and almost any data set will provide one; see [[Apophenia]].

Examples:

- **Disease clusters.** A neighborhood with an unusual number of cancer cases looks like evidence of a local cause, such as a factory or power line. Health agencies investigate hundreds of such reports; very few turn out to have a common cause, because with thousands of neighborhoods some will have high counts by chance.
- **Prophecy.** Vague predictions, such as those of Nostradamus, seem accurate only because believers choose which events to match them to after those events happen.
- **Investing.** Among thousands of fund managers, some will beat the market for years by luck. Their records look like skill only when chosen in hindsight; see [[Survivorship Bias]].
- **Debugging.** Noticing that the last three outages happened on Tuesdays, without having asked about weekdays beforehand, isn't evidence that Tuesdays matter.

In statistics, this is the problem of multiple comparisons. Test enough hypotheses and some will cross any significance threshold by chance. Physicists call it the *look-elsewhere effect*: a bump in data is less impressive once you account for all the places a bump could have appeared, which is why particle physics demands extremely strict thresholds for discoveries; see [[Statistical Significance]]. When researchers do this unconsciously, trying analysis after analysis until something works, it's called [[P-Hacking]].

The cure is to state the hypothesis before looking at the data:

- **Preregistration.** Writing down what will be tested, and how, before collecting data; see [[Replication Crisis]].
- **Holding out data.** Finding a pattern in one half of the data and confirming it in the other, the same idea behind keeping a test set separate in machine learning; see [[Overfitting]].
- **Correcting for comparisons.** Raising the bar for significance when many hypotheses were tested.

The fallacy pairs naturally with [[Confirmation Bias]] and [[Hindsight Bias]]: once a pattern has been noticed, supporting cases stand out and the story of why it happened feels obvious.

## See also
- [[Gambler's Fallacy]]
- [[Streetlight Effect]]
- [[Fisher-Yates Shuffle]]
- [[Golden Ratio]]
- [[Multiple Comparisons Problem]]
- [[Logical Fallacy]]
- [[Birthday Problem]]
