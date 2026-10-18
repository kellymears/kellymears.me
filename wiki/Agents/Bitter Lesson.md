---
aliases:
  - The Bitter Lesson
tags:
  - agents
summary: Rich Sutton's 2019 observation that general methods which scale with computation, search and learning, have repeatedly beaten approaches built on human knowledge, however clever.
---
**The Bitter Lesson** is a short 2019 essay by Rich Sutton, a founder of modern reinforcement learning. Its claim: the biggest lesson from 70 years of AI research is that general methods that make use of computation end up the most effective, by a large margin. Methods built on human knowledge of a problem help in the short run, then plateau and are overtaken. The lesson is bitter because researchers keep relearning it and keep wishing it weren't true.

Sutton's argument rests on cheap computing. Computation per dollar has grown exponentially for decades; see [[Moore's Law]]. A method that improves when given more compute rides that curve, while one limited by how much expertise its designers can encode doesn't.

His examples:

- **Chess.** In 1997 Deep Blue beat world champion Garry Kasparov using massive, mostly brute-force search. Researchers who had worked on encoding human chess understanding were dismayed.
- **Go.** Programs built on human Go knowledge stalled for decades. Search guided by random playouts, and later by learning from self-play, beat the best humans; see [[Monte Carlo Tree Search]] and [[Self-Play]].
- **Speech recognition.** Statistical methods beat systems built on linguistic knowledge of words and sounds in the 1970s, and deep learning later beat the statistical methods; see [[Automatic Speech Recognition]].
- **Vision.** Hand-designed detectors for edges and shapes gave way to networks that learn their own features from data; see [[Convolution]].

The two methods that scale, Sutton argues, are **search** and **learning**. Rather than building in what we think we know about how minds work, researchers should build methods that can discover it.

Language models are often read as the strongest confirmation. Simple architectures trained on enormous amounts of text with enormous compute overtook decades of hand-built linguistic systems, and performance improves predictably with scale; see [[Scaling Laws]] and [[Pretraining]]. Earlier symbolic AI, which encoded expert knowledge as rules, is the essay's cautionary tale; see [[Expert System]].

The essay has critics. Rodney Brooks replied that human ingenuity still matters: convolution itself builds in human knowledge about images, and the architectures that scale had to be invented. Others point out that scale needs data as well as compute, that efficiency matters when compute isn't free, and that what counts as general is itself a design choice; see [[Moravec's Paradox]].

The lesson has a practical corollary for building on language models. Elaborate scaffolding that compensates for a model's current weaknesses tends to become dead weight when the next model arrives, so simple, general harnesses that let the model do more of the work tend to age better; see [[Agentic Loop]].

## See also
- [[Neural Network]]
- [[Reinforcement Learning]]
