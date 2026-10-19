---
aliases:
  - Homing pigeon
  - Carrier pigeon
  - IP over Avian Carriers
tags:
  - networks
summary: Carrying messages by homing pigeon, used from antiquity to the World Wars, the subject of a famous April Fools' standard for running internet traffic on birds, and a reminder that bandwidth and latency are different things.
---
**Pigeon post** is sending messages by homing pigeon. A homing pigeon taken away from its loft will fly back to it, often from hundreds of kilometers away, at speeds commonly cited around 80 kilometers per hour. The catch is that it only goes one way. To send messages, birds have to be carried out in advance, so a pigeon network is a set of one-way links, each ending at a loft.

People used pigeons for messages in the ancient world, and they kept their value into the age of electricity:

- **News.** In 1850, before the telegraph line between Germany and Belgium was complete, Paul Julius Reuter flew stock prices across the gap by pigeon, and the business grew into a news agency; see [[Telegraph]].
- **Sieges.** During the siege of Paris in 1870 and 1871, balloons carried pigeons out of the city, and the birds flew messages back in. Messages were photographed onto tiny film so that one bird could carry thousands, which were projected and copied out on arrival.
- **War.** Armies kept pigeons through both World Wars, for times when radio was jammed or lines were cut. A pigeon named Cher Ami became famous for delivering a message in 1918 that helped rescue a trapped American battalion.

How pigeons find home isn't fully settled. Experiments point to a sun compass, a sense of the Earth's magnetic field, and familiar landmarks and smells near home, with researchers disagreeing on the relative weight; see [[Magnetism]] and [[Global Positioning System]].

Pigeons are a favorite in networking jokes because they make an abstract point concrete. In 1990, an April Fools' Day standards document described how to carry internet packets by bird, printed on paper and strapped to a leg; see [[Request for Comments]]. In 2001 a Norwegian user group actually tried it, sending a handful of ping packets by pigeon. About half of them came back, with round-trip times close to an hour or more; see [[Latency and Jitter]].

The real point is that bandwidth and latency are separate. In 2009, a South African company raced a pigeon carrying a memory card against its own internet connection over about 80 kilometers. The bird arrived in roughly two hours, by which time only a small fraction of the same data had transferred. A bird with a memory card has huge bandwidth and terrible latency; see [[Bandwidth]] and [[Sneakernet]].

Networks that can't count on a continuous link work the same way, holding messages until a carrier comes by; see [[Delay-Tolerant Networking]]. A bird that doesn't arrive is a lost packet with no acknowledgment; see [[Delivery Guarantees]].

## See also
- [[Packet Switching]]
- [[Dead reckoning]]
