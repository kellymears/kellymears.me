---
aliases:
  - Record linkage
  - Deduplication
  - Data matching
  - Blocking
  - Master data management
tags:
  - data
summary: Working out which records, within one dataset or across several, describe the same real-world person, place or thing, when no shared identifier exists and the data is messy.
---
**Entity resolution** is the task of deciding which records refer to the same real-world entity. "J. Smith, 12 Oak St" in one system, "John Smith, 12 Oak Street, Apt 2" in another and "Jon Smyth" with the same phone number in a third may be one customer or three. When records share a reliable identifier, such as a [[Foreign Key]] or [[Universally Unique Identifier]], the problem disappears. It arises when they don't: merging databases after an acquisition, linking hospital records, cleaning a mailing list, or building a [[Knowledge Graph]] from scattered sources.

Halbert Dunn coined *record linkage* in 1946. In 1969 Ivan Fellegi and Alan Sunter gave it a statistical footing: for each field, compare how often values agree among true matches versus among random pairs, then combine the evidence into a score with two thresholds: match, non-match, and an uncertain middle band sent to people for review.

A typical pipeline:

- **Standardize.** Normalize case, punctuation, abbreviations ("St" and "Street"), date formats and Unicode forms, a problem rooted in [[Character Encoding]].
- **Block.** Comparing every record with every other is quadratic, which a million records turns into half a trillion pairs, as [[Big-O Notation]] makes clear. Blocking compares only records sharing a cheap key, such as postcode or the first letters of a surname. Blocks that are too coarse cost time, and blocks that are too narrow miss matches.
- **Compare.** Score candidate pairs field by field with similarity measures: [[Edit Distance]] for typos, phonetic codes such as Soundex for spelling variants, and increasingly an [[Embedding]] for meaning.
- **Classify.** Decide match, non-match or review, using rules, Fellegi-Sunter weights or a trained model, and route the uncertain pairs to [[Human in the Loop]] review.
- **Cluster.** Matches must be made transitive: if A matches B and B matches C, all three are grouped, which can chain unrelated records together through one bad link.

The two kinds of error have different costs. A missed match leaves duplicates, such as two letters to one household. A false merge combines two people, and in a medical record that can be dangerous. The thresholds trade one error against the other, as [[Sensitivity and Specificity]] describes, and the right balance depends on which error is worse.

Names make it hard. People change names, transliterate them differently, use nicknames, and share common ones with thousands of others. Assuming names are two-part, fixed or unique fails on real data.

Entity resolution also works against privacy. Linking supposedly anonymous records with public ones by birth date, sex and postcode can re-identify most people, which is why removing names isn't anonymization, and why [[Differential Privacy]] exists. In an [[ETL Pipeline]], resolution is the step that lets data from different systems refer to the same customer.

## See also
- [[Phone Number]]
- [[Personal Name]]
- [[Phonetic Algorithm]]
- [[Doxing]]
