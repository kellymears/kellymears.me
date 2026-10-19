---
aliases:
  - Hubble mirror
  - Null corrector
  - Spherical aberration
tags:
  - testing
summary: The Hubble Space Telescope launched in 1990 with a primary mirror ground precisely to the wrong shape, because the one instrument used to check it was itself assembled wrong, and the tests that disagreed with it were explained away.
---
**The Hubble mirror flaw** is the error that left the Hubble Space Telescope nearsighted when it launched in April 1990. Its 2.4-meter primary mirror, among the most precisely polished ever made, had been ground to the wrong shape. Its edge was too flat by two microns, roughly a fiftieth of the width of a human hair. That was enough to cause spherical aberration: light from the edge of the mirror focused at a different point from light near the center, and stars appeared as smeared halos instead of sharp points.

The mirror wasn't badly made. It was made extremely well to the wrong specification, and the reason lay in the test equipment.

The manufacturer checked the mirror's shape with a device called a null corrector, an arrangement of lenses and mirrors that makes a correctly shaped mirror produce a simple, uniform test pattern; see [[Test Oracle]]. One element of the main null corrector was out of position by about 1.3 millimeters, because a measuring rod had reflected light from a worn spot on its end cap rather than its intended target. The polishers then worked the mirror until it matched the faulty corrector perfectly; see [[Lens]].

Other evidence pointed to the problem. Simpler test instruments indicated spherical aberration, but they were considered less accurate than the main corrector and their results were set aside. An investigation board, chaired by Lew Allen, found that the error could have been caught, and criticized the organization for treating the primary test as unquestionable and failing to resolve the conflicting results; see [[Normalization of Deviance]] and [[Confirmation Bias]].

There was also no end-to-end optical test of the complete telescope before launch. Such a test was judged expensive and difficult, and each component was checked separately against its own specification; see [[End-to-End Test]] and [[Verification and Validation]].

The repair became one of the most famous servicing missions in spaceflight. Because the error had been made so precisely, engineers could measure it exactly from Hubble's blurry images and design optics to cancel it, much like eyeglasses. In December 1993, astronauts installed a corrective instrument package and a replacement camera with built-in correction. Hubble went on to produce decades of celebrated science.

The lessons echo through testing practice:

- **The tester can be wrong.** A test is only as good as its reference, and a single unchecked oracle is a single point of failure; see [[Differential Testing]].
- **Disagreement is data.** When independent measurements conflict, the conflict needs resolving, not explaining away; see [[Scientific Debugging]].
- **Unit tests don't prove the system.** Parts can each pass their own checks while the whole fails; see [[Integration Test]].

Similar failures of trusted instruments appear in other disasters; see [[Mars Climate Orbiter]] and [[Mars Polar Lander]].

## See also
- [[Safety Case]]
- [[Ariane 5 Flight 501]]
- [[Lagrange Point]]
