---
aliases:
  - Knuth shuffle
  - Card shuffling
tags:
  - computation
summary: The standard algorithm for putting a list in a uniformly random order in one pass, and the catalog of plausible-looking shortcuts that quietly bias the result.
---
**The Fisher-Yates shuffle** puts a list into a random order in which every arrangement is equally likely. Ronald Fisher and Frank Yates described a pencil-and-paper version in 1938 for preparing random orders for experiments; see [[Randomized Controlled Trial]]. Richard Durstenfeld adapted it for computers in 1964, and Donald Knuth's books spread it widely enough that it's also called the **Knuth shuffle**.

The algorithm walks backward through the list. At each position, it picks a random position from the start up to and including the current one, and swaps the two. When it reaches the front, it's done. That takes one pass and no extra memory, and every one of the n! possible orders comes out with exactly equal probability; see [[Big-O Notation]].

The details are easy to get wrong, and each mistake still produces output that looks random:

- **Picking from the whole list each time.** Swapping each position with any position seems equivalent but gives nⁿ equally likely sequences of choices. That number isn't divisible by n!, so some orders must come up more often than others.
- **Sorting with a random comparison.** Shuffling by sorting with a comparator that answers at random gives a bias that depends on the sorting algorithm. When the European Commission required Microsoft to offer Windows users a choice of browser in 2010, the ballot's order was first shuffled this way and came out measurably skewed; see [[Sorting Algorithm]] and [[Browser Wars]].
- **Reducing random numbers with a remainder.** Taking a random number modulo the range favors smaller values unless the range divides the generator's output evenly; see [[Modular Arithmetic]].

The generator's state matters too. A deck of 52 cards has about 8 × 10⁶⁷ orders, roughly 2²²⁶. A generator seeded with 32 bits can reach at most about four billion of them. In 1999, security researchers showed that an online poker site seeded its shuffle from the system clock, so after seeing a few cards they could compute the rest of the deck; see [[Pseudorandom Number Generator]] and [[Seeded Randomness]].

Games use shuffling to shape luck. Tetris's modern randomizer deals the seven pieces as a shuffled bag, so no piece goes missing for long; see [[Tetris]] and [[Pity Timer]]. Card games depend on shuffles players trust; see [[Deckbuilder]] and [[Input and Output Randomness]].

True randomness often doesn't feel random. Listeners complained that music shuffle played the same artist twice in a row, which a fair shuffle often does, and services adjusted their shuffles to spread artists out; see [[Clustering illusion]].

Choosing a random sample from a stream of unknown length is a close relative; see [[Reservoir Sampling]].

## See also
- [[Caesar Cipher]]
- [[Birthday Problem]]
