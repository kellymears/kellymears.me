---
aliases:
  - WiFi
  - 802.11
  - Wireless LAN
  - WLAN
  - WPA2
  - WPA3
tags:
  - networks
summary: Wireless local networking over shared, unlicensed radio channels, where every device on a channel takes turns talking, which explains most of its speed, range, and reliability quirks.
---
**Wi-Fi** is wireless local networking based on the IEEE 802.11 standards, first published in 1997. Devices talk to an access point, or router, over radio in unlicensed frequency bands, mainly 2.4 GHz, 5 GHz, and since Wi-Fi 6E in 2020, 6 GHz. In 2018 the alliance renamed the confusing standard numbers as generations, so 802.11n became Wi-Fi 4, 802.11ac Wi-Fi 5, 802.11ax Wi-Fi 6, and 802.11be, certified in 2024, Wi-Fi 7.

The bands exist because the US Federal Communications Commission opened them in 1985 for anyone to use without a license, alongside microwave ovens and cordless phones. Shared and free, it behaves like a commons, with the crowding of a [[Tragedy of the Commons]].

The defining fact of Wi-Fi is that **the medium is shared**. On a given channel, only one device can transmit at a time. Devices listen before talking and back off randomly if the air is busy, a scheme called collision avoidance. So:

- **Advertised speeds are shared.** Every device on the channel, including neighbors' networks on the same channel, splits the airtime.
- **Slow devices slow everyone.** An old or distant device transmits at a low rate and occupies the air longer for the same data.
- **Interference matters.** In the 2.4 GHz band, only channels 1, 6, and 11 don't overlap, and microwave ovens leak right into it.

Frequency trades range for speed. Lower frequencies pass through walls better, while higher bands carry more data over shorter distances, and signal strength falls off steeply with distance, as the [[Inverse-Square Law]] describes in open space. Reflections off walls create overlapping paths that can cancel or reinforce, an effect of [[Wave Interference]]. Modern Wi-Fi exploits those paths: MIMO sends several streams over multiple antennas, beamforming steers signal toward a device, and OFDMA, from Wi-Fi 6, splits a channel among many devices at once.

Wireless links lose packets far more often than cables, so Wi-Fi retransmits at the link layer before higher layers notice. That hides loss but adds variable delay, which is why Wi-Fi shows more [[Latency and Jitter]] than Ethernet and why gamers and video calls prefer a cable. When losses do reach TCP, it can misread them as congestion and slow down needlessly, a long-standing problem for [[Congestion Control]].

Security has improved in stages. WEP, the original encryption, was broken in 2001. WPA2, from 2004, held up until the KRACK attack in 2017. WPA3, from 2018, resists offline password guessing. Open networks in cafés and airports encrypt nothing at the radio level, so security there depends on HTTPS and [[Transport Layer Security]], or a [[Virtual Private Network]].

At the network layers, Wi-Fi is another link: devices get addresses on a [[Subnet]], usually behind [[Network Address Translation]], and services are found with [[Multicast DNS]].

## See also
- [[Bluetooth]]
- [[Captive Portal]]
- [[Radio Spectrum]]
- [[Antenna]]
- [[Last Mile]]
