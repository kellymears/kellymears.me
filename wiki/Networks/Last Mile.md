---
aliases:
  - Local loop
  - Broadband
  - Rural broadband
  - Digital divide
  - DOCSIS
tags:
  - networks
summary: The final stretch of network connecting individual homes and businesses, the most expensive and least competitive part of the internet, which decides most people's speed and whether rural areas get service at all.
---
The **last mile** is the final segment of a network, connecting individual homes and businesses to a provider's equipment. Backbone links carry huge volumes over long distances to relatively few places; the last mile must reach every single building. It is the most expensive part of the network to build, the slowest to upgrade, and usually what limits a household's internet speed.

Cost is the defining problem. Backbone costs scale with traffic, but last-mile costs scale with addresses: every street must be dug up, every pole climbed, every house connected, whether its occupants use a little or a lot. Dense cities are cheap per customer; farms miles apart are not.

The technologies:

- **Telephone copper.** DSL runs data at high frequencies over existing phone wires, but speed falls steeply with distance from the exchange; see [[Modem]] and [[Telephone Network]].
- **Cable.** Cable television's coaxial lines carry internet under a standard called DOCSIS. A neighborhood shares capacity, so speeds can sag in the evening, and upload speeds are traditionally a small fraction of download.
- **Fiber to the home.** Glass all the way to the building offers the highest and most symmetric speeds and can be upgraded by swapping equipment at the ends; see [[Optical Fiber]].
- **Wireless.** Fixed wireless and cellular home service avoid digging, and low-orbit satellite constellations now reach places no wire will; see [[Cellular Network]] and [[Satellite Internet]].

The economics produce little competition. Building a second set of wires to the same houses rarely pays, so many households have one or two real choices, the pattern of a natural monopoly; see [[Net Neutrality]]. Some countries require the owner of the lines to lease them to competitors. Some US towns built their own networks; in 2010 Chattanooga's city-owned electric utility began offering gigabit fiber, years before most private providers.

Rural areas face the starkest gap, the **digital divide**: places where no provider sees a profit. Governments subsidize service much as they once paid to extend electricity and telephone lines to farms. Definitions shift as needs grow: in 2024 the FCC raised its benchmark for broadband from 25 megabits per second down and 3 up to 100 down and 20 up.

Even a fast line can feel slow. The connection between a home router and the provider is usually the narrowest link on the path, and oversized buffers there inflate delays under load; see [[Congestion Control]]. Inside the home, Wi-Fi often becomes the real bottleneck; see [[Wi-Fi]].

Content networks place servers as close to the last mile as they can, inside providers' own facilities, so popular content crosses as little of the network as possible; see [[Content Delivery Network]] and [[Internet Exchange Point]].

## See also
- [[Bandwidth]]
- [[Submarine Cable]]
- [[Quality of Service]]
- [[Internet Service Provider]]
