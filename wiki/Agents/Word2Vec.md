---
aliases:
  - Word embedding
  - Skip-gram
  - Distributional hypothesis
tags:
  - agents
summary: A 2013 method from Google that learned a vector for every word from the words around it, famous for arithmetic like king minus man plus woman landing near queen.
---
**Word2Vec** is a method, published by Tomas Mikolov and colleagues at Google in 2013, for learning a list of numbers for every word in a vocabulary so that words used in similar ways get similar lists. It made **word embeddings** a standard part of language processing, and its descendants sit at the bottom of every [[Large Language Model]]; see [[Embedding]].

The idea underneath is the **distributional hypothesis**, from linguistics in the 1950s: words that occur in similar contexts tend to have similar meanings. The linguist J. R. Firth put it as "you shall know a word by the company it keeps." "Coffee" and "tea" both appear near "cup," "hot," and "drink," so tracking neighbors groups them without knowing what either is.

Word2Vec turns that into a training task that needs no labels; see [[Self-supervised learning]]. It comes in two variants:

- **Skip-gram** takes a word and tries to predict the words within a few positions of it.
- **Continuous bag of words** does the reverse, predicting a word from the words around it.

The model is a shallow [[Neural Network]] with one layer of weights, and after training on billions of words, those weights are the vectors, typically 300 numbers per word. A trick called negative sampling made training cheap: instead of scoring every word in the vocabulary, the model learns to tell real neighbors from a handful of random words.

The results surprised people. Directions in the space seemed to capture relationships, so the vector for "king," minus "man," plus "woman," lay closest to "queen," and "Paris" minus "France" plus "Italy" landed near "Rome." Closeness is measured by angle; see [[Cosine Similarity]]. Later work showed the analogies were less tidy than the examples suggest. The standard test excludes the input words from the answers, and without that rule "king" itself often comes out on top.

The same arithmetic exposed what the vectors absorbed from their text. A 2016 paper found that in vectors trained on news articles, "man" is to "computer programmer" as "woman" is to "homemaker"; see [[Algorithmic Bias]]. The vectors reflect how words are used, stereotypes included.

Word2Vec gives each word one vector, so "bank" gets the same numbers next to "river" as next to "loan." Stanford's GloVe, from 2014, built similar vectors from co-occurrence counts. Contextual models replaced both: a transformer computes a fresh vector for each word in each sentence; see [[Attention Mechanism]]. Modern systems also split text into subword pieces rather than whole words, so rare and new words still get vectors; see [[Byte-Pair Encoding]].

The approach outlived language: recommendation systems have trained the same model on sequences of products or songs, treating items used together as words in a sentence, and such vectors are searched by nearness; see [[Vector Database]].

## See also
- [[Dimensionality Reduction]]
- [[Natural Language Processing]]
- [[Sentiment Analysis]]
- [[Graph Neural Network]]
