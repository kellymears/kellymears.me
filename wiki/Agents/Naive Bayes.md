---
aliases:
  - Naive Bayes classifier
  - Bayesian spam filtering
  - Bag of words
tags:
  - agents
summary: A classifier that applies Bayes' theorem while pretending every feature is independent of the others, an assumption that is almost always false and works anyway, most famously in the spam filters of the early 2000s.
---
A **naive Bayes classifier** decides which category an example belongs to by combining the evidence from each of its features separately. It applies Bayes' theorem, which says how to update a belief given evidence, with one bold simplification: it assumes every feature is independent of every other once the category is known. That assumption is the "naive" part, and it's nearly always wrong; see [[Bayes' Theorem]].

Spam filtering shows how it works. Each email is treated as a **bag of words**, ignoring order. From a pile of labeled email, the filter counts how often each word appears in spam and in legitimate mail. A new message is scored by starting from the base rate of spam, then multiplying in, word by word, how much more likely each word is in spam than in real mail. Words like "unsubscribe" push the score up; a colleague's name pushes it down. The category with the higher final score wins; see [[Base Rate Fallacy]] and [[Email]].

The independence assumption is what makes this practical. Without it, the filter would need to know how often every combination of words appears together, which no amount of data could cover. With it, the model is just a table of counts per word per class. Training takes one pass over the data, classification is a handful of multiplications, and the model can be updated as each new message is labeled.

Paul Graham's 2002 essay "A Plan for Spam" popularized the approach, reporting that a simple Bayesian filter caught nearly all of his spam with very few false positives. Soon Bayesian filters were built into mail clients and servers, and spammers responded by padding messages with random innocent words and putting text in images, an early case of adversaries adapting to a learned model; see [[Adversarial Example]] and [[Precision and Recall]].

Why does a wrong assumption work so well? Classification only needs the right category to score highest, not the right probability. Correlated words do get counted twice, which inflates the scores, but they're usually inflated in the same direction, so the ranking survives. The probabilities themselves are badly overconfident, often extremely close to zero or one, and shouldn't be read as real confidence; see [[Calibration]].

A few practical details matter:

- **Smoothing.** A word never seen in spam would get a probability of zero and veto the whole message, so every count starts with a small added value.
- **Logarithms.** Multiplying hundreds of small probabilities underflows, so implementations add their logarithms instead; see [[Softmax]].

Naive Bayes is still a common first baseline for text classification: fast, transparent, and hard to beat with little data. More expressive models win as data grows, because they can learn how words interact; see [[Supervised Learning]] and [[Support Vector Machine]].

## See also
- [[Sentiment Analysis]]
- [[Hidden Markov Model]]
- [[Logistic Regression]]
- [[Email Spam]]
