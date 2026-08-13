---
aliases:
  - Ports
  - Port binding
tags:
  - systems
summary: The numeric endpoint a network service listens on, and a scarce shared resource on a developer machine.
---
A **port** is a sixteen-bit number identifying an endpoint on a host. A server binds one and listens; a client connects to it. Only one process can hold a given port on a given interface at a time.

On a machine running several projects, ports become a genuinely contended resource, and the resulting failures are among the most disorienting in development.

**Wrong-port binding.** A start command that reads its port from the shell, with a fallback, will bind the fallback when the shell does not provide one — even if a local configuration file says otherwise, because the shell expanded the value before the program read its configuration. See [[Shell]].

**Cross-talk.** When two working copies are in flight, whoever already has a browser open on the shared port starts talking to the *other* branch's code, and their writes land in that branch's database. Traffic appearing in a log that you did not generate is the tell, and nothing in that log is trustworthy until the binding is checked.

**Derived collisions.** Ports generated from a project name by hashing are not collision-free, and the resulting bind failure is reported by whichever process starts second.

Confirming which process holds a port — and what directory it is running from — takes one command and settles all three.

## See also
- [[Process]]
- [[Git Worktree]]
- [[Containerization]]
- [[Same-Origin Policy]]
- [[Domain Name System]]

## Related
- [[Environment Variable]]
- [[Multi-Tenancy]]
