---
aliases:
  - Typosquatting
  - Slopsquatting
  - Namespace confusion
tags:
  - delivery
summary: Attacks that trick a package manager or a developer into installing the wrong package, by publishing a public package with an internal name, a near-miss spelling, or a name an AI model invented.
---
**Dependency confusion** is an attack on how [[Package Manager]]s choose which package to install. Many organizations publish private packages to an internal registry while also pulling open-source packages from a public one. If a build asks for a package by name and checks both, an attacker who publishes a public package with the same name as an internal one, and a higher version number, may get their code installed instead.

The technique drew wide attention in 2021, when a security researcher found internal package names in leaked manifests and public JavaScript files, published harmless lookalikes to public registries, and got code running inside dozens of large companies. It earned large bug bounties and showed that the default behavior of several package managers trusted whichever registry offered the newest version; see [[Semantic Versioning]].

Two related attacks exploit people rather than resolution rules:

- **Typosquatting** registers names one keystroke away from popular packages, such as a missing hyphen or a swapped letter, and waits for someone to mistype an install command. Malicious lookalikes have stolen environment variables, credentials, and cryptocurrency wallets; see [[Secret Management]].
- **Slopsquatting** registers package names that AI coding assistants tend to invent. Models suggest plausible but nonexistent packages consistently enough that an attacker can predict and claim them; see [[Hallucination]].

All three succeed because installing a package runs code. Many ecosystems allow install-time scripts, and even without them the package runs as soon as it's imported, with the full permissions of the build or the developer's machine.

Defenses work at several points:

- **Namespaces.** Scoped package names tied to an organization can't be claimed by an outsider.
- **Registry pinning.** Configure the package manager to fetch internal names only from the internal registry, or route everything through one proxy; see [[Artifact Repository]].
- **Claiming names.** Register internal package names on the public registry as empty placeholders.
- **Lockfiles with hashes.** A [[Lockfile]] records exactly which artifact was installed, so a new lookalike can't slip in silently.
- **Review before adding.** Check that a new dependency is the real, maintained package, not just a name that sounds right.

The problem is an example of a broader rule: names are a weak form of identity. A name that looks right, whether a package, a domain, or a sender, invites mistakes, and attackers exploit the gap between the name a person intends and the one a system resolves; see [[Domain Name System]].

Dependency confusion is one branch of [[Supply Chain Security]]. A [[Software Bill of Materials]] helps answer the question that follows every such incident: which of our builds installed it?

## See also
- [[Dependency Hell]]
- [[Vendoring]]
- [[Penetration Testing]]
