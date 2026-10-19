---
aliases:
  - Air-gapped
  - Stuxnet
  - Data diode
tags:
  - systems
summary: Keeping a computer or network physically disconnected from all others, the strongest simple form of isolation in computer security, which still leaks through USB drives, maintenance laptops and stranger channels such as sound, light and heat.
---
An **air gap** isolates a computer or network by giving it no physical or wireless connection to any other network, especially the internet. Data moves in or out only when a person carries it on a disk or drive. Air gaps guard systems where a remote attack would be catastrophic: military and intelligence networks, nuclear and industrial controls, election tabulators, cryptocurrency cold wallets, and the root keys of certificate authorities; see [[Certificate Authority]].

An air gap removes a whole class of network attacks at once, which no [[Firewall]] rule can match. It costs convenience. Updates and logs have to travel by hand, and that traffic is the weak point.

**Stuxnet** showed this most vividly. Discovered in 2010, it targeted the centrifuges of Iran's uranium enrichment plant at Natanz, whose control systems were isolated from the internet. It's widely attributed to US and Israeli intelligence, and is thought to have crossed the gap on USB drives, spreading through several previously unknown Windows flaws. Once inside, it reprogrammed the industrial controllers to vary the centrifuges' speeds in damaging ways while showing operators normal readings; see [[Centrifuge]] and [[Computer Virus]].

Other ways in are mundane. Contractors plug in maintenance laptops, someone bridges two networks for convenience, or an isolated system turns out to have a forgotten modem. Audits of industrial networks often find air gaps that exist mainly on paper.

Researchers have also demonstrated a long list of **covert channels** for getting data out of an air-gapped machine that's already infected. They include modulating fan or disk noise, blinking a drive's activity light, varying processor load to change heat or the current on power lines, and emitting radio signals from memory buses or display cables. Most carry only a few bits per second, enough for a key. Governments have studied leaking emissions since the Cold War under the codename TEMPEST, which is why some secure rooms are shielded; see [[Faraday Cage]] and [[Electromagnetic Spectrum]].

Strict designs counter these with one-way links. A **data diode** is hardware that can physically send in only one direction, often an optical link with a transmitter on one side and only a receiver on the other. It lets a plant send readings out with no path back in; see [[Optical Fiber]].

On a personal scale, the same idea means keeping backups on drives that are unplugged after use, so malware that reaches the computer can't encrypt them too; see [[Ransomware]] and [[Backup and Restore]]. Offline signing keys and hardware wallets apply it to secrets; see [[Secret Management]] and [[Public-Key Cryptography]].

An air gap is also a social arrangement. It holds only as long as people follow the rules about what media cross it, and carrying data by hand is its own old network; see [[Sneakernet]].

## See also
- [[Trusted Platform Module]]
- [[Rootkit]]
