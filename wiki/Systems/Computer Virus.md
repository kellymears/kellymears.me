---
aliases:
  - Malware
  - Computer worm
  - Trojan horse
  - Antivirus
tags:
  - systems
summary: A program that copies itself into other programs or disks to spread, the best-known kind of malware, alongside worms that spread over networks on their own and trojans that rely on being installed willingly, and the long contest with antivirus software that followed.
---
A **computer virus** is a program that spreads by inserting copies of itself into other programs, documents or disks, so that running the infected host runs the virus too. It's the best-known word for **malware**, software written to act against its user's interests. A **worm** spreads by itself across networks without needing a host file. A **trojan horse** spreads by being installed willingly, because it pretends to be something useful.

The idea predates the threat. John von Neumann studied self-reproducing machines in the 1940s, and programs that copy or print themselves became a programmer's puzzle; see [[Quine]] and [[Cellular Automaton]]. Fred Cohen gave "virus" its technical meaning in 1983 and later proved that no program can reliably decide whether an arbitrary program is a virus, by the same reasoning as the [[Halting Problem]]. Early viruses in the wild, such as Elk Cloner on the Apple II in 1982 and Brain on IBM PCs in 1986, traveled on floppy disks by infecting their boot sectors; see [[Boot Process]].

Every new place that would run code became a new route. In the 1990s viruses rode in email attachments and in the macros of office documents. Worms spread through unpatched network services, starting with the [[Morris Worm]] of 1988; Code Red and SQL Slammer in the early 2000s reached tens or hundreds of thousands of machines within hours. USB drives, browser plugins and even software updates have carried malware since; see [[Air Gap]].

Antivirus software began by scanning files for signatures, byte patterns known to belong to particular viruses. Authors responded with encryption and **polymorphic** code that changes its appearance with every copy, and defenders added emulation and behavior monitoring, flagging programs that act like malware rather than look like it; see [[Emulation]]. Cohen's result means the race can't be won in general. Modern defense relies less on recognizing bad code and more on limiting what any code can do, through permissions, sandboxes, signed software and quick patching; see [[Least Privilege]], [[Code Signing]] and [[Patch Tuesday]].

The motives changed with the economy around them. Early viruses were mostly pranks or experiments, sometimes destructive. Today's malware is largely criminal, built to steal credentials, to recruit machines into botnets for spam and floods of traffic, or to lock files for money; see [[Ransomware]] and [[Denial-of-Service Attack]]. The stealthiest kinds burrow beneath the operating system, where they can't be seen from inside it; see [[Rootkit]].

The biological vocabulary stuck because the dynamics really are similar. Infections spread fastest through populations running identical software, and a flaw shared by millions of machines behaves like a disease in a population with no immunity.

## See also
- [[URL Shortener]]
- [[Memory Safety]]
