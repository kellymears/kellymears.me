---
aliases:
  - Trueness
  - Systematic error
  - Random error
tags:
  - method
summary: The distinction between how close measurements are to the true value and how close they are to one another, which maps onto two kinds of error, systematic and random, that have different causes and different cures.
---
**Accuracy** is how close a measurement is to the true value. **Precision** is how close repeated measurements are to one another. The two are independent. A scale that always reads two kilograms heavy is precise but inaccurate; one that scatters readings around the right answer is accurate on average but imprecise. The usual picture is a dartboard: a tight cluster away from the bull's-eye, or a loose spread centered on it.

The distinction corresponds to two kinds of error. **Random error** varies from one measurement to the next, from noise, small fluctuations, and the limits of reading an instrument. It lowers precision, and averaging many measurements reduces it, since the deviations tend to cancel; see [[Law of Large Numbers]] and [[Normal Distribution]]. **Systematic error** pushes every measurement the same way, from a miscalibrated instrument, a flawed method, or a biased sample. Averaging doesn't help at all, because every reading shares the same offset. The international standard for measurement methods, ISO 5725, calls closeness of the average to the truth **trueness**, and uses accuracy for the combination of trueness and precision.

Systematic error is the more dangerous, because it can't be seen from the data alone. A precise result looks trustworthy, and repeated readings that agree with one another give no hint that they all share a fault. Catching it needs an outside reference, such as a standard of known value, a different method, or an independent lab; see [[Ground Truth]]. A survey can collect a million responses and still be wrong if its sample is skewed; see [[Selection Bias]].

Statistics uses parallel vocabulary. An estimator's bias is its systematic error and its variance is its random error, and the total error combines both. Reducing one often increases the other, a trade-off central to building predictive models; see [[Bias-variance tradeoff]] and [[Overfitting]]. Confidence intervals describe random error only; a perfectly computed interval says nothing about a biased design; see [[Confidence Interval]].

**False precision** is reporting more digits than the measurement supports, such as a population estimate quoted to the single person or a mean age given to four decimal places. Extra digits suggest accuracy that isn't there; see [[Fermi Estimation]]. Computers add their own version, since a number can be stored with many digits and still carry rounding error; see [[Floating-Point Arithmetic]].

Two other terms describe precision under different conditions. **Repeatability** is agreement when the same person repeats a measurement with the same equipment. **Reproducibility** is agreement across different labs, operators, and instruments, and it is the harder standard; see [[Replication Crisis]]. Quality engineers track both, using charts that separate ordinary variation from signs that a process has shifted; see [[Control Chart]].

## See also
- [[Sensitivity and Specificity]]
- [[Operationalization]]
