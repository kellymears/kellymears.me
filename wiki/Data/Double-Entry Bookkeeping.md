---
aliases:
  - Ledger
  - General ledger
  - Debits and credits
  - Trial balance
tags:
  - data
summary: The accounting system in which every transaction is recorded twice, as a debit in one account and a matching credit in another, so the books always balance, a merchant's technique from medieval Italy that remains the basis of all modern accounting and an early model for tamper-evident records.
---
**Double-entry bookkeeping** records every financial transaction in at least two accounts, once as a debit and once as an equal credit. Buying a delivery van for cash raises the vehicles account and lowers the cash account by the same amount. Because each entry has a matching opposite, the total of all debits must always equal the total of all credits.

The method grew up among the merchants and banks of northern Italy in the thirteenth and fourteenth centuries, as trade became too complex to track with simple lists of receipts and payments. Luca Pacioli, a Franciscan friar and mathematician, published the first printed description in 1494, in a textbook of arithmetic, and it spread through Europe with the printing press. Goethe later had a character call it one of the finest inventions of the human mind.

The structure rests on one identity: what a business owns equals what it owes plus what its owners have put in. Every transaction keeps that equation true, whether it is a sale, a loan, a purchase or a wage payment. Entries are written first in a chronological journal and then posted to individual accounts in the **ledger**. Periodically a bookkeeper adds up every account in a **trial balance**; if debits and credits don't match, an error has crept in. The check works much like a checksum on data, catching many mistakes, though not all: an amount posted to the wrong account, or omitted on both sides, still balances; see [[Checksum]] and [[Invariant]].

Good practice treats the ledger as a permanent history. A mistake isn't erased but corrected with a new, opposite entry, so the original record and its correction both remain for an auditor to follow; see [[Audit trail]]. Software designers have borrowed this pattern. Storing every change as an immutable event and deriving the current state from them is close to how a ledger derives a balance from its entries; see [[Event Sourcing]]. Banking systems model transfers the same way, and a database transaction that moves money must apply both sides or neither; see [[ACID]] and [[Database Constraint]].

Money creates its own data problems. Amounts must be stored as exact decimals, since binary fractions can't represent a cent precisely and rounding errors accumulate; see [[Decimal Arithmetic]]. Accounting was one of the first uses of electronic computing, from punched-card tabulators to the first spreadsheet, which was sold largely to accountants; see [[Punched Card]] and [[Spreadsheet]]. Errors in such spreadsheets have caused costly misstatements; see [[Spreadsheet Error]].

Some cryptocurrency advocates describe a shared public ledger as triple-entry accounting, with a third, jointly held record that neither party can alter alone; see [[Blockchain]].

## See also
- [[Bitemporal Data]]
- [[Idempotency Key]]
- [[Writing System]]
