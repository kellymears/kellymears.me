---
aliases:
  - Privacy budget
  - Epsilon
  - k-anonymity
  - Anonymization
  - Re-identification
  - Local differential privacy
tags:
  - data
summary: A mathematical guarantee that the result of an analysis barely changes whether or not any one person's data is included, achieved by adding carefully calibrated random noise.
---
**Differential privacy** is a mathematical definition of privacy for statistics and data analysis. A computation is differentially private if its output would be almost equally likely whether or not any single person's record were in the dataset. So the result reveals almost nothing about any one person, whatever else an attacker knows. Cynthia Dwork, Frank McSherry, Kobbi Nissim and Adam Smith introduced it in 2006.

It was a response to repeated failures of anonymization:

- In 1997 Latanya Sweeney identified the Massachusetts governor's medical records in a "de-identified" hospital dataset by matching birth date, sex and ZIP code against a voter roll. She later estimated that those three fields alone identify about 87% of Americans.
- In 2008 researchers re-identified Netflix Prize users by comparing their movie ratings with public reviews on IMDb.

Removing names fails because the remaining fields still combine into a unique fingerprint, the same matching that drives [[Entity Resolution]]. *k-anonymity* (2002) tried to fix this by coarsening fields until every record matched at least *k* others, but it still leaks when everyone in a group shares a sensitive value, or when an attacker has outside knowledge.

Differential privacy works by adding random noise, sized to how much one person could change the answer:

- **Sensitivity.** A count changes by at most one when a person is added or removed, so a small amount of noise hides any individual. A sum of incomes needs more noise or capped contributions.
- **Epsilon.** The parameter ε bounds how much one person can shift the output's probabilities. Smaller ε means more noise and stronger privacy.
- **Budget.** Privacy loss adds up. Every query spends some ε, and asking enough questions eventually reveals everything. Too many accurate answers let an attacker reconstruct the data. Systems therefore track a *privacy budget* and stop answering when it runs out.

The noise must be unpredictable, which needs a secure [[Pseudorandom Number Generator]].

Notable deployments include the 2020 US Census, which applied it to published tables, and *local* differential privacy in Chrome's RAPPOR (2014) and Apple's keyboard and emoji statistics. In the local model, each device randomizes its own report before sending it, so the collector never holds raw data. RAPPOR encoded values with a [[Bloom Filter]] before randomizing them.

The cost is accuracy, and it falls hardest on small groups. Census noise that is negligible for a state can distort a small town's figures.

Machine learning faces the same risk: models can memorize training examples, and [[Large Language Model]]s have reproduced memorized text verbatim. Differentially private training limits each example's influence on the model, a cousin of guarding against [[Overfitting]]. The broader lesson matches [[Least Privilege]]: the safest data is data that was never collected in identifiable form.

## See also
- [[Data Retention]]
- [[Browser Fingerprinting]]
- [[Open Data]]
- [[Bloom Filter]]
- [[Personal Data]]
