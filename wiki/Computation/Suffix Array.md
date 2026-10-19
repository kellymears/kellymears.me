---
aliases:
  - Suffix tree
  - Longest repeated substring
tags:
  - computation
summary: A sorted list of every suffix of a text, stored as positions, that turns substring search into binary search and underpins genome indexes, compressors, and plagiarism detectors at a fraction of a suffix tree's memory.
---
**A suffix array** is a list of the starting positions of every suffix of a text, sorted in alphabetical order of the suffixes. For the word banana, the suffixes are banana, anana, nana, ana, na, and a. Sorted, they run a, ana, anana, banana, na, nana, so the suffix array records their starting positions in that order.

Because every substring of the text is the beginning of some suffix, the array becomes an index of every substring. Finding all occurrences of a pattern means finding the range of sorted suffixes that start with it, which binary search does in time proportional to the pattern's length times the logarithm of the text's length; see [[Binary Search]] and [[String-Searching Algorithm]].

Udi Manber and Gene Myers introduced suffix arrays in 1990 as a lighter alternative to **suffix trees**. A suffix tree, developed by Peter Weiner in 1973, is a compressed trie of all suffixes; see [[Trie]]. It answers many questions in time proportional to the pattern alone, but in practice it often takes many times the memory of the text. A suffix array stores one integer per character. With a second array recording how many characters adjacent suffixes share, it can answer most of the same questions.

Building the array naively means sorting suffixes by comparing them character by character, which can be slow for repetitive texts; see [[Sorting Algorithm]]. Faster methods sort by prefixes of doubling length, or use radix sorting; see [[Radix Sort]]. Linear-time construction algorithms appeared in 2003, and later engineering made them fast on billions of characters.

Applications include:

- **Genomics.** Searching DNA sequences, which are long and highly repetitive, for matches to short reads. Compressed variants built on the Burrows-Wheeler transform reduce memory further; see [[Burrows-Wheeler Transform]].
- **Compression.** Finding long repeated substrings, which compressors replace with references; see [[Data Compression]].
- **Repeats and plagiarism.** The longest repeated substring, or the longest substring two documents share, falls out of adjacent entries in the array. Related comparisons of sequences use dynamic programming instead; see [[Edit Distance]].
- **Search.** Full-text indexes that support arbitrary substring queries, not just whole words; see [[Inverted Index]].

Memory access patterns are a practical concern. Binary search jumps around the array and the text, so cache misses dominate on large inputs; see [[Locality of Reference]] and [[Memory Hierarchy]]. Variants that sample the array or keep it compressed trade a little speed for much less memory, which matters when the text is a whole genome.

Suffix arrays illustrate a recurring theme: sorting data once, cleverly, can make a whole class of later questions cheap. The same idea underlies database indexes; see [[Database Index]].

## See also
- [[Dynamic Programming]]
- [[Big-O Notation]]
