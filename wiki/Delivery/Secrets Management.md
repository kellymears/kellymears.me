---
aliases:
  - Secret scanning
  - Credential rotation
  - Leaked credentials
tags:
  - delivery
summary: Keeping passwords, API keys, and private keys out of source code and logs, storing them where only the right services can read them, and replacing them regularly, since leaked credentials are among the most common causes of breaches.
---
**Secrets management** is the practice of handling credentials, such as database passwords, API keys, tokens, and private keys, so that only the systems that need them can read them. It covers where secrets are stored, how programs get them at runtime, who can see them, and how they are replaced when they leak or expire.

The most common mistake is putting secrets in source code. A developer hardcodes a key to get something working, commits it, and pushes. Once a secret is in [[Version Control]], it's in the history of every copy, and deleting it in a later commit doesn't remove it; see [[Distributed Version Control]]. Rewriting history helps only if every clone and fork is also cleaned; see [[Force Push]]. Automated scanners watch public code hosting sites and find exposed cloud keys within minutes of a push, so attackers routinely use them before the owner notices.

Defenses work at several layers:

- **Secret scanning.** Tools check commits for patterns that look like keys, both before they're made, using a [[Git Hook]], and on the hosting service. Many credential issuers now get notified of leaks automatically and revoke the keys.
- **Configuration from the environment.** Programs read secrets at runtime rather than from source files, often through [[Environment Variable]]s, as the [[Twelve-Factor App]] recommends. Environment variables can still leak through logs, error pages, and child processes, so they are a minimum, not a solution.
- **Secret stores.** Dedicated services hold secrets encrypted, check which service is asking, log each access, and hand out values only to authorized callers. Encryption keys may live in tamper-resistant hardware; see [[Trusted Platform Module]].
- **Least privilege.** Each service gets only the credentials it needs, with the narrowest permissions possible, so one leak exposes as little as possible; see [[Least Privilege]].

**Rotation** means replacing credentials on a schedule and immediately after any suspected exposure. Rotation is painful when a secret is copied into many places, which is itself a warning sign. The strongest approach removes long-lived secrets altogether: systems issue short-lived credentials that expire in minutes or hours, and services prove their identity with certificates or signed tokens instead; see [[Public-Key Cryptography]] and [[OAuth]].

Build systems are a frequent weak point. Pipelines need deployment credentials, and a compromised build step or dependency can steal them; see [[Continuous Integration]] and [[Supply Chain Security]]. Restricting which jobs can read which secrets, and never exposing them to builds of untrusted pull requests, limits the damage.

When a secret does leak, the response is to revoke it first, then investigate how far it was used; see [[Incident Response]].

## See also
- [[Base64]]
- [[Password Manager]]
