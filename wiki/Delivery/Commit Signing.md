---
aliases:
  - Signed commits
  - Signed commit
  - Verified commits
  - Gitsign
tags:
  - delivery
summary: Cryptographically signing Git commits so a commit's author can be verified rather than merely claimed, the key types used, and what a green verified badge does and does not prove.
---
**Commit signing** attaches a cryptographic signature to a Git commit, so that anyone can verify the commit was made by the holder of a particular key and has not been altered since. Without it, a commit's author is just a claim. Git records whatever name and email the local configuration says, and anyone can set those to anyone else's. A signature turns the claim into something checkable.

Because a commit's hash covers its tree, its parents, and its message, signing a commit vouches for the entire snapshot and the history behind it, an effect of Git's [[Merkle Tree]] structure. Tags can be signed the same way, which is the usual way to sign a release.

Three kinds of keys are common:

- **GPG keys.** The original mechanism, supported since 2012, using OpenPGP. Powerful but notoriously awkward to set up, manage, and rotate.
- **SSH keys.** Supported since Git 2.34 in 2021. Most developers already have an SSH key for pushing, so signing with it removes most of the friction. See [[Secure Shell]].
- **Keyless signing.** Sigstore's gitsign issues short-lived certificates tied to an identity from a login provider such as GitHub or Google, and records each signature in a public transparency log. There is no long-lived key to lose or leak, an approach borrowed from [[Certificate Authority]] transparency.

All of these rest on [[Public-Key Cryptography]]: the private key signs, and the public key, registered with the hosting platform or published elsewhere, verifies. Hosting platforms show verified commits with a badge, and can flag unsigned commits claiming to be from a user who usually signs.

Teams enforce signing in [[Branch Protection]] rules, rejecting unsigned commits on protected branches. Some regulated environments require it as evidence of who changed what, alongside [[Code Review]] records.

The limits matter as much as the guarantees:

- **Identity, not intent.** A signature proves which key signed, not that the code is safe. The 2024 xz utils backdoor came from a maintainer who had earned trust over years; signing would have verified the attacker perfectly.
- **Keys get stolen.** A compromised laptop or leaked key signs as convincingly as its owner. Hardware keys and short-lived certificates reduce the risk.
- **Rewrites change signatures.** A [[Rebase]] or a server-side [[Squash Merge]] creates new commits. The originals' signatures do not carry over, and the platform often signs the result with its own key, which shifts trust to the platform.

Signing is one layer of [[Supply Chain Security]]. It establishes who made a change, complementing build [[Provenance]] that establishes how an artifact was produced and a [[Software Bill of Materials]] that lists what went into it. It differs from [[Code Signing]], which signs finished binaries so operating systems can decide whether to run them.

## See also
- [[Git Tag]]
- [[Commit]]
- [[Subversion]]
