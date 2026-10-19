---
aliases:
  - BWT
  - Move-to-front transform
  - Bzip2
tags:
  - computation
summary: A reversible reshuffling of a text that groups similar characters together so it compresses better, the core of bzip2 and, surprisingly, of the tools that align billions of DNA fragments to a genome.
---
**The Burrows-Wheeler transform** rearranges the characters of a text so that identical characters tend to sit next to each other. It doesn't compress anything by itself. The output is exactly as long as the input. But text rearranged this way is much easier to compress, and the transformation can be undone exactly.

Michael Burrows and David Wheeler described it in a 1994 technical report from the Digital Equipment Corporation research lab, based on an idea Wheeler had in the early 1980s.

The transform works like this:

1. Write down every rotation of the text, with a special end marker added.
2. Sort the rotations alphabetically; see [[Sorting Algorithm]].
3. Take the last character of each sorted rotation, in order. That column is the output.

Sorting groups rotations that begin with the same context. In English, rotations beginning with "he" are often preceded by "t," so the output collects long runs of the letter t. Repeated words and phrases produce similar runs.

The surprising part is reversibility. The last column, plus the position of the original text among the sorted rotations, is enough to rebuild everything. Sorting the last column gives the first column, and because both columns preserve the relative order of identical characters, each character in one can be matched to the next character of the text. Following those links walks through the original text.

Compressors pair the transform with simple steps that exploit its runs. **Move-to-front coding** replaces each character with its position in a recently used list, so runs become strings of zeros. Run-length and entropy coding then shrink those; see [[Data Compression]] and [[Information Theory]]. The bzip2 compressor, released in 1996, used this pipeline and often beat gzip on text, at the cost of more time and memory; see [[Archive File]].

Computing the transform efficiently doesn't require building every rotation. Sorting all suffixes of the text produces the same order, so practical implementations build a suffix array first; see [[Suffix Array]].

The transform's second life came in genomics. An index called the FM-index, from Paolo Ferragina and Giovanni Manzini in 2000, combines the transform with a few small tables to support fast substring search over the compressed text itself; see [[String-Searching Algorithm]]. Short-read aligners such as Bowtie and BWA, released around 2009, used it to match hundreds of millions of DNA fragments against a human genome on ordinary computers. Searching a compressed text without decompressing it was something earlier indexes, such as a trie, couldn't offer at that scale; see [[Trie]].

The FM-index has also been applied to full-text search over large text collections; see [[Inverted Index]].

## See also
- [[Kolmogorov Complexity]]
- [[Edit Distance]]
