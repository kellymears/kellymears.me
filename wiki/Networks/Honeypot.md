---
aliases:
  - Honeynet
  - Honeytoken
  - Tarpit
  - Network telescope
tags:
  - networks
summary: A decoy system, file, or credential with no legitimate use, so that any contact with it signals an intruder, used to detect attacks early, study attackers, and waste their time.
---
A **honeypot** is a decoy: a computer, service, file, or credential set up to look valuable but with no legitimate purpose. Because no real user should ever touch it, any contact is suspicious. Honeypots detect intruders, record their methods, and waste their time.

The classic story comes from Clifford Stoll, an astronomer turned systems administrator at Lawrence Berkeley Laboratory. In 1986 he traced a 75-cent accounting error to an intruder breaking into military computers. To keep the intruder connected long enough for a phone trace across international networks, Stoll invented a fake government project and filled files with plausible documents about it. The intruder took the bait, was traced to West Germany, and turned out to be selling information to the Soviet KGB. Stoll's 1989 book *The Cuckoo's Egg* made the technique famous.

Honeypots vary in depth:

- **Low-interaction** honeypots imitate services, answering the first exchanges of a login prompt or a database protocol, and log what attackers try. They are cheap and safe.
- **High-interaction** honeypots are real systems left open to compromise and watched closely. They reveal far more, but an attacker may use one to attack others, so they need careful containment. Networks of them are called honeynets; a research group called the Honeynet Project formed in 1999 to share findings.
- **Honeytokens** are decoys inside real systems: a fake administrator account, a credential planted in a configuration file, a database row that no application reads, a document that reports when it is opened. They cost almost nothing and produce alerts with almost no false positives.

**Network telescopes** watch large blocks of unused internet addresses. Nothing should arrive there, so whatever does is scanning, misconfiguration, or the side effects of attacks elsewhere. They recorded the spread of fast internet worms in the early 2000s, and they detect large floods from the stray replies victims send to forged addresses; see [[Denial-of-Service Attack]] and [[Port Scanning]].

**Tarpits** go on the offensive by slowing attackers down. A 2001 tool answered worm connection attempts and then held them open indefinitely, stalling the worm's spread. Mail servers can deliberately answer suspected spammers very slowly; see [[Simple Mail Transfer Protocol]]. Recent tarpits trap web crawlers that ignore site rules in endless mazes of generated pages; see [[Web Crawler]].

Honeypots that imitate cheap connected devices have tracked botnets assembled from cameras and routers with default passwords; see [[Internet of Things]].

They complement other defenses rather than replacing them. A [[Firewall]] blocks known paths; a honeypot catches what got past. In networks that assume attackers are already inside, tripwires placed where only an intruder would wander are a strong signal; see [[Zero Trust Network]]. Testers checking an organization's detection often look for them; see [[Penetration Testing]].

## See also
- [[Packet Capture]]
- [[Remote Desktop]]
- [[Morris Worm]]
- [[Email Spam]]
- [[Rootkit]]
- [[Dark Web]]
- [[Port Knocking]]
