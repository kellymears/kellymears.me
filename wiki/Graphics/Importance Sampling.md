---
aliases:
  - Monte Carlo integration
  - Multiple importance sampling
  - Next event estimation
tags:
  - graphics
summary: A technique for reducing noise in random estimates by drawing samples more often where they matter most and weighting each one to stay unbiased, the main reason path-traced images converge in seconds instead of hours.
---
Many quantities in rendering are integrals: the light arriving at a point is the sum of contributions from every direction over a hemisphere; see [[Rendering Equation]]. Such integrals usually have no closed form, so renderers estimate them with **Monte Carlo integration**, averaging the integrand at randomly chosen points; see [[Monte Carlo Method]]. The average converges to the right answer, but the error shrinks only with the square root of the number of samples. Quadrupling the samples halves the noise; see [[Law of Large Numbers]].

**Importance sampling** reduces that error by choosing samples non-uniformly. Instead of picking directions evenly, the renderer picks them according to a probability distribution that is high where the integrand is likely to be large. Each sample is then divided by the probability of choosing it, which compensates exactly: a direction sampled often counts for less, one sampled rarely counts for more, and the estimate stays unbiased. If the sampling distribution were exactly proportional to the integrand, every sample would give the same answer and the noise would vanish. In practice the goal is to get close; see [[Statistical Sampling]].

Rendering offers several good guesses:

- **Material sampling.** A shiny surface reflects light mostly around the mirror direction, so sampling directions according to its reflectance function concentrates effort where the material actually responds; see [[Shading Model]] and [[Physically Based Rendering]]. A matte surface is sampled with a cosine-weighted distribution, since light arriving at grazing angles contributes little.
- **Light sampling.** For small, bright lights, randomly chosen directions almost never hit them. Sampling a point on the light directly, called next event estimation, finds them every time.
- **Environment sampling.** An environment map is sampled in proportion to its brightness, so the sun in a sky image receives most of the samples; see [[Image-Based Lighting]].

Each strategy fails somewhere. Light sampling is poor for mirror-like surfaces, and material sampling is poor for tiny lights. **Multiple importance sampling**, introduced by Eric Veach and Leonidas Guibas in 1995, combines several strategies and weights each sample according to how likely every strategy was to produce it. It keeps the strengths of each and became a standard part of production renderers.

A poor sampling distribution produces **fireflies**: rare samples with tiny probability but large value, which appear as isolated bright pixels. Light paths through glass that focus into caustics are a classic source; see [[Caustics]]. Denoisers and clamping are used to hide what sampling cannot fix; see [[Denoising]].

Real-time path tracing pushes the idea further. Resampling techniques choose among many candidate light samples and reuse good ones across neighboring pixels and frames, making scenes with thousands of lights practical; see [[Ray Tracing]]. Placing samples evenly is a complementary approach; see [[Low-Discrepancy Sequence]] and [[Blue Noise]].

## See also
- [[Reinforcement Learning]]
- [[Radiosity]]
