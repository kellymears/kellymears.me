---
aliases:
  - Network pruning
  - Magnitude pruning
  - Structured pruning
  - Lottery ticket hypothesis
  - Weight sparsity
tags:
  - agents
summary: Removing weights, neurons, or whole components from a trained neural network to make it smaller and faster, often with little loss of accuracy, and the lottery ticket hypothesis about why so much can go.
---
**Pruning** removes parts of a trained neural network, individual weights, whole neurons, attention heads, or layers, to make it smaller and cheaper to run. Networks are usually heavily overparameterized, and a large fraction of their weights can often be removed with little loss of accuracy; see [[Neural Network]].

The idea is old. Yann LeCun and colleagues proposed "Optimal Brain Damage" in 1989, removing the weights whose deletion would least increase the error, and a refinement called "Optimal Brain Surgeon" followed in 1993. Interest revived with deep learning. In 2015 Song Han and colleagues pruned around nine tenths of the weights from large image classifiers without losing accuracy, then combined pruning with [[Quantization]] and Huffman coding to shrink models by thirty to fifty times; see [[Data Compression]].

The standard recipe is **magnitude pruning**: remove the weights closest to zero, which contribute least, then fine-tune briefly so the remaining weights compensate, and repeat; see [[Fine-Tuning]].

The catch is hardware. Removing scattered individual weights leaves a sparse matrix, but processors are built for dense matrix arithmetic, so unstructured sparsity rarely speeds anything up without special support; see [[Graphics Processing Unit]]. Hence **structured pruning**, which removes whole rows, neurons, attention heads, or layers, leaving a smaller dense network. A 2019 study found that most attention heads in trained translation and language models could be removed at test time with little harm; see [[Attention Mechanism]]. NVIDIA's chips since 2020 support a middle ground in which two of every four weights are zero, a pattern the hardware can exploit for up to double speed.

In 2019 Jonathan Frankle and Michael Carbin proposed the **lottery ticket hypothesis**. They found that within a large randomly initialized network there are small subnetworks that, if trained alone from the same initial values, match the full network's accuracy. The big network, on this view, is mainly a way to buy many lottery tickets, of which training finds a winner. It suggests why overparameterization helps and why pruning works afterward; see [[Double Descent]].

Pruning large language models is harder, since retraining them is expensive. Methods published in 2023 pruned half the weights of large models in a single pass with modest losses, but compression approaches that keep all the weights at lower precision have generally been more popular, as has training a small model to imitate a large one; see [[Knowledge Distillation]].

Pruning relates to other ideas about sparsity. [[Regularization]] can push weights toward zero during training, making later pruning easier. A [[Mixture of Experts]] activates only part of the network for each input, a dynamic form of sparsity. And the developing brain prunes too, eliminating many of its synapses through childhood and adolescence while strengthening those in use; see [[Neuroplasticity]].

## See also
- [[Ablation Study]]
- [[Superposition]]
- [[Batch Normalization]]
- [[Tensor Processing Unit]]
