---
aliases:
  - SELinux
  - AppArmor
  - Discretionary access control
tags:
  - systems
summary: Access rules set by a system-wide policy that even a file's owner or root can't override, as in SELinux and AppArmor, in contrast to ordinary Unix permissions where owners decide.
---
**Mandatory access control** (MAC) is a security model in which a central policy decides what each program may access, and neither the owner of a file nor an ordinary administrator can override it. It contrasts with **discretionary access control**, the familiar Unix model, in which a file's owner decides who may read or write it; see [[File Permissions]].

The discretionary model has a basic weakness: a program runs with all the rights of the user who started it. If a web server running as a service account is compromised, the attacker can touch anything that account can. If the process runs as root, the attacker gets everything; see [[Superuser]]. Mandatory control adds a second check after ordinary permissions pass: does the policy allow *this program* to do *this thing*? A web server confined by policy may read its content directory and its own configuration, and nothing else, regardless of what its user account could otherwise reach.

The idea came from military computing in the 1970s and 1980s, where documents carried classification labels and the rule was that information mustn't flow from secret to unclassified, no matter what any user wanted. Linux gained practical MAC systems in the 2000s:

- **SELinux**, developed by the US National Security Agency and released in 2000, labels every file, process, and [[Port]] with a type, and the policy lists which process types may act on which object types. It's powerful and fine-grained, and notoriously hard to write and debug policy for. It's the default on Red Hat-derived distributions and on Android, where it confines every app.
- **AppArmor**, used by Ubuntu and SUSE, attaches profiles to programs by path, such as "this binary may read these directories and open network sockets." Easier to write, but less precise.

Both live inside the [[Kernel]], so a confined process can't escape them by running more code. Both offer a mode that logs violations without blocking them, used for building and testing a policy.

The everyday experience is mixed. A misconfigured policy produces "permission denied" errors that ordinary permissions don't explain, and a common reaction is to switch MAC off entirely, giving up the protection to make an error disappear; see [[Normalization of Deviance]]. Tools that translate denials into suggested rules help, at the risk of rubber-stamping whatever a compromised program attempted.

MAC is one layer among several. [[Linux Capabilities]] split root's powers, [[Seccomp]] limits system calls, and [[Linux Namespaces]] limit what a process can see. Container runtimes stack all of them, so escaping one layer still leaves the others; see [[Containerization]]. The underlying principle is [[Least Privilege]]: a program gets what its job requires, decided by someone other than the program.

## See also
- [[Row-Level Security]]
- [[Zero Trust Network]]
- [[Code Signing]]
