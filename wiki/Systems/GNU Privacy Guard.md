---
aliases:
  - GPG
  - OpenPGP
  - Web of trust
tags:
  - systems
summary: A free implementation of the OpenPGP standard for encrypting and signing files, email, and software releases, descended from Phil Zimmermann's PGP and known both for its importance to software distribution and for being hard to use.
---
**GNU Privacy Guard**, usually called GPG or GnuPG, is a free program for encrypting and signing data. It implements OpenPGP, a standard descended from Pretty Good Privacy, the program Phil Zimmermann released in 1991. GPG's first release came in 1999, led by Werner Koch, and it became the standard way to sign software and email on free operating systems.

GPG is built on public-key cryptography. Each user has a key pair: a public key shared with others and a private key kept secret. Anyone can encrypt a message with the public key that only the private key can decrypt, and the private key can sign data so anyone with the public key can verify who signed it and that it hasn't changed; see [[Public-Key Cryptography]] and [[Hash Function]].

PGP's origins were political. In the early 1990s, the United States treated strong encryption as a munition subject to export controls, and Zimmermann faced a criminal investigation after PGP spread abroad. The case was dropped in 1996. OpenPGP was later standardized by the Internet Engineering Task Force, most prominently as RFC 4880 in 2007; see [[Request for Comments]].

The hardest problem is knowing a public key really belongs to its claimed owner. Web browsers solve it with certificate authorities; see [[Certificate Authority]]. PGP chose a decentralized **web of trust**: users sign each other's keys to vouch for them, often after checking identification at key-signing parties, and trust spreads through chains of signatures. It never scaled much beyond technical communities. Public keyservers that distributed keys were weakened in 2019 when attackers flooded some keys with junk signatures, making them unusable.

GPG's lasting role is in software distribution. Linux distributions sign their packages and repositories, and package managers check those signatures before installing anything; see [[Package Manager]] and [[Code Signing]]. Developers sign commits and release tags so others can verify who made them; see [[Commit Signing]]. GPG's agent can also hold keys for remote logins; see [[Secure Shell]].

For email, GPG mostly failed. A 1999 study, "Why Johnny Can't Encrypt," found that most participants couldn't use PGP correctly within 90 minutes, and later studies found similar problems. Encrypted email also leaves subject lines and recipients exposed. Messaging apps with automatic encryption reached far more people; see [[End-to-End Encryption]] and [[Simple Mail Transfer Protocol]].

GPG also became a cautionary tale about funding. In 2015, press reports revealed that the project was maintained largely by one developer on little money, prompting a wave of donations and grants; see [[Open Source Sustainability]]. Critics argue OpenPGP's age shows in its complexity, and simpler tools now cover individual uses like signing files.

## See also
- [[Supply Chain Security]]
- [[Trusted Platform Module]]
