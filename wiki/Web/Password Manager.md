---
aliases:
  - Password autofill
  - Password reuse
tags:
  - web
summary: Software that generates, stores, and fills in a unique password for every account, kept in an encrypted vault unlocked by one strong secret, which makes good password habits practical and gives phishing a harder target.
---
A **password manager** stores a person's passwords in an encrypted vault, generates new ones, and fills them into login forms. The user remembers one strong secret, often called the master password, and the software handles every other credential.

The problem it solves is human memory. People can't remember dozens of strong, unique passwords, so they reuse a few, often with small variations. **Password reuse** turns any single breach into a breach of many accounts: attackers take credentials leaked from one site and try them automatically on others; see [[Credential stuffing]]. A manager makes it practical to use a long random password for every site, so a leak exposes only that site.

Vaults are encrypted on the user's device. The master password is fed through a deliberately slow key-derivation function, which turns it into the encryption key and makes each guess expensive for an attacker who steals the vault; see [[Hash Function]]. In most designs, the vault syncs between devices in encrypted form, and the provider never holds the key, so it can't read the contents; see [[End-to-End Encryption]]. The design concentrates risk: the master password and the device become single points of failure, and a weak master password undermines everything. Many managers add a second factor or device-bound keys; see [[Multi-Factor Authentication]].

That architecture was tested in 2022, when attackers stole copies of LastPass customers' encrypted vaults. The vaults were only as strong as each user's master password and the key-derivation settings applied to it, and older accounts had been created with weaker settings. Security researchers later linked a series of cryptocurrency thefts to vaults they believed had been cracked from that breach.

**Autofill** offers protection beyond convenience. A manager fills a password only on the site it was saved for, so on a lookalike page set up by an attacker it offers nothing. That refusal is a warning a person could miss by eye; see [[Phishing]]. Managers integrate through browser add-ons or the operating system; see [[Browser Extension]]. Browsers and operating systems now include managers of their own, which has brought the practice to people who would never install one.

Guidance has shifted to accommodate them. US federal guidelines from NIST, revised in 2017, advised against forced periodic password changes and arbitrary composition rules, and recommended allowing pasting, which some sites had blocked; see [[Clipboard]]. Length, not mandated symbols, contributes most of a password's unpredictability; see [[Entropy]].

Managers increasingly store passkeys alongside passwords, syncing the private keys that replace passwords on supporting sites; see [[Passkey]] and [[Public-Key Cryptography]]. Teams sharing credentials for systems use similar tools with access controls and audit logs; see [[Secrets Management]].

## See also
- [[Single Sign-On]]
- [[Form Design]]
- [[Shamir's Secret Sharing]]
- [[Advanced Encryption Standard]]
