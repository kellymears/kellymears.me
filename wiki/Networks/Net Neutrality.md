---
aliases:
  - Network neutrality
  - Zero-rating
  - Paid prioritization
tags:
  - networks
summary: The principle that internet providers should carry all traffic equally, without blocking, slowing, or charging extra for particular sites or services, and the long policy fight over whether it should be law.
---
**Net neutrality** is the principle that internet service providers should treat all traffic equally: not blocking lawful content, not slowing particular sites or services, and not charging websites for faster delivery to the provider's customers. The law professor Tim Wu coined the term in 2003.

The concern is that providers are gatekeepers. A household usually has one or two choices of broadband, so its provider controls the only path between it and every website. A provider that also sells video, phone service, or its own apps has an incentive to favor them over competitors. The worries:

- **Blocking**: refusing to carry certain services, such as rival voice-calling apps.
- **Throttling**: deliberately slowing particular traffic, like video or file sharing.
- **Paid prioritization**: a "fast lane" for companies that pay, leaving everyone else slower. Large incumbents could afford it; a startup couldn't.
- **Zero-rating**: not counting some services against a mobile data cap, which makes them effectively free compared to rivals. Debatable; it can help people on small plans while still tilting the field.

Early cases made it concrete. In 2005 a small US phone company blocked an internet calling service; in 2007 Comcast was found to be secretly disrupting BitTorrent connections by injecting fake reset packets; see [[BitTorrent]] and [[TCP and UDP]].

The principle connects to the internet's design. The [[End-to-End Principle]] puts intelligence at the edges, with a network that just moves packets, which let anyone launch a new service without asking the network's owner; see [[Packet Switching]].

Opponents argue that networks need to manage traffic, that regulation discourages investment in infrastructure, and that some traffic genuinely deserves priority. There's agreement on part of this: managing congestion is legitimate, and latency-sensitive traffic like calls benefits from priority over bulk downloads; see [[Congestion Control]] and [[Latency and Jitter]]. The dispute is over whether providers may discriminate by *who* sends traffic or charge for it.

In the US, policy has swung with administrations. The Federal Communications Commission adopted rules in 2015, repealed them in 2017, and restored them in 2024, and a federal appeals court struck them down in January 2025, ruling that the FCC lacked authority to impose them. The European Union has protected net neutrality by regulation since 2015, and its regulators later ruled against most zero-rating offers.

A related fight happens one level up, between the large networks that carry traffic. Providers have demanded payments from big content companies, who reply that they already pay for their own networks and place servers inside providers' networks to save them money; see [[Content Delivery Network]] and [[Internet Exchange Point]].

The debate concerns the same thing as other platform fights: who controls access to an audience, and what they may charge for it; see [[Enshittification]] and [[Regulatory Capture]].

## See also
- [[Network Effect]]
- [[Bandwidth]]
- [[Telephone Network]]
