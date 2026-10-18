---
aliases:
  - Pre-training
  - Base model
  - Next-token prediction
  - Training corpus
  - Model collapse
tags:
  - agents
summary: The first and most expensive stage of building a language model, predicting the next token across trillions of words of text, which produces a base model that knows a lot but follows no instructions.
---
**Pretraining** is the first stage of building a [[Large Language Model]]: training a neural network from random weights to predict the next [[Token]] across an enormous body of text. Nothing in the data is labeled by hand. The text itself supplies the answers, since every word is the correct prediction for the words before it, which is why the approach is called *self-supervised*.

The scale is the defining feature. Current models train on trillions of tokens drawn from web pages, books, scientific papers, code repositories, and other sources, using thousands of GPUs for weeks or months. Frontier training runs cost tens to hundreds of millions of dollars, and how loss improves with more data and compute is predictable enough to plan around; see [[Scaling Laws]].

Most of the work is in the data:

- **Collection.** Web crawls such as Common Crawl supply the bulk, alongside licensed and curated sources.
- **Filtering.** Classifiers remove spam, boilerplate, and low-quality pages, and keep text resembling high-quality references.
- **Deduplication.** Repeated documents waste compute and encourage memorization, so near-duplicates are removed with hashing techniques related to the [[Bloom Filter]].
- **Mixing.** Teams tune the proportions of code, math, prose, and languages, which shapes what the model is good at.

Predicting text well forces a model to learn a great deal: grammar, facts, reasoning patterns, the style of different genres, and how code behaves. There is a deep link between prediction and [[Data Compression]], since a model that predicts well can encode text in few bits.

The result is a **base model**. It continues text rather than answering, so a question may be followed by more questions or a forum signature. Turning it into an assistant requires *post-training*: [[Fine-Tuning]] on example conversations, then preference training such as [[Reinforcement Learning from Human Feedback]]. Post-training shapes behavior; most knowledge comes from pretraining.

Pretraining fixes a model's *knowledge cutoff*, the date after which it knows nothing unless information is supplied in context, for example through [[Retrieval-Augmented Generation]]. It also explains some failure modes. A model fills gaps with plausible continuations learned from its corpus, the root of [[Hallucination]], and absorbs the biases and errors of its sources.

Open questions surround the data itself. Models can memorize and reproduce passages, and lawsuits from authors and publishers contest whether training on copyrighted text is fair use. Test questions that leak into training data inflate benchmark scores, a contamination problem for any [[Evaluation Harness]]. And as generated text fills the web, researchers have shown that models trained repeatedly on other models' output lose diversity and drift, a degradation called *model collapse*, which makes human-written data increasingly valuable.

Earlier n-gram models, essentially a [[Markov Chain]] over words, predicted the next word too, from far less context.

## See also
- [[Information Theory]]
- [[Fine-Tuning]]
- [[Gradient Descent]]
- [[Benchmark Contamination]]
