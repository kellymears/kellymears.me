---
aliases:
  - Half adder
  - Full adder
  - Ripple-carry adder
  - Carry-lookahead adder
tags:
  - computation
summary: The logic circuit that adds binary numbers, built from a handful of gates per bit, whose central design problem is how quickly a carry can travel from the lowest digit to the highest.
---
A **binary adder** is a circuit that adds two binary numbers. Addition is the most common operation a processor performs. Besides arithmetic, it computes memory addresses, advances the program counter, and through two's complement also handles subtraction; see [[Binary Number]] and [[Integer Overflow]].

Adding two single bits takes two gates. The sum bit is 1 when exactly one input is 1, which is an exclusive OR; the carry bit is 1 when both are, which is an AND. This circuit is a **half adder**; see [[Boolean Algebra]] and [[Bitwise Operation]]. A **full adder** also accepts a carry coming in from the column to its right, so that it can be used for every digit after the first. It takes about five gates.

The obvious way to add multi-bit numbers is to chain full adders, each passing its carry to the next, just as people carry when adding on paper. This **ripple-carry adder** is small and simple but slow. In the worst case, such as adding 1 to a number made of all 1s, a carry has to travel through every stage before the top bit is correct, so the delay grows in proportion to the width. For a 64-bit adder that wait can limit the speed of the entire processor; see [[Clock Signal]] and [[Big-O Notation]].

The fix is to compute carries in advance. For each position, the adder can determine immediately whether it will **generate** a carry, because both inputs are 1, or **propagate** an incoming carry, because exactly one is. Combining generate and propagate signals for groups of bits, then groups of groups, lets the carry into any position be computed in time that grows only with the logarithm of the width. This **carry-lookahead** approach is a hardware form of the parallel prefix computation; see [[Prefix Sum]]. Designs such as the Kogge-Stone adder, described in 1973, push it further, trading chip area and wiring for speed, and remain common in fast processors.

The problem is older than electronics. Mechanical calculators had to move carries through geared wheels, and in the 1830s Charles Babbage devoted considerable effort to an "anticipating carriage" so that the [[Analytical Engine]] would not wait for carries to ripple digit by digit.

Inside a processor, adders sit within the arithmetic logic unit alongside circuits for logic and shifts, and results are captured into registers on each clock tick; see [[Flip-Flop]] and [[Processor Register]]. Multipliers are built from arrays of adders, and floating-point units add aligned significands with wide adders of the same kind; see [[Floating-Point Arithmetic]]. Vector units replicate adders so that many additions happen at once; see [[SIMD]].

## See also
- [[Von Neumann Architecture]]
- [[Arbitrary-Precision Arithmetic]]
