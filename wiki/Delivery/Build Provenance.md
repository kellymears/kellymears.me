---
aliases:
  - SLSA
  - Sigstore
  - Build attestation
tags:
  - delivery
summary: A verifiable record of where a software artifact came from and how it was built, signed so consumers can check that a package really was produced from the source it claims, by the build system it claims, without tampering.
---
**Build provenance** is a verifiable record describing how a piece of software was produced: which source code, at which commit, built by which system, with which steps and inputs. Signed and published alongside a package or binary, it lets anyone who downloads the artifact check that it came from where it claims; see [[Provenance]].

The need comes from a gap in the software supply chain. Users can read a project's source code, but they usually install a prebuilt artifact. Nothing in an ordinary download proves that the artifact was built from that source; see [[Supply Chain Security]]. Attackers have exploited the gap:

- In the **SolarWinds** compromise, discovered in 2020, attackers modified the build system itself, so signed, official updates contained malicious code that wasn't in the source repository; see [[SolarWinds Hack]].
- In the **XZ Utils** backdoor of 2024, the release tarballs contained malicious build files that weren't in the public repository; see [[XZ Utils Backdoor]].

Signing alone doesn't solve this. A signature proves who released a package, not how it was built, and a compromised build system will sign whatever it produces; see [[Code Signing]].

Several projects address the problem together:

- **SLSA**, short for Supply-chain Levels for Software Artifacts and pronounced "salsa," is a framework that grew out of practices at Google and was published in 2021 under the Open Source Security Foundation. It defines levels of increasing assurance, from simply generating provenance to builds on hardened, isolated platforms whose provenance the build service itself signs.
- **in-toto** defines a standard format for attestations, signed statements about steps in the supply chain.
- **Sigstore**, launched in 2021, offers free signing without long-lived keys. Developers or build systems sign with short-lived certificates tied to an existing identity, such as a CI workflow, and signatures are recorded in a public, append-only transparency log, modeled on the logs that track web certificates; see [[Certificate Transparency]] and [[Merkle Tree]].

Package registries have begun adopting these tools. Since 2023, packages on npm can carry provenance showing the exact repository and CI run that built them; see [[Artifact Repository]].

Provenance complements other measures. A software bill of materials lists what went into an artifact, while provenance records how it was made; see [[Software Bill of Materials]]. Reproducible builds let independent parties rebuild an artifact and confirm they get identical bytes, which verifies the build without trusting the builder; see [[Reproducible Build]].

Provenance is only as trustworthy as the build platform and the checks performed on it. Consumers have to actually verify it, and policies have to reject artifacts that fail. Like other supply chain defenses, it raises the cost of attacks rather than ruling them out; see [[Dependency Confusion]].

## See also
- [[Commit Signing]]
- [[Deployment Pipeline]]
