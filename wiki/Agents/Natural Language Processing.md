---
aliases:
  - NLP
  - Computational linguistics
  - Language technology
tags:
  - agents
summary: The field concerned with getting computers to analyze, understand and produce human language, which moved from hand-written grammars to statistics to neural networks, and was largely absorbed by large language models after 2018.
---
**Natural language processing** covers everything from splitting text into words to translating, summarizing and holding conversations. Human language is ambiguous, context-dependent and full of exceptions, which made it one of the oldest and most stubborn targets in computing. The sentence "I saw her duck" has more than one reasonable meaning, and people resolve such cases without noticing.

The field's history falls roughly into three eras.

**Rules.** Early work in the 1950s and 1960s, including a 1954 demonstration that translated sixty Russian sentences into English, assumed language could be captured with dictionaries and hand-written grammars; see [[Machine Translation]] and [[Context-Free Grammar]]. A 1966 government report concluded that machine translation had underdelivered, and funding dried up. Rule-based systems such as the ELIZA chatbot could appear fluent while understanding nothing; see [[ELIZA Effect]]. Pattern matching with tools such as regular expressions remains useful for narrow tasks.

**Statistics.** From the late 1980s, researchers learned patterns from large text collections instead of writing them down. Probabilistic models tagged parts of speech and recognized speech, word-count classifiers filtered spam, and statistical translation learned from parallel texts of parliamentary proceedings; see [[Hidden Markov Model]] and [[Naive Bayes]]. A common joke from speech research held that every time a linguist left the team, accuracy went up. Progress tracked the growth of digitized text more closely than any single algorithm.

**Neural networks.** Around 2013, word vectors captured meaning as geometry, so that related words sat close together; see [[Word2Vec]]. Recurrent networks and then attention-based transformers learned to process whole sentences; see [[Attention Mechanism]]. From 2018, models pretrained on vast amounts of text and then adapted to tasks beat specialized systems almost everywhere.

Classic NLP tasks include:

- **Tokenization** and normalization, breaking text into units and reducing words to base forms; see [[Stemming and Lemmatization]].
- **Named entity recognition**, finding people, places and organizations; see [[Named Entity Recognition]].
- **Sentiment analysis**, judging opinion and tone; see [[Sentiment Analysis]].
- **Information retrieval**, ranking documents for a query; see [[Inverted Index]].

Large language models absorbed many of these into a single system that performs them when asked, which led some to say the field had been solved and others to argue that fluency isn't understanding; see [[Large Language Model]] and [[Stochastic Parrot]]. The older tools persist where speed, cost or predictability matter, and evaluating language systems remains hard because many outputs can be correct. Metrics that count overlapping words with a reference translation or summary reward surface similarity, so human judgments, and increasingly judgments by other models, fill the gap.

Text is also unevenly distributed. Most training data is in a handful of languages, so systems work far better in English than in the thousands of languages with little written material online.

## See also
- [[Computer Vision]]
- [[Zipf's Law]]
