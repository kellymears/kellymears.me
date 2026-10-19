---
aliases:
  - DTN
  - Interplanetary Internet
  - Bundle Protocol
  - Deep Space Network
tags:
  - networks
summary: Networking for links that are slow, intermittent, or scheduled, such as those to spacecraft, where nodes store messages and pass them on when a path appears instead of assuming a live connection end to end.
---
**Delay-tolerant networking** is a way of moving data across networks where a continuous end-to-end path rarely exists. Internet protocols assume that a sender and receiver are connected now, that round trips take milliseconds, and that a lost packet can be resent almost immediately; see [[TCP and UDP]]. Those assumptions fail in space, in remote regions, and on battlefields, where links come and go and delays run to minutes or hours.

Space is the defining case. A signal takes between about three and twenty-two minutes to travel one way between Earth and Mars, depending on the planets' positions. A TCP handshake alone would take most of an hour, and its timers would give up long before; see [[Timeout]] and [[Latency and Jitter]]. Spacecraft also pass behind planets, and ground stations rotate out of view, so links are available only at scheduled windows.

In the late 1990s Vint Cerf, a co-designer of the internet's core protocols, began working with NASA's Jet Propulsion Laboratory on an "Interplanetary Internet." The result, standardized from 2007, was the **Bundle Protocol**, now in a 2022 revision. Its central idea is **store-carry-forward**: each node accepts a bundle of data, keeps it in durable storage, and passes it on whenever the next link opens, possibly hours later. It is the same idea as early store-and-forward message networks, applied at a larger scale; see [[Packet Switching]].

Features that follow from it:

- **Custody transfer.** A node can take responsibility for a bundle, so the original sender can delete its copy, instead of the end-to-end acknowledgment the internet relies on; see [[End-to-End Principle]] and [[Delivery Guarantees]].
- **Contact scheduling.** Routing uses known future link windows, such as when an orbiter will pass over a rover, rather than only current connectivity.
- **Long lifetimes.** Bundles carry expiry times measured in hours or days.

NASA tested it on a spacecraft in deep space in 2008 and has used it on the International Space Station. Today, most Mars rover data already travels this way in practice: rovers upload to passing orbiters, which relay it to Earth when they can.

On Earth, the receiving end of most deep-space traffic is NASA's Deep Space Network, three sites of large dish antennas in California, Spain, and Australia, spaced about a third of the way around the world so one always faces any given spacecraft; see [[Antenna]].

Terrestrial uses share the problem of intermittent links. Projects in the early 2000s put wireless storage on rural buses, collecting villages' email as the bus passed and delivering it when it reached a town with a connection. Sensor networks tracking wildlife, and military radios in contested areas, use similar approaches; see [[Mesh Network]]. At the extreme, carrying the storage by hand is a network too; see [[Sneakernet]].

It trades immediacy for reliability; see [[Message Queue]].

## See also
- [[Internet Shutdown]]
- [[Pneumatic Tube]]
