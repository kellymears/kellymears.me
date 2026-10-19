---
aliases:
  - Fourier series
  - Fourier analysis
  - Frequency domain
tags:
  - computation
summary: The mathematical tool that breaks a signal into the pure frequencies that make it up, turning sound into a spectrum and images into patterns of waves, and made practical by the fast Fourier transform.
---
**The Fourier transform** expresses a signal as a sum of simple waves of different frequencies. A sound recording, a row of pixels, or a radio signal can be described either as values over time or space, or as a list of how much of each frequency it contains. The transform converts between the two descriptions, and its inverse converts back without losing anything.

Joseph Fourier introduced the idea in work on heat flow around 1807, claiming that any periodic function could be built from sines and cosines; see [[Heat Transfer]]. The claim was controversial and needed later mathematicians to state exactly when it holds, but the approach became one of the most widely used tools in science and engineering.

The frequency view makes many problems easier:

- **Sound.** A musical note is a fundamental frequency plus overtones, and the balance of overtones is what distinguishes instruments; see [[Timbre]] and [[Sound]]. Spectrograms show how frequencies change over time, and speech recognition systems have long started from them; see [[Automatic Speech Recognition]].
- **Filtering.** Removing hum or hiss means removing particular frequencies. Blurring and sharpening in images are operations that are simple in the frequency domain. A key theorem says convolution in one domain becomes multiplication in the other; see [[Convolution]].
- **Compression.** Most of a natural image's or recording's energy sits in a few frequencies. JPEG uses a closely related transform, the discrete cosine transform, on small blocks of pixels; see [[JPEG]]. Audio and video codecs work similarly; see [[Video Compression]].
- **Sampling.** A signal has to be sampled at more than twice its highest frequency, or high frequencies masquerade as low ones; see [[Aliasing]].
- **Communications.** Wi-Fi and modern cellular networks split data across many closely spaced frequencies, using fast transforms in the hardware; see [[Radio Spectrum]].
- **Physics.** Spectrometers, X-ray crystallography, and MRI scanners all measure frequencies and reconstruct structure through Fourier methods; see [[Spectroscopy]].

The **fast Fourier transform** made all this practical on computers. A direct computation over n samples takes on the order of n squared operations. James Cooley and John Tukey published an algorithm in 1965 that takes on the order of n log n, by splitting the problem into halves recursively; see [[Divide and Conquer]] and [[Big-O Notation]]. Carl Friedrich Gauss had used a similar idea around 1805, in unpublished work. The speedup turned hours of computation into seconds, and the FFT is often listed among the most important algorithms of the twentieth century.

The transform also reveals a fundamental trade-off. A signal concentrated in time is spread out in frequency, and the reverse. A short click contains many frequencies. A pure tone must last a long time. Wavelets were developed partly to balance that trade-off.

## See also
- [[Spherical Harmonics]]
- [[Universal Approximation Theorem]]
- [[Finite Field]]
