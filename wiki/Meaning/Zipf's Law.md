---
aliases:
  - Zipf distribution
  - Zipf's law of abbreviation
tags:
  - meaning
summary: The pattern that the most common word in a language appears about twice as often as the second, three times as often as the third, and so on, a power law that also describes cities, websites, and much else.
---
**Zipf's law** says that in a large body of text, a word's frequency is roughly inversely proportional to its rank. The most common word appears about twice as often as the second most common, three times as often as the third, and so on. In English, *the* makes up about 7% of all words, *of* about 3.5%, and *and* about 2.8%. The linguist George Kingsley Zipf popularized the pattern in the 1930s and 1940s, though others had noticed it earlier.

The consequences are dramatic. A small set of words does most of the work: in English, the top 100 words cover about half of all text. At the other end, a huge long tail of words appears rarely, and in any text, nearly half of the distinct words appear only once, called *hapax legomena*. This is why learners can understand much of a language with a modest vocabulary, but full fluency takes enormous exposure: the rare words are individually rare but collectively everywhere; see [[Pareto Principle]].

Zipf's law is a **power law**, and similar distributions appear far beyond language:

- **City sizes.** In many countries, the largest city is about twice the second, three times the third.
- **Web traffic.** A few sites receive most visits; most get almost none.
- **Wealth, citations, and followers.** Rich-get-richer dynamics produce heavy-tailed distributions; see [[Matthew Effect]].
- **Software.** A few functions are called most often; a few files change most frequently.

Why the law holds is still debated. Explanations include preferential attachment, where popular items attract more use; a trade-off between speakers wanting few words and listeners wanting precise ones, which Zipf called the principle of least effort; and statistical arguments showing that even random typing produces Zipf-like distributions. That last finding is a caution: a power law alone says little about its cause.

Zipf also observed a related **law of abbreviation**: frequently used words tend to be shorter. *The*, *a*, *is*, and *I* are short; rare words are long. Common words also get shortened over time, as *television* became *TV*. The same pattern holds across languages and even in some animal communication.

The law has practical uses in computing:

- **Compression.** Frequent symbols get short codes and rare ones long codes, the principle behind Huffman coding; see [[Data Compression]] and [[Information Theory]].
- **Search.** The most frequent words carry little meaning and are often dropped as stop words; rare terms are weighted heavily; see [[Inverted Index]] and [[Stemming and Lemmatization]].
- **Tokenizers.** Language models split text so that common words get single tokens and rare words are broken into pieces; see [[Byte-Pair Encoding]].
- **Caching.** Skewed access patterns mean a small cache serves most requests.

## See also
- [[Semantic Change]]
- [[Constructed Language]]
- [[Linguistic Relativity]]
- [[Fractal]]
- [[Hot Partition]]
- [[Normal Distribution]]
- [[Benford's Law]]
- [[Logarithmic Scale]]
