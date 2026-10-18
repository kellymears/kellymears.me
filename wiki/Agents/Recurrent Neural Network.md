---
aliases:
  - RNN
  - LSTM
  - Long short-term memory
  - State space model
  - Mamba
tags:
  - agents
summary: Networks that read a sequence one step at a time while carrying a hidden state forward, the architecture transformers displaced and that state space models are reviving.
---
A **recurrent neural network** (RNN) processes a sequence one element at a time, carrying a *hidden state* from each step to the next. At every step it combines the new input with the previous state to produce an output and an updated state. The state is a fixed-size summary of everything read so far. Where a feedforward [[Neural Network]] maps one input to one output, an RNN applies the same weights in a loop, so it handles sequences of any length.

Training uses *backpropagation through time*: unroll the loop into one long chain, one copy per step, and apply [[Backpropagation]] across it. That exposed the central weakness. Gradients passing back through many steps are multiplied by the same weights again and again, so they shrink to nothing or blow up. Sepp Hochreiter analyzed this *vanishing gradient* problem in his 1991 thesis: plain RNNs effectively forgot anything more than a few dozen steps back.

The fix was **long short-term memory** (LSTM), by Hochreiter and Jürgen Schmidhuber in 1997. An LSTM adds a separate memory cell and learned *gates* that decide what to write, what to keep, and what to output. Because the cell is updated by addition instead of repeated multiplication, gradients survive over long spans, the same idea [[Residual Connection]]s later applied to depth. The simpler gated recurrent unit (GRU) followed in 2014.

For about a decade, LSTMs ran speech recognition and machine translation. Sequence-to-sequence models (2014) encoded a sentence into a state and decoded a translation from it. When a single fixed-size state proved a bottleneck for long sentences, Dzmitry Bahdanau and colleagues let the decoder look back at all encoder states, the beginning of the [[Attention Mechanism]].

The 2017 transformer removed recurrence entirely, the main reason it won. An RNN must process step 1000 after step 999, so training can't run in parallel across the sequence. A transformer processes every position at once, which fits the [[Graphics Processing Unit]] and let models grow as [[Scaling Laws]] reward.

Recurrence keeps one real advantage: **inference cost**. An RNN's memory is constant, whatever the sequence length. A transformer must keep every earlier token in its [[KV Cache]], and attention cost grows with the [[Context Window]].

That has revived recurrent designs. **State space models**, from S4 (2021) to Mamba (2023, Albert Gu and Tri Dao), are linear recurrences that can be computed in parallel during training and run as a cheap loop at inference. Pure recurrent models still struggle to recall exact details from far back, since everything must squeeze through a fixed state, so many recent models are hybrids, mixing a few attention layers with many recurrent ones. The trade-off is between compressing history and keeping all of it, which [[Context Rot]] measures from the other side.

## See also
- [[Machine Translation]]
- [[Markov Chain]]
- [[Automatic Speech Recognition]]
- [[Finite State Machine]]
