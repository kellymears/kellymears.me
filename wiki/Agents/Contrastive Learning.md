---
aliases:
  - Triplet loss
  - Siamese network
  - Hard negatives
tags:
  - agents
summary: Learning representations by pulling matching pairs together and pushing mismatched ones apart, the method behind face recognition, image-text models like CLIP, and the embeddings that power semantic search.
---
**Contrastive learning** trains a model to produce representations by comparison. It's shown pairs of things that should match, such as two photos of the same face or an image and its caption, and pairs that shouldn't. It learns to place matching pairs close together in its output space and mismatched pairs far apart. The result is an [[Embedding]] where distance means similarity, typically measured by angle; see [[Cosine Similarity]].

The idea dates to **Siamese networks** in 1993, when researchers at Bell Labs used two copies of the same network to check whether two signatures came from the same person. Google's FaceNet, in 2015, used a **triplet loss**: an anchor face, another photo of the same person, and a photo of someone else, with training pushing the anchor nearer the match than the mismatch by a margin. Face recognition on phones and photo libraries works on the same principle.

Contrastive learning doesn't need human labels if the pairs can be made automatically, which makes it a form of self-supervised learning; see [[Self-supervised learning]]. In 2020, SimCLR took two random distortions of the same image, cropped and recolored differently, as a matching pair, and treated every other image in the batch as a mismatch. A network trained this way learned visual features nearly as good as those learned from labeled data; see [[Synthetic Data]].

The most influential example connects images and text. OpenAI's CLIP, in 2021, trained on 400 million image-caption pairs from the web, learning to pick each image's true caption from among all the captions in a batch; see [[Multimodal Model]]. Because images and text share one space, CLIP can classify images into categories it was never trained on, just by comparing them to text descriptions, and it helped steer early text-to-image generators; see [[Diffusion Model]].

The usual training objective scores every pair in a batch and applies a [[Softmax]], treating the right match as the correct class among many. Several factors matter:

- **Batch size.** More negatives per batch give a stronger signal, so contrastive models often train with very large batches.
- **Hard negatives.** Mismatches that look similar to the match, like a different person with the same haircut, teach more than easy ones.
- **Collapse.** Without negatives, a model can cheat by mapping everything to the same point, matching every pair perfectly. Methods that skip negatives need other tricks to prevent this.

Text embedding models used for search are trained contrastively on pairs of queries and relevant passages. Their output fills the [[Vector Database]] behind most [[Retrieval-Augmented Generation]] systems, where a more precise model often re-sorts the top results; see [[Reranking]].

## See also
- [[Dimensionality Reduction]]
- [[Locality-Sensitive Hashing]]
