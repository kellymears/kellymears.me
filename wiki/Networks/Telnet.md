---
aliases:
  - Telnet protocol
  - Network virtual terminal
  - Remote login
tags:
  - networks
summary: One of the oldest internet protocols, which gives a remote text terminal over a plain TCP connection, abandoned for logins because it sends passwords in the clear but still handy for poking at text protocols by hand.
---
**Telnet** is one of the oldest internet application protocols. It gives a user a text terminal on a remote computer: type a command locally, and it runs on the far machine, with the output streamed back. First described in 1969 for the ARPANET and standardized in 1983, it was for decades the ordinary way to log into a remote system; see [[ARPANET]] and [[Request for Comments]].

The protocol is thin. A client opens a TCP connection, by default to port 23, and characters flow both ways; see [[TCP and UDP]] and [[Network Socket]]. To cope with the many incompatible terminals of the era, Telnet defined a **network virtual terminal**, a minimal imaginary device that both ends translate to and from. Extra capabilities, such as echoing characters locally, reporting window size, or the terminal type, are negotiated with special byte sequences in which each side offers or requests an option and the other agrees or refuses. On the server side, the connection is attached to a pseudo-terminal so programs behave as if a person were at a keyboard; see [[Pseudoterminal]].

Telnet's fatal flaw is that nothing is encrypted. Usernames, passwords, and everything typed cross the network as plain text, readable by anyone able to capture packets along the path; see [[Packet Capture]]. In 1995, after a password-sniffing attack at the Helsinki University of Technology, Tatu Ylönen wrote Secure Shell, which provided the same remote terminal over an encrypted, authenticated channel. It replaced Telnet for logins within a few years; see [[Secure Shell]].

Telnet survived in other roles:

- **Talking to text protocols.** Many protocols, including early web and email, are plain lines of text, so a Telnet client connected to the right port lets a person type requests by hand and read the replies, a classic way to test a server; see [[Simple Mail Transfer Protocol]].
- **Online communities.** Text-based multiplayer games and dial-in boards moved to the internet over Telnet, and some are still reachable that way, along with novelty servers that play an animated version of *Star Wars* in text characters; see [[Bulletin Board System]].
- **Network equipment.** Routers, switches, and cheap embedded devices long shipped with Telnet enabled for management.

That last role made it dangerous again. The Mirai botnet in 2016 scanned the internet for devices answering on Telnet ports, logged in with a short list of factory-default passwords, and captured hundreds of thousands of cameras and recorders, which it used for some of the largest denial-of-service attacks seen up to that point; see [[Internet of Things]], [[Port Scanning]], and [[Denial-of-Service Attack]].

Telnet is a case study in how early protocols assumed a network of mutually trusting researchers, an assumption the internet outgrew; see [[Transport Layer Security]].

## See also
- [[Remote Desktop]]
- [[Credential stuffing]]
