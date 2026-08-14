---
aliases:
  - STIR/SHAKEN
  - Call attestation
tags:
  - networks
summary: Cryptographic attestation of an originating telephone number, and why spoofed calls survive it.
---
**Caller ID authentication** is the cryptographic signing of a call's originating number by the provider that placed it, so the receiving provider can check the number was not merely asserted. The deployed framework is STIR/SHAKEN — an IETF suite for signed telephone identity plus an industry profile for carrying it across SIP networks. It exists because caller ID began as an unverified field: the originating switch stated a number and every downstream network repeated it.

The mechanism is compact. The originating provider mints a signed token covering the calling and called numbers and a timestamp, signs it with a key whose certificate chains to an authority governing the telephone industry, and attaches it to call setup; the terminating provider verifies. Structurally this is [[Code Signing]] applied to a phone call — a [[Hash Function]] over canonical fields, an asymmetric signature, and operational [[Secret Management]] as the real weak point — and it establishes [[Provenance]], not safety.

Signatures carry an **attestation level**. *A* means the provider authenticated its customer and confirmed the customer may use that number. *B* means the customer is known but the number is not verified, typical of a business trunk. *C* means the call arrived from elsewhere and the signer vouches for nothing beyond the handoff.

Spoofing persists for reasons the design does not address. Gateway providers accepting wholesale or foreign traffic sign at *C* and pass it on, and calls crossing legacy circuit-switched segments lose their signature entirely, so an absent signature cannot be treated as damning — the chain is only as strong as its least careful participant, the familiar shape of [[Supply Chain Security]]. Neighbour spoofing, which fabricates a local-looking prefix, often uses numbers the caller has genuinely rented and so earns full attestation: the framework certifies the right to use a number, not the intent behind the call, and reading the level as a spam score is [[Goodhart's Law]] waiting to happen. Handset labels reading "verified" invite [[Automation Bias]] against precisely the [[Confidence Trick]] they appear to rule out, and text messaging is out of scope altogether.

## See also
- [[eSIM]]
- [[Domain Name System]]
- [[Least Privilege]]
- [[Virtual Private Network]]
