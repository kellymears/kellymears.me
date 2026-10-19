---
aliases:
  - Bitmap indexing
tags:
  - data
summary: A database index that keeps one array of bits per distinct value in a column, so filters on several columns combine with fast bitwise operations, ideal for analytics over low-variety columns and poor for heavy concurrent updates.
---
A **bitmap index** stores, for each distinct value in a column, a sequence of bits with one bit per row. The bit is 1 if that row holds the value and 0 if it doesn't. A column of order statuses with four possible values becomes four bitmaps. To find every shipped order, the database reads the shipped bitmap and returns the rows whose bits are set.

The payoff comes when queries filter on several columns at once. To find shipped orders from the western region paid by card, the database takes three bitmaps and combines them with a bitwise AND, an operation processors perform on 64 bits at a time; see [[Bitwise Operation]]. OR handles alternatives, and NOT handles exclusions. Counting the matches is a matter of counting set bits, without touching the table at all.

The structure contrasts with the usual tree-shaped index, which maps each value to a list of row locations and works best when values are nearly unique; see [[B-Tree]] and [[Database Index]]. Bitmaps suit the opposite case, columns with few distinct values, such as status, region, or yes-or-no flags. A column with millions of distinct values would need millions of mostly empty bitmaps.

Compression makes the approach practical at scale. Bitmaps for rare values are mostly zeros, and long runs of identical bits compress well; see [[Data Compression]]. Earlier schemes compressed bitmaps while still allowing AND and OR without decompressing first. **Roaring bitmaps**, published in the mid-2010s, split the bit range into chunks and store each one in whichever form is smaller, a plain list of positions or a raw bitmap. They're now used widely in search engines and analytics systems.

Bitmap indexes belong to analytics more than to transactions:

- **Data warehouses.** Large tables that are written in batches and queried in many combinations are the natural fit; see [[Data warehouse]] and [[Dimensional Modeling]].
- **Search filters.** Narrowing results by brand, size, and color is a stack of bitmap intersections; see [[Faceted Search]].
- **Text search.** The list of documents containing a word can be stored as a bitmap; see [[Inverted Index]].

Updates are the weakness. Changing one row's value flips bits in two bitmaps, and some databases lock a whole section of a bitmap to do it, so many users updating at once block each other; see [[Pessimistic Locking]]. Systems serving frequent small writes usually avoid bitmap indexes or rebuild them in batches.

The database's planner decides when to use them, sometimes building temporary bitmaps on the fly from ordinary indexes to combine conditions; see [[Query Planner]]. Similar bit-array ideas appear in other structures that trade precision or flexibility for compactness; see [[Bloom Filter]].

## See also
- [[Wide-Column Store]]
- [[Time Series Database]]
