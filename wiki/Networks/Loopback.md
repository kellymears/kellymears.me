---
aliases:
  - Localhost
  - Loopback interface
tags:
  - networks
summary: The network address a computer uses to talk to itself, where packets go out and come straight back without touching any hardware, the home of development servers and a recurring blind spot in security.
---
**Loopback** is a virtual network interface through which a computer sends traffic to itself. Packets addressed to it never reach a network card or a cable. The operating system's network stack hands them straight back as if they had arrived from outside.

In IPv4, the whole block of addresses starting with 127 is reserved for loopback, more than sixteen million addresses, of which almost everyone uses only 127.0.0.1. IPv6 reserved a single address, written ::1; see [[Subnet]] and [[IPv6]]. The name **localhost** resolves to these addresses, and internet standards reserve it so it can never point anywhere else; see [[Domain Name System]].

Because loopback uses the full network stack, programs written to talk over a network work unchanged when both ends are on one machine:

- **Development.** A web developer runs a server on localhost at some port and opens it in a browser; see [[Network Socket]].
- **Local services.** Databases, caches, and helper daemons often listen only on loopback, so they can be reached by programs on the same machine but not from the network.
- **Testing.** A protocol can be tested end to end without any network at all; see [[Inter-Process Communication]].

The distinction between listening on 127.0.0.1 and on every interface, often written 0.0.0.0, is a common source of trouble. A service bound only to loopback is unreachable from other machines, which confuses people running it inside a container, where loopback belongs to the container itself; see [[Linux Namespaces]]. A service bound to every interface is exposed to the network, which is how many databases have ended up openly reachable on the internet; see [[Firewall]].

Loopback is often treated as a trust boundary, and attackers have repeatedly found ways across it:

- **Browsers.** A web page can tell the browser to send requests to localhost, reaching local services that assumed only local programs could talk to them. Combined with tricks that make an attacker's domain resolve to 127.0.0.1, this has exposed development tools and device software; see [[Same-Origin Policy]] and [[Cross-Site Request Forgery]].
- **Servers.** If an application fetches URLs on a user's behalf, an attacker can point it at its own loopback address to reach administrative interfaces; see [[Server-Side Request Forgery]].

Browsers have added restrictions on public pages reaching local addresses, though rollout has been gradual because legitimate tools depend on that access.

The idea predates networking software. A loopback plug wires a port's transmit pins to its receive pins, so a device can test its own hardware by talking to itself; see [[Serial Port]]. A tired joke on shirts and doormats says there's no place like 127.0.0.1.

## See also
- [[Port]]
