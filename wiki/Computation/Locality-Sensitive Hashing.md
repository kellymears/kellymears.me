---
aliases:
  - LSH
  - MinHash
  - SimHash
  - Jaccard similarity
tags:
  - computation
summary: Hashing designed so that similar items collide, making it possible to find near-duplicates and nearest neighbors among billions of items without comparing every pair.
---
**Locality-sensitive hashing** (LSH) is a family of techniques that hash items so that **similar items are likely to get the same hash** and dissimilar ones aren't. It turns the expensive question "which items are similar to this one?" into the cheap question "which items landed in the same bucket?"

An ordinary [[Hash Function]] is built for the opposite goal: changing a single bit of input should scramble the output completely, so near-identical inputs end up far apart. That's what [[Hash Table]]s and checksums need, but it's useless for finding near-duplicates.

The motivating problem is scale. Comparing every pair among a billion documents takes about half a billion billion comparisons. LSH skips almost all of them, comparing only items that share a bucket, at the cost of occasionally missing a similar pair or checking a dissimilar one; see [[Precision and Recall]].

Each similarity measure has its own LSH scheme:

- **MinHash** estimates **Jaccard similarity**, the overlap between two sets divided by their union. Documents are broken into overlapping word sequences, each set is hashed many ways, and the minimum value under each hash is kept. The fraction of matching minimums estimates the overlap. It was developed in 1997 at AltaVista to find near-duplicate web pages.
- **SimHash** reduces a document to a short fingerprint in which similar documents differ in only a few bits. Search engines have used it to skip near-duplicate pages while crawling; see [[Web Crawler]].
- **Random hyperplanes** approximate [[Cosine Similarity]] between vectors: each hash bit records which side of a random plane a vector falls on.

A practical trick called **banding** tunes the trade-off. Splitting a signature into bands and treating any matching band as a candidate pair produces a sharp threshold: pairs above a chosen similarity are almost always caught, and pairs below it are almost always skipped.

Applications include:

- **Deduplication** of web pages, training data for language models, and records; see [[Entity Resolution]].
- **Plagiarism and copy detection**, where small edits shouldn't hide a match; see [[Edit Distance]].
- **Nearest-neighbor search** over [[Embedding]]s, for recommendations and retrieval.
- **Audio and image fingerprinting**, matching a clip against a large catalog.

In high dimensions, exact nearest-neighbor search slows to a crawl, and approximate methods are the only practical option; see [[Curse of dimensionality]]. LSH was the dominant approach for years. Modern [[Vector Database]]s more often use graph-based indexes, which tend to be more accurate for the same memory, but LSH remains popular for deduplication because it's simple, streams well, and parallelizes easily.

LSH belongs to a larger family of probabilistic data structures that trade exactness for scale; see [[Bloom Filter]] and [[HyperLogLog]].

## See also
- [[Contrastive Learning]]
- [[Perfect Hashing]]
- [[Approximate Nearest Neighbor Search]]
