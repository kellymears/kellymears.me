---
aliases:
  - E2EE
  - Signal Protocol
  - Double Ratchet
tags:
  - networks
summary: Encryption where only the communicating people hold the keys, so the servers that relay their messages can't read them, a guarantee that protects content but leaves metadata, devices, and backups exposed.
---
**End-to-end encryption** means a message is encrypted on the sender's device and decrypted only on the recipient's. The servers in between carry ciphertext they have no key for. Ordinary encryption in transit protects each hop, so a company's servers can still read everything passing through; end-to-end encryption removes the service itself from the list of parties who can read; see [[Transport Layer Security]].

The idea is old. PGP, released in 1991, let individuals encrypt email with public keys, and its distribution abroad led to a US government investigation of its author under export rules for cryptography; see [[Public-Key Cryptography]]. PGP never reached most people, partly because managing keys by hand was hard and mistakes were silent.

Mass adoption came through messaging apps that hid the keys entirely. The **Signal Protocol**, developed from 2013 for the app that became Signal, combines an elliptic-curve key agreement with the **double ratchet**, which derives a fresh key for every message. Compromising today's key doesn't reveal yesterday's messages, and the conversation heals itself after a compromise once new keys are exchanged. WhatsApp adopted the protocol in 2016 for over a billion users, and many other messengers followed; see [[Elliptic Curve Cryptography]].

The remaining weak points are well known:

- **Identity.** If the server hands over the wrong public key, an attacker can sit in the middle. Apps let users compare safety numbers or scan a code to verify; most never do, so many apps trust the first key they see; see [[Man-in-the-Middle Attack]].
- **Metadata.** Who talked to whom, when, and how often can remain visible to the service, and that pattern is often revealing on its own; see [[Metadata]] and [[Onion Routing]].
- **Endpoints.** Encryption ends at the device. Malware, an unlocked phone, or a screenshot defeats it.
- **Backups.** Messages copied to a cloud backup under the provider's key lose their protection; see [[Backup and Restore]].

Email has proven hardest to retrofit. Its protocols assume servers can read and rewrite messages, and decades of clients and filters depend on that; see [[Simple Mail Transfer Protocol]]. Calls fared better: real-time voice and video in browsers are encrypted between peers by default, though group calls routed through a server need extra layers to stay end to end; see [[WebRTC]].

The design reflects a principle from network architecture, that guarantees are best implemented by the endpoints rather than trusted to the network; see [[End-to-End Principle]].

It is also politically contested. Law enforcement agencies argue that encryption beyond their reach hides crime, and governments have repeatedly proposed requiring access mechanisms or scanning messages on the device before encryption. Cryptographers generally respond that any mechanism granting special access is a vulnerability others can find. The debate has recurred since the 1990s with little change in either side's arguments; see [[Threat Modeling]].

## See also
- [[Dark Web]]
- [[Full-Disk Encryption]]
- [[Diffie-Hellman Key Exchange]]
- [[Instant Messaging]]
