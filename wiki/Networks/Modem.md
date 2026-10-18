---
aliases:
  - Dial-up
  - Modulation
  - Baud
tags:
  - networks
summary: A device that turns digital data into signals a channel can carry and back again, best known for the screeching dial-up connections that brought most people online through the telephone network.
---
A **modem**, short for modulator-demodulator, converts digital data into a signal suited to some channel, and converts it back at the other end. The word is most associated with dial-up internet, which carried data as sound over telephone lines, but cable, DSL, Wi-Fi, and cellular radios are all modems too.

Telephone lines were built for voice and pass roughly 300 to 3,400 hertz; see [[Telephone Network]]. Bits can't travel over that directly, so a modem varies a tone, a process called **modulation**. Early modems used two pitches, one for 0 and one for 1. The Bell 103 of 1962 ran at 300 bits per second this way, fast enough to keep up with reading. Many early modems were acoustic couplers, rubber cups that held a phone handset and simply played sounds into it.

Faster modems packed more bits into each change of signal. The rate of changes is the **baud**, and by shifting the tone's phase and loudness together, a modem could send four, eight, or more bits per change, which is why bits per second and baud stopped meaning the same thing. Speed rose through 2,400, 14,400, and 28,800 bits per second to 33,600 in 1994, close to the theoretical maximum for a noisy analog line; see [[Information Theory]] and [[Bandwidth]].

The 56k modems of the late 1990s went past that limit with a trick. Telephone exchanges were by then digital inside, sampling voice 8,000 times a second at 8 bits each, so a provider connected digitally to the exchange could send data that stayed digital until the last stretch of copper. The speed applied only downstream.

The famous screech at the start of each call was the handshake. The two modems announced their abilities, disabled the telephone network's echo cancellers with a special tone, measured the line's noise at different frequencies, and agreed on the fastest scheme it would bear. Later standards added built-in error correction and compression; see [[Error-Correcting Code]] and [[Data Compression]].

Dial-up shaped a period of online culture. A connection tied up the household phone line, providers charged by the hour, and services mailed out disks by the millions. Before the web, people dialed straight into bulletin board systems and online services; see [[Eternal September]]. Round-trip delays of 150 milliseconds or more made fast online games difficult; see [[Latency and Jitter]].

Broadband kept the name. DSL runs much higher frequencies over the same copper pair, and cable modems share television coaxial cable among a neighborhood. Wireless links modulate radio waves in the same basic way, with far more elaborate schemes; see [[Wi-Fi]] and [[Cellular Network]].

## See also
- [[Telegraph]]
- [[Spread Spectrum]]
