---
aliases:
  - Secure deletion
  - Data sanitization
  - Crypto-shredding
  - Degaussing
tags:
  - data
summary: The data that lingers on a storage device after it has supposedly been deleted or erased, which has exposed secrets on resold drives and discarded phones and which is why reliable disposal usually means encryption or physical destruction rather than pressing delete.
---
**Data remanence** is the residue of information left on a storage medium after an attempt to remove it. Deleting a file rarely destroys its contents. Most file systems simply mark the space as free and remove the entry pointing to it; the bytes remain until something else happens to be written over them, and recovery tools can often read them back; see [[Filesystem]].

The problem shows up whenever hardware changes hands. In a well-known 2003 study, two MIT researchers bought 158 used hard drives on the secondhand market and found that many still held readable personal and financial data, including thousands of credit card numbers, despite apparent attempts to wipe them. Similar surveys of resold phones, memory cards and office copiers, many of which store scanned pages on internal disks, have repeatedly turned up sensitive material; see [[Data Breach]] and [[Personal Data]].

Overwriting is the classic remedy. In 1996 Peter Gutmann described a 35-pass pattern designed to defeat the specific encoding schemes of older drives, and it became folklore well beyond its purpose. For modern magnetic disks, researchers generally agree that a single overwrite makes data unrecoverable by any practical means; see [[Hard Disk Drive]]. **Degaussing**, exposing a disk or tape to a strong magnetic field, scrambles magnetic media completely and usually ruins the drive too; see [[Magnetic Tape]].

Flash storage is harder. A [[Solid-State Drive]] spreads writes across its cells to even out wear and keeps spare capacity hidden from the operating system, so overwriting a file may write to new cells and leave the old ones intact. Drives provide built-in sanitize commands, but their implementations have varied in quality, and early research found some didn't erase everything.

The most dependable approach is to encrypt everything from the start. If a drive has always been encrypted, destroying the key turns the remaining data into noise, a technique called **crypto-shredding**; see [[Full-Disk Encryption]]. It is also how cloud services and databases can honor deletion requests for data scattered across backups and replicas, by encrypting each person's records with their own key and discarding it; see [[Backup and Restore]].

Memory chips show remanence too. Contents of computer memory fade over seconds after power is cut, more slowly when cold, and researchers in 2008 showed that chilling memory chips and moving them to another machine could recover encryption keys; see [[Cold boot attack]] and [[Dynamic Random-Access Memory]].

Organizations with strict requirements still prefer physical destruction, shredding drives into small fragments or disintegrating them. Deletion inside applications raises the same question at a higher level, since records marked deleted often remain in tables, logs and backups; see [[Soft Delete]] and [[Data Retention]].

## See also
- [[Garbage Collection]]
- [[Digital Preservation]]
