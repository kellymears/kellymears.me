---
aliases:
  - Frequency hopping
  - CDMA
  - Hedy Lamarr
tags:
  - networks
summary: Spreading a radio signal across far more bandwidth than it needs, by hopping frequencies or mixing in a fast pseudorandom code, which resists jamming and lets many users share a band, and which underlies Bluetooth, GPS, and early Wi-Fi.
---
**Spread spectrum** is a family of radio techniques that deliberately spreads a signal across a much wider band of frequencies than its data requires. That sounds wasteful, but it makes the signal hard to jam, hard to intercept, and able to share a band with many others.

There are two main forms:

- **Frequency hopping.** The transmitter jumps among many channels in a sequence known to the receiver. Interference on any one channel spoils only a sliver of the signal, and a listener without the sequence hears only scattered fragments.
- **Direct sequence.** Each data bit is multiplied by a much faster pseudorandom pattern of "chips," smearing it across a wide band at low power. The receiver multiplies by the same pattern, which collapses the signal back while spreading any interference out into noise.

Both depend on a shared sequence that looks random but can be reproduced exactly; see [[Pseudorandom Number Generator]].

The best-known origin story belongs to the film star Hedy Lamarr and the composer George Antheil, who patented a frequency-hopping system in 1942 to keep radio-guided torpedoes from being jammed. Their design synchronized transmitter and receiver with slotted rolls like those of a player piano, hopping among 88 frequencies, one for each piano key. The U.S. Navy shelved it, and similar ideas had been proposed before, but the patent became a symbol of overlooked invention, and Lamarr was honored for it late in life. Militaries developed spread spectrum through the 1950s and 1960s.

The civilian turn came in 1985, when U.S. regulators allowed unlicensed spread-spectrum use in a few bands. Devices there have to tolerate interference from microwave ovens and each other, and spread spectrum made that workable. The results:

- **Wi-Fi.** The first 802.11 standards in 1997 used direct sequence or hopping; see [[Wi-Fi]].
- **Bluetooth.** Hops among 79 channels 1,600 times a second, learning to avoid channels busy with Wi-Fi; see [[Bluetooth]].
- **GPS.** Every satellite transmits on the same frequency with its own code, and receivers dig signals out from below the noise floor by correlating with each code; see [[Global Positioning System]].
- **Cellular.** Code division multiple access (CDMA), commercialized by Qualcomm in the 1990s, let many phones share one channel, each separated by its own code; see [[Cellular Network]].

Theory explains why it works. Shannon's channel capacity grows with bandwidth as well as with signal strength, so a very wide band can carry data even when the signal is weaker than the noise; see [[Information Theory]]. The interference rejection comes from the same correlation that makes waves add or cancel; see [[Wave Interference]].

Newer Wi-Fi and cellular standards mostly use a different scheme that divides the band into many narrow subcarriers, but hopping and coded spreading persist wherever robustness matters.

## See also
- [[Fourier Transform]]
- [[Modem]]
- [[De Bruijn Sequence]]
- [[Amateur Radio]]
- [[Pager]]
