---
aliases:
  - Soft error
  - Bit flip
  - Cosmic-ray bit flip
tags:
  - testing
summary: A stored bit flipped by a stray particle from space or from the chip's own packaging, leaving no damage and no trace, which is why servers use error-correcting memory and spacecraft vote among redundant computers.
---
A **single-event upset** is a change in a chip's state caused by one energetic particle passing through it. The particle leaves a trail of electric charge, and if enough collects at a memory cell or a latch, the stored bit flips. Nothing is damaged, so it is also called a **soft error**: rewrite the bit and the chip works normally. Nothing records that it happened, either.

The particles come from two main sources. Cosmic rays striking the upper atmosphere produce showers of secondary particles, and at ground level the neutrons among them do most of the upsetting. Other products of the same showers, muons, reach the ground only because of [[Time Dilation]]. The rate rises steeply with [[Altitude]], so aircraft electronics see far more upsets than those at sea level, and satellites and spacecraft more still. The second source is closer: traces of radioactive elements in chip packaging and solder emit alpha particles; see [[Radioactive Decay]]. Engineers at Intel identified this in 1978 when a new generation of memory chips showed unexplained errors, which led the industry to purify its materials.

As transistors shrink, each holds less charge and is easier to upset, though each also presents a smaller target. Upsets are rare for one chip and routine across a data center.

Documented and suspected cases:

- In a 2003 Belgian election, an electronic voting machine gave one candidate exactly 4,096 extra votes, two to the twelfth power, the signature of one flipped bit. It was caught because the total was impossible, and no other explanation was found.
- In 2011 a security researcher registered domain names one bit away from popular ones and received steady traffic from machines whose memory had flipped a bit in the name; see [[Domain Name System]].
- A single flipped bit was one of the scenarios experts demonstrated in the Toyota throttle case; see [[Toyota Unintended Acceleration]].

Defenses work at every level:

- **Error-correcting memory** stores extra check bits so a single flipped bit can be corrected and a double one detected; see [[ECC memory]].
- **Scrubbing** reads and rewrites memory periodically so errors are fixed before a second one lands in the same word.
- **Redundant computers** run the same work and vote, standard in spacecraft and avionics; see [[Triple modular redundancy]].
- **End-to-end checks** catch corruption wherever it happens; see [[Checksum]].
- **Watchdogs** reset a processor whose state has been knocked off course; see [[Watchdog Timer]].

For debugging, soft errors mean that a crash which never recurs may not be a software bug, and that in a large fleet some fraction of crash reports have no code fix; see [[Crash Reporting]] and [[Heisenbug]]. Large operators have also found the opposite case, chips with manufacturing defects that compute wrong answers repeatably; see [[Byzantine fault]].

## See also
- [[Flip-Flop]]
- [[Fault injection]]
- [[Cosmic Ray]]
