---
aliases:
  - Port scanner
  - Nmap
  - Shodan
  - Internet-wide scanning
tags:
  - networks
summary: Probing a machine's network ports to find which services are listening, the first step of both attacks and audits, now done to the entire internet in minutes, so anything exposed gets found.
---
**Port scanning** is probing a computer's network ports to discover which ones have a service listening. Every network service waits on a numbered port: web servers on 80 and 443, remote login on 22, databases on their own; see [[Network Socket]]. A scan knocks on many of them and records which answer. It is the standard first step of an attack and of a security audit alike; see [[Penetration Testing]].

The techniques exploit how connections are set up; see [[TCP and UDP]]:

- **Connect scan.** Open a full connection to each port. Simple and reliable, but logged by the target.
- **SYN scan.** Send only the first packet of the connection handshake. A listening port replies with an acknowledgment, a closed one with a reset, and the scanner never completes the connection, which makes it faster and quieter. It is often called a half-open scan.
- **UDP scan.** Harder, because UDP has no handshake: silence might mean open or might mean filtered. A closed port usually triggers an error message, which itself can be rate-limited; see [[Internet Control Message Protocol]].
- **No answer at all** usually means a [[Firewall]] is dropping the probes.

Beyond open or closed, scanners identify what is running. Services announce themselves in greetings, and operating systems answer odd probes in characteristically different ways, letting a tool guess the software and version behind each port.

The best-known tool is Nmap, released by Gordon Lyon in 1997 in the hacker magazine Phrack, and free ever since. It even appears on screen in The Matrix Reloaded (2003), used accurately to break into a power grid.

Scanning grew from single hosts to the whole internet. ZMap, from the University of Michigan in 2013, could probe every IPv4 address on a single port in under an hour from one machine. Search engines such as Shodan, launched in 2009, scan continuously and index what they find, so anyone can look up exposed webcams, industrial control systems, or databases with no password.

The practical lesson is that nothing exposed stays hidden. A new server on a public address is typically probed within minutes, and botnets sweep constantly for devices with default passwords; see [[Internet of Things]]. IPv6 changes the arithmetic, since its address space is far too large to sweep, so scanners instead gather addresses from DNS records and logs; see [[IPv6]]. Home devices behind address translation are shielded from unsolicited connections, not by design but as a side effect; see [[Network Address Translation]].

Defenses include closing unused services, denying inbound traffic by default, and limiting how fast one source can probe; see [[Rate Limiting]]. Decoys that alert on any contact catch scanners in the act; see [[Honeypot]]. The legality of scanning others' systems varies by country.

## See also
- [[Packet Capture]]
- [[Threat Modeling]]
- [[Telnet]]
- [[Universal Plug and Play]]
- [[Remote Desktop]]
