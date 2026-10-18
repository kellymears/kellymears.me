---
aliases:
  - Map and reduce
  - Hadoop
  - Batch processing
  - Apache Spark
  - Shuffle
tags:
  - data
summary: A programming model for processing huge datasets on clusters of ordinary machines by splitting work into a map step and a reduce step, leaving distribution and failure handling to the framework.
---
**MapReduce** is a model for processing datasets far too large for one machine. The programmer writes two functions. **Map** reads each input record and emits key-value pairs. **Reduce** receives all the values for one key and combines them. The framework handles everything between: splitting the input across hundreds or thousands of machines, moving data, and recovering from failures. Jeffrey Dean and Sanjay Ghemawat described Google's system in a 2004 paper, where it was used to build the search index.

The standard example is counting words across a billion documents:

- **Map** turns each document into pairs such as `("the", 1)`, `("cat", 1)`.
- **Shuffle**, done by the framework, groups pairs by key, sending every `"the"` to the same machine. A [[Hash Function]] of the key picks the destination, and the groups are sorted, which makes the shuffle an enormous distributed [[Sorting Algorithm]].
- **Reduce** sums the ones for each word.

The names come from functional programming, where `map` and `reduce` are a classic [[Higher-Order Function]] pair. The connection matters: because map and reduce are written as [[Pure Function]]s of their inputs, the framework can run any task anywhere, any number of times, and get the same result.

That property is what makes failure handling simple. In a cluster of thousands of cheap machines, some fail during every large job. The coordinator notices a dead worker, using the methods of [[Failure Detection]], and reruns its tasks elsewhere. Slow machines, called *stragglers*, would otherwise hold up the whole job, so the framework starts backup copies of the last tasks and takes whichever finishes first, a fix for [[Tail Latency]]. Computation is also scheduled on the machines that already hold the data, since moving code is cheaper than moving terabytes, a cluster-scale version of [[Locality of Reference]].

Hadoop, an open-source version adopted by Yahoo in 2006, became the base of the "big data" era. Its weaknesses showed quickly. Every stage writes to disk, so iterative algorithms such as machine-learning training, which pass over the same data many times, were painfully slow. Apache Spark (2009) kept intermediate data in memory and recorded how each dataset was derived, so lost pieces could be recomputed rather than replicated. SQL engines over [[Columnar Storage]] then made most hand-written MapReduce jobs unnecessary.

The model's ideas outlived the system. Partitioning by key, as in [[Database Sharding]], a separate shuffle step, and deterministic tasks that can be retried remain the basis of modern batch engines and of each stage of a large [[ETL Pipeline]]. A single key with far more values than the rest, *skew*, still overloads one reducer while the others sit idle. [[Stream Processing]] applies the same partitioned model to data that never ends. At a smaller scale, the same split-and-combine structure is [[Fan-Out and Fan-In]].

## See also
- [[Concurrency and Parallelism]]
- [[Stream Processing]]
- [[Divide and Conquer]]
