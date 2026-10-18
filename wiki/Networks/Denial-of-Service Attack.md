---
aliases:
  - DoS
  - DDoS
  - Distributed denial of service
  - SYN flood
  - Amplification attack
  - Botnet
tags:
  - networks
summary: Making a service unavailable by overwhelming it with traffic or expensive requests, usually from many machines at once, and the layered defenses that absorb or filter the flood.
---
A **denial-of-service attack** (DoS) tries to make a service unavailable to legitimate users by exhausting something it depends on: bandwidth, connection slots, CPU or memory. A *distributed* attack (DDoS) sends the load from many machines at once, typically a **botnet** of compromised computers or devices, so no single source can simply be blocked.

Attacks fall into three broad types:

- **Volumetric.** Fill the target's network link with junk. Large attacks now exceed several terabits per second.
- **Protocol.** Exhaust state in network equipment or the operating system. A *SYN flood* sends the first packet of many [[TCP and UDP|TCP]] handshakes and never completes them, filling the server's table of half-open connections. *SYN cookies* (1996) defeat it by encoding the connection state in the reply instead of storing it.
- **Application-layer.** Send requests that look legitimate but are expensive to serve, such as searches, logins or uncached pages. Slowloris holds many connections open by sending headers very slowly. These are hard to separate from real traffic.

**Amplification** makes volumetric attacks cheap. The attacker sends small requests to public UDP services with the victim's address forged as the source, and the services send much larger replies to the victim. Open DNS resolvers, old [[Network Time Protocol]] servers and, in 2018, exposed memcached servers have all been used this way, the last with amplification factors in the tens of thousands. Networks that drop packets with forged source addresses, a practice known as BCP 38, would stop this at the source, but adoption is incomplete.

In 2016 the Mirai botnet, built from insecure cameras and routers with default passwords, attacked a major [[Domain Name System|DNS]] provider and made many large websites unreachable for hours.

Defenses work in layers:

- **Absorb.** [[Anycast]] spreads attack traffic across many data centers, so a [[Content Delivery Network]] with enough total capacity can soak up floods that would swamp any single site.
- **Filter.** Scrubbing services and a [[Firewall]] drop recognizable attack traffic before it arrives. In an emergency, a network can stop routing traffic to the targeted address altogether, which protects its other customers but completes the attack.
- **Limit.** [[Rate Limiting]] per client, connection limits and challenge pages slow application-layer attacks, and [[Backpressure]] lets a server reject work it can't finish instead of collapsing under it.
- **Avoid expensive paths.** *Algorithmic complexity attacks* use inputs that trigger worst-case behavior. Crafted keys that all collide in a [[Hash Table]] led languages to randomize their hash seeds, and catastrophically backtracking [[Regular Expression]] patterns cause ReDoS.

Not every flood is an attack. A popular link or a reconnect storm after an outage, a [[Thundering Herd]], can look exactly like one, and the same defenses apply. [[Load Testing]] shows where a system breaks before an attacker finds out.

## See also
- [[Anycast]]
- [[Content Delivery Network]]
- [[Thundering Herd]]
