---
aliases:
  - Beam width
tags:
  - agents
summary: A decoding strategy that keeps the few most probable partial sequences at each step instead of just one, standard in translation and speech recognition but prone to bland, repetitive text when used for open-ended writing.
---
**Beam search** is a way of choosing a sequence, such as a sentence, one piece at a time, while keeping several candidates alive. At each step it extends every candidate by every possible next piece, scores the results, and keeps only the best few, a number called the **beam width**. It sits between two extremes: picking the single most likely next piece every time, and checking every possible sequence, which is hopelessly large.

The name comes from the Harpy speech recognition system at Carnegie Mellon in the 1970s, which kept a narrow "beam" of the most likely interpretations of a sound as it went; see [[Automatic Speech Recognition]].

For language models, the pieces are tokens; see [[Token]]. The model gives a probability for each possible next token; see [[Softmax]]. A candidate's score is the sum of the log probabilities of its tokens. With a beam width of one, beam search becomes greedy decoding, which can commit early to a word that leads nowhere good; see [[Greedy Algorithm]]. A beam of four or five lets the search recover by keeping alternatives.

Beam search became the standard for neural machine translation and speech recognition, where there's roughly one right answer and the aim is to find the most probable one; see [[Recurrent Neural Network]]. It has known quirks:

- **Short bias.** Every token multiplies in a probability less than one, so shorter outputs score higher. Systems divide scores by length to compensate.
- **The beam search curse.** Wider beams, which should find more probable sequences, often produce worse translations. A 2019 study found that for many sentences, the single most probable translation according to the model was an empty one, hidden only because narrow beams never reached it.

For open-ended writing, beam search works badly. It produces bland, generic, and repetitive text, sometimes looping on the same phrase. A 2019 paper on "neural text degeneration" showed why: human writing isn't made of the most probable words, and its probability per word varies far more than search-optimized text. Chat models therefore sample instead of searching, adding controlled randomness; see [[Temperature Sampling]] and [[Perplexity]].

Beam search still suits tasks with a narrow correct answer, such as code completion, structured extraction, or captioning, and combines well with rules that forbid invalid tokens; see [[Constrained Decoding]]. Its cost grows with the width: each candidate needs its own cached attention state, multiplying memory use; see [[KV Cache]].

Outside language, beam search is a general technique for searching huge spaces with bounded memory. Unlike exhaustive methods, it can discard the path to the best answer, so it trades guaranteed optimality for speed; see [[A-Star Search Algorithm]] and [[Backtracking]].

## See also
- [[Speculative Decoding]]
- [[Large Language Model]]
