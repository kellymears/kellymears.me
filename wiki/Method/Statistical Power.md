---
aliases:
  - Power analysis
  - Sample size
  - Underpowered study
tags:
  - method
summary: The chance that a study will detect an effect that really exists, set by sample size, noise, and the size of the effect, and the reason small studies so often produce both missed findings and exaggerated ones.
---
**Statistical power** is the probability that a study will detect an effect if the effect is real. A study with 80% power, the conventional target, will produce a significant result four times out of five when the effect it's looking for exists, and miss it the fifth time.

Missing a real effect is called a *Type II error*, or false negative. Its counterpart, a *Type I error*, is a false positive, finding an effect that isn't there; the significance threshold controls that rate. Power is one minus the false-negative rate. The two trade off, much like [[Sensitivity and Specificity]] in a diagnostic test.

Power depends on three things:

- **Effect size.** Big effects are easy to detect; subtle ones need much more data; see [[Effect Size]].
- **Sample size.** More observations reduce noise. Because precision grows with the square root of the sample, detecting an effect half as large takes about four times as many subjects.
- **Noise.** More variable measurements hide effects. Better instruments, consistent conditions, or comparing the same subjects before and after all increase power.

A *power analysis*, done before collecting data, uses these to choose a sample size. It requires guessing the effect size, ideally the smallest effect worth caring about rather than the one researchers hope to find.

Underpowered studies cause two problems:

- **Missed effects.** A null result from a small study is weak evidence of no effect. "We found no significant difference" often just means "we didn't look hard enough"; see [[Confidence Interval]].
- **Exaggerated effects.** When an underpowered study does reach significance, it's usually because random noise inflated the estimate. Published findings from small studies therefore overstate effects, and many fail to replicate; see [[Replication Crisis]] and [[Publication Bias]].

Psychology and neuroscience were especially hard hit by this problem in the 2010s. A 2013 analysis estimated the median power of neuroscience studies at around 20%, meaning most could detect only effects much larger than the ones they were chasing.

Product experiments face the same arithmetic. A site with modest traffic testing a change expected to lift conversion by 1% may need months of data to detect it. Teams that stop early, or test many small changes on little traffic, mostly measure noise and then act on it; see [[AB Testing]] and [[Statistical Significance]]. In performance work, a [[Benchmark]] run only a few times has low power to catch a small regression.

Power also explains why absence of evidence is weak evidence of absence when a search was shallow; see [[Streetlight Effect]].

## See also
- [[Randomized Controlled Trial]]
- [[Fermi Estimation]]
- [[Relative Risk]]
- [[Priming]]
- [[Meta-Analysis]]
- [[Law of Large Numbers]]
