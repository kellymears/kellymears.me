---
aliases:
  - Data obfuscation
  - Masked data
tags:
  - data
summary: Replacing sensitive values in a dataset with realistic substitutes so copies can be used for testing, support, and analysis, a practical safeguard that offers less protection against re-identification than it appears to.
---
**Data masking** replaces sensitive values in a dataset, such as names, card numbers, and medical details, with substitutes that look realistic but reveal nothing about real people. The masked copy can then be handed to developers, testers, analysts, or outside vendors who need data shaped like the real thing but shouldn't see the real thing; see [[Personal Data]].

The need arises constantly. Testing against realistic data finds bugs that tidy samples miss, so teams are tempted to copy production databases into test systems, which are usually less protected. Each copy is another place a breach can happen; see [[Data Breach]] and [[Staging Environment]].

Common techniques include:

- **Substitution**: replacing names or addresses with fake ones drawn from a list.
- **Shuffling**: moving real values between rows so each looks plausible but belongs to someone else.
- **Redaction**: hiding part of a value, as receipts do when printing only a card's last four digits.
- **Nulling or deletion**: removing a field entirely.
- **Perturbation**: adding noise to numbers such as salaries or dates.
- **Format-preserving encryption and tokenization**: replacing values with reversible substitutes in the same format, so a 16-digit card number stays 16 digits.

Masking can be **static**, producing a masked copy once, or **dynamic**, showing different views of the same data depending on who's asking. Some databases mask columns at query time for users without permission to see them; see [[Database View]] and [[Row-Level Security]]. Both apply the principle of granting no more access than needed; see [[Least Privilege]].

Masking has to preserve what makes the data useful. If a customer's ID appears in five tables, it must be masked the same way in all of them, or joins break; see [[Foreign Key]]. Deterministic masking, often built on a keyed hash, keeps those relationships but means anyone holding the key can reverse it; see [[Hash Function]].

The deeper risk is re-identification. Removing names doesn't make a record anonymous if what remains is distinctive. In 2006, AOL released search logs with users replaced by numbers, and journalists identified at least one searcher from the queries alone. Researchers later matched supposedly anonymous Netflix movie ratings to public reviews. Combinations of birth date, gender, and postal code identify a large share of people, as early research on medical records showed; see [[Entity Resolution]]. Regulations like Europe's GDPR treat masked data that can be re-linked as still personal.

Stronger alternatives exist. Generated data with similar statistics avoids real records entirely; see [[Synthetic Data]]. Mathematical guarantees about what an analysis reveals require adding calibrated noise; see [[Differential Privacy]]. Small hand-built datasets often serve tests better anyway; see [[Seed Data]].

## See also
- [[Personal Name]]
- [[Phone Number]]
- [[Data Governance]]
