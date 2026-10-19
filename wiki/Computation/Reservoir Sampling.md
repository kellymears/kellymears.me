---
aliases:
  - Algorithm R
  - Stream sampling
  - Weighted reservoir sampling
  - Fisher–Yates shuffle
tags:
  - computation
summary: Picking a fair random sample from a stream whose length you do not know in advance, in one pass and fixed memory.
---
**Reservoir sampling** selects k items uniformly at random from a stream of unknown length, in a single pass, using memory for only k items. Each item ends up in the sample with exactly the same probability, even though the algorithm never knows how many items are coming. Jeffrey Vitter's 1985 paper analyzed the family; the basic version, Algorithm R, is attributed to Alan Waterman and appears in Donald Knuth's *The Art of Computer Programming*.

The basic algorithm is short:

1. Put the first k items into the reservoir.
2. For the i-th item after that, pick a random number from 1 to i. If it is k or less, replace that slot in the reservoir with the new item.

The proof is a neat induction. The i-th item enters with probability k/i, and each item already in the reservoir survives each later step with exactly the probability needed to keep everything at k/n after n items. When the stream ends, at whatever length, the reservoir is a uniform sample.

The naive alternatives fail on streams. Collecting everything and then sampling needs memory proportional to the whole stream. Sampling each item with a fixed probability gives the wrong sample size unless the length is known. Reservoir sampling needs neither.

Where it is used:

- **Logs and telemetry.** Keeping a representative handful of requests or errors per minute. Trace sampling in [[Observability]] systems faces the same problem.
- **[[Stream Processing]].** Maintaining a live sample for approximate statistics, alongside sketches such as [[HyperLogLog]].
- **Profiling and monitoring.** Latency histograms kept as reservoirs estimate percentiles, including the [[Tail Latency]] that averages hide, in bounded memory.
- **Datasets.** Drawing a random subset from a file too large to load, or from a database cursor, in one pass.

Variants extend the idea. **Weighted reservoir sampling**, from Pavlos Efraimidis and Paul Spirakis in 2006, gives each item a probability proportional to a weight by assigning random keys and keeping the k largest, a job for a [[Binary Heap]]. Vitter's Algorithm Z skips ahead over items that would be rejected, so it calls the random number generator far less often on long streams.

The algorithm is a close cousin of the **Fisher–Yates shuffle**, which produces a uniform random permutation by swapping each position with a randomly chosen earlier one. Both depend on the random choice being truly uniform. A biased [[Pseudorandom Number Generator]], or the common off-by-one mistake of choosing from the wrong range, silently skews results. Using [[Seeded Randomness]] makes samples reproducible for debugging.

Sampling also does not fix bias in the stream itself. If the data reaching the sampler already omits cases, as in [[Selection Bias]] and [[Survivorship Bias]], a perfectly uniform sample of it is a perfectly uniform sample of the wrong population.

## See also
- [[Fisher-Yates Shuffle]]
- [[Histogram]]
- [[HyperLogLog]]
- [[Statistical Sampling]]
- [[Iterator]]
