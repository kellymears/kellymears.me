---
aliases:
  - Retention schedule
  - Legal hold
  - Records management
tags:
  - data
summary: Deciding how long each kind of data is kept and making sure it is actually deleted when that time is up, balancing legal duties to keep records against privacy duties and risks that grow with every year data sits around.
---
**Data retention** is the practice of deciding how long each kind of data is kept, and then making sure it really goes away when that time is up. It sits between two opposing pressures. Laws and business needs require keeping some records for years, while privacy law, security, and cost argue for keeping as little as possible for as short a time as possible.

The organizing tool is a **retention schedule**: a list of record types, each with a period and a trigger. Invoices might be kept seven years after the financial year closes, for tax purposes. Job applications might be deleted a year after the role is filled. Server logs might be kept thirty days. Records management grew out of paper archives; the same schedules now apply to databases and chat history.

The case for deleting is stronger than it first appears:

- **Breach exposure.** Data that no longer exists can't be stolen. Many large breaches exposed records of customers who had left a decade earlier.
- **Legal obligation.** Privacy law requires keeping personal information no longer than its purpose needs, and honoring deletion requests; see [[Personal Data]].
- **Discovery.** In a lawsuit, whatever exists can be demanded, and searching years of old email is expensive.
- **Cost and clutter.** Stored data costs money, and old data nobody understands makes the rest harder to use; see [[Data Lake]].

Against that, a **legal hold** suspends deletion. Once litigation or an investigation is reasonably expected, relevant records must be preserved even if their schedule says delete, and destroying them can bring severe penalties.

Actually deleting is the hard part. Data gets copied into replicas, caches, analytics warehouses, search indexes, exported spreadsheets, and backups, and each copy needs its own deletion path; see [[Data Lineage]]. Common techniques:

- **Time-based expiry.** Storage that removes items automatically after a set age, such as lifecycle rules in [[Object Storage]] or the retention policies of a [[Time Series Database]].
- **Partitioning by date.** Storing records in daily or monthly partitions, so expiring a month means dropping one partition instead of deleting millions of rows.
- **Crypto-shredding.** Encrypting each person's data with its own key and destroying the key when the data must go, which also covers copies that can't be reached, such as old backups; see [[Backup and Restore]].

Some designs resist deletion. A [[Soft Delete]] keeps the row and only hides it, which is not deletion under privacy law. An append-only [[Event Sourcing]] log treats history as permanent, so personal data needs to live outside it or be encrypted within it. An [[Audit Log]] has its own retention requirements, sometimes longer than the data it describes.

Retention differs from preservation. [[Digital Preservation]] is about keeping chosen records usable indefinitely; retention is mostly about knowing when to stop.

## See also
- [[Data Broker]]
- [[Differential Privacy]]
- [[Machine Unlearning]]
