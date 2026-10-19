---
aliases:
  - Mobile network
  - Cell tower
  - LTE
  - 5G
  - Handover
  - Cellular data
tags:
  - networks
summary: How phones stay connected while moving, by dividing land into cells that reuse the same radio frequencies, and how each mobile generation from 1G to 5G changed what that connection carried.
---
A **cellular network** divides an area into *cells*, each served by a base station, and lets phones move between them without dropping a call or connection. The idea, developed at Bell Labs in 1947 and deployed decades later, solves a scarcity problem. Radio spectrum is limited, and one powerful transmitter covering a whole city could serve only a few hundred calls. Many small cells, each using low power, let the same frequencies be reused a few cells away, multiplying capacity many times over. Signal strength falls off with distance, as described by the [[Inverse-Square Law]], which is what makes that reuse possible.

Two mechanisms make the system feel seamless:

- **Handover.** As a phone moves, the network measures its signal from nearby cells and transfers the connection to a stronger one mid-session. Doing that without a gap is much of the engineering.
- **Roaming and identity.** The SIM, or an [[eSIM]], holds credentials that identify the subscriber to their home network, which also lets a foreign network authenticate them and bill the home carrier.

Each generation, roughly a decade apart, changed what the network carried:

- **1G** (1980s) carried analog voice.
- **2G** (1990s) went digital, added encryption and text messages, and let phones carry a little data.
- **3G** (2000s) made mobile internet usable.
- **4G LTE** (2010s) dropped the separate voice network entirely and became an all-IP [[Packet Switching]] network, with voice carried as data.
- **5G** (2020s) adds higher frequencies with huge [[Bandwidth]] over short range, lower latency, and support for many low-power devices.

Higher frequencies carry more data but travel less far and are blocked by walls, foliage, and even rain, so faster networks need many more, smaller cells. Low frequencies still provide wide coverage in rural areas, which is why a phone may show 5G in a city center and fall back to 4G a few streets away.

Mobile links behave differently from wired ones. Latency and throughput vary as signal and load change, a phone may switch between [[Wi-Fi]] and cellular mid-session, and its public address can change when it does, which breaks ordinary TCP connections. [[QUIC]] identifies connections by ID rather than address partly for this reason. Carriers also put many subscribers behind shared [[Network Address Translation]], which complicates [[Peer-to-Peer]] apps. Moving phones experience [[Latency and Jitter]] spikes during handovers.

The radio itself is expensive in energy. Keeping it active drains the [[Lithium-Ion Battery]], so phones drop to idle states quickly, and apps that wake the radio often, through frequent polling, for example, cost far more power than their data suggests. That is a large part of why mobile platforms push developers toward batched, server-initiated notifications.

## See also
- [[Multiplexing]]
- [[Adaptive Bitrate Streaming]]
- [[Internet Shutdown]]
- [[Two-Way Radio]]
- [[Faraday Cage]]
