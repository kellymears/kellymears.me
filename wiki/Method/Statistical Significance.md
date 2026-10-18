---
aliases:
  - P-value
  - Null hypothesis
  - Significance testing
tags:
  - method
summary: A test of whether a result would be surprising if nothing were really going on, widely used, widely misread, and never by itself a measure of how large, important, or true an effect is.
---
**Statistical significance** is a judgment that a result would be unlikely if there were no real effect. It's the standard gatekeeper for claims in science, medicine, and product experiments, and it's one of the most misunderstood ideas in all of them.

The procedure starts by assuming the boring explanation, the **null hypothesis**: the drug does nothing, the new button changes nothing, the two groups are the same. It then asks how often data at least as extreme as what was observed would turn up by chance if the null hypothesis were true. That probability is the **p-value**. If it falls below a threshold chosen in advance, conventionally 0.05, the result is called significant and the null hypothesis is rejected.

The 0.05 line traces back to the statistician Ronald Fisher in the 1920s, who offered it as a rough convenience, not a law. It became a ritual: journals published results below it and filed away results above it; see [[Publication Bias]].

What a p-value is not:

- **Not the probability the hypothesis is true.** A p-value of 0.03 doesn't mean a 97% chance the effect is real. That depends on how plausible the effect was before the study, which the p-value ignores; see [[Bayes' Theorem]] and [[Base Rate Fallacy]].
- **Not a measure of size.** With enough data, trivially small differences become significant. A study of a million people can find a "significant" effect too small to matter; see [[Effect Size]].
- **Not proof of no effect.** A non-significant result from a small study often means only that the study couldn't have detected the effect; see [[Statistical Power]].
- **Not a guarantee against chance.** At 0.05, one in twenty tests of true null hypotheses will come out significant anyway. Run twenty comparisons and one will likely "work."

That last point is how significance gets abused. Trying many analyses, outcomes, or subgroups and reporting the ones that cross the line, called p-hacking, manufactures significant results from noise; see [[P-Hacking]] and [[Texas Sharpshooter Fallacy]]. Together with small samples and publication bias, it drove the [[Replication Crisis]], where many published findings failed to hold up when repeated.

Reforms include preregistering analyses before seeing data, lowering the threshold to 0.005 for new discoveries, and reporting effect sizes with a [[Confidence Interval]] instead of a bare verdict. In 2016 the American Statistical Association issued its first formal statement on a statistical practice, warning that "a p-value, or statistical significance, does not measure the size of an effect or the importance of a result."

Product teams meet the same traps in [[AB Testing]], especially by checking results repeatedly and stopping as soon as a test looks significant, which inflates false positives well beyond 5%.

## See also
- [[Big Data]]
- [[Multiple Comparisons Problem]]
- [[Sensitivity and Specificity]]
- [[Burden of Proof]]
- [[Meta-Analysis]]
