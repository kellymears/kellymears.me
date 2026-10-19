---
aliases:
  - Quasi-Monte Carlo
  - Sobol sequence
  - Halton sequence
tags:
  - graphics
summary: A deterministic sequence of points that fills a space more evenly than random sampling, so that averages over those points converge faster, used in rendering, numerical integration and financial modeling.
---
Random points are clumpy. Scatter a few hundred at random across a square and some regions will be crowded while others are left empty. When those points are used to estimate an integral, as in Monte Carlo rendering, the clumps and gaps show up as error; see [[Monte Carlo Method]]. A **low-discrepancy sequence** is a set of points designed to avoid this. **Discrepancy** measures how far the fraction of points falling in any box departs from the box's share of the area. Low-discrepancy sequences keep that gap small for every prefix of the sequence, so they spread evenly whether you stop at 10 points or 10 million.

The simplest is the **van der Corput sequence**, from 1935. Write the counting numbers 1, 2, 3 and so on in binary, reverse their digits, and put them after a binary point; see [[Binary Number]]. The results are 1/2, 1/4, 3/4, 1/8, 5/8 and so on, each new point landing in the largest remaining gap. The **Halton sequence** extends this to several dimensions by using a different prime base in each one; see [[Prime Number]]. The **Sobol sequence**, introduced by Ilya Sobol in 1967, works in base 2 throughout with carefully chosen direction numbers, and is fast to compute with bit operations; see [[Bitwise Operation]].

Using such points for integration is called **quasi-Monte Carlo**. For smooth functions, its error falls roughly in proportion to one over the number of samples, apart from logarithmic factors, compared with one over the square root for random sampling. That can mean many times fewer samples for the same accuracy. The advantage shrinks in very high dimensions.

Another family uses the [[Golden Ratio]]. Adding it repeatedly and keeping the fractional part spaces points very evenly on a line, since it is in a precise sense the hardest number to approximate with fractions. The same idea produces the spiral of seeds in a sunflower head and the Fibonacci lattice, a standard way to place evenly spaced points on a sphere; see [[Fibonacci Sequence]].

Deterministic patterns have a drawback: they can line up with structure in the scene and produce visible artifacts, and their error is hard to estimate. **Scrambling** randomizes a sequence while keeping its evenness, which restores the ability to measure error by running several independent scrambles; see [[Pseudorandom Number Generator]].

In rendering, low-discrepancy sequences choose pixel positions, lens positions and light directions in path tracers, and they combine with weighting samples by where they matter; see [[Importance Sampling]] and [[Ray Tracing]]. **Blue noise** pursues a related goal from a perceptual angle, spreading error across the screen so that it looks like fine, even grain; see [[Blue Noise]] and [[Dithering]]. Outside graphics, quasi-Monte Carlo methods have been widely used in finance to price complex derivatives.

## See also
- [[Aliasing]]
- [[Space-Filling Curve]]
