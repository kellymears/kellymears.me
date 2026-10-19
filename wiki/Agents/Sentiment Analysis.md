---
aliases:
  - Opinion mining
tags:
  - agents
summary: Automatically judging whether text expresses positive, negative, or neutral feeling, used to read product reviews and social media at scale and famously tripped up by negation, sarcasm, and words whose meaning flips by context.
---
**Sentiment analysis** is the task of determining the emotional tone of a piece of text, usually whether it's positive, negative, or neutral. Also called opinion mining, it lets businesses and researchers read millions of reviews, posts, and survey responses that no person could read individually.

Early work used word lists. Each word gets a score, "excellent" positive and "terrible" negative, and a document's sentiment is the sum. Lists are easy to build and inspect but miss a great deal.

Machine learning took over in the early 2000s. A widely cited 2002 study classified movie reviews by their star ratings, using techniques that treat a document as an unordered collection of words, and found that standard classifiers did reasonably well, though worse than on topic classification; see [[Naive Bayes]], [[Logistic Regression]], and [[Support Vector Machine]]. Sentiment proved harder than topic because it depends on how words combine.

The classic difficulties:

- **Negation.** "Not good" and "not bad" flip their words' meanings.
- **Sarcasm.** "Great, another delay" is negative despite its words.
- **Domain dependence.** "Unpredictable" praises a film's plot and condemns a car's brakes. A model trained on one domain stumbles on another; see [[Distribution Shift]].
- **Mixed opinions.** A review can love the camera and hate the battery. **Aspect-based** sentiment analysis assigns sentiment to each feature separately.

Word embeddings, which place words with similar meanings close together, helped models generalize beyond exact vocabulary; see [[Word2Vec]] and [[Embedding]]. A 2013 dataset annotated sentiment at every level of a sentence's grammatical structure, letting models learn how negation and contrast compose. Pretrained language models later made strong sentiment classifiers easy to build with modest labeled data, and large models can classify tone from instructions alone; see [[Fine-Tuning]] and [[Large Language Model]].

People disagree, too. Annotators often split on whether a given text is positive or neutral, which limits how accurate any system can look and makes careful evaluation important; see [[Precision and Recall]] and [[Calibration]].

Applications range from brand monitoring and customer support triage to political polling and financial trading, where some firms analyze news and social media for market signals. Platforms use related signals to rank content, which can favor emotionally charged material; see [[Recommender System]] and [[Negativity Bias]].

The technique has limits as a measure of what people think. Text that's posted publicly isn't a random sample of opinion, and models can encode bias, for instance rating sentences differently depending on the names or dialects they contain; see [[Algorithmic Bias]].

Richer variants go beyond polarity to detect specific emotions such as anger, fear, or joy, or to estimate how intensely a feeling is expressed. Emoji carry sentiment too, sometimes ironically.

## See also
- [[Natural Language Processing]]
- [[Data Labeling]]
