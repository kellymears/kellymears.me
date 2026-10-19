---
aliases:
  - Data contamination
  - Test set contamination
  - Benchmark saturation
  - Canary string
tags:
  - agents
summary: When a model has seen a benchmark's test questions during training, so its score measures memory rather than ability, and why public leaderboards lose meaning over time.
---
**Benchmark contamination** happens when the questions, and often the answers, from a test set end up in a model's training data. The model's score then reflects memory instead of the ability the benchmark was meant to measure, like a student who has seen the exam in advance. For a [[Large Language Model]] trained on much of the public web, contamination is the default rather than an accident: popular benchmarks are discussed, quoted, and solved on countless pages, and all of it gets scraped during [[Pretraining]].

Machine learning has always guarded against a milder version, testing on data the model was tuned on, which inflates scores the way [[Overfitting]] does. What changed with large models is scale. Nobody can easily audit trillions of training tokens, and test items may appear paraphrased, translated, or embedded in a solution written by someone else.

Evidence takes several forms:

- **Before and after the cutoff.** In 2023, Horace He reported that GPT-4 solved ten of ten easy Codeforces problems published before its training cutoff and none of ten published after. Problems from after a model's cutoff are a natural clean test.
- **Fresh copies.** In 2024, researchers at Scale AI wrote GSM1k, new grade-school math problems matching an existing benchmark's style. Some models scored up to about 13 points lower on the new set, while the strongest models showed little gap.
- **Memorization probes.** Models asked to complete a test question's text, or reproduce the exact answer options in order, reveal they have seen it.

Contamination combines with selection pressure. Labs, and the researchers comparing them, tune toward the numbers everyone watches, and a benchmark that becomes a target ceases to be a good measure, as [[Goodhart's Law]] predicts. Many small choices that each favor the score resemble [[P-Hacking]], and results that do not hold up on new tests echo the [[Replication Crisis]].

Benchmarks also **saturate**. Once top models score near the ceiling, the test no longer separates them, and remaining errors are often mislabeled items. Broad knowledge tests that were hard in 2020 were nearly maxed out within a few years.

Mitigations:

- **Canary strings.** Some benchmarks embed a unique marker string in their files and ask that any document containing it be excluded from training.
- **Private test sets.** Hidden questions are scored by a third party and never published.
- **Rolling benchmarks.** Sets such as LiveBench add new questions continually and drop old ones.
- **Verified subsets.** Human review removes broken or ambiguous items, as with SWE-bench Verified.
- **Your own evals.** Tests built from your own tasks, run in an [[Evaluation Harness]], cannot have leaked and measure what you actually care about.

A leaderboard score is best read alongside its date and the question: could the model have seen this before?

## See also
- [[Perplexity]]
- [[AlphaFold]]
- [[Model Merging]]
- [[Membership Inference Attack]]
