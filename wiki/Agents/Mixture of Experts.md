---
aliases:
  - MoE
  - Sparse model
  - Expert routing
tags:
  - agents
summary: A model architecture that holds many parameter blocks but runs only a few per token, decoupling total size from per-token compute.
---
A **mixture of experts** (MoE) model replaces some of its dense layers with many parallel sub-networks, the *experts*, plus a small *router* that picks a few of them for each [[Token]]. A model might hold 128 experts per layer and activate 8. The total parameter count is large, but the compute per token scales only with the *active* parameters. Model names often state both numbers: "35B-A3B" means 35 billion parameters in total, about 3 billion active per token.

The appeal is that knowledge capacity grows with total parameters while speed tracks active ones, so an MoE model can answer like a much larger dense model at the per-token cost of a small one. The catch is that **memory still scales with the total**. Every expert has to be resident, because any token might route to any of them. On consumer hardware this produces an unusual profile: a model that generates quickly once loaded but needs far more memory than its speed suggests. [[Quantization]] is usually what makes it fit at all. When it doesn't fit, engines keep the attention layers on the GPU and push expert weights to system RAM, which works better than it would for a dense model because each token touches only a few experts.

Routing brings its own problems:

- **Load imbalance.** A router left alone sends most tokens to a few favored experts while the rest go untrained. Training adds a balancing loss to spread the load, the same concern as [[Load Balancing]] across servers.
- **Expert specialization is not human-legible.** Experts rarely line up with topics like "math" or "French". They tend to specialize on syntax and token types, which [[Mechanistic Interpretability]] work has tried to map.
- **Batch inefficiency.** Different tokens in a batch want different experts, so serving MoE at scale is a scheduling problem as much as a compute one.

MoE is [[Model Routing]] moved inside the network, decided per token by a learned function instead of per task by an engineer. It combines well with [[Speculative Decoding]] because both target the same bottleneck: how much has to be read from memory for each token produced.

## See also
- [[Large Language Model]]
- [[Model Routing]]
- [[Quantization]]
- [[Fine-Tuning]]
- [[KV Cache]]
- [[Load Balancing]]
