---
aliases:
  - Floating point
  - IEEE 754
  - Float
  - NaN
  - Rounding error
  - Machine epsilon
tags:
  - computation
summary: How computers approximate real numbers with a fixed number of binary digits, why 0.1 + 0.2 isn't 0.3, and why money should never be stored as a float.
---
**Floating-point arithmetic** is how computers represent and calculate with real numbers. A floating-point number stores a sign, a *significand* (the significant digits), and an *exponent* that says where the binary point goes, like scientific notation in base 2. The format covers an enormous range, from subatomic to astronomical scales, with roughly constant relative precision. The common 64-bit "double" holds about 15 to 17 significant decimal digits.

The IEEE 754 standard, adopted in 1985 and led by William Kahan, who received the Turing Award for it, made floating point consistent across hardware. Before it, the same calculation could give different answers on different machines.

The format is binary, and most decimal fractions have no exact binary representation, just as 1/3 has none in decimal. The number 0.1 is stored as the nearest representable value, slightly off. So in nearly every language, `0.1 + 0.2` gives `0.30000000000000004`. Several other surprises follow:

- **Equality is unreliable.** Comparing floats with `==` fails on values that should be equal, so tests compare within a tolerance. An [[Assertion]] on float results needs an epsilon.
- **Order matters.** Floating-point addition isn't associative, since `(a + b) + c` can differ from `a + (b + c)`. Adding numbers in a different order, as parallel code does, changes the result slightly.
- **Cancellation.** Subtracting two nearly equal numbers wipes out most significant digits, magnifying earlier rounding errors.
- **Special values.** Division by zero gives infinity, invalid operations give NaN ("not a number"), and NaN isn't equal even to itself. There is also a negative zero.

Rules of thumb follow. Never store money as a float: use integer cents or a decimal type. Large integers lose precision too. JavaScript numbers are doubles, so integers above 2⁵³ can't all be represented, which is why APIs send large IDs, such as a [[Universally Unique Identifier]] or 64-bit snowflake ID, as strings.

Precision is also a trade-off with speed and memory. Graphics uses 16-bit floats for [[High Dynamic Range]] color, and limited precision causes z-fighting in a [[Depth Buffer]]. Machine learning increasingly uses 16-bit and even 8-bit formats, and model [[Quantization]] pushes further to save memory.

Floating point also undermines reproducibility. Different compilers, instruction sets, and parallel reductions produce results that differ in the last bits, which breaks [[Determinism]]. Lockstep multiplayer and [[Rollback Netcode]] often avoid floats in game logic or force a strict mode so every machine computes identical results, and [[Golden File Testing]] of numeric output must tolerate tiny differences. Floating-point mistakes can be expensive: the 1994 Pentium division bug cost Intel about $475 million and pushed chipmakers toward [[Formal Verification]]. A cousin problem, [[Integer Overflow]], affects whole numbers.

## See also
- [[Spreadsheet Error]]
- [[Decimal Arithmetic]]
- [[Binary Number]]
- [[Cantor's Diagonal Argument]]
- [[Patriot Missile Failure]]
