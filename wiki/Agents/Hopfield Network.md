---
aliases:
  - Associative memory
  - Boltzmann machine
  - Energy-based model
tags:
  - agents
summary: A neural network that stores memories as low points in an energy landscape and recalls a whole pattern from a fragment by rolling downhill, linking neuroscience, statistical physics, and machine learning, and honored with the 2024 Nobel Prize in Physics.
---
A **Hopfield network** is a neural network that works as a memory. It stores a set of patterns, such as images, and when given a partial or noisy version of one, it settles into the complete stored pattern. John Hopfield, a physicist, described it in 1982, and the idea helped revive interest in neural networks during a period when they had been largely set aside; see [[Neural Network]].

The network is a set of simple units, each on or off, and every unit is connected to every other by a weight that is the same in both directions. Each unit repeatedly looks at its neighbors and switches to whichever state agrees best with the weighted votes it receives. Hopfield's insight was that, with symmetric weights, the network has an **energy** that never increases as units update. Like a ball rolling down a hillside, the state always moves downhill and eventually stops in a valley; see [[Entropy]].

Storing a memory means shaping the landscape so that each stored pattern sits at the bottom of a valley. The rule is simple: strengthen the connection between any two units that are on together in a pattern, and weaken it when they disagree, an echo of the neuroscientist's principle that cells that fire together wire together; see [[Hebbian learning]]. To recall, start the network at a fragment and let it run. It slides into the nearest valley, filling in what was missing.

This is **associative**, or content-addressable, memory: retrieval by partial content rather than by location. A computer finds data at an address, while a person given half a phone number or a line of a song can produce the rest; see [[Hash Table]] and [[Episodic Memory]].

The limits are tight. A classic network of N units holds only about 0.14 N patterns reliably; store more and the valleys merge into false memories that blend several patterns. Hopfield borrowed his mathematics from models of magnetic materials called spin glasses, and that connection to statistical physics shaped what followed; see [[Phase Transition]].

Geoffrey Hinton and Terrence Sejnowski built on it with the **Boltzmann machine** in the mid-1980s, adding randomness to the updates and hidden units that could learn features of the data, not just store examples; see [[Simulated Annealing]]. Restricted Boltzmann machines, stacked into deep networks, were part of the 2006 work that relaunched deep learning. Hopfield and Hinton shared the 2024 Nobel Prize in Physics for these foundations.

Later versions, called modern Hopfield networks, store vastly more patterns, and in 2020 researchers showed that their update rule is mathematically the same as the attention operation at the heart of transformers, so a language model's attention can be read as an associative memory lookup; see [[Attention Mechanism]] and [[Agent Memory]].

## See also
- [[Recurrent Neural Network]]
- [[Autoencoder]]
- [[Memory Consolidation]]
