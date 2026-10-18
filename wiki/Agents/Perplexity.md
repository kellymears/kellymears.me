---
aliases:
  - Cross-entropy loss
  - Bits per byte
  - Negative log-likelihood
tags:
  - agents
summary: The standard measure of how well a language model predicts text, equal to the number of equally likely choices it is effectively guessing among at each token.
---
**Perplexity** measures how surprised a language model is by a piece of text. It is the exponential of the average negative log-probability the model assigned to each actual token, which makes it easy to read: a perplexity of 10 means the model was, on average, as uncertain as if it were choosing uniformly among 10 equally likely tokens. Lower is better. A model that predicted every token with certainty would score 1.

Perplexity is the everyday face of the **cross-entropy loss** that [[Pretraining]] minimizes. The loss is the average negative log-probability of the correct next token, and perplexity is just that loss exponentiated. Every training curve for a large language model is effectively a perplexity curve, and the smooth power laws described in [[Scaling Laws]] were measured in it.

It comes from [[Information Theory]]. Cross-entropy, in bits, is the average number of bits needed to encode the text using the model's predictions, so a better predictor is literally a better compressor. Claude Shannon estimated in 1951 that English carries roughly one bit of [[Entropy]] per character by asking people to guess the next letter. The link between prediction and [[Data Compression]] is exact: an arithmetic coder driven by a language model compresses text to close to its cross-entropy, which is why some benchmarks rank models by compressed size.

Perplexity has sharp limits as a yardstick:

- **It depends on the tokenizer.** A model with a larger vocabulary has fewer, harder tokens per sentence, so perplexities from different tokenizers aren't comparable. *Bits per byte* normalizes by the length of the raw text and avoids the problem.
- **It measures prediction, not usefulness.** Instruction tuning and [[Reinforcement Learning from Human Feedback]] usually make a model *worse* at predicting ordinary web text while making it far more helpful. A chat model is judged with an [[Evaluation Harness]], not perplexity.
- **It depends on the text.** Perplexity on code, legal prose, or another language says little about the others.

It remains useful for narrower comparisons. [[Quantization]] quality is usually reported as the perplexity increase over the full-precision model, since it is cheap to compute and sensitive to damage. Suspiciously low perplexity on a test set is evidence the set appeared in the training data, a sign of [[Benchmark Contamination]]. Perplexity also weighs individual tokens: unusually high-surprise tokens in a model's own output can flag spots where it may be guessing, one signal used in studies of [[Hallucination]].

Detecting AI-written text by its low perplexity, on the theory that models choose predictable words, has proven unreliable. Formulaic human writing scores low too, and non-native English writers are flagged unfairly often.

The per-token probabilities themselves come from [[Softmax]], and the temperature setting changes how a model samples, not the perplexity it assigns.

## See also
- [[Softmax]]
- [[Scaling Laws]]
- [[Information Theory]]
- [[Markov Chain]]
