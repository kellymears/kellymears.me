---
aliases:
  - WannaCry
  - Double extortion
  - Crypto-ransomware
tags:
  - systems
summary: Malware that encrypts a victim's files and demands payment for the key, which grew from a 1989 floppy-disk curiosity into a major criminal industry once strong encryption and cryptocurrency let attackers lock data reliably and get paid at a distance.
---
**Ransomware** is malware that holds a victim's data or systems hostage and demands payment to release them. Most modern ransomware encrypts files with keys only the attacker holds, then leaves a note with payment instructions; see [[Computer Virus]].

The first known example, the AIDS Trojan of 1989, was mailed on floppy disks to people on the attendee list of a World Health Organization AIDS conference. After a number of reboots it hid directories and scrambled file names, then demanded payment to a post office box in Panama. Its scrambling relied on a key hidden in the program itself, so it could be undone without paying.

Proper cryptography is what made ransomware work. The program encrypts files with a fast symmetric key, then encrypts that key with the attacker's public key, so it carries nothing that can unlock the files. Only the attacker's private key can; see [[Public-Key Cryptography]]. CryptoLocker popularized the approach in 2013. The other missing piece was payment that didn't pass through a bank, and Bitcoin supplied it; see [[Blockchain]].

The 2017 **WannaCry** outbreak showed how far a worm could carry it. It exploited a flaw in Windows file sharing, using a tool leaked from the US National Security Agency, and infected a few hundred thousand computers in about 150 countries within days, disrupting parts of Britain's National Health Service. Microsoft had released a patch two months earlier; see [[Patch Tuesday]]. A researcher halted much of the spread by registering a domain name that the code checked as a kill switch; see [[Domain Name System]].

Attacks have since become a business. Groups lease their software to affiliates who break in and share the proceeds. Intruders may spend days or weeks inside a network, deleting backups before triggering encryption everywhere at once, often over a weekend. Because many victims could still restore their files, groups added **double extortion**, stealing data first and threatening to publish it; see [[Data Breach]]. Hospitals, schools, city governments and pipelines have all been hit. A 2021 attack on Colonial Pipeline led to fuel shortages across the southeastern United States.

Whether to pay is a genuine dilemma. Paying may be the fastest route to recovery, though a working key isn't guaranteed, and every payment funds the next attack; see [[Prisoner's Dilemma]]. Some governments discourage or restrict payments.

The most effective defenses are dull: offline or immutable backups the attacker can't reach, tested restores, prompt patching, limited administrative rights, and network segmentation so one compromised laptop can't reach everything; see [[Backup and Restore]], [[Filesystem Snapshot]] and [[Least Privilege]]. Planning matters too, since recovery is an incident to manage, not only a technical fix; see [[Incident Response]].

## See also
- [[Full-Disk Encryption]]
- [[Remote Desktop]]
- [[Magnetic Tape]]
- [[Recycle Bin]]
