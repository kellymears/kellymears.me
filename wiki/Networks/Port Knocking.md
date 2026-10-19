---
aliases:
  - Single packet authorization
  - Knock sequence
tags:
  - networks
summary: A technique that keeps a server's ports closed to everyone until a client sends a secret sequence of connection attempts, after which the firewall briefly opens access for that address, hiding a service from scanners entirely.
---
Most servers advertise their services by listening on open ports, which anyone on the internet can find. **Port knocking** hides them instead. The firewall drops all traffic to the protected port, so the service looks absent. A client who knows the secret first sends connection attempts to a particular series of closed ports, say 7000, 8000 and 9000 in that order. A daemon watching the firewall's log recognizes the pattern and adds a rule allowing that client's address to connect, usually for a short time, after which the door closes again even if nobody used it; see [[Firewall]] and [[Network Socket]].

The idea was popularized around 2003 as a way to protect remote administration, most often the encrypted shell port, which attracts a constant stream of automated password-guessing attempts; see [[Secure Shell]]. With the port invisible, that background noise disappears from the logs, and a newly discovered flaw in the service can't be exploited by attackers who can't reach it; see [[Port Scanning]].

Simple knocking has real weaknesses. Anyone who can watch the network can record the sequence and replay it, since the knocks are ordinary unencrypted packets; see [[Traffic Analysis]] and [[Man-in-the-Middle Attack]]. Packets can arrive out of order or be lost, breaking the sequence; see [[TCP and UDP]]. And the daemon itself becomes something an attacker might target.

**Single packet authorization** addresses these problems. Instead of a sequence, the client sends one encrypted, authenticated packet that includes a timestamp and a random value, so a captured packet can't be reused; see [[Hash Function]]. The server still never responds to unauthorized traffic, which keeps the service invisible.

Security practitioners debate its value. Critics call port knocking security through obscurity: it adds a secret, but a weak one, and it should never replace strong authentication. Supporters answer that it's meant as an extra layer that cuts noise and narrows exposure, not as the main defense. Most agree it complements rather than replaces properly configured authentication and gateways; see [[Bastion Host]].

Larger organizations usually reach the same goal differently. Services sit behind a VPN or an identity-aware proxy, so nothing is exposed until a user authenticates through a well-audited system; see [[Virtual Private Network]] and [[Zero Trust Network]]. Some of those modern products use single packet authorization internally to keep their own gateways hidden from scanners.

The opposite approach is a honeypot, which deliberately exposes a fake service to attract and study attackers rather than hiding a real one from them. Port knocking also resembles the knock at a speakeasy door: anyone can walk past, but only those who know the rhythm get let in.

## See also
- [[Honeypot]]
- [[Denial-of-Service Attack]]
