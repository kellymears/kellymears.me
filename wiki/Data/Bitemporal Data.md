---
aliases:
  - Bitemporal
  - Temporal table
  - Valid time
  - Transaction time
tags:
  - data
summary: Recording two separate timelines for every fact, when it was true in the world and when the database learned it, so a system can answer not just what was true but what it believed at any point in the past.
---
**Bitemporal data** tracks two independent kinds of time for every fact:

- **Valid time.** When the fact was true in the real world.
- **Transaction time.** When the database recorded it.

Most databases track neither. An update overwrites the old value, and the history is gone. Adding one timeline, usually valid time, lets a system answer "what was this customer's address last June?" Adding both lets it answer a harder question: "what did we *believe*, on July 1, the address was last June?"

The difference matters because the world and the record disagree. Consider an employee whose raise takes effect January 1, but payroll enters it on February 15, and a typo in the amount is corrected on March 3. Valid time says the new salary applied from January 1. Transaction time shows that a January payroll report would have used the old salary, and a February report the wrong new one. To reproduce exactly why a past report or a past decision came out as it did, a system must know what it knew then.

Where this matters:

- **Finance and insurance.** Regulators ask for reports as they were filed, not as current data would recalculate them. Backdated trades and corrections are routine.
- **Healthcare.** A diagnosis recorded late, or corrected, must not erase what clinicians saw when they acted.
- **Payroll and benefits.** Retroactive changes trigger back pay calculated from the difference.
- **Machine learning.** Training on corrected values that weren't available at prediction time leaks the future into the model; see [[Train-Test Split]].

Implementation follows one rule: never update a row in place. Each version of a fact carries a validity interval and a transaction interval. A correction closes the old row's transaction interval and inserts a new row; a real-world change closes its valid interval. Queries then ask *as of* a point on either axis or both. The SQL:2011 standard added system-versioned tables, which track transaction time automatically, and application-time periods for valid time; several databases support one or both.

The costs are real. Storage grows with every change. Queries need extra conditions, and constraints such as "one salary per employee at a time" become constraints over non-overlapping intervals, which are harder to enforce. Joins between temporal tables must line up intervals. Most applications need only one timeline, or a simple history table.

Related patterns approach the same problem differently. [[Event Sourcing]] stores changes as events, which preserves transaction-time history naturally. Warehouses track changing attributes with slowly changing dimensions; see [[Dimensional Modeling]]. Databases already keep short-lived versions internally for concurrency; see [[Multiversion Concurrency Control]]. An [[Audit Log]] records who made each change. [[Soft Delete]] is the simplest step toward the same idea: deleting by marking, so history survives.

## See also
- [[Time Zone]]
- [[Unix Time]]
- [[Change Data Capture]]
