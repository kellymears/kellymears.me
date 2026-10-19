---
aliases:
  - HMM
  - Viterbi algorithm
  - Baum-Welch algorithm
tags:
  - agents
summary: A model of a sequence driven by hidden states that can only be inferred from what they emit, solved efficiently by dynamic programming, and the engine of speech recognition from the 1980s until deep learning.
---
A **hidden Markov model**, or HMM, describes a sequence of observations produced by a process whose internal state can't be seen directly. The hidden state moves from step to step according to fixed probabilities, as in a Markov chain, and at each step it emits an observation according to another set of probabilities. The task is to reason backward from what was observed to what was probably going on underneath; see [[Markov Chain]].

A standard example is weather and behavior. You can't see the weather in another city, but you know what a friend there did each day: walked, shopped, or stayed in. Rainy days make staying in more likely, and weather tends to persist from day to day. Given a week of activities, an HMM can estimate the most likely sequence of weather.

Three questions come up, each with a classic algorithm:

1. **How likely is this sequence?** The forward algorithm sums over all possible hidden paths without listing them, by reusing partial sums step by step.
2. **What hidden path best explains it?** The Viterbi algorithm, published by Andrew Viterbi in 1967 for decoding noisy radio signals, finds the single most likely path the same way, keeping only the best route into each state at each step; see [[Dynamic Programming]].
3. **What should the probabilities be?** The Baum-Welch algorithm, developed by Leonard Baum and colleagues in the late 1960s, learns them from unlabeled sequences by alternately guessing the hidden states and re-estimating the probabilities from those guesses.

Each of these takes time proportional to the length of the sequence rather than to the exponentially many possible hidden paths, which is what made HMMs usable on real data; see [[Combinatorial explosion]].

Speech recognition was their great success. Sounds are the observations and the hidden states are pieces of words; HMMs captured both how phonemes follow one another and how variably each one sounds. Groups at IBM, under Frederick Jelinek, built statistical recognizers in the 1970s and 1980s that outperformed approaches based on linguists' rules, a result summed up in a remark often attributed to Jelinek, "Every time I fire a linguist, the performance of the speech recognizer goes up"; see [[Automatic Speech Recognition]] and [[Bitter Lesson]].

HMMs spread to tagging words with their parts of speech, finding genes in DNA, and aligning protein sequences; see [[Machine Translation]].

Their limits come from the same simplicity. The hidden state is a single category, and each step depends only on the previous one, so long-range structure such as the agreement between a subject and a verb far later in a sentence is lost. Around 2010, neural networks displaced them in speech, first by replacing the emission probabilities and then the whole model; see [[Recurrent Neural Network]] and [[Attention Mechanism]].

## See also
- [[Speaker Diarization]]
- [[Natural Language Processing]]
- [[Named Entity Recognition]]
- [[Bayesian Network]]
