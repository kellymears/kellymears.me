---
aliases:
  - Embedded SIM
  - eUICC
tags:
  - networks
summary: A SIM soldered into the device and provisioned over the air, with profiles downloaded rather than cards swapped.
---
**An eSIM** is a subscriber identity module built into a device as a permanent chip — an eUICC, or embedded universal integrated circuit card — and provisioned remotely instead of being physically inserted. The hardware is a secure element holding keys and identifiers exactly as a plastic SIM does; what changed is delivery.

Provisioning follows the GSMA's remote SIM provisioning specifications. A carrier prepares a **profile** on a server called an SM-DP+; software on the handset downloads it, verifies its signature, and installs it into the secure element. Profiles are encrypted to one specific eUICC and authenticated through a certificate chain rooted in a GSMA authority — the same trust model as [[Code Signing]], with the same dependence on manufacture-time key injection that makes [[Supply Chain Security]] load-bearing. The activation QR code carries the SM-DP+ address, an ordinary [[Domain Name System]] name, plus a one-time matching identifier. Unlike [[Idempotence]] elsewhere in networking, scanning the same code twice usually fails: the first download consumed it.

Handsets typically store several profiles and keep one or two active, which is what dual-SIM operation now means in practice — a home profile for calls and messages, a second for data. Some models sold since 2022 have no physical tray at all.

Two things trip people up. **Activation timing**: many travel plans begin their validity window at installation or first network attach rather than on arrival, and installing requires a working connection, so a profile is usually added before departure and enabled after. **Carrier locking**: a locked device stays locked, and a profile generally cannot move between devices without the carrier reissuing it — deleting one is often irreversible. Keeping a home number reachable for verification codes while a travel profile carries data means running both, with roaming disabled on the first, a per-profile setting worth checking in the spirit of [[Least Privilege]].

## See also
- [[Secret Management]]
- [[Caller ID Authentication]]
- [[Virtual Private Network]]
- [[Hash Function]]
