---
aliases:
  - Diagonalization
  - Countable set
  - Uncountable set
  - Hilbert's Hotel
tags:
  - computation
summary: Georg Cantor's 1891 proof that the real numbers can't be listed, showing that some infinities are larger than others, and the self-referential trick behind the halting problem and Gödel's incompleteness.
---
**Cantor's diagonal argument** is a proof, published by Georg Cantor in 1891, that some infinite sets are larger than others. It showed that the real numbers can't be listed, even in an infinitely long list, and its central trick, **diagonalization**, became one of the most powerful tools in logic and computer science.

Cantor's starting point was a way to compare infinite sizes. Two sets are the same size if their members can be paired off one to one with none left over. By this measure the even numbers are as numerous as all the whole numbers, since each n pairs with 2n. A set that can be paired with the whole numbers, that is, listed in order, is called **countable**. The fractions are countable too: arrange them in a grid by numerator and denominator and sweep through it diagonally, so every fraction gets a place in line.

David Hilbert later dramatized this as **Hilbert's Hotel**, a hotel with infinitely many rooms, all occupied, that can still take a new guest by moving everyone from room n to room n + 1. The ordinary rule that more items than boxes forces doubling up fails for infinite sets; see [[Pigeonhole Principle]].

The real numbers are different. Suppose someone claims a complete list of all the decimals between 0 and 1. Build a new number by going down the diagonal: make its first digit differ from the first digit of the first number, its second digit differ from the second digit of the second, and so on. The new number differs from every entry in at least one place, so it isn't on the list, and no list can be complete. The reals are **uncountable**, a strictly larger infinity.

The argument works anywhere a list can be made to describe its own entries:

- **Computability.** Programs are finite strings, so they can be listed, but there are uncountably many functions from numbers to yes-or-no answers. Most functions, therefore, can't be computed by any program. Turing's 1936 proof that no program can decide whether every program halts is a diagonal argument; see [[Halting Problem]] and [[Turing Completeness]].
- **Logic.** Gödel's statement that says, in effect, "I am not provable" uses the same self-reference; see [[Gödel's Incompleteness Theorems]].
- **Self-description.** A program that prints its own source relies on a related fixed-point construction; see [[Quine]] and [[Lambda Calculus]].

Cantor's work met fierce resistance. Leopold Kronecker, among others, rejected completed infinities, and Cantor suffered recurring depression. The ideas prevailed: Hilbert declared in 1926 that no one would expel mathematicians "from the paradise that Cantor has created." Computers, though, store only finitely many numbers, so nearly every real number is out of their reach; see [[Floating-Point Arithmetic]].

## See also
- [[Binary Number]]
- [[Space-Filling Curve]]
- [[Kolmogorov Complexity]]
- [[Prime Number]]
- [[Russell's Paradox]]
- [[Reductio ad Absurdum]]
