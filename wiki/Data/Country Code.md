---
aliases:
  - ISO 3166
  - Alpha-2 code
tags:
  - data
summary: The standard two- and three-letter codes for countries and territories maintained under ISO 3166, used in software, addresses, domain names, and flags, and a steady source of edge cases because borders, names, and recognition change.
---
A **country code** is a short identifier for a country or territory, and in software it almost always means a code from ISO 3166, the international standard first published in 1974. Its first part assigns each country three codes: a two-letter code such as US or JP, a three-letter code such as USA or JPN, and a three-digit numeric code taken from the United Nations' statistics division. The two-letter codes are by far the most widely used.

The codes are everywhere. Internet country domains are mostly based on them, from .de to .jp, though the United Kingdom uses .uk while its ISO code is GB; see [[Top-Level Domain]]. Language tags use them for regional variants, as in en-GB or pt-BR; see [[Language Tag]]. Shipping forms, payment systems, passports, and tax records use them to identify where a person or business is; see [[Postal Address]]. Flag emoji are built from pairs of special letter symbols that spell out a two-letter code, so the same characters render as a flag on one platform and as letters on another; see [[Emoji]].

ISO doesn't decide what counts as a country. It follows lists maintained by the United Nations, which leaves contested places in awkward positions. Kosovo has no official code, so many systems use XK, a code from a range reserved for private use. The standard's English name for Taiwan has long been a political sore point. The second part of the standard codes subdivisions such as states and provinces, and the third part records former countries like the Soviet Union and Yugoslavia, whose codes were withdrawn.

Codes aren't permanent. When Czechoslovakia split in 1993, its code CS was retired; years later the same two letters were given to Serbia and Montenegro, then retired again when those countries separated in 2006. A database that stored only "CS" can't say which country it meant without a date; see [[Bitemporal Data]]. Small territories sometimes earn money from their codes: Tuvalu licenses .tv, and the .io domain popular with startups belongs to the British Indian Ocean Territory, whose future became uncertain when the UK agreed in 2024 to transfer sovereignty of the islands to Mauritius.

Other bodies use other codes. Telephone dialing codes such as +44 are unrelated; see [[Phone Number]]. Sports federations, vehicle registration plates, and aviation each have their own schemes, so Germany may be DE, DEU, GER, or D depending on context.

Software usually treats the list as reference data, stored once and updated as the standard changes, never hard-coded across an application; see [[Reference Data]]. Forms that make users scroll through two hundred names, or that assume one country per person, are a common usability failure; see [[Form Design]] and [[Falsehoods Programmers Believe]].

## See also
- [[Internationalization]]
- [[Data Sovereignty]]
- [[Gazetteer]]
