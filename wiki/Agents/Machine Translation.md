---
aliases:
  - Neural machine translation
  - Statistical machine translation
  - Georgetown experiment
  - ALPAC report
  - BLEU
tags:
  - agents
summary: Translating between human languages by computer, from hand-written rules in the 1950s through statistics in the 1990s to neural networks, whose needs gave rise to attention and the transformer itself.
---
**Machine translation** is the automatic translation of text or speech from one human language to another. It was among the first proposed uses of computers, and its history traces the field's broader swings, from hand-written rules to statistics to neural networks.

The **Georgetown experiment** of January 1954, a collaboration with IBM, translated about sixty Russian sentences into English using a vocabulary of 250 words and six grammar rules. Its organizers predicted success within five years. Twelve years later the US government's **ALPAC report** concluded that machine translation was slower, less accurate, and more expensive than human translators, and American funding collapsed. Rule-based systems survived in niches, such as SYSTRAN, whose hand-coded dictionaries served the European Commission for decades; see [[Expert System]].

Statistics took over around 1990. Researchers at IBM trained models on Canadian parliamentary records, which are published in both English and French, learning which words and phrases tend to correspond without being told any grammar. Phrase-based statistical systems followed, and Google Translate launched with one in 2006.

Neural networks displaced statistics in a few years. In 2014 sequence-to-sequence models used one recurrent network to read a sentence into a vector and another to write the translation; see [[Recurrent Neural Network]]. Squeezing a whole sentence into one vector failed on long inputs, so the same year Dzmitry Bahdanau and colleagues let the decoder look back at any source word as needed, the first [[Attention Mechanism]]. Google switched its service to neural translation in 2016, and the transformer, introduced in 2017, was designed and tested as a translation model. Even the way models split text into tokens came from translation, as a fix for rare words; see [[Byte-Pair Encoding]]. Decoding commonly used [[Beam Search]] to choose among candidate translations.

The arc is a standard example of the [[Bitter Lesson]]: decades of linguistic rules lost to general methods trained on more data. Today's large language models translate as a side effect of general training; see [[Large Language Model]].

Translation quality is hard to measure. **BLEU**, from IBM in 2002, scores output by overlap of short word sequences with human reference translations. It was cheap and fueled rapid progress, but it rewards surface matching, so newer learned metrics compare meanings instead.

Persistent problems:

- **Ambiguity.** Words and grammar that one language leaves open may need to be specified in another. Translating gender-neutral Turkish pronouns long produced "he is a doctor" and "she is a nurse."
- **Fluent errors.** Neural systems produce natural-sounding sentences that say something different from the source; see [[Hallucination]].
- **Low-resource languages.** Most of the world's languages have little parallel text, and quality drops steeply.

Professional translators now often edit machine drafts; see [[Internationalization]] and [[Video Game Localization]]. Whether some meanings resist translation entirely is an old question; see [[Linguistic Relativity]].

## See also
- [[Symbol Grounding Problem]]
- [[Text-to-Speech]]
- [[Natural Language Processing]]
