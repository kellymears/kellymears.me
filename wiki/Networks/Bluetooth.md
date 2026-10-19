---
aliases:
  - Bluetooth Low Energy
  - BLE
  - Bluetooth LE
  - LE Audio
tags:
  - networks
summary: Short-range radio for connecting nearby devices such as headphones, keyboards, and sensors, which hops frequencies to dodge interference and comes in a classic and a low-energy flavor.
---
**Bluetooth** is a short-range radio standard for connecting nearby devices: headphones, keyboards, game controllers, watches, car systems, fitness sensors, and trackers. It began at Ericsson in 1989, where engineers including Jaap Haartsen designed a wireless replacement for cables, and a Special Interest Group of Ericsson, IBM, Intel, Nokia, and Toshiba formed in 1998 to standardize it. The name honors Harald Bluetooth, a tenth-century Danish king who united warring tribes, and the logo combines his initials in runes.

Bluetooth shares the crowded 2.4 GHz band with [[Wi-Fi]] and microwave ovens. It copes by **frequency hopping**: classic Bluetooth jumps between 79 narrow channels up to 1,600 times a second, so interference on one channel affects only brief moments. Adaptive hopping later learned to avoid channels that are consistently busy.

There are effectively two Bluetooths:

- **Classic Bluetooth** streams continuously, for audio and older peripherals.
- **Bluetooth Low Energy**, introduced in 2010 with Bluetooth 4.0 and derived from Nokia's Wibree, sends short bursts and sleeps in between, letting sensors run for months or years on a coin cell. It organizes data as services and characteristics, such as a heart rate service with a measurement characteristic, and powers nearly every fitness sensor, smart lock, and tracker, often with a lithium-ion battery or coin cell lasting far longer than Wi-Fi would allow.

Devices connect by **pairing**, which exchanges keys so later connections are encrypted. Modern pairing uses elliptic-curve key exchange from Public-Key Cryptography and Elliptic Curve Cryptography, with methods such as comparing a six-digit code to stop an attacker in the middle. Flaws have still appeared, such as BlueBorne in 2017 and the KNOB attack in 2019, which tricked devices into using keys with trivially few bits.

Audio exposes Bluetooth's limits. Wireless audio is compressed with codecs, a form of [[Data Compression]], from the baseline SBC to AAC, aptX, and LDAC, and buffering adds delay, often 100 to 200 milliseconds, enough to put game sound noticeably behind the picture, as described under Input Latency. Turning on a headset's microphone historically forced a switch to a hands-free profile with narrow, telephone-quality sound in both directions. LE Audio, announced in 2020, brings the more efficient LC3 codec and Auracast, which lets one source broadcast to any number of listeners, a radio take on [[Multicast]], useful for hearing aids and public venues.

Low Energy also enables location features. Beacons broadcast small identifiers that phones can detect, used for indoor positioning and retail. Crowdsourced finding networks, such as those behind item trackers, have millions of phones relay sightings of nearby lost items, end-to-end encrypted. The same capability raised stalking concerns, prompting unwanted-tracker alerts across platforms.

Bluetooth mesh, from 2017, lets low-energy devices relay messages for lighting and building control, competing with Zigbee and Thread in the mesh network space.

## See also
- [[Peer-to-Peer]]
- [[Two-Way Radio]]
