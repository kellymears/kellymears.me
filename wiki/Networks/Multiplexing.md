---
aliases:
  - Time-division multiplexing
  - Frequency-division multiplexing
  - Multiplexer
tags:
  - networks
summary: Combining many separate signals or conversations onto one shared channel, by giving each its own slice of frequency, time, wavelength, or code, the technique that lets a single wire, fiber, or connection carry far more than one stream.
---
**Multiplexing** is carrying several separate signals over one shared channel, then separating them again at the other end, a step called demultiplexing. A single cable, radio band, or network connection becomes many logical channels. Without it, every phone call or data stream would need its own wire. The device that combines signals is a multiplexer, and telephone companies used banks of them to pack calls onto the trunk lines running between cities.

The idea is old. Telegraph engineers sought ways to send more than one message on a wire at once, and Thomas Edison's quadruplex telegraph of 1874 carried four messages, two in each direction, on a single line; see [[Telegraph]]. Every major form of multiplexing since then divides the channel along a different dimension.

**Frequency-division multiplexing** gives each signal its own range of frequencies. Radio stations coexist this way, each assigned its own slice of the air; see [[Radio Spectrum]]. Telephone companies stacked many voice calls on a long-distance line by shifting each to a different frequency, and cable television and DSL share copper the same way. Shifting signals into a frequency slot is the work of modulation; see [[Modem]].

**Time-division multiplexing** gives each signal the whole channel in turns. The T1 carrier system, introduced in the United States in 1962, sampled 24 digitized voice channels in rotation, each getting eight bits 8,000 times a second, for 1.544 megabits per second in total. The digital telephone network was built from such hierarchies; see [[Telephone Network]]. A computer sharing its processor among users does the same thing in software; see [[Time-Sharing]].

Fiber optics divide by color, sending dozens of wavelengths of light down one strand; see [[Optical Fiber]]. Some cellular systems divide by code, letting many phones transmit at once on the same frequencies, each recoverable using its own code sequence; see [[Spread Spectrum]] and [[Cellular Network]].

Fixed slots waste capacity when a conversation is silent. **Statistical multiplexing** instead lets senders share a channel on demand, interleaving packets as they arrive, which is the core idea of the internet; see [[Packet Switching]]. It uses capacity far more efficiently, at the cost of queues and delays when demand spikes; see [[Queueing Theory]].

Multiplexing also happens at higher layers. Port numbers let many applications share one network address, and the operating system demultiplexes arriving packets to the right program; see [[Network Socket]]. HTTP/2 runs many requests concurrently over one connection, but a single lost packet in the underlying stream stalls all of them; see [[Head-of-Line Blocking]]. QUIC was designed partly to fix this, giving each stream independent delivery; see [[QUIC]]. The general trade-off holds everywhere: sharing a channel saves resources but makes its users depend on each other.

## See also
- [[Microwave Transmission]]
- [[HTTP/2]]
