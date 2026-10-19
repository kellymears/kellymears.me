---
aliases:
  - Fibonacci number
tags:
  - computation
summary: The sequence in which each number is the sum of the two before it, known in India centuries before Fibonacci, tied to the golden ratio, and the standard example of how a naive recursive program can take exponential time.
---
**The Fibonacci sequence** starts 0, 1, and continues by adding the previous two numbers: 1, 2, 3, 5, 8, 13, 21, 34, and on. It takes its name from Leonardo of Pisa, later called Fibonacci, whose 1202 book Liber Abaci posed a problem about breeding rabbits whose answer is the sequence. The same book helped bring Hindu-Arabic numerals to Europe; see [[Positional notation]].

Indian scholars knew it centuries earlier. Writers on Sanskrit prosody, Pingala in antiquity and later Virahanka and Hemachandra, counted the rhythms that can be built from short and long syllables, and those counts form the sequence.

The ratio between consecutive numbers approaches the golden ratio, about 1.618, and a closed formula gives each term directly from powers of that ratio, so the numbers grow exponentially; see [[Golden Ratio]]. The sequence appears in plants, where the spiral counts in sunflower heads and pine cones are often consecutive Fibonacci numbers, an outcome of how new growth is placed. Many other claims, about the proportions of famous art and buildings, don't hold up.

In computing it's the standard lesson in cost. The definition translates directly into a recursive function, and that function is disastrously slow: computing the fortieth number recomputes the smaller ones hundreds of millions of times, because the calls form a tree that grows exponentially; see [[Recursion]] and [[Big-O Notation]]. The fixes are the textbook progression:

- **Remember answers.** Caching each result as it's computed makes the same code linear; see [[Memoization]].
- **Build up from the bottom.** Keeping just the last two numbers in a loop takes linear time and constant memory; see [[Dynamic Programming]].
- **Use squaring.** Matrix powers or the related doubling formulas get the nth number in a logarithmic number of steps, though the numbers themselves grow so large that each step needs big-number arithmetic; see [[Arbitrary-Precision Arithmetic]].

Functional languages like to define the sequence as an infinite list that refers to itself, with each element computed only when asked for; see [[Lazy Evaluation]].

The sequence shows up inside other algorithms:

- **Euclid's algorithm** runs longest on consecutive Fibonacci numbers, a fact proved in 1844 and one of the earliest analyses of an algorithm's running time; see [[Euclidean algorithm]].
- **Fibonacci heaps**, a priority queue named for the sequence's role in bounding their shape, give the best theoretical time bound for [[Dijkstra's Algorithm]].
- **Fibonacci hashing** multiplies keys by a constant derived from the golden ratio to spread them across a table; see [[Hash Table]].

Agile teams often estimate with a modified Fibonacci scale, so that larger estimates are forced into coarser buckets that reflect their uncertainty; see [[Story Points]].

## See also
- [[Collatz Conjecture]]
- [[Fractal]]
- [[Rule of Thirds]]
