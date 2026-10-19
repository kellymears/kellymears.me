---
aliases:
  - SNR
  - Shannon-Hartley theorem
  - Noise floor
  - Thermal noise
tags:
  - networks
summary: The ratio of a signal's power to the power of the noise competing with it, usually given in decibels, which with bandwidth sets the maximum speed any communication link can achieve and explains everything from modem speeds to why photographs taken in dim light look grainy.
---
The **signal-to-noise ratio**, or SNR, compares the strength of a wanted signal with the strength of the unwanted noise mixed in with it. A loud voice in a quiet room has a high ratio; a whisper at a concert has a low one. Engineers usually express it in decibels, a logarithmic scale on which every 10 decibels is a factor of ten in power; see [[Sound]].

Noise is unavoidable. The random motion of electrons in any conductor generates **thermal noise**, described in 1928 by John Johnson and Harry Nyquist, and it rises with temperature and bandwidth. Lightning, motors and other transmitters add more; see [[Radio Propagation]]. The level below which signals can't be distinguished from this background is the **noise floor**. Radio astronomers cool their receivers to near absolute zero to lower it.

Claude Shannon showed in 1948 that SNR and bandwidth together set a hard limit on any channel. The **Shannon-Hartley theorem** states that the maximum error-free data rate equals the bandwidth multiplied by the base-two logarithm of one plus the SNR; see [[Information Theory]] and [[Bandwidth]]. Doubling bandwidth doubles capacity, while doubling power adds only a little, because of the logarithm. A noisier channel can still carry data reliably, only more slowly, given enough error correction; see [[Error-Correcting Code]].

That limit shaped real technology. By the mid-1990s dial-up modems had reached about 33.6 kilobits per second, close to the Shannon limit of an analog phone line, and later 56k modems only went faster by using the digital network directly; see [[Modem]]. Wi-Fi and cellular radios constantly measure SNR and switch between dense, fast encodings when it's high and robust, slow ones when it's low, which is why speed drops as you walk away from the router; see [[Wi-Fi]].

Signals can even be recovered from below the noise. Satellite positioning signals arrive weaker than the background noise, but a receiver that knows the expected code can correlate against it, accumulating the signal while the random noise averages out; see [[Global Positioning System]] and [[Spread Spectrum]]. Averaging repeated measurements works the same way: averaging a hundred readings improves SNR tenfold, since noise grows only with the square root of the count; see [[Law of Large Numbers]].

The idea applies to images and sound too. A photograph taken in dim light captures few photons, so random variation shows up as grain; denoising algorithms try to separate structure from noise without erasing detail; see [[Denoising]]. Audio formats add a small amount of deliberate noise to mask the distortion of rounding; see [[Dithering]].

The phrase has become a common metaphor for how much of any stream of information is worth paying attention to.

## See also
- [[Twisted Pair]]
- [[Antenna]]
- [[Microwave Transmission]]
