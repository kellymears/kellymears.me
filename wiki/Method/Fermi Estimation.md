---
aliases:
  - Fermi problem
  - Back-of-the-envelope
tags:
  - method
summary: Reaching a defensible order-of-magnitude answer by decomposing a question into estimable factors.
---
**Fermi estimation** answers a quantitative question nobody has looked up by splitting it into factors that can each be guessed within a small multiple, then multiplying. It is named for Enrico Fermi, who estimated the yield of the first nuclear test from how far dropped scraps of paper drifted.

The canonical exercise is the number of piano tuners in a city: population, people per household, households with a piano, tunings a year, tunings one tuner performs annually. Every factor is wrong, and the answer still lands within a factor of a few — enough to judge a plan.

**Why errors partly cancel.** The factors multiply, so their errors add in logarithmic terms; if the errors are independent and as likely high as low, the total grows with the square root of their number rather than in proportion to it. Independence is load-bearing: factors drawn from one optimistic frame, or each read off the last, compound instead and inherit a single number's bias — the [[Anchoring Effect]] running along a spreadsheet row.

**Bound rather than point-guess.** Give each factor a low and a high you would bet on, carry both through, and report the range. Check that units cancel; cross-check against a second decomposition and a known aggregate. A result implying an impossible quantity is refuted however reasonable each step felt, which is [[Falsifiability]] at its cheapest, and the instinct matches [[Big-O Notation]]: get the magnitude right, ignore the constants.

The method fails where its assumptions do. Heavy-tailed quantities have no typical value to reason from, so a chain of typical cases can be wrong by orders — a form of [[Truncation Bias]] when the examples are the ones big enough to notice. Arithmetic also lends a guess unearned authority: invented factors are a [[Plausible Mechanism]] with numbers attached.

## See also
- [[Ground Truth]]
- [[Percentage Point]]
- [[Sensitivity and Specificity]]
- [[Plausible Mechanism]]
- [[Anchoring Effect]]
