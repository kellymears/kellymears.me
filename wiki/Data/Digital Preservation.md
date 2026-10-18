---
aliases:
  - Bit rot
  - Digital dark age
  - Fixity
  - Format migration
tags:
  - data
summary: Keeping digital information usable over decades, which means fighting decaying media, obsolete formats, vanished software, and lost context all at once, since bits that survive but can't be read are as gone as bits that don't.
---
**Digital preservation** is the work of keeping digital information accessible and meaningful over the long term. It's harder than it sounds, because paper left in a box can usually be read a century later, while a file can become unreadable in a decade even if every bit survives.

Digital material faces several separate threats:

- **Media decay.** Magnetic tape demagnetizes, burned optical discs fade, flash memory leaks charge when left unpowered. Silent corruption, where data changes without any error being reported, is called *bit rot*.
- **Obsolete hardware.** Floppy drives, Zip drives, and proprietary tape formats disappear; the data on them may be fine but nothing can read it.
- **Obsolete formats.** A word processor document from the 1990s may need software that no longer runs on any current system.
- **Lost context.** A spreadsheet with unlabeled columns, or a database without its schema, may be readable but meaningless.
- **Lost custody.** Services shut down, accounts expire, and links stop working; see [[Link Rot]].

Vint Cerf, one of the designers of the internet's core protocols, warned in 2015 of a *digital dark age*: a period future historians will know less about than earlier centuries, because its records were born digital and then lost.

Preservation strategies:

- **Copies.** Many copies in many places, on different media, managed by different organizations; see [[Backup and Restore]]. The library community's LOCKSS program is named for the principle: Lots Of Copies Keep Stuff Safe.
- **Fixity checks.** Store a checksum for each file and recompute it regularly to detect corruption, then repair from a good copy; see [[Hash Function]] and [[Error-Correcting Code]].
- **Format migration.** Convert files to current formats before the old ones become unreadable. Each conversion risks losing something, so originals are kept too.
- **Open, documented formats.** Plain text, PDF/A, TIFF, and CSV are preferred because anyone can write a reader from the specification; see [[Web Standards]] and [[Markdown]].
- **Emulation.** Instead of converting the file, preserve the original environment and run it on emulated hardware. This keeps interactive works such as games and software art working as made; see [[Emulation]] and [[Video Game Preservation]].

The field has shared standards. The OAIS reference model, an ISO standard first published by space agencies, describes what an archive must do: ingest material, store it, and keep it understandable to a defined community.

Notable efforts include the Internet Archive's web captures, national libraries' web archiving, and Software Heritage, which archives public source code. They share a lesson: preservation is an ongoing process with recurring costs, not a one-time act. Data that nobody is actively responsible for will, eventually, be lost.

## See also
- [[Public Domain]]
- [[GIF]]
- [[CSV]]
- [[JPEG]]
- [[Demoscene]]
- [[Optical Character Recognition]]
- [[Metadata]]
