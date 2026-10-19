---
aliases:
  - Cardinality estimation
  - Count-distinct problem
  - Count-min sketch
  - Probabilistic counting
  - Sketch
tags:
  - computation
summary: Estimating how many distinct items a huge stream contains using a few kilobytes of memory, by watching for unusually long runs of zeros in hashed values.
---
**HyperLogLog** estimates how many distinct items appear in a dataset, its *cardinality*, using a tiny, fixed amount of memory. Counting unique visitors exactly requires remembering every visitor seen, which for billions of users means gigabytes. HyperLogLog does it in about 12 kilobytes with an error around 1 percent. Philippe Flajolet and colleagues published it in 2007, building on Flajolet and Martin's probabilistic counting from 1985.

The idea rests on a coin-flipping intuition. If someone reports flipping a coin and getting ten heads in a row, they probably flipped many times, since such runs are rare. HyperLogLog runs each item through a [[Hash Function]] to get a random-looking bit string and records the longest run of leading zeros seen. A run of k zeros has probability one in 2^k, so the longest run hints at roughly how many distinct values have been hashed. Duplicates hash identically and change nothing, which is what makes it count distinct items.

One estimate from one run is wildly noisy, so the algorithm splits items into many buckets by the first few bits of the hash, tracks the longest run per bucket, and combines them with a harmonic mean that dampens outliers. With m buckets the standard error is about 1.04 divided by the square root of m. Redis implements it with 16,384 buckets in 12 KB, for 0.81 percent error, behind its `PFADD` and `PFCOUNT` commands.

Two properties make it especially useful:

- **Mergeable.** Sketches from different servers or days combine by taking the maximum per bucket, giving the exact sketch of the union. Distinct counts can be computed per shard and merged, which suits [[MapReduce]] and [[Stream Processing]] systems.
- **Fixed size.** Memory never grows with the data, so a sketch per page, per day, or per customer stays affordable.

HyperLogLog belongs to a family of probabilistic sketches that trade exactness for memory:

- **[[Bloom Filter]].** Answers "have I seen this?" with possible false positives but no false negatives.
- **Count-min sketch.** Estimates how often each item appears, overestimating but never underestimating, using a grid of counters and several hashes. Graham Cormode and S. Muthukrishnan introduced it in 2005. It finds heavy hitters such as the most-requested URLs or the noisiest clients for [[Rate Limiting]].
- **[[Reservoir Sampling]].** Keeps a fair random sample of a stream of unknown length.

Analytics databases, [[Columnar Storage]] engines, and [[Time Series Database]] products expose approximate distinct counts built on these ideas, often as functions like `APPROX_COUNT_DISTINCT`, for queries where the exact answer would cost far more than it is worth.

The trade-off must be acceptable. Approximate counts suit dashboards and capacity planning, where 1 percent error is invisible. They do not suit billing or anything audited, where every unit must be accounted for.

## See also
- [[Data Profiling]]
- [[Bitmap Index]]
- [[Locality-Sensitive Hashing]]
- [[Statistical Sampling]]
- [[Cuckoo Hashing]]
