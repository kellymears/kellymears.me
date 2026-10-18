---
aliases:
  - BPE
  - Tokenizer
  - Subword tokenization
  - SentencePiece
  - WordPiece
tags:
  - agents
summary: The compression trick that splits text into the tokens a language model reads, by repeatedly merging the most frequent pair of symbols into a new one.
---
**Byte-pair encoding** is the algorithm most language models use to split text into a [[Token]] vocabulary. It starts with individual characters or bytes and repeatedly finds the most frequent adjacent pair in a large body of text, merges it into a new symbol, and adds that symbol to the vocabulary. After tens of thousands of merges, common words such as "the" are single tokens, frequent fragments such as "ing" and "tion" are tokens, and rare words are spelled out in several pieces. The final vocabulary and its ordered list of merges form the **tokenizer**.

Philip Gage published byte-pair encoding in 1994 as a [[Data Compression]] method, replacing common byte pairs with unused byte values. Rico Sennrich, Barry Haddow, and Alexandra Birch adapted it for machine translation in 2016, solving the problem of words a fixed vocabulary had never seen. GPT-2 in 2019 applied it to raw bytes rather than characters, so any text in any [[Character Encoding]], including emoji and code, can be tokenized without an unknown-token fallback.

The approach is a compromise between two extremes:

- **Whole words** give short sequences, but the vocabulary would need millions of entries and still fail on new words, typos, and names.
- **Single characters** handle anything but make sequences several times longer, filling the [[Context Window]] and slowing generation.
- **Subwords** keep sequences short while spelling out anything unfamiliar.

Vocabulary size is the main dial. Larger vocabularies, now often 100,000 to 250,000 entries, compress text better but make the embedding table bigger, with each token getting its own learned [[Embedding]].

Related algorithms include WordPiece, used by BERT, and the unigram method in Taku Kudo's SentencePiece library from 2018, which treats spaces as ordinary symbols so it works for languages written without them. Merging the most frequent pair at each step is a [[Greedy Algorithm]].

Many odd model behaviors trace back to the tokenizer:

- **Spelling.** A model sees "strawberry" as a few tokens, not letters, so counting its r's is genuinely hard.
- **Arithmetic.** Numbers split into inconsistent chunks, so digit alignment varies, and some tokenizers now split numbers into single digits.
- **Language cost.** Tokenizers trained mostly on English need several times more tokens for the same meaning in many other languages, so those users pay more and fit less into the context, an inequity built into [[Token Budget]].
- **Glitch tokens.** In 2023, researchers found tokens such as "SolidGoldMagikarp", usernames frequent in the tokenizer's data but nearly absent from training, that made models behave bizarrely, because their embeddings were barely trained.

The tokenizer is fixed before [[Pretraining]] and cannot easily change afterward, so its quirks live as long as the model. Some research models skip it entirely and read raw bytes, at the cost of longer sequences.

## See also
- [[Token]]
- [[Information Theory]]
- [[Stemming and Lemmatization]]
- [[Large Language Model]]
