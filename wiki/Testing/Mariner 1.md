---
aliases:
  - Mariner 1 failure
  - Most expensive hyphen
tags:
  - testing
summary: A NASA probe to Venus destroyed minutes after launch in 1962 because a guidance program used raw velocity data where the equations called for smoothed values, a latent error that surfaced only when a radio beacon failed.
---
**Mariner 1** was NASA's first attempt to send a spacecraft to Venus. It launched from Cape Canaveral on 22 July 1962 on an Atlas-Agena rocket, began veering off course within minutes, and was destroyed by the range safety officer a little under five minutes after liftoff, before it could threaten shipping lanes or populated areas. The probe and rocket cost about $18.5 million at the time.

Two faults combined. First, the Atlas lost the signal from a ground radio beacon that helped track its velocity. That alone was meant to be survivable, because a computer on the ground kept guiding the rocket. Second, the guidance program contained a transcription error. In the handwritten equations, a symbol for velocity carried a bar over it, meaning a smoothed average over time. The bar was lost when the equations were turned into code, so the program used raw velocity readings instead.

Raw readings jitter. The smoothed value exists because small, rapid fluctuations in the tracking data are noise, not real motion. Without smoothing, the guidance computer treated the jitter as genuine deviations and issued steering corrections to fix them. Those corrections produced real deviations, which produced larger corrections, and the rocket began to wander; see [[Feedback Loop]].

The error had been in the program on earlier flights but had done nothing, because the beacon worked and the faulty path was never exercised; see [[Branch Coverage]] and [[Code Coverage]]. A failure in one component exposed a latent fault in another, a pattern repeated in many later incidents; see [[Ariane 5 Flight 501]].

The story grew in the retelling. Arthur C. Clarke called it "the most expensive hyphen in history," and versions have blamed a hyphen, a minus sign, a misplaced period in a FORTRAN loop, or a comma. The FORTRAN period-for-comma story describes a real bug, but one found in other NASA software and caught in testing. The overbar account comes from the investigation; see [[Urban Legend]].

The lessons for testing:

- **Transcription is a step that can fail.** Every move from specification to code needs checking; see [[Requirements Traceability]] and [[Software Inspection]].
- **Test the degraded modes.** The backup path was the one that mattered, and it was the one that had never flown; see [[Fault injection]] and [[Hardware-in-the-Loop]].
- **Noise handling is part of the design.** A controller that responds to every fluctuation can make itself unstable, and filtering belongs in the tests as much as in the equations.

Mariner 2 launched about five weeks later and in December 1962 flew past Venus, the first spacecraft to return data from a close encounter with another planet.

## See also
- [[Mars Climate Orbiter]]
- [[Verification and Validation]]
- [[Software Crisis]]
