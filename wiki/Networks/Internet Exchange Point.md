---
aliases:
  - IXP
  - Peering
  - Settlement-free peering
  - IP transit
  - Tier 1 network
tags:
  - networks
summary: Buildings where many networks plug into a shared switch to exchange traffic directly, the physical meeting points that keep local traffic local and make the internet cheaper and faster.
---
An **internet exchange point** is a physical place where many independent networks connect to exchange traffic directly. Providers, content companies, and cloud platforms each run a cable into a shared switch in a data center, and any two of them can then send traffic to each other across it instead of through third parties. The largest exchanges, in Frankfurt, Amsterdam, and London, connect over a thousand networks and carry many terabits per second at peak.

The internet is a network of networks, around 75,000 *autonomous systems*, each running its own routers and policies, connected by [[Border Gateway Protocol]]. For traffic to get from one to another, they must interconnect somehow, and there are two commercial arrangements:

- **Transit.** A network pays a larger provider to carry its traffic to the entire rest of the internet. Simple, but billed by volume.
- **Peering.** Two networks agree to exchange traffic destined for each other's customers directly, typically for free. This is settlement-free peering.

A handful of very large networks, called *Tier 1*, reach the whole internet through peering alone and buy no transit. Everyone else buys some transit and peers where they can.

Exchange points make peering cheap. Without them, each pair of networks would need its own dedicated link. At an exchange, one port connects a network to hundreds of potential peers, and *route servers* let a network peer with many others through a single session. The value of joining grows with the number of members already present, a [[Network Effect]].

MAE-East, near Washington, opened in 1992, and exchanges took over the role of tying networks together when the NSFNET backbone was privatized in 1995.

Local exchanges matter most where they are missing. Without one, traffic between two networks in the same city may travel to another continent and back, a pattern called *tromboning*. Much of Africa's local traffic once went through Europe, adding hundreds of milliseconds and expensive international transit. Kenya's exchange, launched in 2002, and others since have kept local traffic local, cutting [[Latency and Jitter]] and costs.

Content providers are now the biggest peers. They bring traffic close to users by peering at exchanges and placing caches inside provider networks, as described under [[Content Delivery Network]], which is why so little popular content crosses a [[Submarine Cable]] for each request.

Interconnection is also where commercial fights happen. In 2005 Cogent and Level 3 de-peered, briefly cutting off customers who could only reach each other through that link. In 2014 Netflix agreed to pay Comcast for direct interconnection after streaming quality degraded, fueling net neutrality debates.

Exchanges are mostly neutral, member-run organizations, and their dense local meshes, with [[Anycast]] routing to the nearest copy of a service, give the internet much of its resilience.

## See also
- [[Border Gateway Protocol]]
- [[Submarine Cable]]
- [[Content Delivery Network]]
- [[Packet Switching]]
