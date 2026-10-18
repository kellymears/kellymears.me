---
aliases:
  - Attention
  - Self-attention
  - Transformer architecture
  - Attention head
  - Positional encoding
tags:
  - agents
summary: The operation at the heart of the transformer, letting every token weigh every other token when computing its meaning, and the source of both its power and its quadratic cost.
---
The **attention mechanism** lets a neural network decide, for each element of a sequence, which other elements matter most. In a language model, it's how the word "it" in a sentence comes to carry information about the noun it refers to. Attention is the core of the *transformer* architecture behind every current [[Large Language Model]].

Attention first appeared in 2014, when Dzmitry Bahdanau and colleagues added it to recurrent networks for machine translation so the decoder could look back at relevant source words. The 2017 Google paper "Attention Is All You Need" by Ashish Vaswani and colleagues dropped recurrence entirely and built a model from attention alone, the transformer.

The computation works like a soft lookup. Each [[Token]] is turned into three vectors:

- **A query**, describing what this token is looking for.
- **A key**, describing what it offers to others.
- **A value**, the information it passes along if selected.

Each token's query is compared with every token's key, the scores are normalized into weights that sum to one, and the token's new representation is the weighted sum of the values. A transformer runs many of these in parallel, called *attention heads*, each free to learn a different relationship, such as grammar, coreference, or position. In text generation, a mask stops each token from attending to later ones, so the model can't peek at the words it's predicting.

Attention by itself ignores order: shuffle the tokens and the weights shuffle with them. Models therefore add *positional encoding*, information about each token's position. Modern models mostly use rotary embeddings, which encode relative distance.

Two properties made transformers dominant. Unlike recurrent networks, which process tokens one after another, attention computes all positions at once, a perfect fit for the [[Graphics Processing Unit]]. And any token can reach any other in one step, so long-range relationships don't fade.

The cost is that comparing every token with every other grows with the *square* of sequence length. Doubling the [[Context Window]] quadruples attention's work, which is why long contexts were expensive and why so much engineering targets attention. FlashAttention, introduced in 2022, reorganizes the computation to avoid slow memory traffic. During generation, keys and values for earlier tokens are stored rather than recomputed, as described under [[KV Cache]]. Sparse and sliding-window variants attend to only some positions.

Attention spreads finite weight across everything in context, which helps explain why irrelevant material degrades answers, as described under [[Context Rot]]. It is also where much of [[Mechanistic Interpretability]] looks: researchers have identified *induction heads*, which copy patterns seen earlier in the context and appear to underpin [[In-Context Learning]]. The analogy to human [[Selective Attention]] is loose, but in both cases attending to one thing means attending less to others.

## See also
- [[Backpropagation]]
- [[Residual Connection]]
- [[Recurrent Neural Network]]
- [[Context Rot]]
- [[Neural Network]]
- [[Softmax]]
