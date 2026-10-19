---
aliases:
  - Dataset shift
  - Covariate shift
  - Concept drift
  - Out-of-distribution
  - Model drift
tags:
  - agents
summary: When the data a model meets in use differs from the data it was trained on, the most common reason models that tested well fail in the real world, often silently.
---
**Distribution shift** happens when the data a model encounters in use differs from the data it was trained and tested on. Machine learning rests on an assumption that training and real-world data come from the same distribution. When that assumption breaks, performance can drop sharply, and usually nothing announces it: the model keeps producing confident outputs that are increasingly wrong.

Kinds of shift:

- **Covariate shift.** The inputs change but the relationship between input and answer doesn't. A skin-condition model trained mostly on light skin sees more dark skin in practice; a speech recognizer trained on studio audio meets noisy phone calls; see [[Automatic Speech Recognition]].
- **Label shift.** The proportions of outcomes change, such as a disease becoming more common during an outbreak. A classifier's [[Precision and Recall]] change with it; see [[Base Rate Fallacy]].
- **Concept drift.** The relationship itself changes. Fraudsters adapt to the detector, slang shifts meaning, and customer behavior changes after a pandemic. What was right becomes wrong.
- **Out-of-distribution inputs.** Things unlike anything seen in training, such as a self-driving car meeting an unfamiliar vehicle type, or a document in an unseen format.

Famous failures often trace to shift. Image classifiers learned to detect cows partly by recognizing grass, then failed on cows at the beach. These are also cases of models learning shortcuts that happened to correlate with the answer in training data; see [[Correlation and Causation]].

Language models face shift constantly. Their knowledge freezes at a training cutoff, while the world moves on. Users ask questions unlike those in training data, write in underrepresented languages, or paste unusual inputs. A model can also shift its *own* inputs: an agent's outputs feed its later steps, so small oddities compound over long tasks; see [[Agentic Loop]] and [[Context Rot]]. Retrieval helps by supplying current information at inference time; see [[Retrieval-Augmented Generation]].

Defenses:

- **Monitoring.** Track input statistics and prediction confidence in production and alert when they drift from training-time baselines, much as services monitor latency; see [[Observability]].
- **Fresh evaluation.** Regularly test on recent, real data rather than only the original test set; see [[Train-Test Split]] and [[Evaluation Harness]].
- **Retraining.** Update models periodically or continuously on new data.
- **Robustness.** Train on diverse data, use augmentation, and detect out-of-distribution inputs so the system can defer or abstain.
- **Calibration under shift.** Models tend to remain confident when they should become less so, so uncertainty estimates need testing on shifted data; see [[Calibration]].

The underlying lesson isn't unique to machine learning. Any system built on past data assumes the future resembles it. Survivorship, sampling, and selection effects create similar gaps between data and reality; see [[Selection Bias]]. Data pipelines suffer a structural version when upstream formats change without warning; see [[Schema Drift]].

## See also
- [[Batch Normalization]]
- [[Autonomous Vehicle]]
