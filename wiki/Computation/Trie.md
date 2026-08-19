---
aliases:
  - Prefix Tree
  - Digital Tree
tags:
  - computation
summary: A tree that stores strings by shared prefix, so each node represents a prefix all its descendants extend.
---
**Trie** (pronounced "try," from re**trie**val) stores a set of strings as a tree where each edge is labeled with a character and each node represents the prefix spelled out by the path from the root to it — so "car" and "cart" share every node up through "car," diverging only at the fourth character. A lookup, insert, or prefix check walks the tree one character at a time and costs time proportional to the string's length, not to how many strings are stored — a property no comparison-based structure shares (a [[Hash Table]] matches it, since hashing the key is also length-proportional, but tells you nothing about prefixes without a separate structure).

This is exactly why a trie is the standard structure behind autocomplete and typeahead: "give me every stored string starting with 'ca'" is a single walk down to the node for "ca," followed by a traversal of everything beneath it — a query a hash table cannot answer without scanning every key, since hashing deliberately destroys any relationship between similar keys' locations. A [[Bloom Filter]] answers a related but different question (is this exact string probably in the set) with no support for prefixes at all; the two are not substitutes for each other.

The cost is space: a naive trie allocates a node per character per branch, and a large alphabet (Unicode rather than lowercase ASCII) multiplies that overhead by the branching factor at every node. Two common fixes are used depending on which side of that trade-off matters more: a compressed trie (radix tree / Patricia trie) collapses runs of single-child nodes into one edge labeled with a whole substring, trading some lookup-time complexity for a large space reduction, while a plain array-of-26-children trie keeps lookups branch-free at the cost of the wasted array slots.

Tries also underlie IP routing tables (longest-prefix match over binary strings) and spell-checkers (walking off the beaten path measures edit distance from the nearest valid word) — anywhere "prefix" is the natural unit of comparison rather than "whole key."

## See also
- [[Hash Table]]
- [[Bloom Filter]]
- [[B-Tree]]
- [[Big-O Notation]]
