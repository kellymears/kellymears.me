---
aliases:
  - Tape storage
  - Tape drive
  - Linear Tape-Open
  - LTO
tags:
  - data
summary: A long strip of plastic coated with magnetizable material, used to store data since the first commercial computers, now obsolete for everyday use but still the cheapest and most durable way to keep enormous archives offline.
---
**Magnetic tape** stores data as patterns of magnetization on a thin plastic ribbon wound on a reel or inside a cartridge. A drive pulls the tape past a head that magnetizes tiny regions in one direction or another to write, and senses them to read; see [[Magnetism]].

Tape began as a sound medium. Fritz Pfleumer patented a paper tape coated with iron oxide in Germany in 1928, and German engineers developed it into high-quality audio recorders in the 1930s. The first commercial computer to use tape was the UNIVAC I, delivered to the US Census Bureau in 1951, whose tape drives could hold as much as thousands of punched cards; see [[Census]] and [[Punched Card]]. For decades, rows of spinning reels were the visual shorthand for a computer in films and photographs; see [[Mainframe]]. Home computers of the late 1970s and 1980s loaded programs from ordinary audio cassettes, a slow and error-prone process.

Tape's defining limit is **sequential access**. Data sits in order along hundreds of meters of ribbon, so reaching a particular file may mean winding through most of it, which takes tens of seconds or more. Disks, which can jump to any location almost at once, displaced tape for working data; see [[Hard Disk Drive]] and [[Memory Hierarchy]].

Tape never disappeared, because for keeping large amounts of data it still wins. A modern cartridge in the Linear Tape-Open line holds tens of terabytes, costs less per terabyte than disk, and uses no power while sitting on a shelf. Manufacturers rate it to last around thirty years under good conditions. Robotic libraries store thousands of cartridges and load them on request, and large cloud providers are widely reported to use tape behind their cheapest archival storage tiers; see [[Object Storage]].

Being offline is also a security feature. A cartridge on a shelf can't be encrypted by malware that has taken over a network, so backup plans often keep at least one copy on tape or another disconnected medium; see [[Ransomware]], [[Air Gap]] and [[Backup and Restore]].

Long-term storage brings its own risk. Tape degrades, and older formats need drives that are no longer made, so archives must regularly copy data to new media before the old becomes unreadable; see [[Digital Preservation]] and [[Data Retention]]. Reuse was once routine, because tape was expensive. NASA concluded in 2009 that its original high-quality recordings of the 1969 Moon landing broadcast were probably erased and reused in the 1970s or 1980s.

Tape drives write checksums and correcting codes alongside the data to recover from scratches and dropouts; see [[Error-Correcting Code]]. Drives usually compress data as they write it, and manufacturers quote capacities that assume typical compression ratios.

## See also
- [[Microfilm]]
- [[Data Remanence]]
