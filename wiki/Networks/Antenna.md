---
aliases:
  - Dipole antenna
  - Phased array
  - Beamforming
  - MIMO
  - Radiation pattern
tags:
  - networks
summary: The conductor that turns electrical signals into radio waves and back, sized by the wavelength it serves, shaped to aim energy where it is wanted, and multiplied in modern devices to steer beams and carry parallel streams.
---
An **antenna** converts electrical current into radio waves and radio waves back into current. Every wireless link has one at each end, from a broadcast tower to the strip of metal hidden in a phone's frame. Heinrich Hertz built the first deliberate ones in 1887 to prove that electromagnetic waves existed, and Guglielmo Marconi turned them into a communication system within a decade.

An antenna works because changing current makes electrons accelerate, and accelerating charges radiate; see [[Electromagnetic Spectrum]]. It radiates best when its size matches the wavelength. The classic **dipole**, two rods end to end totaling half a wavelength, is resonant at its design frequency, like a string tuned to a note; see [[Resonance]]. That is why AM radio towers stand hundreds of feet tall while a phone's antennas, for waves a few centimeters long, fit inside its case.

Some principles:

- **Gain is direction, not amplification.** An antenna can't create energy; it can only concentrate it. A dish or a long array of rods focuses transmission into a narrow beam, strengthening it in one direction by weakening it everywhere else. The map of that shape is the **radiation pattern**.
- **Reciprocity.** An antenna receives with the same pattern it transmits.
- **Polarization.** Waves oscillate in a direction set by the antenna's orientation, and a receiver aligned at right angles hears much less; see [[Polarized Light]].
- **Distance.** Signal strength falls with the square of distance even with no obstacles, so doubling range takes four times the power; see [[Inverse-Square Law]].

Modern devices use many antennas together. In a **phased array**, slightly different timing at each element makes their waves add up in one direction and cancel elsewhere, steering a beam electronically with no moving parts; see [[Wave Interference]]. Military radar pioneered it; satellite internet dishes and 5G base stations now use it, a technique called **beamforming**; see [[Satellite Internet]] and [[Cellular Network]].

**MIMO**, multiple-input multiple-output, uses several antennas at each end to send separate data streams on the same frequency at once. Signals bouncing off walls arrive by different paths, which used to be pure interference; MIMO exploits those differences to tell the streams apart. Wi-Fi adopted it in 2009, which is why routers sprouted several antennas; see [[Wi-Fi]].

Short-range systems work differently. Contactless cards and phone payments use coils that couple magnetically over a few centimeters rather than launching waves; see [[Near-Field Communication]].

Placement matters as much as design. In 2010 one phone model's antenna formed part of its metal edge, and holding it a certain way bridged a gap and weakened reception, which the company first answered by suggesting customers hold it differently.

Hobbyists often build their own from wire and pipe; see [[Amateur Radio]]. Which frequencies an antenna may use is set by regulation; see [[Radio Spectrum]].

## See also
- [[Radio Propagation]]
- [[Microwave Transmission]]
- [[Signal-to-Noise Ratio]]
