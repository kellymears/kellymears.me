---
aliases:
  - Sensitivity
  - True positive rate
tags:
  - method
summary: The two error rates of a test, and why neither answers the question a person actually asks.
---
**Sensitivity** is the proportion of genuine cases a test flags — its true positive rate. **Specificity** is the proportion of non-cases it correctly clears. Both are properties of the test, measured against a reference standard; establishing that standard is the hard part of validating anything at all, and it is the [[Ground Truth]] the numbers depend on.

They are conditioned the wrong way round for a reader. Sensitivity is the chance of a positive result *given* the condition; someone holding a positive result wants the chance of the condition *given* the result, which depends on how common it is in the population tested — the pretest probability.

The arithmetic is unforgiving. Take 99% sensitivity and 95% specificity, applied where the condition is present in one person per thousand. Among 100,000 people, 100 have it and 99 are flagged; of the 99,900 who do not, 5% — 4,995 people — are flagged anyway. A positive result is correct about 2% of the time. Nothing is wrong with the test; the missing quantity is the base rate, and reasoning from the vivid figure while leaving it out is the [[Base Rate Fallacy]] — its absence is where the impressive-sounding 99% does its work through the [[Anchoring Effect]].

A negative is treated even more carelessly. On an imperfect test it lowers the probability without eliminating it, so "the test was negative, therefore it isn't that" is an [[Exhaustive Claim]] the instrument cannot support. Hence the standard shape: a sensitive test to rule out, a specific one to rule in, confirmation on the positives.

Most tests have a threshold, and moving it trades one error for the other; where to place it depends on the cost of a missed case against an unnecessary follow-up. Optimising a screening programme for cases detected rather than outcomes is [[Goodhart's Law]] with clinical consequences, and a false negative is the purest form of [[Silent Failure]].

## See also
- [[Ground Truth]]
- [[Percentage Point]]
- [[Monty Hall Problem]]
- [[Falsifiability]]
- [[Truncation Bias]]
