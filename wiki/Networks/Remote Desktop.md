---
aliases:
  - Thin client
  - Virtual Network Computing
  - Screen sharing
tags:
  - networks
summary: Controlling a computer from somewhere else by streaming its screen to a distant machine and sending keyboard and mouse input back, used for IT support, remote work and cloud gaming, and a favorite entry point for attackers when left exposed.
---
**Remote desktop** software lets someone see and operate another computer's graphical desktop over a network. The remote machine sends images of its screen; the local machine sends back keystrokes and mouse movements. To the user, it feels like sitting at the distant computer, as long as the connection is fast enough.

The idea grew out of the oldest pattern in computing, many users sharing one central machine through terminals; see [[Mainframe]] and [[Time-Sharing]]. Text terminals moved online with Telnet and later the encrypted Secure Shell; see [[Telnet]] and [[Secure Shell]]. The X Window System, designed in the 1980s, separated where a program ran from where its windows appeared, so applications on one Unix machine could draw on another's display; see [[Display Server]].

Two widely used systems arrived in the late 1990s. **VNC**, released in 1998 by a research lab in Cambridge, England, sends the screen as a stream of rectangles of changed pixels and works across operating systems. Microsoft's Remote Desktop Protocol, introduced with Windows terminal services the same year, sends higher-level drawing instructions where it can, which uses less bandwidth. Commercial tools added easy connections through firewalls and home routers, which normally block incoming connections; see [[Network Address Translation]].

Responsiveness depends on delay and compression. Each keystroke must travel out and the updated screen must return before the user sees the result, so latency matters more than raw bandwidth; see [[Input Latency]]. Modern systems encode the screen as video, the same approach used by cloud gaming services, which run games in data centers and stream the frames to players; see [[Video Compression]]. Fast-moving scenes and high resolutions push the required bandwidth up sharply.

**Thin clients** take the idea furthest: inexpensive devices with little local computing that exist mainly to display a desktop running on a server. Organizations use them, and virtual desktops in the cloud, to centralize software, updates and data.

Uses include:

- **IT support**, where a technician takes over a user's screen to fix a problem.
- **Remote work**, reaching an office workstation from home, often through a VPN; see [[Virtual Private Network]].
- **Administration** of servers that have no monitor attached.

Remote access is also a major attack route. Scanners constantly probe the internet for remote desktop ports left open, then try stolen or guessed passwords; exposed servers have been a common way in for ransomware gangs; see [[Port Scanning]] and [[Ransomware]]. Tech support scams persuade victims to install remote access tools themselves, handing control to the caller; see [[Phishing]]. Standard advice is to keep remote desktop behind a VPN or gateway and require a second authentication factor; see [[Multi-Factor Authentication]].

## See also
- [[Videoconferencing]]
- [[Bastion Host]]
