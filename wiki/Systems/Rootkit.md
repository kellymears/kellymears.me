---
aliases:
  - Bootkit
  - Kernel-mode rootkit
tags:
  - systems
summary: Malicious software that hides itself and an attacker's continued access by subverting the operating system's own view of files, processes, and connections, burrowing as deep as the kernel, the bootloader, or firmware.
---
A **rootkit** is malicious software designed to hide: to keep an attacker's access to a machine while concealing itself, and often other malware, from the system's users and defenses. The name comes from Unix, where early 1990s attackers who gained administrator access, known as root, installed kits of modified system tools to keep it; see [[Superuser]].

Those first rootkits replaced ordinary programs. A doctored process listing left out the attacker's processes, a doctored file listing left out their files, and a doctored login program let them back in with a secret password. Comparing the tools against known-good copies exposed them, so attackers moved deeper.

**Kernel-mode rootkits** modify the operating system itself, typically by loading as a kernel module; see [[Kernel]]. From there they intercept the system calls programs use to ask about the system, filtering the answers so every program, including security tools, sees a doctored view; see [[System Call]]. A rootkit can hide a file from every directory listing while the file remains on disk. Modern kernels resist this with signed modules and protections for core tables, and tracing mechanisms that run code inside the kernel became both a tool for detection and a new place to hide; see [[eBPF]].

Deeper still are **bootkits**, which infect the boot process so they load before the operating system and can tamper with it as it starts; see [[Boot Process]]. Secure boot was designed against them: each stage verifies a signature on the next, and a security chip can record measurements of what actually loaded; see [[Code Signing]] and [[Trusted Platform Module]]. Researchers have also demonstrated rootkits in firmware, which survive reinstalling the operating system or even replacing the disk, and security researchers reported finding one in the wild in 2018; see [[Firmware]]. In 2006, Joanna Rutkowska's Blue Pill demonstration proposed slipping a running system under a malicious hypervisor without its knowledge; see [[Hypervisor]].

Not every rootkit comes from criminals. In 2005, Sony BMG music CDs installed copy-protection software on Windows computers that hid itself with rootkit techniques, and other malware soon used it to hide too. The scandal led to lawsuits and a recall.

Detection is fundamentally hard because a compromised system is asked to report on itself. Effective approaches compare views that should agree, such as what the kernel reports against the raw disk, or examine a copy of the disk from a trusted machine; see [[Disk Image]]. Once a rootkit is found, the standard advice is to reinstall from scratch rather than trust a cleanup.

Prevention focuses on limiting what any single compromise can reach, so that attackers never get the privileges a rootkit needs; see [[Least Privilege]] and [[Mandatory Access Control]]. Some backdoors arrive through trusted software instead; see [[XZ Utils Backdoor]].

## See also
- [[Read-Only Memory]]
- [[Computer Virus]]
