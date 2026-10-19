---
aliases:
  - Pentest
  - Pen test
  - Security testing
  - Bug bounty
  - Ethical hacking
tags:
  - testing
summary: Authorized attacks on a system by people paid to think like attackers, which find the flaws that automated scanners and the system's own builders miss.
---
**Penetration testing** is an authorized, simulated attack on a system to find security weaknesses before a real attacker does. A tester, or a team, is given permission, a scope, and a time window, and tries to get in: steal data, escalate privileges, or reach systems they shouldn't. The output is a report of what worked, how, and how to fix it.

What separates a pentest from an attack is authorization. A written agreement sets what is in scope, which techniques are allowed, and who to call if something breaks. Testing without it is a crime in most countries regardless of intent, which is why scope documents get read carefully.

A typical engagement runs through phases:

- **Reconnaissance.** Map the attack surface: domains, open ports, exposed services, employee names, leaked credentials. Much of this is public.
- **Discovery.** Probe for known weaknesses. Automated scanners help here; dynamic scanners (DAST) send malicious inputs to a running app, complementing [[Static Analysis]], which reads source.
- **Exploitation.** Turn findings into access, often by chaining small issues. A harmless-looking information leak plus a weak [[Same-Origin Policy]] configuration plus a [[Cross-Site Request Forgery]] gap can add up to account takeover.
- **Post-exploitation.** See how far access spreads. This is where [[Least Privilege]] proves its worth or fails.

Testers work with differing knowledge. *Black box* testers start like an outsider; *white box* testers get source code and architecture diagrams. White box finds more per hour, while black box better models a real attacker. A *red team* engagement goes further, testing people and physical security over weeks, with the defenders often not told, so it also tests detection and [[Incident Response]].

Web applications produce a familiar list of findings: [[SQL Injection]], [[Cross-Site Scripting]], broken access control where changing an ID in a URL shows someone else's record, misconfigured [[Content Security Policy]], and tokens such as a [[JSON Web Token]] accepted without proper verification.

Pentests have limits. They are a snapshot, and the next deploy can add a hole. They are bounded by time and the testers' skill, so a clean report means only that these people found nothing in this window. Bug bounty programs complement them by paying outside researchers per valid finding, continuously, with a responsible disclosure policy to give the vendor time to patch. [[Fuzzing]] and dependency scanning for [[Supply Chain Security]] run on every change, which pentests can't.

The tester's mindset carries over to all testing: assume the system is broken and try to prove it, rather than confirming it works.

## See also
- [[Equifax Data Breach]]
- [[Honeypot]]
- [[Morris Worm]]
- [[Port Scanning]]
