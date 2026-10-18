---
aliases:
  - Aimbot
  - Wallhack
tags:
  - play
summary: The software and practices online games use to detect and deter cheating, from server-side checks and statistical detection to kernel-level drivers that raise their own security and privacy concerns.
---
**Anti-cheat** covers the software and practices online games use to stop players from gaining unfair advantages through modified clients, external programs, or exploits. It is an arms race: each detection method leads cheat makers to a new way around it and both sides have grown more sophisticated.

Common cheats in shooters include:

- **Aimbots**, which read enemy positions from the game's memory and move the player's aim to them automatically.
- **Wallhacks**, which reveal enemies through walls by drawing them on screen or changing how the game renders.
- **Triggerbots**, which fire the moment the crosshair crosses an enemy.

Other genres have their own forms: speed hacks, item duplication, scripts that automate farming, and bots that play around the clock in [[Free-to-Play]] games with tradeable items.

The root problem is that the client runs on the player's own machine, which the player controls. Anything the client knows, a cheater can read. The strongest defense is to keep authority on the server: it decides whether shots hit, and it validates movement and actions rather than trusting what the client reports; see [[Client-Server Boundary]] and [[Zero Trust Network]]. Some games also withhold information, sending the positions of enemies only when they could plausibly be seen, which weakens wallhacks; see [[Fog of War]]. But fast-paced games need clients to predict and display a lot locally, which limits how much can stay on the server; see [[Rollback Netcode]].

Client-side anti-cheat tries to spot cheats on the player's machine. It scans memory for known cheat signatures, checks that game files haven't been modified, and watches for other programs reading the game's memory; see [[Code Signing]]. Because cheats moved into the operating system's core to hide, many anti-cheat systems followed, running as drivers in the [[Kernel]] with the highest privilege on the machine; see [[Superuser]]. Some newer systems require hardware security features such as Secure Boot and a [[Trusted Platform Module]] to confirm the machine hasn't been tampered with.

Kernel-level anti-cheat is controversial. A driver with full access to a computer becomes a security risk if it has bugs, and some have been exploited by malware. It raises privacy concerns, and it blocks games from running on Linux and other systems where the driver can't be installed.

Detection also happens after the fact. Statistical analysis flags players whose accuracy or reaction times are too consistent to be human, and machine learning models trained on known cheaters look for telltale patterns; see [[Supervised Learning]].

Enforcement is often delayed on purpose. Banning cheaters in waves, rather than immediately, keeps cheat makers from learning which detection caught them. Penalties range from account bans to hardware bans tied to the machine. Cheating also distorts ranked ladders and matchmaking; see [[Matchmaking Rating]].

## See also
- [[Blood Doping]]
- [[Game Modding]]
- [[Battle Royale]]
- [[Esports]]
