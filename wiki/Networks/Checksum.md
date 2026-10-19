---
aliases:
  - CRC
  - Cyclic redundancy check
  - Check digit
  - Luhn algorithm
tags:
  - networks
summary: A small value computed from data so that accidental corruption can be detected later, from parity bits and credit card check digits to the CRCs in every Ethernet frame, and useless against deliberate tampering.
---
A **checksum** is a small value computed from a block of data and stored or sent alongside it. Recomputing it later and comparing reveals whether the data changed by accident in transit or storage. A checksum detects errors but can't fix them; codes that also locate and repair errors are a separate family; see [[Error-Correcting Code]].

The simplest schemes are weak:

- **Parity.** One extra bit makes the count of 1s even, which catches any single flipped bit and misses any two.
- **Simple sums.** Adding up all the bytes catches many errors, but not two bytes swapped, since addition doesn't care about order. The **internet checksum** used in the IPv4 header, TCP, and UDP is a refined 16-bit sum of this kind, chosen in the 1970s because it was cheap to compute in software; see [[TCP and UDP]].

A **cyclic redundancy check** (CRC) is much stronger. It treats the data as a long binary polynomial, divides it by a fixed polynomial, and keeps the remainder. That sounds expensive but reduces to shifts and exclusive-ors, which a few logic gates can do as bits stream past. A CRC reliably detects any burst of errors shorter than its own width, which matches how noise actually corrupts wires and disks. A 32-bit CRC ends every [[Ethernet]] frame and protects ZIP and PNG files.

**Check digits** apply the idea to numbers that people type. The Luhn algorithm, devised at IBM in 1954 and used on credit card numbers, catches every single mistyped digit and most swaps of neighboring digits. ISBNs and many national ID numbers carry their own.

Checksums offer no protection against an attacker. Anyone who changes the data can recompute the checksum, and a CRC's mathematical structure makes it easy to alter data while keeping the same value. Where tampering matters, a cryptographic hash or a keyed authentication code is needed, which is what download pages publishing file hashes and browsers checking scripts against expected hashes rely on; see [[Hash Function]] and [[Subresource Integrity]].

Layered checksums still miss things. A 2000 study of real traffic found corrupted packets that passed the TCP checksum far more often than theory predicted, often damaged inside routers and hosts where no link-level CRC was watching. That is an argument for checking data end to end, at the application, rather than trusting each hop; see [[End-to-End Principle]].

Storage needs the same care. Disks silently return wrong data more often than people expect, so filesystems such as ZFS and Btrfs store a checksum with every block and verify it on each read; see [[Bit rot]]. Trees of hashes extend the idea to whole datasets, so a single value vouches for everything beneath it; see [[Merkle Tree]].

## See also
- [[Double-Entry Bookkeeping]]
- [[Single-Event Upset]]
- [[ZFS]]
- [[Sneakernet]]
- [[Barcode]]
- [[Archival Science]]
- [[ISBN]]
