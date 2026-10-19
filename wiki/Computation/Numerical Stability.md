---
aliases:
  - Catastrophic cancellation
  - Kahan summation
tags:
  - computation
summary: Whether a numerical algorithm keeps rounding errors small or lets them grow, the difference between two formulas that are equal on paper and give different answers on a computer.
---
**Numerical stability** describes whether an algorithm keeps the small rounding errors of computer arithmetic under control or amplifies them. Two formulas that are equal on paper can give very different answers in floating point, because every operation rounds its result to a fixed number of significant digits; see [[Floating-Point Arithmetic]].

The worst offender is **catastrophic cancellation**: subtracting two nearly equal numbers. If both are correct to sixteen digits and agree in the first twelve, their difference has only four meaningful digits left, and the rest is amplified noise. A textbook example is computing variance as the mean of the squares minus the square of the mean. For data with a large average and small spread, both terms are huge and nearly equal, and the result can even come out negative. Welford's method from 1962 updates the mean and variance one value at a time and avoids the subtraction; see [[Normal Distribution]].

The quadratic formula has the same trap when one root is tiny; computing the large root first and deriving the small one by division avoids it.

Adding many numbers loses precision too. Adding a small number to a large running total can round the small one away entirely, so the order of addition changes the answer. **Kahan summation**, published by William Kahan in 1965, carries a second variable holding the bits lost at each step and feeds them back in. Libraries often sum in pairs instead, which keeps errors smaller than a straight loop at little cost.

That order dependence surprises people. Vectorized and parallel code adds in a different order from a simple loop, so the same program can give slightly different results on different machines or thread counts; see [[SIMD]] and [[Determinism]].

Stability is a property of the algorithm, as distinct from the conditioning of the problem. An ill-conditioned problem is sensitive to its inputs whatever method is used, as weather forecasts are. An unstable algorithm adds error to a problem that didn't need it. Solving linear equations by elimination is unstable unless rows are swapped to divide by the largest available value; see [[Linear algebra]].

Accumulated error has had real consequences:

- **The Patriot missile.** A battery's clock counted tenths of a second, which binary can't represent exactly. After about 100 hours of operation the error had grown to a third of a second, and in 1991 an incoming missile went untracked, killing 28 soldiers; see [[Patriot Missile Failure]].
- **The Vancouver Stock Exchange.** A new index launched at 1,000 in 1982 was truncated rather than rounded each time it updated. By late 1983 it read about 520 when it should have been near 1,100; see [[Decimal Arithmetic]].

Exact arithmetic avoids rounding at a cost in speed and memory; see [[Arbitrary-Precision Arithmetic]].

## See also
- [[Integer Overflow]]
- [[Physics engine]]
- [[Newton's Method]]
- [[Strassen Algorithm]]
