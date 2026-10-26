---
aliases:
  - Stemming
  - Lemmatization
  - Stop words
  - Porter stemmer
tags:
  - data
summary: Reducing words to a common base form so a search for "running" also finds "runs" and "ran," with stemming chopping suffixes by rule and lemmatization looking up the dictionary form.
---
**Stemming** and **lemmatization** are two ways of reducing words to a common base form, so that different forms of the same word can be treated as one. A search for "connection" should probably also find "connected," "connecting," and "connects." Both techniques are classic steps in preparing text for search and analysis.

**Stemming** strips affixes by rule, without understanding the word. The **Porter stemmer**, published by Martin Porter in 1980, applies a sequence of suffix rules: remove "-ing," turn "-ies" into "-i," drop "-ational" to "-ate," and so on. It's fast and needs no dictionary, but its output isn't always a word: "argue," "argued," and "arguing" all become `argu`. Stemming also makes two kinds of mistakes:

- **Overstemming** merges words that should stay apart. "University" and "universe" both reduce to `univers`.
- **Understemming** misses forms that belong together. Irregular forms such as "ran" don't share a suffix with "run."

**Lemmatization** maps each word to its *lemma*, the form a dictionary would list. "Ran" becomes "run," "better" becomes "good," and "mice" becomes "mouse." This needs a vocabulary and usually the word's part of speech: "saw" is a form of "see" as a verb but its own lemma as a noun. Lemmatization is slower and language-specific, but more accurate.

Neither does much for some languages and a great deal for others. English has relatively little inflection. Finnish, Turkish, and Hungarian build long words from many suffixes, so a single word can appear in dozens of forms. Chinese has no inflection, but its text has no spaces, so splitting it into words is the harder problem.

Both techniques sit inside a typical search pipeline: split text into words, lowercase them, remove **stop words** (very common words such as "the" and "of," which carry little meaning on their own), and reduce each word to its base form before adding it to an inverted index. Queries go through the same steps, so they match. The trade-off is [[Precision and Recall]]: merging forms finds more relevant documents but also more irrelevant ones. Stop word removal has its own hazards; a search for the band "The The" or the phrase "to be or not to be" consists entirely of stop words.

Modern language models handle this differently. They split text into subword pieces learned from data, so related forms share pieces without hand-written rules, and they learn meaning from context; see [[Byte-Pair Encoding]] and [[Embedding]]. Search engines that use embeddings match "car" with "automobile," which no stemmer could; see [[Vector Database]]. Stemming survives because it's cheap, predictable, and easy to explain, and many systems combine it with embedding search.

## See also
- [[Autocomplete]]
- [[Web Search Engine]]
