---
aliases:
  - GNN
  - Message passing neural network
tags:
  - agents
summary: A neural network that operates on graphs, updating each node's representation by passing and combining messages from its neighbors, used for molecules, social and road networks, recommendations, and physical simulations.
---
A **graph neural network**, or GNN, is a neural network designed to work on graphs: data made of nodes connected by edges, such as molecules, social networks, road maps, or the links between web pages; see [[Neural Network]] and [[Graph theory]]. Ordinary networks expect a fixed-size grid, like an image's pixels or a sentence's tokens. Graphs have no fixed shape, size, or ordering of nodes, so they need a different approach.

The core mechanism is **message passing**. Each node starts with a vector describing it, such as an atom's element and charge; see [[Embedding]]. In each layer, every node collects vectors from its neighbors, combines them with an operation that doesn't depend on their order, such as a sum or average, and updates its own vector using the result and a learned function. After one layer, a node knows about its immediate neighbors; after several, information from further away has reached it, much like a breadth-first spread through the graph; see [[Graph Traversal]].

The approach generalizes convolution. An image convolution combines each pixel with its neighbors on a grid; a graph convolution does the same over arbitrary connections; see [[Convolutional neural network]]. A widely used version, graph convolutional networks, was published by Thomas Kipf and Max Welling in 2016. Attention-based variants let each node weigh its neighbors differently, and a transformer can be viewed as a graph network on a fully connected graph; see [[Attention Mechanism]].

The applications follow wherever data is relational. In chemistry, GNNs predict molecular properties from structure, screening candidate drugs and materials. In recommendation, users and items form a graph, and a node's neighbors hint at its tastes; see [[Recommender System]]. Road networks are graphs, and GNNs have been used to predict travel times. Knowledge graphs and fraud detection use them to infer missing links; see [[Knowledge Graph]]. Simulators represent particles or mesh points as nodes and learn how forces travel between them; see [[Fluid Simulation]]. Protein structure prediction relies on related ideas, reasoning about pairs of residues; see [[AlphaFold]].

GNNs have characteristic limitations. Stacking many layers tends to make every node's vector look alike, a problem called over-smoothing, so most networks stay shallow, sometimes helped by skip connections; see [[Residual Connection]]. Basic message passing can't distinguish certain graphs that differ in structure, a limit tied to a classic test for whether two graphs are the same shape. Very large graphs, with billions of edges, need sampling to fit in memory.

Some of the earliest ideas about ranking nodes by their neighbors predate neural networks entirely; see [[PageRank]]. Real networks often have short paths between any two nodes, which lets information spread in few layers; see [[Small-World Network]].

## See also
- [[Word2Vec]]
- [[Graph Coloring]]
