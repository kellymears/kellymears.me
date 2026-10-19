---
aliases:
  - Polysemanticity
  - Polysemantic neuron
  - Sparse autoencoder
  - Monosemanticity
tags:
  - agents
summary: How neural networks store more concepts than they have neurons by overlapping them in nearly perpendicular directions, and why that makes their internals hard to read.
---
**Superposition** is the hypothesis that a neural network represents more features than it has dimensions by storing them as overlapping directions in its activation space. A layer with a few thousand neurons may track hundreds of thousands of concepts, each one a direction that mixes many neurons, packed so they interfere with each other only slightly. It is the main reason a [[Neural Network]] is hard to read from the inside.

The visible symptom is **polysemanticity**: single neurons that respond to unrelated things. Researchers found image-model neurons that fire for both cat faces and the fronts of cars, and language-model neurons that respond to academic citations, Korean text, and HTTP requests. If each concept had its own neuron, interpretation would be a matter of labeling neurons. Superposition means the meaningful units are directions, not neurons.

Geometry makes this possible. In two or three dimensions you can fit only a few mutually perpendicular directions. In high dimensions you can fit exponentially many directions that are *almost* perpendicular, a consequence of the Johnson–Lindenstrauss lemma. Storing features along nearly perpendicular directions lets each be read with only small interference from the others. The same trade, packing more items than slots in exchange for occasional collisions, underlies the [[Bloom Filter]] and [[HyperLogLog]].

Anthropic's 2022 paper *Toy Models of Superposition* by Nelson Elhage and colleagues showed when it happens. Superposition depends on **sparsity**: if each feature is rarely active, two features sharing a direction will seldom be active together, so interference is rare and the network gains capacity cheaply. As features become sparser, small models shift from dedicating dimensions to a few important features to packing many features into geometric arrangements such as pairs, triangles, and pentagons. It is a form of [[Data Compression]] the network discovers itself.

Undoing it is the focus of current [[Mechanistic Interpretability]] work. A **sparse autoencoder** is trained to rewrite a layer's activations as a sparse combination of a much larger set of learned directions, a technique called dictionary learning. Anthropic's 2023 *Towards Monosemanticity* applied it to a small transformer and recovered thousands of interpretable features. *Scaling Monosemanticity* (2024) extended it to a production model, finding millions of features, including concepts such as deception, code bugs, and a Golden Gate Bridge feature. Amplifying that feature produced a model that steered every conversation toward the bridge.

Superposition is usually studied in the [[Residual stream]], the shared channel a transformer's layers read from and write to, and in the vectors behind an [[Embedding]]. The *linear representation hypothesis*, that concepts correspond to directions, makes it tractable. The open questions are practical ones: whether learned dictionaries capture the features the model actually uses, and whether reading them can detect behaviors such as [[Sycophancy]] or [[Reward Hacking]] before they show up in outputs.

## See also
- [[Linear Probe]]
- [[Embedding]]
- [[Residual Connection]]
- [[Double Descent]]
- [[Autoencoder]]
