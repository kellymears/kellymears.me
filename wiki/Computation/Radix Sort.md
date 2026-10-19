---
aliases:
  - Counting sort
  - Bucket sort
tags:
  - computation
summary: A way to sort without ever comparing two items, by distributing them into buckets one digit at a time, older than electronic computers and still the fastest choice for large arrays of integers on GPUs.
---
**Radix sort** orders items by their digits instead of by comparing items with each other. It distributes items into buckets according to one digit, gathers them back up, and repeats for the next digit. After the last digit, the items are sorted.

The method predates electronic computers. Punched card sorting machines, used with tabulating equipment from the late nineteenth century onward, dropped cards into one of several bins based on the hole punched in a chosen column. Operators sorted a deck on the last column first, stacked the bins in order, and repeated column by column; see [[Punched Card]].

That least-significant-digit-first order works because each pass is **stable**: items with the same digit keep their previous relative order, so the work of earlier passes isn't undone. A most-significant-digit-first variant instead splits into buckets and sorts each bucket recursively, which suits strings of varying length; see [[Recursion]].

Each pass is usually a **counting sort**. Count how many items have each digit value, compute running totals of those counts to find where each bucket starts, then place each item directly into its position; see [[Prefix Sum]]. Counting sort alone works when keys come from a small range, such as test scores from 0 to 100.

Radix sort sidesteps a famous limit. Any sort that only compares pairs of items needs on the order of n log n comparisons in the worst case; see [[Sorting Algorithm]] and [[Big-O Notation]]. Radix sort makes a fixed number of passes, one per digit, each linear in the number of items. For a million 32-bit integers sorted in four passes of 8 bits, it often beats comparison sorts by a wide margin.

Practical details matter:

- **Digit size.** Larger digits mean fewer passes but bigger count tables, which must fit in fast memory; see [[Locality of Reference]].
- **Number formats.** Signed integers need their sign bit flipped, and floating-point numbers need a bit transformation so their binary patterns sort in numeric order; see [[Floating-Point Arithmetic]] and [[Bitwise Operation]].
- **Memory.** Most versions need a second buffer as large as the input.

Radix sort shines on parallel hardware. Graphics processors sort millions of keys this way, using parallel scans to compute bucket positions; see [[Graphics Processing Unit]]. Renderers use it to order particles and transparent surfaces by depth, and physics engines to sort objects for collision checks; see [[Particle System]] and [[Collision Detection]].

It's less suited to general-purpose libraries, which must sort arbitrary objects by arbitrary rules. Sorting text for people also needs language-aware ordering that a simple byte-by-byte radix pass doesn't capture; see [[Collation]].

Radix sorting is also used inside suffix array construction; see [[Suffix Array]].

## See also
- [[Binary Number]]
- [[Divide and Conquer]]
