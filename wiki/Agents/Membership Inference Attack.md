---
aliases:
  - Membership inference
  - Training data extraction
  - Model inversion
tags:
  - agents
summary: An attack that determines whether a particular record was in a model's training data by watching how the model treats it, the simplest of a family of privacy attacks that also includes extracting memorized text and reconstructing training images.
---
A trained model is supposed to capture general patterns, not individual examples. In practice, models remember some of what they saw, and that memory can leak. A **membership inference attack** asks a narrow question: was this specific record used in training? If a model was trained on hospital records, merely confirming that a person's record was included reveals that they were a patient; see [[Personal Data]].

The basic signal is that models behave differently on data they trained on. They tend to be more confident and have lower loss on training examples than on new ones, especially when they've overfit; see [[Overfitting]] and [[Calibration]]. A 2017 paper by Reza Shokri and colleagues formalized the attack: train several **shadow models** on data whose membership is known, learn how their outputs differ between members and non-members, and apply that classifier to the target model's outputs. Later attacks sharpened the comparison by calibrating per example, since some records are naturally easy and some hard.

Related attacks go further:

- **Training data extraction** recovers memorized content verbatim. In 2021 researchers prompted GPT-2 to generate large amounts of text, then ranked outputs by how much more confident the model was than expected, and pulled out memorized passages including names, phone numbers and email addresses; see [[Large Language Model]]. Later work extracted near-copies of training images from image generators; see [[Diffusion Model]].
- **Model inversion** reconstructs representative inputs for a class, such as a recognizable approximation of a person's face from a face-recognition model. It works best when a class corresponds to a single person, since the model's picture of that class is effectively a picture of them.

Memorization isn't uniform. Duplicated data is memorized far more readily, so removing duplicates from training sets reduces leakage substantially; see [[Data Deduplication]] and [[Pretraining]]. Larger models memorize more, and rare outliers are memorized more than typical examples.

The strongest defense is **differential privacy**, which adds calibrated noise during training so that no single record can change the model much. It provides a mathematical bound on what any attacker can learn about one person, at some cost in accuracy; see [[Differential Privacy]]. Regularization and early stopping help less reliably; see [[Regularization]]. Training data that never leaves its owners can still leak through model updates, so federated systems often combine both techniques; see [[Federated Learning]].

The same tools serve auditors. Membership tests are used to check whether a benchmark's questions leaked into training, whether an author's work was used, and whether a deletion request really removed someone's influence; see [[Benchmark Contamination]] and [[Machine Unlearning]]. They are noisy for individual records, however, and a negative result rarely proves anything was absent.

## See also
- [[Adversarial Example]]
- [[Data Breach]]
