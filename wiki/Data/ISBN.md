---
aliases:
  - International Standard Book Number
  - ISSN
  - Bookland
tags:
  - data
summary: The 13-digit number assigned to each edition of a published book, with a final check digit that catches typing mistakes, a widely used identifier that is still not quite the unique key it appears to be.
---
The **International Standard Book Number**, or ISBN, is a number assigned to each edition and format of a published book. It lets publishers, distributors, booksellers, and libraries refer to exactly the same item without ambiguity, and it is printed on the back cover, usually as a barcode.

It began in Britain. In 1966 the bookseller W H Smith, moving to computerized warehouse stock, commissioned a nine-digit **Standard Book Number**, and the scheme was adopted internationally as a ten-digit standard in 1970. In 2007 ISBNs grew to 13 digits by adding the prefix 978, which makes them valid product codes in the international barcode system, a range called **Bookland**, with 979 opened as more numbers are needed; see [[Barcode]].

The number is a hierarchy of variable-length parts: a prefix, a group for a country or language area, a publisher, the title, and a final check digit; see [[Hierarchical Data]]. A big publisher gets a short publisher code and room for many titles; a small one gets a long code and room for few. Because the parts vary in length, placing the hyphens correctly requires a published table of ranges.

The check digit catches typing mistakes; see [[Check digit]]. In the older ten-digit form each digit is multiplied by a weight from 10 down to 2, and the last digit is chosen to make the sum divisible by 11, using X when the needed value is 10. This catches every single wrong digit and every swap of two adjacent digits. The 13-digit form uses alternating weights of 1 and 3 and divisibility by 10, matching other product barcodes, and misses some swaps of digits that differ by five; see [[Modular Arithmetic]].

An ISBN identifies a product, not a work. The hardcover, paperback, ebook, and audiobook of one novel have different ISBNs, and so does a revised edition. Grouping them back into one work is a separate matching problem for catalogs and bookstores; see [[Entity Resolution]] and [[Library Classification]].

It also makes a less reliable key than it seems; see [[Natural key]]. Books from before 1970, many self-published books, and much of the world's printing have none. Publishers have occasionally reused numbers or printed the same one on different books. Databases that treat the ISBN as a unique primary key eventually meet a counterexample, which is why many keep their own internal IDs and store the ISBN as an attribute; see [[Universally Unique Identifier]].

Serial publications such as magazines and journals use the **ISSN**, an eight-digit number with the same divide-by-11 check, identifying the title as a whole rather than each issue.

Unlike a web link, an ISBN does not point anywhere; it is a name, and resolving it depends on catalogs and booksellers; see [[Persistent Identifier]] and [[Metadata]].

## See also
- [[Error-Correcting Code]]
- [[Database Constraint]]
- [[Country Code]]
