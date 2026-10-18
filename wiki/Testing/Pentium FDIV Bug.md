---
aliases:
  - FDIV bug
  - Pentium division bug
tags:
  - testing
summary: A 1994 flaw in Intel's Pentium chip, caused by five missing entries in a division lookup table, that gave wrong answers in rare divisions and cost Intel $475 million once the public demanded replacements.
---
The **Pentium FDIV bug** was a flaw in the floating-point unit of early Intel Pentium processors that made certain divisions come out wrong, at worst from the fourth significant digit on. It was found in 1994 by Thomas Nicely, a mathematics professor at Lynchburg College in Virginia, while he was computing sums of reciprocals of twin primes. His results disagreed with what theory predicted, and after months of ruling out other causes he traced the discrepancy to the processor itself; see [[Test Oracle]].

The cause was a lookup table. The Pentium divided with the SRT algorithm, which finds a quotient a few bits at a time by consulting a table of 1,066 entries, rather like guessing the next digit in long division from the leading digits. Five entries that should have held 2 held 0, apparently because the script that loaded the table into the chip's circuitry missed them. Those entries were reached only for particular bit patterns in the divisor, so most divisions were correct. The classic example is 4,195,835 divided by 3,145,727, which the flawed chip got wrong from the fifth significant digit; see [[Floating-Point Arithmetic]].

Intel had found the flaw itself months earlier, fixed it in later chips, and judged it too rare to announce. Its estimate was that a typical spreadsheet user would hit it once in 27,000 years. IBM, which sold computers with the chip, published a far higher estimate based on different assumptions and halted its own Pentium shipments. Intel at first offered replacements only to customers who could show they needed the accuracy. The response was ridicule, and in December 1994 Intel offered a replacement to anyone who asked. It took a $475 million charge.

The case changed verification practice in two ways.

- **Testing can't cover the input space.** Two floating-point operands give vastly more combinations than could ever be run, and the faulty entries were reached by too few of them to show up in random testing. Testing samples; it can't prove; see [[Combinatorial explosion]] and [[Property-Based Testing]].
- **Proof became worth its cost.** Intel, AMD, and other chipmakers invested in formal verification of arithmetic units afterward, with machine-checked proofs that division and square root are correct for every input; see [[Formal Verification]].

The bug also shows the gap between how often a defect fires and what it costs. A rare error is a statistical nuisance in most products, but in a component people trust to be exact, any known error at all destroys the trust, and the decision to stay quiet cost more than the flaw. Later processors made published errata routine, with many fixes delivered as updates to the chip's internal programming; see [[Microcode]].

## See also
- [[Patriot Missile Failure]]
- [[Decimal Arithmetic]]
- [[Verification and Validation]]
